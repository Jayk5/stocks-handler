'use client'
import React, { useState, useEffect } from 'react';

import Link from 'next/link';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('gainers');
  const [gainersData, setGainersData] = useState([]);
  const [losersData, setLosersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('stockData');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setGainersData(parsedData.top_gainers);
          setLosersData(parsedData.top_losers);
          return;
        }
        let response = await fetch(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.API_KEY}`);
        response = await response.json();
        localStorage.setItem('stockData', JSON.stringify(response));
        const { top_gainers, top_losers } = response;
        console.log(response)
        setGainersData(top_gainers);
        setLosersData(top_losers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Stock Market Dashboard</h1>

      <div className="flex mb-4">
        <button
          className={`mr-4 px-4 py-2 ${activeTab === 'gainers' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          onClick={() => setActiveTab('gainers')}
        >
          Biggest Gainers
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'losers' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          onClick={() => setActiveTab('losers')}
        >
          Biggest Losers
        </button>
      </div>

      <div>
        {activeTab === 'gainers' ? (
          <div>
            <h2 className="text-2xl font-bold mb-2">Top Gainers</h2>
            <ul>
              {gainersData.map((stock) => (
                <Link href={`/product/${stock.ticker}`}>
                  <li key={stock.ticker} className="mb-2">
                    {stock.ticker}: {stock.change_percentage} ({stock.price})
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-2">Top Losers</h2>
            <ul>
              {losersData.map((stock) => (
                <Link href={`/product/${stock.ticker}`}>
                  <li key={stock.ticker} className="mb-2">
                    {stock.ticker}: {stock.change_percentage} ({stock.price})
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;