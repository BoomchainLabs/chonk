import { useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from "recharts";
import { format } from "date-fns";
import { Activity, Droplets, TrendingUp, Users, Wallet } from "lucide-react";
import { useTokenHolders, useTokenStats, useTokenTransfers } from "@/hooks/use-token";

// Mock history data for the chart since typical stats endpoint might not return time series
const MOCK_CHART_DATA = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  price: 0.0003 + (Math.random() * 0.0002) + (i * 0.00001),
}));

export default function Dashboard() {
  const { connected, publicKey } = useWallet();
  const { data: stats, isLoading: statsLoading } = useTokenStats();
  const { data: holders, isLoading: holdersLoading } = useTokenHolders();
  const { data: transfers, isLoading: transfersLoading } = useTokenTransfers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display font-black text-white text-glow-primary uppercase">Command Center</h1>
          <p className="text-muted-foreground mt-2 font-mono">Terminal accessed. Monitoring token telemetry.</p>
        </div>

        {connected ? (
          <div className="glass-card px-6 py-4 rounded-xl border-secondary/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase">Connected Wallet</p>
              <p className="font-mono text-sm font-semibold text-white">
                {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
              </p>
            </div>
          </div>
        ) : (
          <div className="glass-card px-6 py-4 rounded-xl border-destructive/30 flex items-center gap-4 text-destructive">
            <Wallet className="w-6 h-6" />
            <p className="font-display font-bold uppercase text-sm">Wallet Disconnected</p>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Current Price" 
          value={statsLoading ? "..." : `$${Number(stats?.priceUsd || 0).toFixed(6)}`} 
          icon={TrendingUp} 
          color="primary"
          delay={0.1}
        />
        <StatCard 
          title="Fully Diluted Valuation" 
          value={statsLoading ? "..." : `$${(Number(stats?.fdv || 0) / 1000000).toFixed(2)}M`} 
          icon={Activity} 
          color="secondary"
          delay={0.2}
        />
        <StatCard 
          title="Liquidity (USD)" 
          value={statsLoading ? "..." : `$${(Number(stats?.liquidity?.usd || 0) / 1000000).toFixed(2)}M`} 
          icon={Droplets} 
          color="white"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6 border-white/5"
        >
          <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
            <Activity className="text-primary" /> Price Action (24H)
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" tick={{fontSize: 12, fill: 'rgba(255,255,255,0.4)'}} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.4)" tick={{fontSize: 12, fill: 'rgba(255,255,255,0.4)'}} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val.toFixed(4)}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,107,107,0.3)', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Holders */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card rounded-2xl p-6 border-white/5 flex flex-col h-[400px] lg:h-auto"
        >
          <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
            <Users className="text-secondary" /> Top Holders
          </h3>
          
          <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
            {holdersLoading ? (
              <div className="flex items-center justify-center h-full text-primary animate-pulse">Loading data...</div>
            ) : (
              <div className="space-y-4">
                {holders?.map((holder: any, i: number) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-black/20 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-secondary/20 text-secondary flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                      <span className="font-mono text-sm text-white">{holder.address}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{holder.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Transfers (Spans full width below) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-3 glass-card rounded-2xl p-6 border-white/5"
        >
          <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-3">
            <Activity className="text-white" /> Recent Transfers
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-muted-foreground text-xs uppercase tracking-wider font-display">
                  <th className="pb-4 pl-4">Signature</th>
                  <th className="pb-4">From</th>
                  <th className="pb-4">To</th>
                  <th className="pb-4 text-right pr-4">Amount</th>
                  <th className="pb-4 text-right pr-4">Time</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                {transfersLoading ? (
                  <tr><td colSpan={5} className="py-8 text-center text-primary animate-pulse">Fetching transfers...</td></tr>
                ) : (
                  transfers?.map((tx: any, i: number) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 pl-4 text-secondary">{tx.signature}</td>
                      <td className="py-4 text-muted-foreground">{tx.from}</td>
                      <td className="py-4 text-muted-foreground">{tx.to}</td>
                      <td className="py-4 text-right pr-4 font-bold text-primary">+{Number(tx.amount).toLocaleString()}</td>
                      <td className="py-4 text-right pr-4 text-muted-foreground">
                        {format(new Date(tx.time), "HH:mm:ss")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, delay }: { title: string, value: string, icon: any, color: "primary" | "secondary" | "white", delay: number }) {
  const colorMap = {
    primary: "text-primary border-primary/20 bg-primary/5",
    secondary: "text-secondary border-secondary/20 bg-secondary/5",
    white: "text-white border-white/20 bg-white/5"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      className={`p-6 rounded-2xl glass-card border flex items-center gap-6 ${colorMap[color]}`}
    >
      <div className={`p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/5`}>
        <Icon className={`w-8 h-8 ${colorMap[color].split(' ')[0]}`} />
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">{title}</p>
        <p className="text-3xl font-display font-black tracking-tight text-white">{value}</p>
      </div>
    </motion.div>
  );
}
