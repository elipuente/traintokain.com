export const unableToVerify = (res) =>
  res.status(403).json({
    error: true,
    message:
      'Unable to verify user information. Try signing out and signing in again.',
  });

export const genericError = (res) =>
  res.status(500).json({
    error: true,
    message: 'An error occurred. Please try again later.',
  });
