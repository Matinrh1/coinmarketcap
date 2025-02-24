import CryptoFilters from "./components/CryptoFilters"
import CryptoTable from "./components/CryptoTable"
import Footer from "./components/Footer"
import MarketState from "./components/MarketState"
import Navbar from "./components/Navbar"
import SubscribeBanner from "./components/SubscribeBanner"
import TrendingCoinsCard from "./components/TrendingCoinCard"
import { useState } from "react"

function App() {
  const [activeFilter, setActiveFilter] = useState('All Crypto');
  const [subFilter, setSubFilter] = useState('Top');
  return (
    <>
      <Navbar/>
      <MarketState/>
      <TrendingCoinsCard/>
      <CryptoFilters
        activeFilter={activeFilter}       // Pass activeFilter as prop
        setActiveFilter={setActiveFilter} // Pass setActiveFilter as prop
        subFilter={subFilter}             // Pass subFilter as prop
        setSubFilter={setSubFilter}       // Pass setSubFilter as prop
      />
      <CryptoTable/>
      <SubscribeBanner/>
      <Footer/>
       </>
  )
}

export default App
