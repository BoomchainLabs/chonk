import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary/30 text-primary mb-8 font-mono text-sm uppercase tracking-widest box-glow-primary">
                <Terminal className="w-4 h-4" />
                <span>Protocol Initialized</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-6 leading-none">
                MEET <br/>
                <span className="text-primary text-glow-primary inline-block mt-2">CHONKPUMP</span>
                <span className="text-secondary text-glow-secondary inline-block mt-2"> 9000</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                The most advanced chonk-pumping AI ever built on Solana. 
                Programmed for maximum volume, optimal liquidity, and unstoppable momentum.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link 
                  href="/dashboard"
                  className="px-8 py-4 rounded-xl font-display font-bold uppercase tracking-widest bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:bg-primary/90 transition-all hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center"
                >
                  Enter Terminal <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/token"
                  className="px-8 py-4 rounded-xl font-display font-bold uppercase tracking-widest glass-card text-white hover:bg-white/10 hover:border-primary/50 transition-all w-full sm:w-auto justify-center flex"
                >
                  Token Specs
                </Link>
              </div>
            </motion.div>

            {/* Image / Graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
              className="flex-1 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[100px]" />
              <motion.div 
                animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full max-w-md mx-auto aspect-square rounded-[3rem] overflow-hidden border-4 border-primary/50 box-glow-primary p-2 bg-black/50 backdrop-blur-sm"
              >
                <img 
                  src="https://ipfs.io/ipfs/Qmf7mK6z3Kajox4EL72zsvYWx5GeytwxQcENiuB8oAykmc" 
                  alt="CHONKPUMP 9000 Avatar"
                  className="w-full h-full object-cover rounded-[2.5rem]"
                />
                
                {/* Overlay UI elements */}
                <div className="absolute top-6 left-6 glass-card px-4 py-2 rounded-lg text-xs font-mono text-primary font-bold">
                  SYS: ONLINE
                </div>
                <div className="absolute bottom-6 right-6 glass-card px-4 py-2 rounded-lg text-xs font-mono text-secondary font-bold">
                  TARGET: MOON
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DEXTools Embed Section */}
      <section className="py-20 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-black text-white text-glow-primary mb-4">LIVE COMBAT DATA</h2>
            <p className="text-muted-foreground">Monitor the CHONKPUMP algorithmic execution in real-time.</p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full rounded-2xl overflow-hidden glass-card border-primary/20 box-glow-primary h-[600px] relative"
          >
            {/* Standard DEXTools embed format - using the mint address provided */}
            <iframe 
              id="dextools-widget"
              title="DEXTools Trading Chart"
              width="100%"
              height="100%"
              src="https://www.dextools.io/widget-chart/en/solana/pe-light/DnUsQnwNot38V9JbisNC18VHZkae1eKK5N2Dgy55pump?theme=dark&chartType=2&chartResolution=15&drawingToolbars=false"
              className="absolute inset-0 border-0"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
