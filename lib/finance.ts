// Mock implementation to ensure stability for demo purposes
// Real Yahoo Finance integration requires handling complex Cookie/Crumb sessions which limits server-side fetching in simple demos.

export interface QuoteData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  name: string;
  marketCap?: number;
  peRatio?: number;
  dividendYield?: number;
  high52?: number;
  low52?: number;
  volume?: number;
}

export interface ChartDataPoint {
  time: string;
  price: number;
}

function getRandomChange() {
  return (Math.random() - 0.45) * 5; // Slight bullish bias
}

export async function getQuote(symbol: string): Promise<QuoteData | null> {
  // Simulate delay
  // await new Promise(resolve => setTimeout(resolve, 500));
  
  const basePrice = symbol === 'TSLA' ? 240 : symbol === 'AAPL' ? 190 : 150;
  const currentPrice = basePrice + (Math.random() * 10 - 5);
  const change = getRandomChange();
  const changePercent = (change / currentPrice) * 100;

  return {
    symbol: symbol.toUpperCase(),
    price: currentPrice,
    change: change,
    changePercent: changePercent,
    name: symbol.toUpperCase() === 'TSLA' ? 'Tesla, Inc.' : symbol.toUpperCase() === 'AAPL' ? 'Apple Inc.' : `${symbol.toUpperCase()} Corp`,
    marketCap: 2000000000000 + Math.random() * 1000000000000,
    peRatio: 25 + Math.random() * 20,
    dividendYield: Math.random() * 2,
    high52: currentPrice * 1.2,
    low52: currentPrice * 0.8,
    volume: 50000000 + Math.random() * 20000000,
  };
}

export async function getChartData(symbol: string, range: '1d' | '1mo' | '1y' = '1d'): Promise<ChartDataPoint[]> {
  const points = range === '1d' ? 78 : 30; // 78 5-min intervals in trading day
  const data: ChartDataPoint[] = [];
  let currentPrice = symbol === 'TSLA' ? 240 : symbol === 'AAPL' ? 190 : 150;

  for (let i = 0; i < points; i++) {
    currentPrice = currentPrice * (1 + (Math.random() - 0.5) * 0.01);
    
    let timeLabel = '';
    if (range === '1d') {
      const date = new Date();
      date.setHours(9, 30 + i * 5, 0); // Start at 9:30 AM
      timeLabel = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
       const date = new Date();
       date.setDate(date.getDate() - (points - i));
       timeLabel = date.toLocaleDateString();
    }

    data.push({
      time: timeLabel,
      price: currentPrice,
    });
  }
  
  return data;
}
