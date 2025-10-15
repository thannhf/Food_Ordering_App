import express from "express"
import { upload } from "../middleware/multer.js"
import authUser from "../middleware/authMiddleware.js"
import { createProduct, listProduct, singleProduct, toggleStock } from "../controllers/productController.js"

const productRouter = express.Router()

productRouter.post('/', upload.array("images", 4), authUser, createProduct)
productRouter.get('/', listProduct)
productRouter.get('/single', singleProduct)
productRouter.post('/toggle-stock', authUser, toggleStock)

export default productRouter