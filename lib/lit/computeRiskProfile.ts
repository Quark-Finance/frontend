import OpenAI from 'openai'
import ethers from "ethers";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LIT_RPC, LitNetwork } from "@lit-protocol/constants";
import {
  createSiweMessageWithRecaps,
  generateAuthSig,
  LitAbility,
  LitActionResource,
  LitPKPResource,
} from "@lit-protocol/auth-helpers";
import { getEnv } from "./utils";

const ETHEREUM_PRIVATE_KEY = getEnv("ETHEREUM_PRIVATE_KEY");

const openai = new OpenAI({
    baseURL: 'https://api.red-pill.ai/v1',
    apiKey: process.env.OPENAI_API_KEY,
  })

const litActionCode = `(async () => {
    const userMessage = message; // Extract the 'message' from the request body

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'gpt-4o',
    })

    console.log('Completion:', completion.choices[0]);
    Lit.Actions.setResponse({ response: completion.choices[0].message.content });
})();
`; // LitAction to compute user risk profile

export const computeRiskProfile = async () => {
    let litNodeClient: LitNodeClient;
    const ethersSigner = new ethers.Wallet(
        ETHEREUM_PRIVATE_KEY,
        new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
      );
    console.log("🔄 Connecting to Lit network...");
    litNodeClient = new LitNodeClient({
        litNetwork: LitNetwork.DatilDev,
        debug: false,
    });
    await litNodeClient.connect();
    console.log("✅ Connected to Lit network");

    console.log("🔄 Getting Session Signatures...");
    const sessionSigs = await litNodeClient.getSessionSigs({
        chain: "ethereum",
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
        resourceAbilityRequests: [
          {
            resource: new LitPKPResource("*"),
            ability: LitAbility.PKPSigning,
          },
          {
            resource: new LitActionResource("*"),
            ability: LitAbility.LitActionExecution,
          },
        ],
        authNeededCallback: async ({
          resourceAbilityRequests,
          expiration,
          uri,
        }) => {
          const toSign = await createSiweMessageWithRecaps({
            uri: uri!,
            expiration: expiration!,
            resources: resourceAbilityRequests!,
            walletAddress: ethersSigner.address,
            nonce: await litNodeClient.getLatestBlockhash(),
            litNodeClient,
          });
  
          return await generateAuthSig({
            signer: ethersSigner,
            toSign,
          });
        },
    });
    console.log("✅ Got Session Signatures");

    console.log("🔄 Executing lit action...");
    const riskEvaluation = await litNodeClient.executeJs({
      code: litActionCode,
      sessionSigs,
      jsParams: {
        message: 'What is the meaning of life'
      },
    });
    console.log("✅ Lit action executed");
    console.log("Risk Profile: ", riskEvaluation.response);
    return riskEvaluation.response;
  };
  