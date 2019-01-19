import jwt from 'jsonwebtoken';


// TODO - take this from env or something
const jwtSecret = [
  'Si0hX2JpDMo1sAfGfDZh',
  'YWwNtZh1vVpivzvlluwk',
  'EX7pUcibGC8ln8sSAQWE',
  'CBOlBTqOS1uIfTB7WJwi',
  'VgzWIECiLzI0kPkWM4EX',
  'STcFviYf02Esr5bfULi1',
  '39F4LhsGhw6eq1w3Vefz',
  'LZrz25U0LkX59yehCtw2',
  'HrV2HSWeh6UUt0ZSYQXJ',
  '90Sba1kEfZaIG0ywfCLi',
].join('');

export const issue = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      { payload },
      jwtSecret,
      {
        expiresIn: '30 days',
      },
      (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      },
    );
  });

export const verify = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(
      token,
      jwtSecret,
      {},
      (error, decoded) => {
        if (error) return reject(error);
        return resolve(decoded.payload);
      },
    );
  });

export const getAuthorizedUser = async (authorizationHeader) => {
  if (authorizationHeader) {
    const [scheme, token] = authorizationHeader.split(' ');
    if (scheme && token && /^Bearer$/i.test(scheme)) {
      return verify(token);
    }
    throw new Error('Invalid authorization header, accepted format is "Bearer <token>"');

  }
  throw new Error('Not authorized');
};
