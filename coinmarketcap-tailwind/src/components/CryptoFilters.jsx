import React from "react";

export default function CryptoFilters({ activeFilter, setActiveFilter, subFilter, setSubFilter }) {
  const mainFilters = [
    "All Crypto",
    "NFTs",
    "Categories",
    "Token Unlocks",
    "Rehypo",
    "Memes",
    "SOL",
    "DOT",
    "BNB",
    "USA",
  ];
  const subFilters = ["Top", "Trending", "New", "Gainers", "Most Visited"];

  return (
    <div className="container mx-auto text-slate-300 px-4 mt-10 xl:px-20">
      <div className="flex gap-3 px-3 py-2 border-b overflow-auto">
        {mainFilters.map((filter, index) => (
          <button
            key={index}
            className={`cursor-pointer hover:bg-yellow-400 hover:text-black  min-w-fit text-md px-3 py-1 ${activeFilter === filter ? "bg-yellow-500 text-black" : "bg-transparent border border-gray-400"} rounded-full`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex gap-3 px-3 py-2  border-b overflow-auto items-center">
        {subFilters.map((filter, index) => (
          <button
            key={index}
            className={`cursor-pointer hover:bg-yellow-400 hover:text-black min-w-fit text-md px-3 py-1 ${subFilter === filter ? "bg-yellow-500 text-black" : "bg-transparent border border-gray-400"} rounded-full`}
            onClick={() => setSubFilter(filter)}
          >
            {filter}
          </button>
        ))}

        <div className="ml-auto flex gap-2">
          <button className="bg-slate-800  border border-gray-400 text-md px-3 py-1 rounded items-center hidden hover:bg-slate-500 cursor-pointer md:flex ">
            <i className="fa-solid fa-filter mr-1"></i> Filters
          </button>
          <button className="bg-slate-800  border border-gray-400 text-md px-3 py-1 rounded items-center hidden hover:bg-slate-500 cursor-pointer md:flex ">
            <i className="fa-solid fa-table-columns mr-1"></i> Columns
          </button>
        </div>
      </div>
 
      <div className="mt-3 mx-2 flex gap-2 md:hidden ml-auto">
        <button className="bg-slate-800 hover:bg-slate-500  cursor-pointer w-1/2 border border-gray-400 text-md px-3 rounded py-2 flex items-center justify-center">
          <i className="fa-solid fa-filter mr-1"></i> Filters
        </button>
        <button className="bg-slate-800 hover:bg-slate-500 cursor-pointer w-1/2 border border-gray-400 text-md px-3 rounded py-2 flex items-center justify-center">
          <i className="fa-solid fa-table-columns mr-1"></i> Columns
        </button>
      </div>
    </div>
  );
}
