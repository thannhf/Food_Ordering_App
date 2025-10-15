import express from "express"
import authUser from "../middleware/authMiddleware.js"
import { addToCart, updateCart } from "../controllers/cartController.js"

const cartRouter = express.Router()

cartRouter.get('/update', authUser, updateCart)
cartRouter.post('/add', authUser, addToCart)

export default cartRouter