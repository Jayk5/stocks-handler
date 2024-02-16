const fetchStockData = async (id) => {
  try {
    const cachedData = localStorage.getItem(id);
    console.log(id)
    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
        return { data };
      }
    }

    let response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${id}&apikey=${process.env.API_KEY}`);
    response = await response.json();
    // console.log(response)
    localStorage.setItem(id, JSON.stringify({ timestamp: new Date().getTime(), data: response }));
    return { data: response }
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
};

const fetchTopData = async () => {
  try {
    const cachedData = localStorage.getItem('stockData');

    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
        return { gainers: data.top_gainers, losers: data.top_losers }
      }
    }

    let response = await fetch(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.API_KEY}`);
    response = await response.json();
    const { top_gainers, top_losers } = response;
    localStorage.setItem('stockData', JSON.stringify({ timestamp: new Date().getTime(), data: response }));
    return { gainers: top_gainers, losers: top_losers };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export { fetchStockData, fetchTopData };