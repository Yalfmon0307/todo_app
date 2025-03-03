import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}