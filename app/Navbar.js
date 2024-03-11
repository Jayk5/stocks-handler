"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchSearchData } from "../utils/utils";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleClickOutside = (e) => {
    const searchInput = document.getElementById("search-input");
    if (searchInput && !searchInput.contains(e.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    clearTimeout(debounceTimer);
    const timer = setTimeout(async () => {
      const results = await fetchSearchData(query);
      if (results.length > 0) {
        setSearchResults(results);
      }
    }, 2000);
    setDebounceTimer(timer);
  };

  return (
    <nav className="bg-gray-800 p-4 relative">
      <div className="container mx-auto flex items-center justify-between relative">
        <Link href="/">
          <div className="text-white text-xl font-bold cursor-pointer">Stocks Handler</div>
        </Link>

        <div className="flex items-center relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-2 py-1 mr-2 rounded-md bg-gray-700 text-white sm:w-64 md:w-80 lg:w-96 xl:w-96"
            id="search-input"
          />

          {searchResults.length > 0 && (
            <div
              className="absolute mt-10 p-2 rounded-md shadow-md bg-white text-gray-800"
              style={{ top: "100%", left: "0", width: "100%", zIndex: 1000 }}
            >
              {searchResults.map((result) => (
                <Link href={`/product/${result["1. symbol"]}`} key={result["1. symbol"]}>
                  <div className="cursor-pointer py-2 px-4 border-b border-gray-300">
                    {result["2. name"]} ({result["1. symbol"]})
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
