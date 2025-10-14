import React from "react";
import Title from "./Title";
import { assets } from "../assets/data";

const Testimonial = () => {
  return (
    <section className="max-padd-container py-22 xl:py-28">
      <Title title1={"What"} title2={"People Says"} titleStyles={"pb-10"} />
      {/* Container */}
      <div className="flex flex-wrap gap-12 items-center justify-center pt-14">
        <div className="text-sm max-w-[411px] pb-6 rounded-lg bg-[#edbdcd]">
          <div className="flex flex-col items-center px-5 py-4 border-b border-slate-900/10 relative">
            <img
              className="h-24 w-24 absolute -top-14 rounded-full"
              src={assets.user1}
              alt="userImage1"
            />
            <div className="pt-8 text-center">
              <h4>
                Donald Jackman
              </h4>
              <p>Content Creator</p>
            </div>
          </div>
          <p className="text-black mt-5 px-6 text-center">
            I've been using imagify for nearly two years, primarily for
            Instagram, and it has been incredibly user-friendly, making my work
            much easier.
          </p>
          <div className="flex justify-center pt-4">
            <div className="flex gap-0.5">
              <img src={assets.starBlack} alt="" width={16} />{" "}
              <img src={assets.starBlack} alt="" width={16} />{" "}
              <img src={assets.starBlack} alt="" width={16} />{" "}
              <img src={assets.starBlack} alt="" width={16} />{" "}
              <img src={assets.starBlack} alt="" width={16} />
            </div>
          </div>
          <a href="#" className="text-black underline px-5">Read more</a>
        </div>

        <div className="text-sm max-w-sm pb-6 rounded-lg bg-[#cebfab]">
          <div className="flex flex-col items-center px-5 py-4 border-b border-slate-900/10 relative">
            <img
              className="h-24 w-24 absolute -top-14 rounded-full"
              src={assets.user2}
              alt="userImage2"
            />
            <div className="pt-8 text-center">
              <h4>
                Richard Nelson
              </h4>
              <p>Instagram Influencer</p>
            </div>
          </div>
          <p className="text-black mt-5 px-6 text-center">
            I've been using imagify for nearly two years, primarily for
            Instagram, and it has been incredibly user-friendly, making my work
            much easier.
          </p>
          <div className="flex justify-center pt-4">
            <div className="flex gap-0.5">
              <img src={assets.starBlack} alt="" width={16} />{" "}
              <img src={assets.starBlack} alt="" width={16} />{" "}
              <img src={assets.starBlack} alt="" width={16} />{" "}
              <img src={assets.starBlack} alt="" width={16} />{" "}
              <img src={assets.starBlack} alt="" width={16} />
            </div>
          </div>
          <a href="#" className="text-black underline px-5">Read more</a>
        </div>

        <div className="text-sm max-w-sm pb-6 rounded-lg bg-[#aed6ff]">
          <div className="flex flex-col items-center px-5 py-4 border-b border-slate-900/10 relative">
            <img
              className="h-24 w-24 absolute -top-14 rounded-full"
              src={assets.user3}
              alt="userImage3"
            />
            <div className="pt-8 text-center">
              <h4>
                James Washington
              </h4>
              <p>Marketing Manager</p>
            </div>
          </div>
          <p className="text-black mt-5 px-6 text-center">
            I've been using imagify for nearly two years, primarily for
            Instagram, and it has been incredibly user-friendly, making my work
            much easier.
          </p>
          <div className="flex justify-center pt-4">
            <div className="flex gap-0.5">
              <img src={assets.starBlack} alt="" width={16} />{" "}
              <img src={assets.starBlack} alt="" width={16} />{" "}
              <img src={assets.starBlack} alt="" width={16} />{" "}
              <img src={assets.starBlack} alt="" width={16} />{" "}
              <img src={assets.starBlack} alt="" width={16} />
            </div>
          </div>
          <a href="#" className="text-black underline px-5">Read more</a>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
