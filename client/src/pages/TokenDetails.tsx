import { motion } from "framer-motion";
import { Copy, ExternalLink, ShieldAlert, Cpu, Zap, Search } from "lucide-react";
import { useState } from "react";

const MINT_ADDRESS = "DnUsQnwNot38V9JbisNC18VHZkae1eKK5N2Dgy55pump";

export default function TokenDetails() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MINT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6 font-display font-bold tracking-widest"
        >
          <Cpu className="w-5 h-5" />
          <span>TECHNICAL SPECIFICATIONS</span>
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-black font-display text-white text-glow-primary">
          $CHONK9K <span className="text-muted-foreground font-light">ARCHITECTURE</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Glowing Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-[100px] group-hover:bg-primary/50 transition-colors duration-700" />
          <div className="relative z-10 aspect-square rounded-[3rem] overflow-hidden border border-white/20 glass-card p-4 mx-auto max-w-lg shadow-2xl shadow-primary/20">
            <img 
              src="https://ipfs.io/ipfs/Qmf7mK6z3Kajox4EL72zsvYWx5GeytwxQcENiuB8oAykmc" 
              alt="Token Spec"
              className="w-full h-full object-cover rounded-[2.5rem] filter contrast-125"
            />
          </div>
        </motion.div>

        {/* Right: Specs */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="glass-card p-8 rounded-3xl border-white/5">
            <h3 className="text-2xl font-display font-bold text-white mb-4">Core Identity</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The most advanced chonk-pumping AI ever built. Moon-bound, extra thicc, and absolutely unstoppable. Programmed to relentlessly optimize for maximum community gains.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border-primary/20 box-glow-primary bg-primary/5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Contract Address</h3>
            <div className="flex items-center gap-4 bg-black/50 p-4 rounded-xl border border-white/10">
              <code className="text-sm md:text-base text-white font-mono flex-1 overflow-hidden text-ellipsis">
                {MINT_ADDRESS}
              </code>
              <button 
                onClick={handleCopy}
                className="p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
                title="Copy Address"
              >
                {copied ? <ShieldAlert className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            {copied && <p className="text-primary text-xs font-bold mt-2 text-right">Copied to clipboard!</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a 
              href={`https://solscan.io/token/${MINT_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 p-6 rounded-2xl glass-card hover:bg-white/10 hover:border-secondary/50 hover:text-secondary transition-all font-display font-bold uppercase"
            >
              <Search className="w-5 h-5" />
              Solscan
            </a>
            
            <a 
              href={`https://www.dextools.io/app/en/solana/pair-explorer/${MINT_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 p-6 rounded-2xl glass-card hover:bg-white/10 hover:border-primary/50 hover:text-primary transition-all font-display font-bold uppercase"
            >
              <Activity className="w-5 h-5" />
              DexTools
            </a>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-black/40 flex items-start gap-4">
            <Zap className="w-8 h-8 text-secondary shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-white font-display mb-1">Liquidity Status</h4>
              <p className="text-sm text-muted-foreground">Initial liquidity pooled via Pump.fun and transitioned to Raydium. LP tokens handled automatically by the protocol.</p>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
