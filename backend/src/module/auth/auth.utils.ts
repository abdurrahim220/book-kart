/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
import { config } from '../../config';


export const generateToken = (
  payload: object,
  secret: string,
  expiresIn: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string): any => {
  return jwt.verify(token, secret);
};

export const createAuthCookies = (tokens: {
  accessToken: string;
  refreshToken: string;
}) => {
  return [
    `accessToken=${tokens.accessToken}; Path=/; HttpOnly; SameSite=Strict${
      config.NODE_ENV === 'production' ? '; Secure' : ''
    }`,
    `refreshToken=${tokens.refreshToken}; Path=/; HttpOnly; SameSite=Strict${
      config.NODE_ENV === 'production' ? '; Secure' : ''
    }`,
  ];
};


// export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
//   return bcrypt.compare(password, hash);
// };

