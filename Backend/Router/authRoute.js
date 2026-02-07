import express from 'express';
import { register, login, logout, resetPassword, sendOtp, verifyOtp , googleAuthCallback} from '../Controllers/authController.js';
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/sendotp", sendOtp);
authRouter.post("/verifyotp", verifyOtp);
authRouter.post("/resetpassword", resetPassword);
authRouter.post("/google", googleAuthCallback);
export default authRouter;