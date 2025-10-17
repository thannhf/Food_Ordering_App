import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/ClerkWebhooks.js";
import userRouter from "./routes/userRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import addressRouter from "./routes/addressRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

const port = process.env.PORT || 3000; // Define server port

await connectDB();
await connectCloudinary();

const app = express(); // Initialize Express Application
app.use(cors()); // Enable Cross-Origin Resource sharing

// api to listen to stripe webhooks
app.post('/api/stripe', express.raw({type: "application/json"}), stripeWebhooks)

//Middleware Setup
app.use(express.json()); // Enable Json request body parsing
app.use(clerkMiddleware());

// API to Listen Clerk Webhooks
app.use("/api/clerk", clerkWebhooks);

//define api routes
app.use("/api/user", userRouter); //routes for User functionality
app.use("/api/products", productRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

//Route Endpoint to check API status
app.get("/", (req, res) => res.send("API Successfully Conntected"));

//Start the server
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
