import React, { useEffect, useState } from "react";

export default function MarketStats() {
  const [marketData, setMarketData] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global");
        const data = await response.json();
        setMarketData(data.data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval);
  }, []);

  if (!marketData) {
    return <div className="bg-gray-900 text-white p-3 border-b">Loading...</div>;
  }

  const { 
    active_cryptocurrencies, 
    markets, 
    total_market_cap, 
    total_volume, 
    market_cap_change_percentage_24h_usd,
    market_cap_percentage 
  } = marketData;

  const btcDominance = market_cap_percentage.btc.toFixed(1);
  const volumeChangePercentage = total_volume.usd_24h_change; // Corrected value

  return (
    <div className="bg-gray-900 text-white p-3 border-b">
      <div className="flex flex-row text-sm justify-between">
        <div className="flex flex-col md:flex-row w-8/12 flex-wrap justify-center md:items-center lg:justify-start gap-2 md:gap-3">
          <div>
            <span className="text-gray-400">Cryptos:</span>
            <span className="ml-1 text-yellow-500">{active_cryptocurrencies}</span>
          </div>

          <div>
            <span className="text-gray-400">Exchanges:</span>
            <span className="ml-1 text-yellow-500">{markets}</span>
          </div>

          <div>
            <span className="text-gray-400">Market Cap:</span>
            <span className="ml-1 text-yellow-500">${(total_market_cap.usd / 1e12).toFixed(2)}T</span>
            <span className={`mx-2 ${market_cap_change_percentage_24h_usd < 0 ? "text-red-500" : "text-green-500"}`}>
              <i className={`fa-solid ${market_cap_change_percentage_24h_usd < 0 ? "fa-caret-down mx-1" : "fa-caret-up mx-1"}`}></i>
              {Math.abs(market_cap_change_percentage_24h_usd).toFixed(2)}%
            </span>
          </div>

          <div>
            <span className="text-gray-400">24h Volume:</span>
            <span className="ml-1 text-yellow-500">${(total_volume.usd / 1e9).toFixed(1)}B</span>
            <span className={`mx-2 ${volumeChangePercentage < 0 ? "text-red-500" : "text-green-500"}`}> 
            </span>
          </div>

          <div>
            <span className="text-gray-400">Dominance:</span>
            <span className="ml-1 text-yellow-500">{btcDominance}%</span>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="bg-gray-600 text-white px-1 py-2 rounded-md text-xs cursor-pointer max-h-[30px] flex items-center hover:bg-gray-500">
            Get listed
            <i className="fa-solid fa-caret-down ml-2"></i>
          </span>
          <span className="bg-gray-600 text-white px-1 md:px-3 py-2 rounded-md text-xs cursor-pointer max-h-[30px] flex items-center hover:bg-gray-500">
            API
          </span>
        </div>
      </div>
    </div>
  );
}
