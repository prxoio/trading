import React, { useEffect } from 'react';

const TradingViewTickers = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    script.async = true;
    script.type = 'text/javascript';
    script.innerHTML = JSON.stringify({
      "symbols": [
        {
          "proName": "FOREXCOM:SPXUSD",
          "title": "S&P 500"
        },
        {
          "proName": "BITSTAMP:BTCUSD",
          "title": "Bitcoin"
        },
        {
          "description": "Apple",
          "proName": "NASDAQ:AAPL"
        },
        {
          "description": "Google",
          "proName": "NASDAQ:GOOG"
        },
        {
          "description": "Solana",
          "proName": "CRYPTO:SOLUSD"
        }
      ],
      "isTransparent": true,
      "showSymbolLogo": true,
      "colorTheme": "dark",
      "locale": "en"
    });

    // Append the script to the document body
    document.body.appendChild(script);

    // Clean up
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener noreferrer" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TradingViewTickers;
