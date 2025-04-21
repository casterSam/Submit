// app.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

// Import routes
import customerRoutes from "./routes/customer.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";

export const app = express();

// Middleware setup
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// CORS setup
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  "http://localhost:8081",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(
          new Error("CORS policy does not allow access from this origin."),
          false
        );
      }
    },
    credentials: true,
  })
);

// Set CORS headers manually (optional but helpful)
app.options('*', cors());

// Simplify CORS headers
app.use((req, res, next) => {
  const origin = allowedOrigins.includes(req.headers.origin) ? req.headers.origin : allowedOrigins[0];
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
// Enable trust proxy
app.enable("trust proxy");

// Routes
app.use("/api", customerRoutes);
app.use("/api", ticketRoutes);

// API root route
app.get("/api", (req, res) => {
  res.send(
    "Ticketing System API is running. Please use the correct endpoint to access the API."
  );
});
