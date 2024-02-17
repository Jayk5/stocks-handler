'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ChartComponent from './Chart';
import { fetchStockData } from '../../../utils/utils';

const ProductPage = ({ params }) => {
  const [stockData, setStockData] = useState(null);
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchStockData(id);
      setStockData(data);
    };
    fetchData();
  }, [id]);

  if (!stockData) {
    return <p className="flex mt-10 items-center text-white justify-center text-gray-700">
      <span className="animate-spin mr-2">&#9696;</span>Loading...
    </p>
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

  const stockDetails = [
    { label: 'Asset Type', key: 'AssetType' },
    { label: 'Exchange', key: 'Exchange' },
    { label: 'Country', key: 'Country' },
    { label: 'Sector', key: 'Sector' },
    { label: 'Industry', key: 'Industry' },
    { label: 'Address', key: 'Address' },
    { label: 'Fiscal Year End', key: 'FiscalYearEnd' },
    { label: 'Latest Quarter', key: 'LatestQuarter' },
    { label: 'Market Capitalization', key: 'MarketCapitalization' },
    { label: 'EBITDA', key: 'EBITDA' },
    { label: 'PE Ratio', key: 'PERatio' },
    { label: 'Quarterly Earnings Growth', key: 'QuarterlyEarningsGrowthYOY' },
    { label: 'Quarterly Revenue Growth', key: 'QuarterlyRevenueGrowthYOY' },
    { label: 'Analyst Target Price', key: 'AnalystTargetPrice' },
    { label: '52 Week High', key: '_52WeekHigh' },
    { label: '52 Week Low', key: '_52WeekLow' },
    { label: '50 Day Moving Average', key: '_50DayMovingAverage' },
  ];

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
              {stockDetails.map(({ label, key }) => (
                <div key={key} className="mb-4">
                  <p className="text-lg font-bold">{label}</p>
                  <p className="text-xl">{stockData[key] || 'N/A'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
