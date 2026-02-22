import { motion } from "framer-motion";
import { format } from "date-fns";
import { Rocket, TrendingUp, Globe, Terminal, ChevronRight } from "lucide-react";
import { usePosts } from "@/hooks/use-posts";

const iconMap: Record<string, any> = {
  rocket: Rocket,
  'trending-up': TrendingUp,
  globe: Globe,
  terminal: Terminal
};

export default function Blog() {
  const { data: posts, isLoading } = usePosts();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black font-display text-white text-glow-secondary mb-4">
          SYSTEM LOGS
        </h1>
        <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
          {'>'} Reading transmission history...<br/>
          {'>'} Roadmap and protocol updates unlocked.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts?.map((post: any) => {
            const Icon = iconMap[post.icon] || Terminal;
            
            return (
              <motion.div 
                key={post.id}
                variants={itemVariants}
                className="group relative glass-card p-1 rounded-3xl hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Subtle animated border gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-secondary/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
                
                <div className="bg-card h-full rounded-[1.35rem] p-8 border border-white/5 relative z-10 flex flex-col">
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 group-hover:border-secondary/50 group-hover:text-secondary transition-colors">
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-mono font-bold text-muted-foreground bg-black/40 px-3 py-1 rounded-full border border-white/5">
                      {post.date}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-glow-secondary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                    {post.content}
                  </p>

                  <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary group-hover:text-secondary transition-colors mt-auto">
                    Decrypt File <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
