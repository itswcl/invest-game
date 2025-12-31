import { ExternalLink, Clock } from "lucide-react";

const news = [
  {
    id: 1,
    title: "Apple Vision Pro 2: What Rumors Suggest About the Next Headset",
    source: "Bloomberg",
    time: "2h ago",
    image: "https://images.unsplash.com/photo-1621768216002-5ac171876625?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    title: "Tech Stocks Rally as Fed Signals Rate Cuts for 2025",
    source: "CNBC",
    time: "4h ago",
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    title: "Why Apple Services Are the Key to Long-Term Growth",
    source: "The Verge",
    time: "6h ago",
    image: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    title: "Market Analysis: Top 5 Stocks to Watch This Week",
    source: "Reuters",
    time: "8h ago",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=600",
  },
];

export function NewsFeed() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <h3 className="text-xl font-bold text-white">Latest News</h3>
         <button className="text-sm font-medium text-green-500 hover:text-green-400">View All</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {news.map((item) => (
          <div 
            key={item.id} 
            className="group flex flex-col overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all card-hover cursor-pointer"
          >
            <div className="aspect-video w-full overflow-hidden">
               {/* Use a placeholder div if image fails or for better perf in demo, but here we use img tag */}
               <img 
                 src={item.image} 
                 alt={item.title} 
                 className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
               />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-2">
                <span className="text-zinc-300">{item.source}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </span>
              </div>
              <h4 className="flex-1 text-sm font-semibold text-zinc-100 leading-snug group-hover:text-green-400 transition-colors">
                {item.title}
              </h4>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-zinc-500 group-hover:text-green-500">
                Read more <ExternalLink className="h-3 w-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
