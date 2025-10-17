import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const CartTotal = () => {
  const {
    navigate,
    currency,
    method,
    setMethod,
    delivery_charges,
    getCartCount,
    getCartAmount,
    user,
    cartItems,
    setCartItems,
    products,
    axios,
    getToken,
  } = useAppContext();

  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const getAddress = async () => {
    try {
      const { data } = await axios.get("/api/addresses", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }
      let orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === itemId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      // Convert orderitems to items array for backend
      let items = orderItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        size: item.size,
      }));

      // Place order using COD
      if (method === "COD") {
        const { data } = await axios.post(
          "/api/orders/cod",
          { items, address: selectedAddress._id },
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          }
        );

        if (data.success) {
          setCartItems({}); // clear the cart after the cod order completion
          navigate("/my-orders");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          "/api/orders/stripe",
          { items, address: selectedAddress._id },
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          }
        );

        if (data.success) {
          window.location.replace(data.url)
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if(user) {
      getAddress()
    }
  }, [user])

  return (
    <div>
      <h3>
        Order Details
        <span className="text-lg font-bold text-solid">
          ({getCartCount()}) Items
        </span>
      </h3>
      <hr className="border-gray-300 my-5" />
      {/* Payment & Addresses */}
      <div className="mb-5">
        <div className="my-5">
          <h4 className="mb-5">Where to ship your order?</h4>
          <div className="relative flex justify-between items-start mt-2">
            <p>
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-solid text-sm font-medium hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-10 py-1 bg-white ring-1 ring-slate-900/10 text-sm w-full">
                {addresses.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="p-2 cursor-pointer hover:bg-gray-100 text-sm font-medium"
                  >
                    {address.street}, {address.city}, {address.state},{" "}
                    {address.country}
                  </p>
                ))}
                <p
                  onClick={() => {
                    navigate("/address-form");
                    scrollTo(0, 0);
                  }}
                  className="p-2 text-center cursor-pointer hover:bg-tertiary hover:text-white"
                >
                  Add Address
                </p>
              </div>
            )}
          </div>
        </div>
        <hr className="border-gray-300 mt-5" />
        <div className="my-6">
          <h4 className="mb-5">Payment Method</h4>
          <div className="flex gap-3">
            <div
              onClick={() => setMethod("COD")}
              className={`${
                method === "COD" ? "btn-solid" : "btn-light"
              } !py-1 text-xs cursor-pointer`}
            >
              Cash On Delivery
            </div>
            <div
              onClick={() => setMethod("stripe")}
              className={`${
                method === "stripe" ? "btn-solid" : "btn-light"
              } !py-1 text-xs cursor-pointer`}
            >
              Stripe
            </div>
          </div>
        </div>
        <hr className="border-gray-300 mt-5" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <h5>Price</h5>
          <p className="font-bold">
            {currency}
            {getCartAmount()}
          </p>
        </div>
        <div className="flex justify-between">
          <h5>Shipping Fee</h5>
          <p className="font-bold">
            {currency}
            {getCartAmount() === 0 ? "0.00" : `${delivery_charges}.00`}
          </p>
        </div>
        <div className="flex justify-between">
          <h5>Tax (2%)</h5>
          <p className="font-bold">
            {currency}
            {(getCartAmount() * 2) / 100}
          </p>
        </div>
        <div className="flex justify-between text-lg font-medium mt-3">
          <h4>Total Amount:</h4>
          <p className="text-lg font-bold">
            {currency}
            {getCartAmount() === 0
              ? "0.00"
              : getCartAmount() +
                delivery_charges +
                (getCartAmount() * 2) / 100}
          </p>
        </div>
      </div>
      <button onClick={placeOrder} className="btn-solid w-full mt-8 !rounded-md py-2">
        Proceed to Order
      </button>
    </div>
  );
};

export default CartTotal;
