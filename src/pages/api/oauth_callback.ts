import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const NUID_CLIENT_ID = process.env.NUID_CLIENT_ID;
const NUID_CLIENT_SECRET = process.env.NUID_CLIENT_SECRET;
const NUID_API_URL = process.env.NUID_API_URL;

if (!NUID_CLIENT_ID || !NUID_CLIENT_SECRET) {
    throw new Error("NUID_CLIENT_ID or NUID_CLIENT_SECRET not set");
}

if (!NUID_API_URL) {
    throw new Error("NUID_API_URL not set");
}

// OAuth2 callback handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { code } = req.query;
    // const { client_id, client_secret } = process.env;
    
    const url = new URL(`${NUID_API_URL}/oauth/token`);

    // url.searchParams.append("grant_type", "authorization_code");
    url.searchParams.append("code", code as string);
    url.searchParams.append("client_id", NUID_CLIENT_ID);
    url.searchParams.append("client_secret", NUID_CLIENT_SECRET);

    const { data } = await axios.post(url.toString());
    console.log("🚀 ~ file: oauth_callback.ts:29 ~ data", data)

    // return res.json({
    //     ...data
    // })

    // redirect to profile page
    return res.redirect("/profile");
}
