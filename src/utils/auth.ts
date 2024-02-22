import jwt from 'jsonwebtoken';
import TokenPayload from '../types/TokenPayload';

const JWT_SECRET = process.env.JWT_SECRET || 'secretPassword';

const sign = (payload: TokenPayload): string => 
  jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

const verify = (token: string): TokenPayload => 
  jwt.verify(token, JWT_SECRET) as TokenPayload;

export default {
  sign,
  verify,
};