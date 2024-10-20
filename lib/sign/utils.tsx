import axios from "axios";

export default async function makeAttestationRequest(endpoint: string, options: any) {
    const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
    const res = await axios.request({
      url,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      ...options,
    });
    // Throw API errors
    if (res.status !== 200) {
      throw new Error(JSON.stringify(res));
    }
    // Return original response
    return res.data;
  }