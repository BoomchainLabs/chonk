import { Navbar } from "./Navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen" />
      
      <Navbar />
      <main className="flex-1 w-full relative z-0">
        {children}
      </main>
      
      <footer className="border-t border-white/10 bg-background/50 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground text-sm font-medium">
          <p>© {new Date().getFullYear()} CHONKPUMP 9000. All systems operational.</p>
          <p className="mt-2 text-xs opacity-50">Not financial advice. The AI makes its own decisions.</p>
        </div>
      </footer>
    </div>
  );
}
