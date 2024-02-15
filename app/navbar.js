'use client'
import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add your search logic or API call here if needed
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <div className="text-white text-xl font-bold">Stock Handler</div>
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
      </div>
    </nav>
  );
}