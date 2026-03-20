"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VaultCard from "@/components/VaultCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Active Protocol Metrics</h2>
          <p className="text-foreground/60 mt-2 text-lg">Real-time stats from the Stacks network.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <VaultCard
            label="Total BTC Locked"
            value="1,245.89"
            change="+3.2%"
            subLabel="Value: $85,270,120 USD"
            icon="₿"
          />
          <VaultCard
            label="Total aeUSD Minted"
            value="45,890,200"
            change="+1.5%"
            subLabel="Peg: $1.00 USD"
            icon="💵"
          />
          <VaultCard
            label="Total Yield Harvested"
            value="15,670"
            change="+12.8%"
            subLabel="Last 24h: 45.89 BTC"
            icon="⚡"
          />
          <VaultCard
            label="Avg. Health Factor"
            value="1.84"
            subLabel="Threshold: 1.50"
            icon="🛡️"
          />
        </div>

        <div className="mt-20 glass p-12 rounded-[2.5rem] border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px]"></div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6 italic tracking-tight">
                "We eliminated repayments completely."
              </h3>
              <p className="text-xl text-foreground/70 leading-relaxed mb-8">
                By leveraging native Stacks Proof-of-Transfer (PoX), Aegis-Vault creates a sustainable cycle where your Bitcoin generates the yield required to settle your debt.
                You keep the upside of BTC, while utilizing the liquidity of aeUSD.
              </p>
              <ul className="space-y-4">
                {[
                  "No monthly manual payments required",
                  "Automated risk monitoring and deleveraging",
                  "Fully non-custodial and Clarity-secured",
                  "Powered by sBTC native bridge"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                      ✓
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 lg:mt-0 glass p-8 rounded-3xl border-white/5 shadow-inner">
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold">Protocol Vitality</span>
                <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-widest">Live</span>
              </div>
              <div className="space-y-6">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[70%]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-foreground/40 block mb-1">PoX Cycle</span>
                    <span className="text-xl font-bold">#78</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs text-foreground/40 block mb-1">Next Reward</span>
                    <span className="text-xl font-bold">~4h 20m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 grayscale opacity-50 hover:opacity-100 transition-all cursor-crosshair">
            <span className="text-xl font-bold tracking-tighter">AEGIS VAULT</span>
          </div>
          <div className="flex gap-8 text-sm text-foreground/40 font-medium">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Security Audits</a>
          </div>
          <p className="text-xs text-foreground/30">
            © 2026 Aegis-Vault Protocol. Built for Buidl Battle.
          </p>
        </div>
      </footer>
    </main>
  );
}
