import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
// axios.defaults.baseURL = import.meta.env.VITE_API_BACKEND;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const currency = import.meta.env.VITE_CURRENCY;
  const delivery_charges = 10;
  const navigate = useNavigate();
  const { user } = useUser();
  const [cartItems, setCartItems] = useState({});
  const [method, setMethod] = useState("COD");
  const [isOwner, setIsOwner] = useState(false);
  const { getToken } = useAuth();

  // Get the User Profile
  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setIsOwner(data.role === "owner");
        setCartItems(data.cartData || {});
      } else {
        // Retry fetch user details after 5 sec
        setTimeout(() => {
          getUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Add Products to Cart
  const addToCart = async (itemId, size) => {
    if (!size) return toast.error("Please select a size first");
    let cartData = structuredClone(cartItems);
    cartData[itemId] = cartData[itemId] || {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);

    if (user) {
      try {
        const { data } = await axios.post(
          "/api/cart/add",
          { itemId, size },
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          }
        );

        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Get Cart Count
  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        count += cartItems[itemId][size];
      }
    }
    return count;
  };

  // Update cart quantity
  const updateQuantity = async(itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (user) {
      try {
        const { data } = await axios.post(
          "/api/cart/update",
          { itemId, size, quantity },
          {
            headers: { Authorization: `Bearer ${await getToken()}` },
          }
        );

        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // Get Cart Amount
  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        total += product.price[size] * cartItems[itemId][size];
      }
    }
    return total;
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    fetchProducts,
    products,
    currency,
    navigate,
    delivery_charges,
    user,
    searchQuery,
    setSearchQuery,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    method,
    setMethod,
    isOwner,
    setIsOwner,
    axios,
    getToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
