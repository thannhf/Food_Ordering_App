import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/ClerkWebhooks.js"

const port = process.env.PORT || 3000 // Define server port
await connectDB()

const app = express() // Initialize Express Application
app.use(cors()) // Enable Cross-Origin Resource sharing

//Middleware Setup
app.use(express.json()) // Enable Json request body parsing
app.use(clerkMiddleware())

// API to Listen Clerk Webhooks
app.use("/api/clerk", clerkWebhooks)

//Route Endpoint to check API status
app.get('/', (req, res)=> res.send("API Successfully Conntected"))

//Start the server
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`))