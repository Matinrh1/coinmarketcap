import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-white border-opacity-30">
    <nav className="bg-gray-900  px-4 py-3 flex items-center">
      <div className="flex items-center">
        <i className="fas fa-coins text-yellow-500 text-2xl mr-2"></i>
        <a className="text-white text-xl font-semibold" href="#">
          CoinMarketCap
        </a>
      </div>

      <div className="md:hidden ml-auto pb-[1px]">
        <i className="fas fa-search text-white opacity-50 cursor-pointer"></i>
      </div>
      <div className="hidden lg:flex items-center mr-auto ml-3">
        <ul className="flex space-x-4">
          <li><a className="text-gray-400 hover:text-yellow-400" href="#">Cryptocurrencies</a></li>
          <li><a className="text-gray-400 hover:text-yellow-400" href="#">Exchanges</a></li>
          <li><a className="text-gray-400 hover:text-yellow-400" href="#">NFT</a></li>
          <li><a className="text-gray-400 hover:text-yellow-400" href="#">Community</a></li>
        </ul>
      </div>

      <div className="hidden md:flex items-center space-x-4 ml-auto">
        <div className="flex items-center text-white text-sm gap-2">
          <i className="fa fa-pie-chart text-gray-400"></i>
          <a className="hover:text-yellow-400" href="#">Portfolio</a>
        </div>
        <div className="flex items-center text-white text-sm gap-2">
          <i className="fa-solid fa-star text-gray-400"></i>
          <a className="hover:text-yellow-400" href="#">Watchlist</a>
        </div>
      </div>

      <div className="hidden md:block relative ml-6">
        <input
          type="text"
          className="bg-black text-white placeholder-gray-400 border border-gray-600 rounded-full py-1 pl-10 pr-3 w-44 focus:ring-2 outline-none focus:ring-yellow-500"
          placeholder="Search"
        />
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
      </div>

      <button className="hidden md:flex bg-yellow-500 text-black px-4 py-1 rounded-full font-semibold ml-4 cursor-pointer hover:bg-yellow-600">
        Login
      </button>
      <button
        className=" flex lg:hidden bg-yellow-500 text-black px-3 py-1 rounded-lg font-semibold ml-4 cursor-pointer hover:bg-yellow-600"
        onClick={toggleMenu}
      >
        <i className="fas fa-bars text-xl"></i>
      </button>
     
    </nav>
     <div
        className={`${
          isOpen ? "max-h-[500px] opacity-85" : "max-h-0 opacity-0"
        }  w-full bg-gray-900 lg:hidden overflow-hidden transition-all duration-400 ease-in-out`}
      >
        <ul className="flex flex-col space-y-4 p-4">
          <li><a className="text-slate-300 hover:text-yellow-400" href="#">Cryptocurrencies</a></li>
          <li><a className="text-slate-300 hover:text-yellow-400" href="#">Exchanges</a></li>
          <li><a className="text-slate-300 hover:text-yellow-400" href="#">NFT</a></li>
          <li><a className="text-slate-300 hover:text-yellow-400" href="#">Community</a></li>
          <li><a className="text-slate-300 hover:text-yellow-400" href="#">Login</a></li>
        </ul>
      </div>
    </div>
  );
}
