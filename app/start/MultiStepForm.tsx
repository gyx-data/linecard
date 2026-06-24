"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, CheckCircle2, Loader2, ChevronRight, AlertCircle, ChevronDown, Eye, EyeOff } from "lucide-react";
import { submitToDiscord } from "../actions/submit-form";
import { loginUser } from "../actions/login";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "./form.css";

type FormDataState = {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const countries = [
  { code: "fr", name: "France" },
  { code: "ch", name: "Switzerland" },
  { code: "be", name: "Belgium" },
  { code: "ca", name: "Canada" },
  { code: "gb", name: "United Kingdom" },
  { code: "ae", name: "United Arab Emirates" },
  { code: "de", name: "Germany" },
  { code: "es", name: "Spain" },
  { code: "it", name: "Italy" },
  { code: "pt", name: "Portugal" },
  { code: "nl", name: "Netherlands" },
  { code: "at", name: "Austria" },
  { code: "se", name: "Sweden" },
  { code: "no", name: "Norway" },
  { code: "dk", name: "Denmark" },
  { code: "fi", name: "Finland" },
  { code: "ie", name: "Ireland" },
  { code: "lu", name: "Luxembourg" },
  { code: "us", name: "United States" },
  { code: "mx", name: "Mexico" },
  { code: "br", name: "Brazil" },
  { code: "ar", name: "Argentina" },
  { code: "co", name: "Colombia" },
  { code: "jp", name: "Japan" },
  { code: "kr", name: "South Korea" },
  { code: "sg", name: "Singapore" },
  { code: "hk", name: "Hong Kong" },
  { code: "au", name: "Australia" },
  { code: "nz", name: "New Zealand" },
  { code: "sa", name: "Saudi Arabia" },
  { code: "qa", name: "Qatar" },
  { code: "tr", name: "Turkey" },
  { code: "ng", name: "Nigeria" },
  { code: "za", name: "South Africa" },
  { code: "ma", name: "Morocco" },
];

const TOTAL_STEPS = 6;

export default function MultiStepForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isLogin, setIsLogin] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormDataState>({
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check URL query parameters for mode=login
  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "login") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [step, isLogin]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);

    const result = await loginUser(data);

    if (result.success) {
      if (typeof window !== "undefined") {
        localStorage.setItem("linecard_user", JSON.stringify(result.user));
      }
      router.push("/dashboard");
    } else {
      setError(result.error || "Invalid credentials.");
    }
    setIsSubmitting(false);
  };

  const handleNext = () => {
    if (step === 0 && !formData.firstName.trim()) {
      setError("First name is required");
      return;
    }
    if (step === 1 && !formData.lastName.trim()) {
      setError("Last name is required");
      return;
    }
    if (step === 2 && !formData.country.trim()) {
      setError("Please select your country");
      return;
    }
    if (step === 3 && !formData.email.trim()) {
      setError("Email address is required");
      return;
    }
    if (step === 3 && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (step === 4 && !formData.password) {
      setError("Password is required");
      return;
    }
    if (step === 4 && formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (step === 5 && !formData.confirmPassword) {
      setError("Please confirm your password");
      return;
    }
    if (step === 5 && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      submitForm();
    }
  };


  const submitForm = async () => {
    setIsSubmitting(true);
    setError("");

    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("country", formData.country);
    data.append("email", formData.email);
    data.append("password", formData.password);

    const result = await submitToDiscord(data);

    if (result.success) {
      if (typeof window !== "undefined") {
        localStorage.setItem("linecard_user", JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          country: formData.country
        }));
      }
      setStep(TOTAL_STEPS);
    } else {
      setError(result.error || "An error occurred. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    }
  };

  const stepsContent = [
    {
      title: "First Name",
      description: "Enter your legal first name to begin.",
      field: (
        <div className="premium-input-wrapper">
          <input
            ref={inputRef as any}
            type="text"
            value={formData.firstName}
            onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }); setError(""); }}
            onKeyDown={handleKeyDown}
            placeholder="First name"
            className={`premium-input-field ${error ? 'input-error' : ''}`}
          />
        </div>
      ),
    },
    {
      title: "Last Name",
      description: "Enter your legal last name.",
      field: (
        <div className="premium-input-wrapper">
          <input
            ref={inputRef as any}
            type="text"
            value={formData.lastName}
            onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }); setError(""); }}
            onKeyDown={handleKeyDown}
            placeholder="Last name"
            className={`premium-input-field ${error ? 'input-error' : ''}`}
          />
        </div>
      ),
    },
    {
      title: "Country",
      description: "Where are you currently residing?",
      field: (
        <div className="premium-input-wrapper" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`premium-select-field text-left flex items-center justify-between ${error ? 'input-error' : ''}`}
          >
            <span className="flex items-center gap-2">
              {formData.country ? (
                <>
                  <img 
                    src={`https://flagcdn.com/w40/${countries.find(c => c.name === formData.country)?.code}.png`} 
                    alt={formData.country}
                    className="w-5 h-3.5 object-cover rounded-[2px]"
                  />
                  <span>{formData.country}</span>
                </>
              ) : (
                <span className="text-zinc-500">Select country</span>
              )}
            </span>
            <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-white' : ''}`} />
          </button>
          
          <div className={`custom-dropdown-wrapper ${isDropdownOpen ? 'dropdown-open' : ''}`}>
            <div className="custom-dropdown-menu">
              {countries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, country: c.name });
                    setIsDropdownOpen(false);
                    setError("");
                  }}
                  className={`custom-dropdown-item flex items-center ${formData.country === c.name ? 'item-selected' : ''}`}
                >
                  <img 
                    src={`https://flagcdn.com/w40/${c.code}.png`} 
                    alt={c.name}
                    className="mr-3 w-5 h-3.5 object-cover rounded-[2px]"
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Email Address",
      description: "We'll send your access details here.",
      field: (
        <div className="premium-input-wrapper">
          <input
            ref={inputRef as any}
            type="email"
            value={formData.email}
            onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setError(""); }}
            onKeyDown={handleKeyDown}
            placeholder="name@example.com"
            className={`premium-input-field ${error ? 'input-error' : ''}`}
          />
        </div>
      ),
    },
    {
      title: "Create Password",
      description: "Choose a strong password for your account.",
      field: (
        <div className="premium-input-wrapper" style={{ position: 'relative' }}>
          <input
            ref={inputRef as any}
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setError(""); }}
            onKeyDown={handleKeyDown}
            placeholder="Min. 8 characters"
            className={`premium-input-field ${error ? 'input-error' : ''}`}
            style={{ paddingRight: '56px' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      ),
    },
    {
      title: "Confirm Password",
      description: "Re-enter your password to confirm.",
      field: (
        <div className="premium-input-wrapper" style={{ position: 'relative' }}>
          <input
            ref={inputRef as any}
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => { setFormData({ ...formData, confirmPassword: e.target.value }); setError(""); }}
            onKeyDown={handleKeyDown}
            placeholder="Re-enter your password"
            className={`premium-input-field ${error ? 'input-error' : ''}`}
            style={{ paddingRight: '56px' }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
            tabIndex={-1}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      ),
    }
  ];

  if (isLogin) {
    return (
      <div className="onboarding-body">
        <div className="bg-ambient-layer">
          <div className="bg-ambient-grid"></div>
          <div className="bg-noise"></div>
          <div className="glowing-orb"></div>
        </div>

        <header className="flex items-center justify-between py-6 px-8 max-w-7xl w-full mx-auto z-10 border-b border-zinc-900/50 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/linecard_logo.png" alt="Linecard" className="w-16 h-16 object-contain" />
            <span className="font-bold text-xl tracking-tight text-white">Linecard</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm text-zinc-400">
            <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/#about" className="hover:text-white transition-colors">About</Link>
            <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
          </nav>
          <button onClick={() => { setIsLogin(false); router.push("/start"); }} className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors">
            Sign Up
          </button>
        </header>

        <div className="flex-grow flex items-center justify-center w-full z-10">
          <div className="onboarding-main-container">
            <div className="glass-panel-overhauled">
              <div className="step-fade-container">
                <h2 className="step-title">Login</h2>
                <p className="step-description">Sign in to your Linecard dashboard.</p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="premium-input-wrapper">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setError(""); }}
                      placeholder="Email address"
                      className={`premium-input-field ${error ? 'input-error' : ''}`}
                      required
                    />
                  </div>

                  <div className="premium-input-wrapper" style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setError(""); }}
                      placeholder="Password"
                      className={`premium-input-field ${error ? 'input-error' : ''}`}
                      style={{ paddingRight: '56px' }}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {error && (
                    <p className="error-text-premium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </p>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary-premium w-full mt-6 justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        Login
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            <div className="onboarding-footer">
              <button 
                onClick={() => { setIsLogin(false); setError(""); router.push("/start"); }}
                className="text-xs text-zinc-500 hover:text-white transition-colors underline bg-transparent border-none cursor-pointer"
              >
                Don't have an account? Sign up for free
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === TOTAL_STEPS) {
    return (
      <div className="onboarding-body">
        <div className="bg-ambient-layer">
          <div className="bg-ambient-grid"></div>
          <div className="bg-noise"></div>
          <div className="glowing-orb"></div>
        </div>

        <header className="flex items-center justify-between py-6 px-8 max-w-7xl w-full mx-auto z-10 border-b border-zinc-900/50 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/linecard_logo.png" alt="Linecard" className="w-16 h-16 object-contain" />
            <span className="font-bold text-xl tracking-tight text-white">Linecard</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm text-zinc-400">
            <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/#about" className="hover:text-white transition-colors">About</Link>
            <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
          </nav>
          <button onClick={() => { setIsLogin(true); router.push("/start?mode=login"); }} className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors">
            Login
          </button>
        </header>

        <div className="flex-grow flex items-center justify-center w-full z-10">
          <div className="onboarding-main-container">
            <div className="glass-panel-overhauled">
              <div className="success-card-overhauled">
                <div className="success-icon-badge">
                  <CheckCircle2 />
                </div>
                <h1 className="success-title">Registration completed, {formData.firstName}.</h1>
                <p className="success-desc">
                  Your account has been created successfully. Sign in to your dashboard to finalize your Linecard.
                </p>
                <button onClick={() => { setIsLogin(true); router.push("/start?mode=login"); }} className="btn-primary-premium" style={{ width: '100%', justifyContent: 'center' }}>
                  Go to Login
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = stepsContent[step];

  return (
    <div className="onboarding-body">
      <div className="bg-ambient-layer">
        <div className="bg-ambient-grid"></div>
        <div className="bg-noise"></div>
        <div className="glowing-orb"></div>
      </div>

      <header className="flex items-center justify-between py-6 px-8 max-w-7xl w-full mx-auto z-10 border-b border-zinc-900/50 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/linecard_logo.png" alt="Linecard" className="w-16 h-16 object-contain" />
          <span className="font-bold text-xl tracking-tight text-white">Linecard</span>
        </Link>
        <nav className="hidden md:flex gap-8 text-sm text-zinc-400">
          <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="/#about" className="hover:text-white transition-colors">About</Link>
          <Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link>
        </nav>
        <button onClick={() => { setIsLogin(true); router.push("/start?mode=login"); }} className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-zinc-200 transition-colors">
          Login
        </button>
      </header>

      <div className="flex-grow flex items-center justify-center w-full z-10">
        <div className="onboarding-main-container">
          <div className="glass-panel-overhauled">
            <div className="progress-container-premium">
              <div 
                className="progress-fill-premium"
                style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
              />
            </div>

            <div className="step-indicator-dots">
              {Array.from({ length: TOTAL_STEPS }).map((_, idx) => (
                <div 
                  key={idx}
                  className={`step-dot ${idx === step ? 'active' : idx < step ? 'completed' : ''}`}
                />
              ))}
            </div>

            <div className="step-fade-container" key={step}>
              <h2 className="step-title">
                {currentStepData.title}
              </h2>
              <p className="step-description">
                {currentStepData.description}
              </p>

              <div className="relative">
                {currentStepData.field}
                {error && (
                  <p className="error-text-premium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </p>
                )}
              </div>
            </div>

            <div className="button-group-premium">
              <button
                onClick={() => { setStep(Math.max(0, step - 1)); setError(""); }}
                className={`btn-secondary-premium ${step === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >
                Back
              </button>
              
              <button 
                onClick={handleNext}
                disabled={isSubmitting}
                className="btn-primary-premium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {step === TOTAL_STEPS - 1 ? "Register" : "Next"}
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="onboarding-footer flex flex-col items-center gap-2">
            <p className="footer-text-premium mb-1">
              Step {step + 1} of {TOTAL_STEPS} • Secure Registration
            </p>
            <button 
              onClick={() => { setIsLogin(true); setError(""); router.push("/start?mode=login"); }}
              className="text-xs text-zinc-500 hover:text-white transition-colors underline bg-transparent border-none cursor-pointer"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

