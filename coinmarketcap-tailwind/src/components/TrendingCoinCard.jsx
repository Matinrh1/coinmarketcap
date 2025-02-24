import React, { useEffect, useState } from "react";
import axios from "axios";

const CryptoTrending = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [trendingdexscan, setdexscantrending] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [fearGreedData, setFearGreedData] = useState(null);
  const [loading, setLoading] = useState(true);

  const CryptoTrending = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [trendingdexscan, setTrendingDexscan] = useState([]);
  const [marketData, setMarketData] = useState(null);
  const [fearGreedData, setFearGreedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 60000); // Fetch every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchAllData = async () => {
    await fetchTrendingCoins();
    await fetchMarketData();
    await fetchTrendingDexscan();
    await fetchFearGreedIndex();
  };

  const fetchFearGreedIndex = async () => {
    try {
      const response = await axios.get("https://api.alternative.me/fng/");
      setFearGreedData(response.data.data[0]); // Latest index value
    } catch (error) {
      console.error("❌ Error fetching Fear & Greed Index:", error.message);
    }
  };

  const fetchTrendingCoins = async (retryDelay = 30000) => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending",
        { headers: { "Cache-Control": "no-cache" } }
      );
      setTrendingCoins(response.data.coins.slice(0, 5));
    } catch (error) {
      console.error("❌ Error fetching trending coins:", error.message);
      if (error.response?.status === 429) {
        console.warn(`⚠️ Rate limit hit! Retrying in ${retryDelay / 1000} seconds...`);
        setTimeout(() => fetchTrendingCoins(retryDelay * 2), retryDelay); // Exponential backoff
      }
    }
  };

  const fetchTrendingDexscan = async (retryDelay = 30000) => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending",
        { headers: { "Cache-Control": "no-cache" } }
      );
      setTrendingDexscan(response.data.coins.slice(6, 11));
    } catch (error) {
      console.error("❌ Error fetching trending dexscan:", error.message);
      if (error.response?.status === 429) {
        console.warn(`⚠️ Rate limit hit! Retrying in ${retryDelay / 1000} seconds...`);
        setTimeout(() => fetchTrendingDexscan(retryDelay * 2), retryDelay);
      }
    }
  };

  const fetchMarketData = async () => {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/global");
      setMarketData(response.data.data);
    } catch (error) {
      console.error("❌ Error fetching market data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading market data...</p>;
  if (!marketData) return <p>Error loading market data.</p>;

  const getGaugeColor = (value) => {
    if (value <= 25) return "#FF4D4F"; // Extreme Fear (Red)
    if (value <= 45) return "#FFA500"; // Fear (Orange)
    if (value <= 55) return "#FFD700"; // Neutral (Yellow)
    if (value <= 75) return "#7CFC00"; // Greed (Light Green)
    return "#00C853"; // Extreme Greed (Dark Green)
  };


  return (
    <div className="container mx-auto  text-white  my-6 px-4 xl:px-20 ">
      <h2 className="text-2xl font-bold ">
        Today's Cryptocurrency Prices by Market Cap
      </h2>
      <p className="text-gray-400 my-3">
        The global crypto market cap is $
        {marketData.total_market_cap.usd.toLocaleString()}, a{" "}
        <span
          className={
            marketData.market_cap_change_percentage_24h_usd < 0
              ? "text-red-500"
              : "text-green-500"
          }
        >
          <i
            className={
              marketData.market_cap_change_percentage_24h_usd < 0
                ? "fas fa-caret-down px-1 "
                : "fas fa-caret-up px-1"
            }
          ></i>
          {Math.abs(marketData.market_cap_change_percentage_24h_usd).toFixed(2)}
          %
        </span>{" "}
        change over the last day.{" "}
        <a className="cursor-pointer underline">Read More</a>
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Trending Coins */}
        <div className="  hidden md:flex col-span-2">
          <div className="bg-[#222531] p-4 rounded-xl w-1/2">
            <div className="flex justify-between">
              <h5 className="text-lg font-bold">
                Trending Coins{" "}
                <i className="ps-3 fa-solid fa-caret-right cursor-pointer"></i>
              </h5>
              <div>
                <i className="fas fa-fire text-yellow-500 mr-2 cursor-pointer"></i>
                <i className="fas fa-eye text-gray-500 mr-2 cursor-pointer"></i>
                <i className="far fa-clock cursor-pointer"></i>
              </div>
            </div>
            {trendingCoins.map((coin, index) => {
              const price = coin.item.data?.price || 0;
              const priceChange =
                coin.item.data?.price_change_percentage_24h?.usd ?? null;
              const priceChangeFormatted =
                priceChange !== null ? priceChange.toFixed(2) : "N/A";
              const priceChangeClass =
                priceChange !== null && priceChange > 0
                  ? "text-green-500"
                  : "text-red-500";
              const caretIcon =
                priceChange !== null && priceChange > 0
                  ? "fa-caret-up"
                  : "fa-caret-down";

              return (
                <div
                  key={index}
                  className="flex justify-between items-center  py-6 border-b border-gray-700"
                >
                  <div className="flex items-center ">
                    <span>{index + 1}.</span>
                    <img
                      src={coin.item.small}
                      alt={coin.item.name}
                      className="w-5 h-5 mx-2"
                    />
                    <span className="text-sm  xl:text-base">
                      {coin.item.name}
                    </span>
                  </div>
                  <div className=" flex justify-between min-w-1/2">
                    <span className="mr-5  lg:mr-0 2xl:mr-2">
                      ${price.toFixed(3)}
                    </span>
                    <span className={priceChangeClass}>
                      <i className={`fas ${caretIcon} mx-1`}></i>
                      {priceChangeFormatted}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-[#222531] p-4 rounded-xl w-1/2 ml-4">
            <div className="flex justify-between">
              <h5 className="text-lg font-bold ">
                Trending on DexScan
                <i className="ps-3 fa-solid fa-caret-right cursor-pointer"></i>
              </h5>
              <div>
                <i className="fas fa-exchange-alt text-yellow-500 mr-2 cursor-pointer"></i>
                <i className="fas fa-seedling text-gray-500 mr-2 cursor-pointer"></i>
                <i className="fas fa-trophy cursor-pointer"></i>
              </div>
            </div>
            {trendingdexscan.map((coin, index) => {
              const price = coin.item.data?.price || 0;
              const priceChange =
                coin.item.data?.price_change_percentage_24h?.usd ?? null;
              const priceChangeFormatted =
                priceChange !== null ? priceChange.toFixed(2) : "N/A";
              const priceChangeClass =
                priceChange !== null && priceChange > 0
                  ? "text-green-500"
                  : "text-red-500";
              const caretIcon =
                priceChange !== null && priceChange > 0
                  ? "fa-caret-up"
                  : "fa-caret-down";

              return (
                <div
                  key={index}
                  className="flex justify-between items-center py-6 border-b border-gray-700"
                >
                  <div className="flex items-center">
                    <span>{index + 1}.</span>
                    <img
                      src={coin.item.small}
                      alt={coin.item.name}
                      className="w-5 h-5 mx-2"
                    />
                    <span className="text-sm xl:text-base">
                      {coin.item.name}
                    </span>
                  </div>
                  <div className="flex justify-between min-w-1/2  ">
                    <span className="mr-5 text-left  lg:mr-0 2xl:mr-2">
                      ${price.toFixed(3)}
                    </span>
                    <span className={priceChangeClass}>
                      <i className={`fas ${caretIcon} mx-1 `}></i>
                      {priceChangeFormatted}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Market Data */}
        <div className="grid  grid-cols-2 gap-4 pl-4">
          <div className="bg-[#222531] p-4 rounded-xl text-center">
            <h5 className="text-lg font-bold">Market Cap</h5>
            <p className="text-xl font-bold">
              {marketData.total_market_cap?.usd
                ? `$${(marketData.total_market_cap.usd / 1e12).toFixed(2)}T`
                : "N/A"}
            </p>
            {marketData.market_cap_change_percentage_24h_usd !== undefined ? (
              <span
                className={
                  marketData.market_cap_change_percentage_24h_usd >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                <i
                  className={`fas ${
                    marketData.market_cap_change_percentage_24h_usd >= 0
                      ? "fa-caret-up"
                      : "fa-caret-down"
                  }`}
                ></i>{" "}
                {marketData.market_cap_change_percentage_24h_usd.toFixed(2)}%
              </span>
            ) : (
              "N/A"
            )}
          </div>

          <div className="bg-[#222531] p-4 rounded-xl text-center">
            <h5 className="text-lg font-bold">CMC100</h5>
            <p className="text-xl font-bold">
              {marketData.market_cap_percentage?.btc
                ? `$${(marketData.market_cap_percentage.btc * 2).toFixed(2)}`
                : "N/A"}
            </p>
            {marketData.market_cap_change_percentage_24h_usd !== undefined ? (
              <span
                className={
                  marketData.market_cap_change_percentage_24h_usd >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                <i
                  className={`fas ${
                    marketData.market_cap_change_percentage_24h_usd >= 0
                      ? "fa-caret-up"
                      : "fa-caret-down"
                  }`}
                ></i>{" "}
                {(
                  marketData.market_cap_change_percentage_24h_usd * 1.5
                ).toFixed(2)}
                %
              </span>
            ) : (
              "N/A"
            )}
          </div>

          {/* Fear & Greed Index */}
          <div className="bg-[#222531] p-4 rounded-xl text-center flex flex-col items-center">
            <h5 className="text-lg font-bold">Fear & Greed</h5>
            <div className="relative flex justify-center mt-1 lg:mt-6 xl:mt-1 w-full">
              <svg
                width="120"
                height="60"
                viewBox="0 0 120 60"
                className="mx-auto"
              >
                {/* Background Arc */}
                <path
                  d="M10,50 A50,50 0 0,1 110,50"
                  fill="none"
                  stroke="#2A2E35"
                  strokeWidth="10"
                />
                {/* Dynamic Color Arc */}
                <path
                  d="M10,50 A50,50 0 0,1 110,50"
                  fill="none"
                  stroke={getGaugeColor(fearGreedData?.value)}
                  strokeWidth="10"
                  strokeDasharray="158"
                  strokeDashoffset={`${
                    158 - (fearGreedData?.value / 100) * 158 + 5
                  }`}
                />
                {/* Moving Indicator */}
                <circle
                  cx="45"
                  cy="50"
                  r="6"
                  fill={getGaugeColor(fearGreedData?.value)}
                />
                {/* Fear & Greed Value */}
                <text
                  x="65"
                  y="57"
                  textAnchor="middle"
                  fontSize="20"
                  fill="white"
                  fontWeight="bold"
                >
                  {fearGreedData?.value || "N/A"}
                </text>
              </svg>
            </div>
            <p
              className="mt-2"
              style={{ color: getGaugeColor(fearGreedData?.value) }}
            >
              {fearGreedData?.value_classification || "Loading..."}
            </p>
          </div>

          <div className="bg-[#222531] p-4 text-center rounded-xl">
            <h5 className="text-lg font-bold pb-5">Dominance</h5>
            <div className="flex items-center justify-center pb-3">
              <img
                src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                alt="BTC"
                className="w-5 h-5 mr-2"
              />
              <p>
                BTC:{" "}
                {marketData.market_cap_percentage?.btc?.toFixed(2) ||
                  "Loading..."}
                %
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                alt="ETH"
                className="w-5 h-5 mr-2"
              />
              <p>
                ETH:{" "}
                {marketData.market_cap_percentage?.eth?.toFixed(2) ||
                  "Loading..."}
                %
              </p>
            </div>
          </div>

          <div className="bg-[#222531] p-4 rounded-xl text-center col-span-2">
            <h5 className="text-lg font-bold">Ad Section</h5>
            <p>Sponsored content here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTrending;
