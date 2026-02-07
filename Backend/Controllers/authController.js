import User from "../Models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import generateToken from "../Config/token.js";
import sendMail from "../Config/sendMail.js";

export const register = async (req, res) => {
    // ADD THIS DEBUGGING
    console.log("=== DEBUG INFO ===");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("Content-Type:", req.get('Content-Type'));
    console.log("==================");
    
    try{
        const {name, email, password, role} = req.body;
        
        // ADD THIS CHECK
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data received", 
                receivedBody: req.body,
                contentType: req.get('Content-Type')
            });
        }
        
        let existUser = await User.findOne({email});
        if (existUser) {
            return res.status(400).json({message: "User already exists"});
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({message: "Invalid email format. Try Again!"});
        }
        if (password.length<8) {
            return res.status(400).json({message: "Password must be at least 8 characters long"});
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })
    let token = await generateToken(user._id);
        res.cookie("token", token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge:7*24*60*60*1000
        })
        return res.status(201).json({message: "User registered successfully", user: {id: user._id, name, email, role}, token});
    }
    catch(error){
        console.error("Registration Error:", error);
        return res.status(500).json({message: "Registration failed", error: error.message});
    }
}


export const login = async (req, res) => {
    console.log("=== LOGIN REQUEST ===");
    console.log("Body:", req.body);
    
    try {
        const { email, password } = req.body;
        
        console.log("Looking for user:", email);
        let user = await User.findOne({ email });
        
        if (!user) {
            console.log("User not found:", email);
            return res.status(404).json({ message: "User not found" });
        }
        
        console.log("User found:", user._id);
        let isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            console.log("Invalid password for:", email);
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        
        console.log("Password matched, generating token...");
        let token = await generateToken(user._id);
        console.log("Token generated:", token);
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        
        console.log("Login successful for:", email);
        return res.status(200).json({ 
            message: "Login successful", 
            user: { id: user._id, name: user.name, email: user.email, role: user.role }, 
            token 
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Login failed. Try Again!", error: error.message });
    }
}


export const logout = (req, res) => {
    console.log("=== LOGOUT REQUEST ===");
    try {
        res.clearCookie("token");
        console.log("Logout successful");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ message: "Logout failed. Try Again!", error: error.message });
    }
}


export const sendOtp = async (req, res) => {
    console.log("=== SEND OTP REQUEST ===");
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // Save OTP and expiration to user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes from now
        user.isOtpVerified = false;
        await user.save();

        // Send OTP email
        await sendMail(email, otp);

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Send OTP Error:", error);
        return res.status(500).json({ message: "Failed to send OTP", error: error.message });
    }
}

export const verifyOtp = async (req, res) => {
    console.log("=== VERIFY OTP REQUEST ===");
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.resetOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (Date.now() > user.otpExpires) {
            return res.status(400).json({ message: "OTP has expired" });
        }
        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Verify OTP Error:", error);
        return res.status(500).json({ message: "Failed to verify OTP", error: error.message });
    }
}

export const resetPassword = async (req, res) => {
    console.log("=== RESET PASSWORD REQUEST ===");
    try {
        const { email,  password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and new password are required" });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!user.isOtpVerified) {
            return res.status(400).json({ message: "OTP not verified" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset Password Error:", error);
        return res.status(500).json({ message: "Failed to reset password", error: error.message });
    }
}

export const googleAuthCallback = async (req, res) => {
    console.log("=== GOOGLE AUTH CALLBACK ===");
    try {
        const { email, name, role} = req.body;
        if (!email || !name) {
            return res.status(400).json({ message: "Email and name are required" });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (!user) {
            // If user doesn't exist, create a new one
            user = new User({
                email,
                name,
                password: Math.random().toString(36).slice(-8), // Generate a random password
                role: "student", // Default role
            });
            await user.save();
        }

        // Generate JWT token (await the promise so token is a string)
        const token = await generateToken(user._id);
        res.cookie("token", token, { httpOnly: true , secure: true, sameSite: "none", maxAge: 7 * 24 * 60 * 60 * 1000 });

        return res.status(200).json({ message: "Google authentication successful", user });
    } catch (error) {
        console.error("Google Auth Callback Error:", error);
        return res.status(500).json({ message: "Google authentication failed", error: error.message });
    }
}
