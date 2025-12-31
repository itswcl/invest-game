"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface PortfolioContextType {
  holdings: Record<string, number>;
  getShares: (ticker: string) => number;
  updateShares: (ticker: string, shares: number) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [holdings, setHoldings] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("gemini_portfolio");
      if (stored) {
        setHoldings(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load portfolio:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever holdings change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("gemini_portfolio", JSON.stringify(holdings));
    }
  }, [holdings, isLoaded]);

  const getShares = (ticker: string) => {
    return holdings[ticker.toUpperCase()] || 0;
  };

  const updateShares = (ticker: string, shares: number) => {
    setHoldings((prev) => ({
      ...prev,
      [ticker.toUpperCase()]: shares,
    }));
  };

  return (
    <PortfolioContext.Provider value={{ holdings, getShares, updateShares }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
