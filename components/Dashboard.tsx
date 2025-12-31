"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Chart } from "@/components/Chart";
import { StockCard } from "@/components/StockCard";
import { NewsFeed } from "@/components/NewsFeed";
import { getQuote, getChartData, QuoteData, ChartDataPoint } from "@/lib/finance";

export function Dashboard() {
  const searchParams = useSearchParams();
  const ticker = searchParams.get("ticker");
  const symbol = ticker || "AAPL";
  
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [newQuote, newChartData] = await Promise.all([
        getQuote(symbol),
        getChartData(symbol, "1d"),
      ]);
      setQuote(newQuote);
      setChartData(newChartData);
      setLoading(false);
    }
    fetchData();
  }, [symbol]);

  return (
    <div className="mx-auto max-w-7xl animate-in fade-in duration-500">
      {/* Ticker Header & Price */}
      {loading ? (
         <div className="mb-6 h-32 w-full animate-pulse rounded-xl bg-zinc-900/50"></div>
      ) : quote ? (
        <StockCard 
          symbol={quote.symbol}
          name={quote.name}
          price={quote.price}
          change={quote.change}
          changePercent={quote.changePercent}
        />
      ) : (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
          Ticker "{symbol}" not found in our simplified demo database. Try AAPL, TSLA, MSFT.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 rounded-3xl bg-zinc-900/50 border border-zinc-800 p-6 backdrop-blur-sm relative overflow-hidden group">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -z-10 group-hover:bg-green-500/10 transition-colors"></div>
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-zinc-200">Price History</h3>
              <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800">
                  {['1D', '1W', '1M', '3M', '1Y'].map((period, i) => (
                    <button 
                      key={period}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${i === 0 ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                      {period}
                    </button>
                  ))}
              </div>
            </div>
            {loading ? (
               <div className="h-[400px] w-full flex items-center justify-center text-zinc-500">Loading chart...</div>
            ) : (
               <Chart data={chartData} />
            )}
        </div>

        {/* Stats / Sidebar Widget */}
        <div className="rounded-3xl bg-zinc-900/50 border border-zinc-800 p-6 backdrop-blur-sm flex flex-col gap-6">
            {loading ? (
                <div className="h-full w-full animate-pulse bg-zinc-900/30"></div>
            ) : (
             <>
                <div>
                  <h3 className="font-semibold text-zinc-200 mb-4">Market Stats</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Market Cap", value: quote?.marketCap ? `$${(quote.marketCap / 1e12).toFixed(2)}T` : "-" },
                      { label: "Vol (24h)", value: quote?.volume ? `${(quote.volume / 1e6).toFixed(1)}M` : "-" },
                      { label: "P/E Ratio", value: quote?.peRatio?.toFixed(2) || "-" },
                      { label: "Div Yield", value: quote?.dividendYield ? `${quote.dividendYield.toFixed(2)}%` : "-" },
                      { label: "52W High", value: quote?.high52 ? `$${quote.high52.toFixed(2)}` : "-" },
                      { label: "52W Low", value: quote?.low52 ? `$${quote.low52.toFixed(2)}` : "-" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between border-b border-zinc-800/50 pb-3 last:border-0 last:pb-0">
                          <span className="text-sm text-zinc-400">{stat.label}</span>
                          <span className="text-sm font-medium text-white">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto pt-6 border-t border-zinc-800">
                  <div className="rounded-xl bg-zinc-950 p-4 border border-zinc-800/50">
                      <p className="text-xs text-zinc-400 mb-2">Analyst Rating</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full w-[70%] bg-green-500"></div>
                        </div>
                        <span className="text-sm font-bold text-green-500">Buy</span>
                      </div>
                  </div>
                </div>
             </>
            )}
        </div>
      </div>

      {/* News Feed */}
      <NewsFeed />
    </div>
  );
}
