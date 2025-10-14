import React, { useState } from "react";
import { assets } from "../assets/data";
import Navbar from "./Navbar";
import { Link, useLocation } from "react-router-dom";
import {useClerk, UserButton} from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const {openSignIn} = useClerk()
  const {navigate, user, getCartCount} = useAppContext()
  const toggleMenu = () => setMenuOpened((prev) => !prev);
  const isHomePage = useLocation().pathname.endsWith('/')

  const OrdersIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-scroll-text"
    >
      <path d="M15 12h-5" />
      <path d="M15 8h-5" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1 0 4" />
      <path d="M6 17V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v14a4 4 0 1 1-4 4H8a2 2 0 0 1-2-2Z" />
    </svg>

  )

  return (
    <header className={`absolute top-0 left-0 right-0 z-50 py-3 ${!isHomePage && "bg-white"}`}>
      {/* Container */}
      <div className="max-padd-container flexBetween">
        {/* Logo */}
        <div className="flex flex-1">
          <Link to={"/"} className="flex items-end">
            <img src={assets.logoImg} alt="logoImg" className="h-12" />
            <div>
              <span className="hidden sm:block font-extrabold text-3xl relative top-1 left-1">
                Foodie
              </span>
              <span className="hidden sm:block font-extrabold text-xs relative left-1.5 tracking-[10px] uppercase text-solid">
                Fiesta
              </span>
            </div>
          </Link>
        </div>
        {/* Navbar */}
        <div className="flexCenter flex-1">
          <Navbar
            setMenuOpened={setMenuOpened}
            containerStyles={`${
              menuOpened
                ? "flex items-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white shadow-md w-52 ring-1 ring-slate-900/5 z-50"
                : "hidden lg:flex gap-x-5 xl:gap-x-1 medium-15 p-1"
            }`}
          />
        </div>
        {/* Button & Profile */}
        <div className="flex flex-1 items-center sm:justify-end gap-x-4 sm:gap-x-8">
          {/* Menu Toggle */}
          <div className="relative lg:hidden w-7 h-6">
            <img
              onClick={toggleMenu}
              src={assets.menu}
              alt=""
              className={`absolute inset-0 lg:hidden cursor-pointer transition-opacity duration-700 ${
                menuOpened ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              onClick={toggleMenu}
              src={assets.menuClose}
              alt=""
              width={29}
              className={`absolute inset-0 lg:hidden cursor-pointer transition-opacity duration-700 ${
                menuOpened ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
          {/* Cart */}
          <div onClick={()=>navigate('/cart')} className="relative cursor-pointer">
            <img
              src={assets.cartAdded}
              alt=""
              className="min-w-11 bg-white rounded-full p-2"
            />
            <label className="absolute bottom-10 right-1 text-xs font-bold bg-solid text-white flexCenter rounded-full w-9">
              {getCartCount()}
            </label>
          </div>
          {/* UserProfile */}
          <div>
            {user ? (
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "42px",
                      height: "42px",
                    },
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Action 
                    label="My Orders"
                    labelIcon={<OrdersIcon />}
                    onClick={()=>navigate('/my-orders')}
                  />
                </UserButton.MenuItems>
              </UserButton>
            ) : (
              <button onClick={openSignIn} className="btn-solid flexCenter gap-2">
                Login
                <img src={assets.user} alt="" className="invert w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
