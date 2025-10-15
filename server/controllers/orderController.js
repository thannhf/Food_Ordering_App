import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Stripe from "stripe";

//Global variables for payment
const currency = "usd";
const delivery_charges = 10; // 10 dollar
const taxPercentage = 0.02; // 2% tax charges

// Place Order Using COD [Post '/cod']
export const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;
    const { userId } = req.auth();

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Please add Product first" });
    }

    //Calculate amount using items
    let subtotal = 0;
    for (const item in items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.json({ success: false, message: "Product not found" });
      }
      const unitPrice = product.price[item.size]; // Pick correct size first
      if (!unitPrice) {
        return res.json({ success: false, message: "Invalid size selected" });
      }

      subtotal += unitPrice + item.quantity;
    }

    //calculate total amount by adding tax and delivery charges
    const taxAmount = subtotal * taxPercentage;
    const totalAmount = subtotal + taxAmount + delivery_charges;

    // create order in DB
    const order = await Order.create({
      userId,
      items,
      amount: totalAmount,
      address,
      paymentMethod: "COD",
    });

    //Clear user cart after placing order
    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};

// Place Order Using Stripe [Post '/stripe']
export const placeOrderStripe = async (req, res) => {

    
  try {
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};

// all orders data for user [Post '/userorders']
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.auth();
    const orders = await Order.find({
      userId,
      $or: [{ paymentMethod: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};

// all orders data for admin [Post '/']
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentMethod: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    const totalOrders = orders.length
    const totalRevenue = orders.reduce((acc, o)=> acc + (o.isPaid ? o.amount : 0), 0)

    res.json({ success: true, dashboardData: {totalOrders, totalRevenue, orders} });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};

// update order status for admin [Post '/status']
export const updateStatus = async (req, res) => {
  try {
    const {orderId, status} = req.body
    await Order.findByIdAndUpdate(orderId, {status})



    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};
