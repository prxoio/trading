"use client"
// TradingViewWidget.jsx
import React, { useEffect, useRef, memo, RefObject } from 'react';

function TradingViewWidget() {
    const container: RefObject<HTMLDivElement> | null = useRef(null);

    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
            {
              "symbols": [
                [
                  "Apple",
                  "AAPL|1M"
                ],
                [
                  "Google",
                  "GOOGL|1M"
                ],
                [
                  "Microsoft",
                  "MSFT|1M"
                ]
              ],
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