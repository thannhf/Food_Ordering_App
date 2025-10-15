import express from "express";
import authUser from "../middleware/authMiddleware.js";
import {
  placeOrderCOD,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();
// for payment
orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);
// for admin
orderRouter.get("/", authUser, allOrders);
orderRouter.post("/status", authUser, updateStatus);
//for user
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;