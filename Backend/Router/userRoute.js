import express from "express";
import { getCurrentUser, uploadProfile } from "../Controllers/userController.js";
import isAuthenticated from "../middleware/is_authenticated.js";
import upload from "../middleware/multer.js";
const userRouter = express.Router();

userRouter.get("/getcurrentuser", isAuthenticated, getCurrentUser);
userRouter.post("/uploadprofile", isAuthenticated, upload.single('photoUrl'), uploadProfile);
export default userRouter;