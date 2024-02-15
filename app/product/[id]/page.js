'use client'
import { useEffect, useState } from 'react';
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
          const parsedData = JSON.parse(cachedData);
          setStockData(parsedData);
          return;
        }
        const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${id}&apikey=${process.env.API_KEY}`);
        const data = await response.json();
        localStorage.setItem(id, JSON.stringify(data));
        setStockData(data);
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
    Symbol,
    AssetType,
    Name,
    Description,
    Exchange,
    Country,
    Sector,
    Industry,
    Address,
    FiscalYearEnd,
    LatestQuarter,
    MarketCapitalization,
    EBITDA,
    PERatio,
    QuarterlyEarningsGrowthYOY,
    QuarterlyRevenueGrowthYOY,
    AnalystTargetPrice,
    _52WeekHigh,
    _52WeekLow,
    _50DayMovingAverage,
  } = stockData;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link href="/">
          <div className="text-blue-500 hover:underline">Back to Home</div>
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-4">{Name} ({Symbol})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ChartComponent />
        </div>
        <div>
          <p className="text-lg text-gray-700">{Description}</p>
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl text-gray-800 font-bold mb-4">Stock Details</h2>
            <p className="text-lg text-gray-800">
              Asset Type: {AssetType}
            </p>
            <p className="text-lg text-gray-800">
              Exchange: {Exchange}
            </p>
            <p className="text-lg text-gray-800">
              Country: {Country}
            </p>
            <p className="text-lg text-gray-800">
              Sector: {Sector}
            </p>
            <p className="text-lg text-gray-800">
              Industry: {Industry}
            </p>
            <p className="text-lg text-gray-800">
              Address: {Address}
            </p>
            <p className="text-lg text-gray-800">
              Fiscal Year End: {FiscalYearEnd}
            </p>
            <p className="text-lg text-gray-800">
              Latest Quarter: {LatestQuarter}
            </p>
            <p className="text-lg text-gray-800">
              Market Capitalization: {MarketCapitalization}
            </p>
            <p className="text-lg text-gray-800">
              EBITDA: {EBITDA}
            </p>
            <p className="text-lg text-gray-800">
              PE Ratio: {PERatio}
            </p>
            <p className="text-lg text-gray-800">
              Quarterly Earnings Growth: {QuarterlyEarningsGrowthYOY}
            </p>
            <p className="text-lg text-gray-800">
              Quarterly Revenue Growth: {QuarterlyRevenueGrowthYOY}
            </p>
            <p className="text-lg text-gray-800">
              Analyst Target Price: {AnalystTargetPrice}
            </p>
            <p className="text-lg text-gray-800">
              52 week high: {_52WeekHigh}
            </p>
            <p className="text-lg text-gray-800">
              52 week low: {_52WeekLow}
            </p>
            <p className="text-lg text-gray-800">
              50 day moving average: {_50DayMovingAverage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
