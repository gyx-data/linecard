"use client";

import { ShieldCheck, Zap, Wallet, ArrowRight, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import CardVisual from "./components/CardVisual";
import { useState, useEffect } from "react";

const faqItems = [
  {
    question: "How do I get a Linecard?",
    answer: "Getting started is instant. Simply register with your email address, pay the 5.99 € card creation fee using our secure NOWPayments gateway, and your prepaid card details will be generated immediately on your dashboard."
  },
  {
    question: "Is there any KYC verification required?",
    answer: "No. Linecard is designed with privacy in mind. We do not ask for passport scans, selfie verifications, or utility bills. You only need a valid email address to register and access your dashboard."
  },
  {
    question: "What is the minimum initial deposit?",
    answer: "The card requires a minimum initial top-up of $20 to activate your balance. You can fund this balance using major cryptocurrencies such as USDT, USDC, BTC, and ETH."
  },
  {
    question: "Where can I use my Linecard virtual card?",
    answer: "Your virtual Linecard is accepted globally at over 50 million online retailers and physical merchants. You can link it to Apple Pay or Google Pay to make contactless payments in physical stores."
  },
  {
    question: "How are cryptocurrency payments processed?",
    answer: "At the moment of purchase, your cryptocurrency balance is automatically converted to the merchant's local currency at the prevailing exchange rate, ensuring a seamless transaction."
  }
];

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("linecard_user");
      if (stored) {
        try {
          setLoggedInUser(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between py-6 px-8 max-w-7xl w-full mx-auto z-10">
        <div className="flex items-center gap-2">
          <img src="/linecard_logo.png" alt="Linecard" className="w-16 h-16 object-contain" />
          <span className="font-bold text-xl tracking-tight">Linecard</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          {loggedInUser && (
            <Link href="/dashboard" className="text-[#F3BA2F] hover:text-white transition-colors font-medium">
              Dashboard
            </Link>
          )}
        </nav>
        {loggedInUser ? (
          <Link href="/dashboard" className="flex items-center gap-2 bg-[#F3BA2F] text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-yellow-400 transition-colors">
            <User className="w-4 h-4" />
            <span>{loggedInUser.firstName}</span>
          </Link>
        ) : (
          <Link href="/start?mode=login" className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors">
            Login
          </Link>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative w-full max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-16 z-10">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#F3BA2F] animate-pulse"></span>
              <span className="text-xs text-zinc-300 font-medium">Now in private beta</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Financial freedom <br className="hidden md:block" />
              <span className="text-gradient">without limits.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto lg:mx-0 mb-10">
              The first truly borderless crypto card. No KYC, instant top-ups, and accepted globally. Seamlessly bridge your digital assets to the real world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/start" className="w-full sm:w-auto bg-[#F3BA2F] text-black px-8 py-4 rounded-full font-bold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2">
                Start Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/learn" className="w-full sm:w-auto px-8 py-4 rounded-full font-medium border border-zinc-800 hover:bg-zinc-900 transition-colors flex items-center justify-center">
                Learn More
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <CardVisual />
          </div>
        </section>

        {/* Trust / Collab Section */}
        <section className="w-full border-y border-zinc-900 bg-zinc-950 py-10 z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6">
            <span className="text-sm text-zinc-500 uppercase tracking-widest">In official collaboration with</span>
            <div className="flex items-center gap-2 text-2xl font-bold opacity-80 hover:opacity-100 transition-opacity cursor-default">
              {/* Simple Binance logo shape */}
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#F3BA2F]">
                <path d="M12 24l-7.07-7.07 1.41-1.42L12 21.17l5.66-5.66 1.41 1.42L12 24zm0-24l7.07 7.07-1.41 1.42L12 2.83 6.34 8.49 4.93 7.07 12 0zm-7.07 16.97L12 11.3l-2.83-2.82-7.07 7.07 2.83 1.42zm14.14 0L12 11.3l2.83-2.82 7.07 7.07-2.83 1.42z" />
              </svg>
              <span>BINANCE</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-7xl mx-auto px-6 py-32 z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Designed for privacy.</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              We believe your financial data belongs to you. That's why we've built a platform that respects your anonymity without compromising on functionality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-3xl">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-[#F3BA2F]" />
              </div>
              <h3 className="text-xl font-bold mb-3">100% No KYC</h3>
              <p className="text-zinc-400 leading-relaxed">
                Skip the invasive identity checks. Get your card instantly with just an email address and a crypto wallet. Your privacy is guaranteed.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-[#F3BA2F]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Top-ups</h3>
              <p className="text-zinc-400 leading-relaxed">
                Connect your Binance account or self-custody wallet to fund your card in seconds via Lightning Network, Tron, or BSC.
              </p>
            </div>

            <div className="glass-panel p-8 rounded-3xl">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6">
                <Wallet className="w-7 h-7 text-[#F3BA2F]" />
              </div>
              <h3 className="text-xl font-bold mb-3">$20 Minimum Deposit</h3>
              <p className="text-zinc-400 leading-relaxed">
                Start spending your crypto with an incredibly low barrier to entry. Fund your account with just $20 and your card is ready to use instantly.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-zinc-900 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs text-[#F3BA2F] uppercase tracking-widest font-semibold">About Linecard</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">Bridging digital assets and physical retail.</h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Linecard was founded on the belief that financial privacy is a fundamental human right. Our platform allows crypto holders to unlock the value of their digital assets instantly at over 50 million merchants worldwide.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                By bypassing the invasive identity checks (KYC) associated with traditional credit card providers, we deliver a seamless, cardholder-centric experience powered by modern blockchain infrastructure.
              </p>
            </div>
            <div className="glass-panel p-8 rounded-3xl border border-zinc-800/40 relative overflow-hidden bg-gradient-to-br from-zinc-950 to-black">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F3BA2F]/5 rounded-full filter blur-2xl"></div>
              <h3 className="text-xl font-bold text-white mb-4">Our Commitment</h3>
              <ul className="space-y-4 text-zinc-400">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] mt-2 shrink-0"></span>
                  <span><strong>No KYC ever</strong>: No ID submissions, utility bills, or facial scans.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] mt-2 shrink-0"></span>
                  <span><strong>Secure Infrastructure</strong>: Your digital assets are connected through audited, enterprise-grade rails.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F3BA2F] mt-2 shrink-0"></span>
                  <span><strong>Global Acceptability</strong>: Spends like local currency at any contactless or online checkout point.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full max-w-4xl mx-auto px-6 py-24 border-t border-zinc-900 z-10">
          <div className="text-center mb-16">
            <span className="text-xs text-[#F3BA2F] uppercase tracking-widest font-semibold">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div 
                key={idx} 
                className="glass-panel rounded-2xl border border-zinc-900 hover:border-zinc-800/80 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-semibold text-lg text-white hover:text-[#F3BA2F] transition-colors"
                >
                  <span>{item.question}</span>
                  <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-[#F3BA2F]" : ""}`} />
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-96 opacity-100 border-t border-zinc-900/50" : "max-h-0 opacity-0"}`}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="p-6 text-zinc-400 leading-relaxed text-sm">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="/linecard_logo.png" alt="Linecard" className="w-12 h-12 object-contain" />
            <span className="font-bold tracking-tight">Linecard</span>
          </div>
          <div className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Linecard. All rights reserved. Not available in all jurisdictions.
          </div>
        </div>
      </footer>
    </div>
  );
}
