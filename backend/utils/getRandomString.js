import crypto from 'crypto';

export const getRandomString = () => crypto.randomBytes(18).toString('base64');

export default getRandomString;
