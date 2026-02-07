// token.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (userId) => {  // Removed async - jwt.sign is synchronous
    try {
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
        console.log("Token generated successfully, type:", typeof token);
        return token;
    } catch (error) {
        console.error("Token generation error:", error);
        throw new Error("Token generation failed");
    }
}

export default generateToken;