import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/connectDB.js";
import { stripeWebhookHandler } from "./Controllers/courseController.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./Router/authRoute.js";
import userRouter from "./Router/userRoute.js";
import courseRouter from "./Router/courseRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// THE FIX: Your frontend has the "-1", your backend does not.
// This tells the backend to trust the "-1" site.
const FRONTEND_URL = "https://academix-lms-an-ai-powered-lms-1.onrender.com";

app.use(
  cors({
    origin: FRONTEND_URL, 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// Stripe Webhook (Must stay before express.json)
app.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhookHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
