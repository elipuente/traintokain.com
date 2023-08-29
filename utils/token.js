import { decode, sign, verify } from 'jsonwebtoken';

const AT_SECRET = process.env.ACCESS_TOKEN_SECRET;
const RT_SECRET = process.env.REFRESH_TOKEN_SECRET;

let accessToken = '';

export const setAccessToken = (token) => (accessToken = token);

export const clearAccessToken = () => (accessToken = null);

export const getAccessToken = () => accessToken;

export const createAccessToken = (data) =>
  sign({ ...data }, AT_SECRET, { expiresIn: '15m' });

export const createRefreshToken = (data) =>
  sign({ ...data }, RT_SECRET, { expiresIn: '1d' });

export const decodeAccessToken = (token) => decode(token);

export const verifyAccessToken = (token) => verify(token, AT_SECRET);

export const verifyRefreshToken = (token) => verify(token, RT_SECRET);
