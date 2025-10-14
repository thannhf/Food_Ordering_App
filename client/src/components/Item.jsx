import React, { useState } from "react";
import { assets } from "../assets/data";
import { useAppContext } from "../context/AppContext";

const Item = ({ product }) => {
  const [size, setSize] = useState(product.sizes[0]);
  const {currency, addToCart} = useAppContext()

  return (
    <div className="relative mt-24 group">
      {/* Photo */}
      <div className="mx-auto rounded-full absolute left-0 right-0 -top-21 h-[177px] w-[177px]">
        <img
          src={product.images[0]}
          alt="productImg"
          height={177}
          width={177}
          className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 drop-shadow-md"
        />
        <img
          src={product.images[1] ? product.images[1] : product.images[0]}
          alt="productImg"
          height={177}
          width={177}
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 drop-shadow-md"
        />
      </div>
      {/* Info */}
      <div className="rounded-4xl bg-primary pt-20 overflow-hidden">
        {/* Title & Description */}
        <div className="p-3">
          <h4 className="text-lg line-clamp-1 mb-1">{product.title}</h4>
          <div className="flex items-start justify-between pb-1">
            <h5 className="mb-1">{product.category}</h5>
            <div className="flex items-center justify-start gap-x-1 bold-14">
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <h5>5.0</h5>
            </div>
          </div>
          <p className="line-clamp-1">{product.description}</p>
        </div>
        {/* Product Sizes */}
        <div className="flexBetween p-3 pt-0">
          <div className="flex gap-1">
            {product.sizes.map((item, i) => (
              <button
                onClick={() => setSize(item)}
                key={i}
                className={`${
                  item == size ? "btn-light" : "btn-outline"
                } rounded h-6 w-6 p-2 text-xs flexCenter`}
              >
                {item}
              </button>
            ))}
          </div>
          <h4 className="text-solidOne">
            {currency}
            {product.price[size]}
          </h4>
        </div>
        {/* Order Info & Button */}
        <div className="flexBetween rounded-xl pl-5 text-[13px] font-semibold">
          <div className="flexStart gap-5">
            <div className="flex flex-col gap-1 relative bottom-1.5">
              <h5>Prep</h5>
              <p className="text-xs">5m</p>
            </div>
            <hr className="h-8 w-[1px] bg-tertiary/10 border-none" />
            <div className="flex flex-col gap-1 relative bottom-1.5">
              <h5>Cook</h5>
              <p className="text-xs">20m</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <button onClick={() => addToCart(product._id, size)} className="btn-solid rounded p-3">
              <img src={assets.cartAdd} alt="" width={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
