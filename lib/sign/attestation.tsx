import { SignProtocolClient, SpMode, EvmChains, IndexService } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";
import makeAttestationRequest from "./utils";

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY as `0x${string}`
const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.baseSepolia,
  account: privateKeyToAccount(privateKey), // Optional, depending on environment
});


// script to create a Schema 
// run just once and keep the same schema
///////////////////////////////////////////
// async function createSchema() {
//   const res = await client.createSchema({
//     name: "Risk Profile Schema",
//     data: [
//       { name: "userAddress", type: "address" },
//       { name: "formulaireQuestions", type: "string[]" },
//       { name: "userRiskResult", type: "uint256" },
//     ],
//   });
//   return res.schemaId;
// }


export async function createRiskProfileAttestation (userAddress: `0x${string}`, formulaireQuestions: string[], userRiskResult: number) {
    const schemaId = process.env.NEXT_PUBLIC_SCHEMA_ID as string
    const res = await client.createAttestation({
        schemaId: schemaId,
        data: {
            userAddress,
            formulaireQuestions,
            userRiskResult
        },
        indexingValue: "sorvete"
    })
    console.log(res)
}

export async function queryAttestations(attestationId: string) {
  const indexService = new IndexService("testnet"); 
  const res = await indexService.queryAttestation("onchain_evm_84532_0xa1e"); 
  if (res === undefined) {
    console.error(`No Attestation with Id: ${attestationId}`)
    return { success: false }
  }  
  return {
    success: true,
    attestations: res,
  };
}


