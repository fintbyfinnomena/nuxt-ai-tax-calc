export const FINNO_AUTH_CLIENT_ID = process.env.FINNO_AUTH_CLIENT_ID;
export const FINNO_AUTH_ENDPOINT = process.env.FINNO_AUTH_URL;
export const ACCESS_CODE = Buffer.from(
  `${process.env.FINNO_AUTH_CLIENT_ID}:${process.env.FINNO_AUTH_SECRET}`
).toString("base64");
