'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchTopData } from '../utils/utils';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('gainers');
  const [gainersData, setGainersData] = useState([]);
  const [losersData, setLosersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { gainers, losers } = await fetchTopData();
      setGainersData(gainers);
      setLosersData(losers);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 lg:max-w-screen-lg xl:max-w-screen-xl">
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
        {loading ? (
          <p className="flex items-center text-white justify-center text-gray-700">
            <span className="animate-spin mr-2">&#9696;</span>Loading...
          </p>
        ) : activeTab === 'gainers' ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Top Gainers</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gainersData.map((stock) => (
                <Link href={`/product/${stock.ticker}`} key={stock.ticker}>
                  <li className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <div className="text-black font-bold">{stock.ticker}</div>
                    <div className="text-green-500">Change - {stock.change_percentage}</div>
                    <div className="text-gray-700">Price - {stock.price}</div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Top Losers</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {losersData.map((stock) => (
                <Link href={`/product/${stock.ticker}`} key={stock.ticker}>
                  <li className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                    <div className="text-black font-bold">{stock.ticker}</div>
                    <div className="text-red-500">{stock.change_percentage}</div>
                    <div className="text-gray-700">{stock.price}</div>
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
