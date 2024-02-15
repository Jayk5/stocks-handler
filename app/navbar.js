'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      let response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.API_KEY}`);
      response = await response.json();

      setSearchResults(response.bestMatches);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="text-white text-xl font-bold cursor-pointer">Stock Handler</div>
        </Link>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-2 py-1 mr-2 rounded-md"
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
            Search
          </button>
        </div>

        {searchResults.length > 0 && (
          <div className="absolute bg-white mt-1 p-2 rounded-md">
            {searchResults.map((result) => (
              <Link href={`/product/${result['1. symbol']}`} key={result['1. symbol']}>
                <div className="cursor-pointer">
                  {result['2. name']} ({result['1. symbol']})
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
