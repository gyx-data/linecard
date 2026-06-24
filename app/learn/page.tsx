import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LearnMore() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-[#F3BA2F] selection:text-black">
      {/* Header */}
      <header className="flex items-center py-6 px-8 max-w-7xl w-full mx-auto z-10">
        <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center pt-10 pb-32">
        <div className="w-full max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-8">
            <span className="text-xs text-zinc-300 font-medium tracking-wider uppercase">About Linecard</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-10 leading-tight">
            The bridge between <br />
            <span className="text-gradient">DeFi and the real world.</span>
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none text-zinc-400">
            <p className="leading-relaxed mb-8">
              Traditional banking is slow, invasive, and fundamentally misaligned with the ethos of cryptocurrency. Linecard was born out of a simple necessity: the ability to spend digital assets instantly, anywhere in the world, without compromising personal privacy.
            </p>
            
            <div className="glass-panel p-8 rounded-3xl my-12 border border-zinc-800/50 bg-zinc-900/20">
              <h2 className="text-2xl font-bold text-white mb-4">Why No-KYC?</h2>
              <p className="leading-relaxed text-zinc-400">
                We believe financial privacy is a fundamental human right. By utilizing decentralized infrastructure and our strategic partnership with Binance, we've eliminated the need for Know Your Customer (KYC) procedures. Your identity remains entirely yours. All you need is an email and a wallet.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4 mt-12">How it works</h2>
            <ul className="space-y-6 mb-12">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F3BA2F]/10 text-[#F3BA2F] flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-white text-lg">Sign up anonymously</h3>
                  <p className="mt-1 text-zinc-400">No ID, no selfies, no utility bills. Just connect your wallet or provide an email.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F3BA2F]/10 text-[#F3BA2F] flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-white text-lg">Deposit Crypto</h3>
                  <p className="mt-1 text-zinc-400">Send USDT, USDC, BTC or ETH via supported networks (Tron, BSC, Ethereum) with a minimum of just $20.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F3BA2F]/10 text-[#F3BA2F] flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-white text-lg">Spend Globally</h3>
                  <p className="mt-1 text-zinc-400">Your virtual card is issued instantly. Add it to Apple Pay or Google Pay and tap to pay at 50M+ merchants.</p>
                </div>
              </li>
            </ul>

            <div className="mt-16 text-center">
              <Link href="/#start" className="inline-flex items-center justify-center gap-2 bg-[#F3BA2F] text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-400 transition-colors">
                Start Spending Today
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
