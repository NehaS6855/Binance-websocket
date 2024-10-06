/** @format */

import React from "react";
import styled from "styled-components";

const SelectorContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px;
`;

const Dropdown = styled.select`
  padding: 10px;
  margin: 0 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const CryptoSelector = ({
  selectedSymbol,
  onSymbolChange,
  selectedInterval,
  onIntervalChange,
}) => {
  return (
    <SelectorContainer>
      <Dropdown
        value={selectedSymbol}
        onChange={(e) => onSymbolChange(e.target.value)}
      >
        <option value="">Select Cryptocurrency</option>
        <option value="ethusdt">ETH/USDT</option>
        <option value="bnbusdt">BNB/USDT</option>
        <option value="dotusdt">DOT/USDT</option>
      </Dropdown>
      <Dropdown
        value={selectedInterval}
        onChange={(e) => onIntervalChange(e.target.value)}
      >
        <option value="">Select Time Interval</option>
        <option value="1m">1 Minute</option>
        <option value="3m">3 Minutes</option>
        <option value="5m">5 Minutes</option>
      </Dropdown>
    </SelectorContainer>
  );
};

export default CryptoSelector;
