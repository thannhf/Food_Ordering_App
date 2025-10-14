import React, { useEffect, useState } from "react";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const AddressForm = () => {
  const { navigate, user } = useAppContext();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddress((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="max-padd-container py-16 pt-28 bg-primary">
      {/* Container */}
      <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
        {/* Left Side */}
        <form className="flex flex-[2] flex-col gap-3 text-[95%]">
          <Title
            title1={"Delivery"}
            title2={"Information"}
            titleStyles={"pb-5"}
          />
          <div className="flex gap-3">
            <input
              onChange={onChangeHandler}
              value={address.firstName}
              name="firstName"
              type="text"
              placeholder="First Name"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
            />

            <input
              onChange={onChangeHandler}
              value={address.lastName}
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
            />
          </div>

          <input
            onChange={onChangeHandler}
            value={address.email}
            name="email"
            type="email"
            placeholder="Email"
            className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none"
          />
          <input
            onChange={onChangeHandler}
            value={address.phone}
            name="phone"
            type="text"
            placeholder="Phone"
            className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none"
          />
          <input
            onChange={onChangeHandler}
            value={address.street}
            name="street"
            type="text"
            placeholder="Street"
            className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none"
          />

          <div className="flex gap-3">
            <input
              onChange={onChangeHandler}
              value={address.city}
              name="city"
              type="text"
              placeholder="City"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
            />

            <input
              onChange={onChangeHandler}
              value={address.state}
              name="state"
              type="text"
              placeholder="State"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
            />
          </div>

          <div className="flex gap-3">
            <input
              onChange={onChangeHandler}
              value={address.zipcode}
              name="zipcode"
              type="text"
              placeholder="Zipcode"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
            />

            <input
              onChange={onChangeHandler}
              value={address.country}
              name="country"
              type="text"
              placeholder="Country"
              className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-white outline-none w-1/2"
            />
          </div>
          <button type="submit" className="btn-solid rounded-md w-1/2 mt-2">
            Add Address
          </button>
        </form>
        {/* Right Side */}
        <div className="flex flex-1 flex-col">
          <div className="max-w-[379px] w-full bg-white p-5 py-10 max-md:mt-16 rounded-xl">
            <CartTotal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
