import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import cloudinary from "cloudinary"; // Import cloudinary

const app = express();
config({ path: "./config/config.env" });

// Load environment variables
const FRONTEND_URL = process.env.FRONTEND_URL;
const DASHBOARD_URL = process.env.DASHBOARD_URL;

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure CORS
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Mount routers
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Initialize database connection
dbConnection();

// Error middleware
app.use(errorMiddleware);

export default app;
