"use client";

import { TrendingUp, Plus, Wallet, Edit2, Check, X } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { useState } from "react";

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export function StockCard({ symbol, name, price, change, changePercent }: StockCardProps) {
  const isPositive = change >= 0;
  const { getShares, updateShares } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const [sharesInput, setSharesInput] = useState("");
  
  // Initialize local state from context
  const currentShares = getShares(symbol);
  const equity = currentShares * price;

  const handleEditClick = () => {
    setSharesInput(currentShares.toString());
    setIsEditing(true);
  };

  const handleSave = () => {
    const numShares = parseFloat(sharesInput);
    if (!isNaN(numShares) && numShares >= 0) {
      updateShares(symbol, numShares);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-end justify-between mb-6">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-800">
             <span className="text-lg font-bold text-white">{symbol[0]}</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">{symbol}</h2>
            <p className="text-sm text-zinc-400">{name}</p>
          </div>
        </div>

        {/* Portfolio Position */}
        <div className="flex items-center gap-6 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-400">My Position</p>
              <div className="flex items-baseline gap-2">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={sharesInput}
                      onChange={(e) => setSharesInput(e.target.value)}
                      className="w-20 bg-zinc-950 border border-zinc-700 rounded px-2 py-0.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                      autoFocus
                    />
                    <button onClick={handleSave} className="p-1 hover:bg-green-500/20 text-green-500 rounded">
                      <Check className="h-3 w-3" />
                    </button>
                    <button onClick={() => setIsEditing(false)} className="p-1 hover:bg-red-500/20 text-red-500 rounded">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-lg font-semibold text-white">{currentShares} shares</span>
                    <button 
                      onClick={handleEditClick}
                      className="text-zinc-500 hover:text-indigo-400 transition-colors"
                    >
                      <Edit2 className="h-3 w-3" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="h-8 w-px bg-zinc-800 mx-2"></div>
          
          <div>
            <p className="text-xs text-zinc-400">Total Equity</p>
            <p className="text-lg font-semibold text-white">${equity.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="text-right">
         <div className="flex items-center gap-4">
            <div className="text-right">
               <div className="text-3xl font-bold tabular-nums text-white">
                 ${price.toFixed(2)}
               </div>
               <div className={`flex items-center justify-end gap-1 text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
                 {isPositive ? <TrendingUp className="h-4 w-4" /> : null}
                 <span>{isPositive ? "+" : ""}{change.toFixed(2)} ({isPositive ? "+" : ""}{changePercent.toFixed(2)}%) Today</span>
               </div>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-green-400 transition-colors">
               <Plus className="h-4 w-4" />
               Watch
            </button>
         </div>
      </div>
    </div>
  );
}
