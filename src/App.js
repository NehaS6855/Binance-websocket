/** @format */

import React, { useState, useEffect, useRef } from "react";
import CryptoSelector from "./components/CryptoSelector";
import CryptoChart from "./components/CryptoChart";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState("ethusdt");
  const [selectedInterval, setSelectedInterval] = useState("1m");
  const [chartData, setChartData] = useState({ datasets: [] });
  const ws = useRef(null);
  const savedData = useRef({ ethusdt: [], bnbusdt: [], dotusdt: [] });

  useEffect(() => {
    if (ws.current) {
      ws.current.close();
    }

    const streamUrl = `wss://stream.binance.com:9443/ws/${selectedSymbol}@kline_${selectedInterval}`;
    ws.current = new WebSocket(streamUrl);

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const { k: candlestick } = message;

      const newCandle = {
        x: new Date(candlestick.t),
        o: parseFloat(candlestick.o),
        h: parseFloat(candlestick.h),
        l: parseFloat(candlestick.l),
        c: parseFloat(candlestick.c),
      };

      const updatedData = [...savedData.current[selectedSymbol], newCandle];
      if (updatedData.length > 100) {
        updatedData.shift();
      }

      savedData.current[selectedSymbol] = updatedData;

      setChartData({
        datasets: [
          {
            label: `${selectedSymbol.toUpperCase()} Candlestick Data`,
            data: savedData.current[selectedSymbol],
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error observed:", error);
      alert("WebSocket connection error. Please try again.");
    };

    return () => ws.current.close();
  }, [selectedSymbol, selectedInterval]);

  const handleSymbolChange = (symbol) => {
    setSelectedSymbol(symbol);
    if (savedData.current[symbol].length > 0) {
      setChartData({
        datasets: [
          {
            label: `${symbol.toUpperCase()} Candlestick Data`,
            data: savedData.current[symbol],
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  };

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
    setChartData({ datasets: [] });
    savedData.current[selectedSymbol] = [];
  };

  return (
    <Container>
      <h1>Binance Live Market Data</h1>
      <CryptoSelector
        selectedSymbol={selectedSymbol}
        onSymbolChange={handleSymbolChange}
        selectedInterval={selectedInterval}
        onIntervalChange={handleIntervalChange}
      />
      {chartData.datasets.length > 0 ? (
        <CryptoChart chartData={chartData} />
      ) : (
        <p>No data to display.</p>
      )}
    </Container>
  );
};

export default App;
