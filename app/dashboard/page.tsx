"use client";

import Link from "next/link";
import { 
  CreditCard, ArrowUpRight, ArrowDownLeft, Plus, 
  TrendingUp, Shield, Clock, Settings, LogOut,
  Copy, ChevronRight, Wallet, Eye, EyeOff, ArrowRight,
  AlertCircle, X
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./dashboard.css";

export default function DashboardPage() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("linecard_user");
      if (stored) {
        try {
          const user = JSON.parse(stored);
          if (user && user.firstName) {
            setUserName(user.firstName);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        router.push("/start?mode=login");
      }
    }
  }, [router]);

  const cardNumber = "0000 •••• •••• 0000";
  const balance = "$0.00";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const transactions = [];

  return (
    <div className="dash-body">
      {/* Ambient Background */}
      <div className="dash-bg-layer">
        <div className="dash-bg-grid"></div>
      </div>

      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="dash-sidebar-top">
          <Link href="/" className="dash-logo">
            <img src="/linecard_logo.png" alt="Linecard" className="w-16 h-16 object-contain" />
            <span className="dash-logo-text">Linecard</span>
          </Link>

          <nav className="dash-nav">
            <a href="#" className="dash-nav-item active">
              <CreditCard className="w-[18px] h-[18px]" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="dash-nav-item">
              <Wallet className="w-[18px] h-[18px]" />
              <span>Wallet</span>
            </a>
            <a href="#" className="dash-nav-item">
              <Clock className="w-[18px] h-[18px]" />
              <span>History</span>
            </a>
            <a href="#" className="dash-nav-item">
              <Shield className="w-[18px] h-[18px]" />
              <span>Security</span>
            </a>
            <a href="#" className="dash-nav-item">
              <Settings className="w-[18px] h-[18px]" />
              <span>Settings</span>
            </a>
          </nav>
        </div>

        <div className="dash-sidebar-bottom">
          <button 
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("linecard_user");
              }
              router.push("/");
            }} 
            className="dash-nav-item logout"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dash-main">
        {/* Top Bar */}
        <header className="dash-topbar">
          <div>
            <h1 className="dash-welcome">Welcome back, {userName || "User"}</h1>
            <p className="dash-welcome-sub">Here's your prepaid card overview</p>
          </div>
          <button onClick={() => setIsTopUpModalOpen(true)} className="dash-topup-btn">
            <Plus className="w-4 h-4" />
            Top Up
          </button>
        </header>

        {/* Activation Paywall / Subscription Alert */}
        <div className="dash-activation-banner mb-8 p-6 bg-zinc-950/80 border border-zinc-800 rounded-[20px] backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                ⚠️ Activation required
              </span>
              <h2 className="text-lg font-bold text-white">Activate your payment features</h2>
              <p className="text-sm text-zinc-400 max-w-xl">
                To unlock and use your prepaid Linecard (minimum initial deposit of 20 € required), please settle the card creation fee of 5.99 € using our secure NOWPayments gateway.
              </p>
            </div>
            <div className="flex shrink-0">
              <a 
                href="https://nowpayments.io/payment/?iid=6145499357&source=button" 
                target="_blank" 
                rel="noreferrer noopener"
                className="dash-activation-btn"
              >
                <span>Activate Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Card + Balance Section */}
        <div className="dash-grid-top">
          {/* Virtual Card */}
          <div className="dash-card-visual opacity-80">
            <div className="dash-card-inner">
              <div className="dash-card-header">
                <span className="dash-card-brand">Linecard</span>
                <span className="dash-card-type">Inactive</span>
              </div>
              <div className="dash-card-chip"></div>
              <div className="dash-card-number">
                <span>{cardNumber}</span>
                <button onClick={handleCopy} className="dash-card-copy" title="Copy">
                  {copied ? <span className="text-xs">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="dash-card-footer">
                <div>
                  <span className="dash-card-label">VALID THRU</span>
                  <span className="dash-card-value">--/--</span>
                </div>
                <div>
                  <span className="dash-card-label">CVV</span>
                  <span className="dash-card-value">•••</span>
                </div>
              </div>
            </div>
          </div>

          {/* Balance Panel */}
          <div className="dash-balance-panel">
            <div className="dash-balance-header">
              <span className="dash-balance-label">Available Balance</span>
              <button 
                onClick={() => setShowBalance(!showBalance)} 
                className="dash-balance-toggle"
              >
                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="dash-balance-amount">
              {showBalance ? balance : "••••••"}
            </div>
            <div className="dash-balance-change">
              <span>Activation fee required</span>
            </div>

            {/* Quick Actions */}
            <div className="dash-quick-actions opacity-80">
              <button onClick={() => setIsTopUpModalOpen(true)} className="dash-action-btn">
                <div className="dash-action-icon">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <span>Send</span>
              </button>
              <button onClick={() => setIsTopUpModalOpen(true)} className="dash-action-btn">
                <div className="dash-action-icon">
                  <ArrowDownLeft className="w-5 h-5" />
                </div>
                <span>Receive</span>
              </button>
              <button onClick={() => setIsTopUpModalOpen(true)} className="dash-action-btn">
                <div className="dash-action-icon">
                  <Plus className="w-5 h-5" />
                </div>
                <span>Top Up</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="dash-transactions-panel">
          <div className="dash-transactions-header">
            <h2 className="dash-section-title">Recent Transactions</h2>
            <button className="dash-see-all">
              See all <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="dash-transactions-list py-8 text-center text-sm text-zinc-500">
            No transactions recorded. Please fund your wallet (minimum deposit of 20 €) after activation.
          </div>
        </div>
      </main>

      {/* Activation Warning Modal */}
      {isTopUpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-[dashFadeIn_0.2s_ease-out]">
          <div className="relative w-full max-w-md p-6 bg-[#0a0a0a] border border-zinc-800 rounded-[24px] shadow-2xl space-y-6">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsTopUpModalOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-full text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Icon and Header */}
            <div className="flex flex-col items-center text-center space-y-3 pt-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Activation Required</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                You must activate your subscription and settle the card creation fee of <strong>5.99 €</strong> before you can recharge or use payment services.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col gap-2 pt-2">
              <a 
                href="https://nowpayments.io/payment/?iid=6145499357&source=button" 
                target="_blank" 
                rel="noreferrer noopener"
                onClick={() => setIsTopUpModalOpen(false)}
                className="dash-activation-btn w-full justify-center text-center"
              >
                <span>Activate Subscription</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button 
                onClick={() => setIsTopUpModalOpen(false)}
                className="w-full py-3.5 rounded-full text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-colors"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
