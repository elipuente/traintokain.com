import prisma from '../../../lib/prisma';
import * as tokenUtils from '../../../utils/token';
import { setCookie, parseCookie } from '../../../utils/cookie';

const getUserByIdAndNumber = (id, phoneNumber) =>
  prisma.t2k_user.findMany({
    where: {
      AND: [
        {
          id,
        },
        {
          phoneNumber,
        },
      ],
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      totalScore: true,
    },
  });

const handler = async (req, res) => {
  const { __rfx: token } = parseCookie(req);

  if (!token) {
    return res.status(200).json({ signedIn: false, accessToken: '' });
  }

  let userInformation;

  try {
    userInformation = tokenUtils.verifyRefreshToken(token);
  } catch (err) {
    console.error(
      `Error: Unable to verify refresh token (token: ${token}). `,
      err
    );
    return res.status(200).json({ signedIn: false, accessToken: '' });
  }

  const [user] = await getUserByIdAndNumber(
    userInformation.id,
    userInformation.ph
  );

  if (!user) {
    return res.status(200).json({ signedIn: false, accessToken: '' });
  }

  const accessToken = tokenUtils.createAccessToken({
    ...user,
  });

  const refreshToken = tokenUtils.createRefreshToken({
    id: user.id,
    ph: user.phoneNumber,
  });

  setCookie(res, '__rfx', refreshToken);

  res.status(200).json({ signedIn: true, accessToken });
};

export default handler;
