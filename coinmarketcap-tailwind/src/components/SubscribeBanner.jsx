import React from "react";
import cryptoImage from "../assets/bitcoin.jpg";

const SubscribeBanner = () => {
  return (
    <div className="subscribe-banner mt-15  flex flex-col md:flex-row items-center  bg-black text-white p-4 md:px-10  ">
      <div className="w-full md:w-1/2 text-center  md:text-left py-10 px-3">
        <h1 className="text-3xl font-bold mb-3">
          Stay on top of crypto. All the time, any time.
        </h1>
        <p className="mb-3 py-2 pb-8">
          Please keep me updated by email with the latest crypto news, research
          findings, reward programs, event updates, coin listings, and more
          information from CoinMarketCap.
        </p>
        <div className="mt-5 flex flex-col md:flex-row justify-center md:justify-start gap-2 focus:">
          <input
            type="email"
            placeholder="Enter your e-mail address"
            className="w-full md:w-3/4 p-2 border text-black border-gray-300 rounded bg-[rgb(249,250,230)] hover:bg-[rgb(247,249,138)] focus:outline-none focus:bg-[rgb(247,249,138)]"
          />
          <button className="mt-2 md:mt-0 w-full md:w-1/4 cursor-pointer bg-yellow-500 text-black p-2 rounded hover:bg-yellow-600">
            Subscribe
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 mt-4 md:mt-0 flex justify-center">
        <img
          src={cryptoImage}
          alt="Crypto Illustration"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SubscribeBanner;
