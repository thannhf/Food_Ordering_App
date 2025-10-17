import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type:String, required: true, ref: "User"},
    items: [{
        product: {type:mongoose.Schema.Types.ObjectId, required: true, ref: "Product"},
        quantity: {type:Number, required: true},
        size: {type:String, required: true},
    }],
    amount: {type:Number, required: true},
    address: {type:String, required: true, ref: "Address"},
    status: {type:String, default: "Order Placed"},
    paymentMethod: {type:String, required: true},
    isPaid: {type:Boolean, required: true, default: false},
}, {timestamps: true})

const Order = mongoose.model("Order", orderSchema)

export default Order