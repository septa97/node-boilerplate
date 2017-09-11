import jwt from 'jsonwebtoken';

export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
}

export default { generateToken };
