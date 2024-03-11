import { fallBackStockData, fallBackTopData, fallBackSearchData } from "../data/dummyData.js";

const fetchStockData = async (id) => {
  try {
    const cachedData = localStorage.getItem(id);
    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
        return { data };
      }
    }

    let response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${id}&apikey=${process.env.NEXT_PUBLIC_APIKEY}`);
    response = await response.json();
    if (response.Information) {
      response = fallBackStockData;
      return { data: response };
    }
    localStorage.setItem(id, JSON.stringify({ timestamp: new Date().getTime(), data: response }));
    return { data: response };
  } catch (error) {
    console.error("Error fetching stock data:", error);
  }
};

const fetchTopData = async () => {
  try {
    const cachedData = localStorage.getItem("stockData");

    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
        return { gainers: data.top_gainers, losers: data.top_losers };
      }
    }

    let response = await fetch(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.NEXT_PUBLIC_APIKEY}`);
    response = await response.json();
    if (response.Information) {
      response = fallBackTopData;
      return { gainers: response.top_gainers, losers: response.top_losers };
    }
    const { top_gainers, top_losers } = response;
    localStorage.setItem("stockData", JSON.stringify({ timestamp: new Date().getTime(), data: response }));
    return { gainers: top_gainers, losers: top_losers };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchSearchData = async (query) => {
  try {
    const cachedData = localStorage.getItem(`searchData_${query}`);

    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
        return data.bestMatches;
      }
    }

    let response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.NEXT_PUBLIC_APIKEY}`
    );
    response = await response.json();

    if (response.Information) {
      response = fallBackSearchData;
      return response.bestMatches;
    }

    const { bestMatches } = response;
    localStorage.setItem(`searchData_${query}`, JSON.stringify({ timestamp: new Date().getTime(), data: response }));
    return bestMatches;
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
};

export { fetchStockData, fetchTopData, fetchSearchData };
