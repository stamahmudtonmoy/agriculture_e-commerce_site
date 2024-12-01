import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

/**
 * Load environment variables from a .env file (if available).
 */
dotenv.config();

/**
 * Connect to the database using the configuration provided in db.js.
 */
connectDB();

/**
 * Create an instance of the Express application.
 */
const app = express();

/**
 * Middleware to enable Cross-Origin Resource Sharing (CORS).
 */
app.use(cors());

/**
 * Middleware to parse JSON request bodies.
 */
app.use(express.json());

/**
 * Middleware to log HTTP request details in the console (development mode).
 */
app.use(morgan("dev"));

/**
 * Define routes for the authentication, category, and product endpoints.
 */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

/**
 * Define a default route to display a welcome message when accessing the root URL.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
app.get("/", (req, res) => {
  res.send("<h1>Welcome to AgroAsha</h1>");
});

/**
 * Define the port on which the Express server will listen for incoming requests.
 */
const PORT = process.env.PORT || 8080;

/**
 * Start the Express server and log a message to the console indicating the mode and port.
 */
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});
