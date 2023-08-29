import { invalidateCookie } from "../../../utils/cookie";

export default async function handler(req, res) {
  invalidateCookie(res, "__rfx");

  return res.status(200).json({ signedOut: true });
}
