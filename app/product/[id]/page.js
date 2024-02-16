'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ChartComponent from './Chart';

const ProductPage = ({ params }) => {
  const [stockData, setStockData] = useState(null);
  const id = params.id;

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const cachedData = localStorage.getItem(id);

        if (cachedData) {
          const { timestamp, data } = JSON.parse(cachedData);
          const currentTime = new Date().getTime();
          if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
            console.log('Using cached data for:', id);
            setStockData(data);
            return;
          }
        }

        let response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${id}&apikey=${process.env.API_KEY}`);
        response = await response.json();
        console.log(response);

        localStorage.setItem(id, JSON.stringify({ timestamp: new Date().getTime(), data: response }));
        setStockData(response);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    if (id) {
      fetchStockData();
    }
  }, [id]);

  if (!stockData) {
    return <div>Loading...</div>;
  }

  const {
    Symbol = 'N/A',
    AssetType = 'N/A',
    Name = 'N/A',
    Description = 'N/A',
    Exchange = 'N/A',
    Country = 'N/A',
    Sector = 'N/A',
    Industry = 'N/A',
    Address = 'N/A',
    FiscalYearEnd = 'N/A',
    LatestQuarter = 'N/A',
    MarketCapitalization = 'N/A',
    EBITDA = 'N/A',
    PERatio = 'N/A',
    QuarterlyEarningsGrowthYOY = 'N/A',
    QuarterlyRevenueGrowthYOY = 'N/A',
    AnalystTargetPrice = 'N/A',
    _52WeekHigh = 'N/A',
    _52WeekLow = 'N/A',
    _50DayMovingAverage = 'N/A',
  } = stockData;

  return (
    <div className="container mx-auto p-4 lg:max-w-screen-lg xl:max-w-screen-xl">
      <div className="mb-4">
        <Link href="/">
          <div className="text-blue-500 hover:underline">Back to Home</div>
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-4">{Name} ({Symbol})</h1>
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white">
          <ChartComponent />
        </div>
        <div>
          <p className="text-lg text-gray-700">{Description}</p>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Stock Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-800">
              <div className="mb-4">
                <p className="text-lg font-bold">Asset Type</p>
                <p className="text-xl">{AssetType}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">Exchange</p>
                <p className="text-xl">{Exchange}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">Country</p>
                <p className="text-xl">{Country}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">Sector</p>
                <p className="text-xl">{Sector}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">Industry</p>
                <p className="text-xl">{Industry}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">Address</p>
                <p className="text-xl">{Address}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">Fiscal Year End</p>
                <p className="text-xl">{FiscalYearEnd}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">Latest Quarter</p>
                <p className="text-xl">{LatestQuarter}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">Market Capitalization</p>
                <p className="text-xl">{MarketCapitalization}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">EBITDA</p>
                <p className="text-xl">{EBITDA}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">PE Ratio</p>
                <p className="text-xl">{PERatio}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">Quarterly Earnings Growth</p>
                <p className="text-xl">{QuarterlyEarningsGrowthYOY}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">Quarterly Revenue Growth</p>
                <p className="text-xl">{QuarterlyRevenueGrowthYOY}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">Analyst Target Price</p>
                <p className="text-xl">{AnalystTargetPrice}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">52 Week High</p>
                <p className="text-xl">{_52WeekHigh}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">52 Week Low</p>
                <p className="text-xl">{_52WeekLow}</p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-bold">50 Day Moving Average</p>
                <p className="text-xl">{_50DayMovingAverage}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductPage;
