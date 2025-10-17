import Address from "../models/Address.js";

// Add address for user [post '/add']
export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const { userId } = req.auth();
    await Address.create({ ...address, userId });

    res.json({ success: true, message: "Address created successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};

// Get address for user [get '/']
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.auth();
    const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

    res.json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.json({ success: true, message: error.message });
  }
};
