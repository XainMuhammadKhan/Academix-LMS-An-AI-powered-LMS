// authMiddleware.js (or whatever your middleware file is called)
import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        console.log("=== AUTHENTICATION CHECK ===");
        console.log("All cookies:", req.cookies);
        console.log("Token from cookie:", token ? "Present" : "Missing");
        console.log("Token value:", token);
        console.log("Token type:", typeof token);
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        
        // Additional check to ensure token is a string
        if (typeof token !== 'string') {
            console.error("Token is not a string! It's:", typeof token, token);
            return res.status(401).json({ message: "Unauthorized: Invalid token format" });
        }
        
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verified successfully, userId:", verifyToken.id);
        
        req.userId = verifyToken.id;
        next();
    } catch (error) {
        console.error("Authentication Error:", error.message);
        
        // Better error messages for different JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Unauthorized: Token expired" });
        }
        
        return res.status(500).json({ message: "Authentication failed", error: error.message });
    }
}

export default isAuthenticated;