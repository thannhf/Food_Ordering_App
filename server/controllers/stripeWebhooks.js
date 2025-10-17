import stripe from "stripe";
import Order from "../models/Order.js";
import User from "../models/User.js";

//Handle Stripe Webhooks
export const stripeWebhooks = async(request, response)=>{
    //Stripe Gateway initialize
    const stripeInstance = new stripe(process.env.STRIPE_WEBHOOK_SECRET)
    const sig = request.headers["stripe-signature"]

    let event
    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        response.status(400).send(`Webhook Error: ${error.message}`)
    }

    //Handle the event
    if(event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object
        const paymentIntentId = paymentIntent.id

        //Getting session metadata
        const session = await stripeInstance.checkout.sessions.list({payment_intent: paymentIntentId})

        const {orderId, userId} = session.data[0].metadata

        // Mark order as paid
        await Order.findByIdAndUpdate(orderId, {isPaid: true})

        // Clear User Cart
        await User.findByIdAndUpdate(userId, {cartData: {}})
    } else {
        console.log("Unhandled Event Type: ", event.type)
    }

    response.json({received: true})
}