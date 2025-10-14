import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/FoodieFiesta`)
        console.log("Database Connected")
    } catch (error) {
        console.log("Database Connected Failed ", error.message)
    }
}

export default connectDB