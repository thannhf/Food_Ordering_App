import React from "react";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Processing = () => {
  const { navigate } = useAppContext();
  const { nextUrl } = useParams();

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 7000);
    }
  }, []);

  return (
    <div className="flexCenter h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-solid" />
    </div>
  );
};

export default Processing;
