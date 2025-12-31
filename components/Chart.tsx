"use client";

import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  YAxis,
  XAxis 
} from "recharts";

interface ChartProps {
  data: { time: string; price: number }[];
}

export function Chart({ data }: ChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center text-zinc-500">
        No chart data available
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            hide 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            domain={["dataMin - 1", "dataMax + 1"]} 
            hide 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-xl border border-border bg-card p-3 shadow-xl">
                    <p className="text-sm font-semibold text-foreground">
                      ${Number(payload[0].value).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payload[0].payload.time}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#22c55e"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
