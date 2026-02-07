import express from "express";
import dotenv from "dotenv";

// Load environment variables as early as possible so other modules can use them
dotenv.config();

// Debug: confirm stripe key presence (logs only first 8 chars masked)
if (process.env.STRIPE_API_KEY) {
  console.log('STRIPE_API_KEY found:', `${process.env.STRIPE_API_KEY.slice(0,8)}...`);
} else {
  console.warn('STRIPE_API_KEY not found in environment');
}

import connectDB from "./Config/connectDB.js";
import { stripeWebhookHandler } from "./Controllers/courseController.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./Router/authRoute.js";
import userRouter from "./Router/userRoute.js";
import courseRouter from "./Router/courseRoute.js";

const port = process.env.PORT ;
const app = express();

// Stripe requires the raw body to validate webhook signatures. Register the webhook
// endpoint before the JSON body parser so `req.body` is the raw buffer for Stripe.
app.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhookHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Enable CORS for the frontend dev server and allow credentials (cookies)
const CLIENT_URL = "https://academix-lms-an-ai-powered-lms-1.onrender.com";
app.use(
  cors({
    origin: "https://academix-lms-an-ai-powered-lms-1.onrender.com",
    credentials: true,
  })
);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);

app.get("/", (req, res) => {
  res.send("Hello, AcademiX LMS Backend is running!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});
