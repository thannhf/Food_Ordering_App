import express from "express"
import authUser from "../middleware/authMiddleware.js"
import { addAddress, getAddress } from "../controllers/addressController.js"

const addressRouter = express.Router()


addressRouter.get('/', authUser, getAddress)
addressRouter.post('/add', authUser, addAddress)

export default addressRouter