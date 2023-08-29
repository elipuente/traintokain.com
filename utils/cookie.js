import { parse, serialize } from 'cookie';

export const setCookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }

  options = {
    ...options,
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24,
    path: '/api',
  };

  res.setHeader('Set-Cookie', serialize(name, stringValue, options));
};

export const parseCookie = (req) =>
  parse(req ? req.headers.cookie || '' : document.cookie);

export const invalidateCookie = (res, name) =>
  res.setHeader(
    'Set-Cookie',
    serialize(name, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 0,
      path: '/api',
    })
  );
