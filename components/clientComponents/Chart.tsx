"use client"
// TradingViewWidget.jsx
import React, { useEffect, useRef, memo, RefObject, use } from 'react';

function TradingViewWidget( data: any) {
    const container: RefObject<HTMLDivElement> | null = useRef(null);
useEffect(() => {
    console.log(data)
} , [data])
    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
            {
              "symbols": [["BlackRock","BLK|1M"],["iShares NASDAQ 100 (Acc)","CNX1|1M"],["Shopify","SHOP|1M"],["Invesco CoinShares Global Blockchain (Acc)","BCHN|1M"],["iShares Global Clean Energy (Dist)","INRG|1M"],["iShares Oil & Gas Exploration & Production (Acc)","IOGP|1M"],["Advanced Micro Devices","AMD|1M"],["Adobe","ADBE|1M"],["Microsoft","MSFT|1M"],["Cisco Systems","CSCO|1M"],["Coinbase","COIN|1M"],["NVIDIA","NVDA|1M"],["Vanguard FTSE 250 (Acc)","VMIG|1M"],["Pfizer","PFE|1M"],["Xtrackers MSCI World Energy (Acc)","XDW0|1M"],["Vanguard FTSE 100 (Acc)","VUKG|1M"],["iShares S&P 500 Energy Sector (Acc)","IUES|1M"],["iShares S&P 500 Information Technology Sector (Acc)","QDVE|1M"],["Meta Platforms","META|1M"],["Palantir","PLTR|1M"],["MicroStrategy","MSTR|1M"],["Vanguard FTSE Emerging Markets (Dist)","VFEM|1M"],["Exxon Mobil","XOM|1M"],["BP","BP|1M"],["Vanguard FTSE Emerging Markets (Acc)","VFEG|1M"],["Apple","AAPL|1M"],["Vanguard S&P 500 (Acc)","VUAG|1M"],["Vanguard FTSE All-World (Acc)","VWCE|1M"],["Shell","SHEL|1M"]],
              "chartOnly": false,
              "width": "100%",
              "height": "350",
              "locale": "en",
              "colorTheme": "dark",
              "autosize": true,
              "showVolume": false,
              "showMA": false,
              "hideDateRanges": false,
              "hideMarketStatus": false,
              "hideSymbolLogo": false,
              "scalePosition": "right",
              "scaleMode": "Normal",
              "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
              "fontSize": "10",
              "noTimeScale": false,
              "valuesTracking": "1",
              "changeMode": "price-and-percent",
              "chartType": "area",
              "maLineColor": "#2962FF",
              "maLineWidth": 1,
              "maLength": 9,
              "backgroundColor": "rgba(19, 23, 34, 1)",
              "lineWidth": 2,
              "lineType": 0,
              "dateRanges": [
                "1m|30",
                "3m|60",
                "12m|1D",
                "60m|1W",
                "all|1M"
              ]
            }`;
                if (container && container.current) {
                    // Check if the script already exists
                    const existingScript = container.current.querySelector('script');
                    if (!existingScript) {
                        // Only append the script if it doesn't exist yet
                        container.current.appendChild(script);
                    }
                }
        },
        []
    );

    return (
    <div className="tradingview-widget-container" ref={container}>
    </div>
  );
}

export default memo(TradingViewWidget);