import { Link, useLocation } from "wouter";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Menu, X, Activity, BarChart2, FileText, Cpu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { href: "/", label: "Home", icon: Activity },
  { href: "/dashboard", label: "Dashboard", icon: BarChart2 },
  { href: "/token", label: "Token Info", icon: Cpu },
  { href: "/blog", label: "Intel", icon: FileText },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary group-hover:box-glow-primary transition-all duration-300">
              <img 
                src="https://ipfs.io/ipfs/Qmf7mK6z3Kajox4EL72zsvYWx5GeytwxQcENiuB8oAykmc" 
                alt="CHONKPUMP 9000" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="font-display font-black text-xl tracking-widest text-white group-hover:text-glow-primary transition-all duration-300">
              CHONK<span className="text-primary">9K</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map(({ href, label, icon: Icon }) => {
              const isActive = location === href;
              return (
                <Link 
                  key={href} 
                  href={href}
                  className={`
                    flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-all duration-200
                    ${isActive ? 'text-primary text-glow-primary' : 'text-muted-foreground hover:text-white'}
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Wallet Button */}
          <div className="hidden md:block">
            <WalletMultiButton />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-card/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {LINKS.map(({ href, label, icon: Icon }) => (
                <Link 
                  key={href} 
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 p-3 rounded-xl transition-colors
                    ${location === href ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:bg-white/5'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-display font-bold uppercase tracking-wider">{label}</span>
                </Link>
              ))}
              <div className="pt-4 flex justify-center">
                <WalletMultiButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
