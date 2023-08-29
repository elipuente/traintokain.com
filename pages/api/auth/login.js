import prisma from '../../../lib/prisma';
import * as token from '../../../utils/token';
import { setCookie } from '../../../utils/cookie';

const compareIgnoreCase = (c) =>
  c[0].localeCompare(c[1], undefined, { sensitivity: 'accent' }) === 0;

const getUser = (phoneNumber) =>
  prisma.t2k_user.findUnique({
    where: {
      phoneNumber,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      totalScore: true,
    },
  });

const verifyUser = (user, first, last) =>
  compareIgnoreCase([user?.firstName, first.trim()]) &&
  compareIgnoreCase([user?.lastName, last.trim()]);

const handler = async (req, res) => {
  const { first, last, number } = req.body;

  const user = await getUser(number);

  if (!(user && verifyUser(user, first, last))) {
    return res
      .status(200)
      .json({ error: true, message: 'Incorrect login. Please try again.' });
  }

  const accessToken = token.createAccessToken({
    ...user,
  });

  const refreshToken = token.createRefreshToken({
    id: user.id,
    ph: number,
  });

  setCookie(res, '__rfx', refreshToken);

  return res.status(200).json({ accessToken, user });
};

export default handler;
