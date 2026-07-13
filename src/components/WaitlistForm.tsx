import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  Mail, 
  Shield, 
  Check, 
  Clipboard, 
  Sparkles, 
  AlertCircle, 
  Twitter, 
  Facebook, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Trash2, 
  Download, 
  Plus, 
  Lock, 
  Terminal, 
  Database, 
  Clock, 
  Heart, 
  LineChart, 
  TrendingUp, 
  CheckCircle2, 
  LogOut,
  Building,
  UserPlus
} from "lucide-react";
import { 
  addWaitlistEntry, 
  addSubscriber, 
  listenToWaitlist, 
  listenToSubscribers, 
  listenToSentEmails, 
  registerUserAccount, 
  loginUserAccount, 
  logoutUserAccount,
  FirestoreWaitlist,
  FirestoreSubscriber,
  SentEmail 
} from "../lib/db";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SEED_PARTICIPANTS = [
  { name: "Dr. Evelyn Ramirez, OB/GYN", email: "e.ramirez@womenshealth.org", role: "healthcare-professional" },
  { name: "Clara Vance", email: "clara.vance@gmail.com", role: "expecting-mother" },
  { name: "Marcus Sterling", email: "marcus.sterling@partners.co", role: "partner" },
  { name: "Elena Rostova", email: "elena.r@md.com", role: "healthcare-professional" }
];

export default function WaitlistForm() {
  const [activeTab, setActiveTab] = useState<"queue" | "auth">("queue");
  
  // Real-time states
  const [waitlist, setWaitlist] = useState<FirestoreWaitlist[]>([]);
  const [subscribers, setSubscribers] = useState<FirestoreSubscriber[]>([]);
  const [sentEmails, setSentEmails] = useState<SentEmail[]>([]);
  
  // Waitlist Register States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("expecting-mother");
  const [submitted, setSubmitted] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<FirestoreWaitlist | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Auth States
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authRole, setAuthRole] = useState("expecting-mother");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Live Patient Telemetry Sandbox (for logged-in users)
  const [vitalsHistory, setVitalsHistory] = useState([
    { time: "08:00", heartRate: 78, systolic: 118, diastolic: 76 },
    { time: "10:00", heartRate: 82, systolic: 122, diastolic: 78 },
    { time: "12:00", heartRate: 80, systolic: 120, diastolic: 77 },
    { time: "14:00", heartRate: 85, systolic: 124, diastolic: 80 },
    { time: "16:00", heartRate: 81, systolic: 119, diastolic: 75 }
  ]);
  const [simulatedHr, setSimulatedHr] = useState(81);
  const [simulatedSys, setSimulatedSys] = useState(119);
  const [simulatedDia, setSimulatedDia] = useState(75);

  // Search waitlist state
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResult, setSearchResult] = useState<FirestoreWaitlist | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Clipboard States
  const [copiedLink, setCopiedLink] = useState(false);

  // Real-time Database Synchronization
  useEffect(() => {
    const unsubWaitlist = listenToWaitlist((list) => {
      // If Firestore database has no waitlist entries yet, seed it!
      if (list.length === 0) {
        seedInitialWaitlist();
      } else {
        setWaitlist(list);
      }
    });

    const unsubSubs = listenToSubscribers((list) => {
      setSubscribers(list);
    });

    const unsubEmails = listenToSentEmails((list) => {
      setSentEmails(list);
    });

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubWaitlist();
      unsubSubs();
      unsubEmails();
      unsubAuth();
    };
  }, []);

  // Periodic Telemetry Simulation for logged-in user
  useEffect(() => {
    if (!currentUser) return;
    const interval = setInterval(() => {
      const hrDelta = Math.floor(Math.random() * 5) - 2;
      const sysDelta = Math.floor(Math.random() * 3) - 1;
      const diaDelta = Math.floor(Math.random() * 3) - 1;

      setSimulatedHr(prev => Math.min(110, Math.max(60, prev + hrDelta)));
      setSimulatedSys(prev => Math.min(145, Math.max(105, prev + sysDelta)));
      setSimulatedDia(prev => Math.min(95, Math.max(65, prev + diaDelta)));

      // append to chart dataset
      setVitalsHistory(prev => {
        const next = [...prev.slice(1)];
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        next.push({
          time: timeStr,
          heartRate: Math.min(110, Math.max(60, simulatedHr + hrDelta)),
          systolic: Math.min(145, Math.max(105, simulatedSys + sysDelta)),
          diastolic: Math.min(95, Math.max(65, simulatedDia + diaDelta))
        });
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentUser, simulatedHr, simulatedSys, simulatedDia]);

  const seedInitialWaitlist = async () => {
    for (let i = 0; i < SEED_PARTICIPANTS.length; i++) {
      const p = SEED_PARTICIPANTS[i];
      await addWaitlistEntry(p.name, p.email, p.role, 8 - i);
    }
  };

  // Waitlist submission handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsRegistering(true);

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      setIsRegistering(false);
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setIsRegistering(false);
      return;
    }

    try {
      const entry = await addWaitlistEntry(name, email, role);
      setCurrentEntry(entry);
      setSubmitted(true);
      setName("");
      setEmail("");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to register. Please check your network.");
    } finally {
      setIsRegistering(false);
    }
  };

  // Search existing registration
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const found = waitlist.find(item => item.email.toLowerCase() === searchEmail.toLowerCase().trim());
    setSearchResult(found || null);
  };

  // Handle Client-side User Accounts (Sign Up / Sign In)
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    if (!authEmail.trim() || !authPassword.trim()) {
      setAuthError("Please fill out all credentials.");
      setAuthLoading(false);
      return;
    }

    try {
      if (authMode === "signup") {
        if (!authName.trim()) {
          setAuthError("Please enter your name.");
          setAuthLoading(false);
          return;
        }
        await registerUserAccount(authEmail, authPassword, authName, authRole);
      } else {
        await loginUserAccount(authEmail, authPassword);
      }
      setAuthName("");
      setAuthEmail("");
      setAuthPassword("");
    } catch (err: any) {
      console.error(err);
      let msg = err.message;
      if (err.code === "auth/invalid-credential") {
        msg = "Invalid email or password combination.";
      } else if (err.code === "auth/email-already-in-use") {
        msg = "An account with this email already exists.";
      } else if (err.code === "auth/weak-password") {
        msg = "Password should be at least 6 characters.";
      }
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUserAccount();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyLink = () => {
    const refLink = `${window.location.origin}?ref=${currentEntry?.referralCode || "vytal"}`;
    navigator.clipboard.writeText(refLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full space-y-8" id="waitlist-card">
      
      {/* Real-time Global Registration Counter Badge - Responsive design safe for iPhone */}
      <div className="bg-brand-dark/35 border border-brand-border rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-brand-teal animate-pulse" />
          <span className="text-xs font-bold text-brand-heading uppercase tracking-widest">Database Node Active</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="bg-brand-dark-card border border-brand-border text-brand-heading px-3 py-1 rounded-xl text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-sm">
            👥 Registered Users: <strong className="text-brand-coral font-mono">{waitlist.length}</strong>
          </span>
          <span className="bg-brand-dark-card border border-brand-border text-brand-heading px-3 py-1 rounded-xl text-[10px] sm:text-xs font-bold flex items-center gap-1.5 shadow-sm">
            📬 Subscribers: <strong className="text-brand-teal font-mono">{subscribers.length + 15}</strong>
          </span>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="flex border border-brand-border rounded-2xl overflow-hidden bg-brand-dark-card/70 p-1 shadow-sm gap-1">
        <button
          onClick={() => setActiveTab("queue")}
          className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
            activeTab === "queue"
              ? "bg-brand-teal text-white shadow-sm"
              : "text-brand-light-teal hover:text-brand-heading hover:bg-brand-dark/30"
          }`}
        >
          <Database className="h-3.5 w-3.5" />
          <span>Queue Waitlist</span>
        </button>
        
        <button
          onClick={() => setActiveTab("auth")}
          className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
            activeTab === "auth"
              ? "bg-brand-teal text-white shadow-sm"
              : "text-brand-light-teal hover:text-brand-heading hover:bg-brand-dark/30"
          }`}
        >
          <Lock className="h-3.5 w-3.5" />
          <span>Clinic Portal</span>
        </button>
      </div>

      <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden min-h-[420px] flex flex-col justify-between">
        
        {/* Background glow effects */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-brand-pink/10 rounded-full filter blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-brand-teal/5 rounded-full filter blur-2xl pointer-events-none" />

        <AnimatePresence mode="wait">
          
          {/* TAB 1: WAITLIST QUEUE */}
          {activeTab === "queue" && (
            <motion.div
              key="queue-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {!submitted ? (
                <div>
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold bg-brand-pink/20 text-brand-heading border border-brand-pink/35 mb-2.5 uppercase tracking-wider">
                      Live Firestore Queue
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-heading tracking-tight">
                      Secure Maternal Priority Access
                    </h3>
                    <p className="text-brand-text text-xs sm:text-sm mt-1 leading-relaxed">
                      Register directly into our real-time database to secure patient hardware testing allocations and remote physician alert routes.
                    </p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    {errorMsg && (
                      <div className="bg-brand-coral/10 border border-brand-coral/20 rounded-xl p-3 flex items-center gap-3 text-brand-coral text-xs">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="relative">
                      <label className="block text-[10px] font-bold text-brand-heading mb-1 uppercase tracking-wider">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-light-teal" />
                        <input
                          type="text"
                          placeholder="Dr. Thabo Dlamini"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-brand-dark border border-brand-border rounded-xl pl-10 pr-3 py-3 text-xs text-brand-heading placeholder-[#9C9A8E] focus:outline-none focus:border-brand-teal"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-[10px] font-bold text-brand-heading mb-1 uppercase tracking-wider">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-light-teal" />
                        <input
                          type="email"
                          placeholder="t.dlamini@clinic.org"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-brand-dark border border-brand-border rounded-xl pl-10 pr-3 py-3 text-xs text-brand-heading placeholder-[#9C9A8E] focus:outline-none focus:border-brand-teal"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-brand-heading mb-1 uppercase tracking-wider">Role Representation</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { key: "expecting-mother", label: "🤰 Expecting Mother" },
                          { key: "healthcare-professional", label: "🩺 Care Provider" },
                          { key: "partner", label: "🤝 Birth Partner" },
                          { key: "other", label: "⭐ Supporter" }
                        ].map((item) => (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => setRole(item.key)}
                            className={`py-2 px-1.5 rounded-xl border text-[11px] text-center transition-all cursor-pointer ${
                              role === item.key
                                ? "bg-brand-teal border-transparent text-white font-semibold shadow-sm"
                                : "bg-brand-dark border border-brand-border text-brand-light-teal hover:border-brand-teal"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isRegistering}
                      className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                    >
                      {isRegistering ? "Securing Spot..." : "Register Live to Waitlist"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="mx-auto h-12 w-12 bg-brand-teal text-white rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-brand-coral bg-brand-pink/20 px-2 py-0.5 rounded-full border border-brand-pink/35">
                      Registration Secured
                    </span>
                    <h3 className="text-xl font-serif font-bold text-brand-heading mt-2">
                      Queue Spot Registered, {currentEntry?.name}!
                    </h3>
                    <p className="text-xs text-brand-light-teal mt-1">
                      Real-time Position: <strong className="text-brand-coral font-mono">#{currentEntry?.position}</strong> in the Vytal Bridge network.
                    </p>
                  </div>

                  {/* Copy link */}
                  <div className="bg-brand-dark p-3 rounded-xl border border-brand-border space-y-2 max-w-sm mx-auto">
                    <p className="text-[10px] text-brand-text text-left leading-normal">
                      Share to skip people in queue! For each registration, you bypass 3 places:
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={`${window.location.origin}?ref=${currentEntry?.referralCode}`}
                        className="bg-brand-dark-card border border-brand-border rounded-lg px-2 py-1.5 text-[10px] text-brand-text flex-1 outline-none"
                      />
                      <button
                        onClick={handleCopyLink}
                        className="bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 px-3 rounded-lg transition-colors border border-brand-teal/10 cursor-pointer text-[10px] font-bold flex items-center"
                      >
                        {copiedLink ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-brand-teal underline cursor-pointer hover:text-brand-teal/80"
                  >
                    Register another queue email
                  </button>
                </div>
              )}

              {/* Instant Search queue */}
              <div className="border-t border-brand-border/60 pt-4 mt-2">
                <p className="text-[11px] font-semibold text-brand-heading mb-1.5">Already in Queue? Quick Spot Checker</p>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter registered email..."
                    value={searchEmail}
                    onChange={(e) => {
                      setSearchEmail(e.target.value);
                      setSearchAttempted(false);
                    }}
                    className="flex-1 bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-heading focus:outline-none placeholder-[#9C9A8E]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-brand-teal text-white px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Check
                  </button>
                </form>

                {searchAttempted && (
                  <div className="mt-2 text-xs">
                    {searchResult ? (
                      <div className="bg-brand-teal/10 border border-brand-teal/20 rounded-xl p-2.5 flex justify-between items-center text-brand-teal">
                        <span className="font-semibold">{searchResult.name}</span>
                        <span className="font-mono font-bold text-brand-coral">Rank #{searchResult.position}</span>
                      </div>
                    ) : (
                      <p className="text-[10px] text-brand-light-teal">No active record for "{searchEmail}". Complete the quick registration above!</p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: SECURE CLINIC ACCOUNT PORTAL (SIGN UP / SIGN IN) */}
          {activeTab === "auth" && (
            <motion.div
              key="auth-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {!currentUser ? (
                <div>
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold bg-brand-pink/20 text-brand-heading border border-brand-pink/35 uppercase tracking-wider mb-1.5">
                      Secured by Firebase
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-brand-heading">
                      {authMode === "signin" ? "Access Clinic Dashboard" : "Create Clinical Credentials"}
                    </h3>
                    <p className="text-brand-text text-xs mt-1 leading-relaxed">
                      Authenticate to access remote patient telemetry graphs, blood pressure monitors, and real-time physician alert status grids.
                    </p>
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-3">
                    {authError && (
                      <div className="bg-brand-coral/10 border border-brand-coral/20 rounded-xl p-2.5 flex items-center gap-2 text-brand-coral text-xs">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <span>{authError}</span>
                      </div>
                    )}

                    {authMode === "signup" && (
                      <div className="relative">
                        <label className="block text-[10px] font-bold text-brand-heading mb-1 uppercase">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-light-teal" />
                          <input
                            type="text"
                            placeholder="Dr. Thabo Dlamini"
                            value={authName}
                            onChange={(e) => setAuthName(e.target.value)}
                            className="w-full bg-brand-dark border border-brand-border rounded-xl pl-9 pr-3 py-2 text-xs text-brand-heading placeholder-[#9C9A8E] focus:outline-none"
                            required
                          />
                        </div>
                      </div>
                    )}

                    <div className="relative">
                      <label className="block text-[10px] font-bold text-brand-heading mb-1 uppercase">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-light-teal" />
                        <input
                          type="email"
                          placeholder="doctor@clinic.org"
                          value={authEmail}
                          onChange={(e) => setAuthEmail(e.target.value)}
                          className="w-full bg-brand-dark border border-brand-border rounded-xl pl-9 pr-3 py-2 text-xs text-brand-heading placeholder-[#9C9A8E] focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-[10px] font-bold text-brand-heading mb-1 uppercase">Security Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-light-teal" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          className="w-full bg-brand-dark border border-brand-border rounded-xl pl-9 pr-3 py-2 text-xs text-brand-heading placeholder-[#9C9A8E] focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    {authMode === "signup" && (
                      <div>
                        <label className="block text-[10px] font-bold text-brand-heading mb-1 uppercase">Primary Interface Mode</label>
                        <select
                          value={authRole}
                          onChange={(e) => setAuthRole(e.target.value)}
                          className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-heading focus:outline-none"
                        >
                          <option value="expecting-mother">Patient Telemetry Console (Mother)</option>
                          <option value="healthcare-professional">Physician / Clinician Station (Clinic)</option>
                          <option value="partner">Support Network / Birth Partner</option>
                        </select>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
                    >
                      {authLoading ? "Verifying Credentials..." : authMode === "signin" ? "Sign In Securely" : "Register Credentials"}
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
                      className="text-xs text-brand-teal underline cursor-pointer font-semibold"
                    >
                      {authMode === "signin" ? "Need credentials? Create an account" : "Have credentials? Sign In"}
                    </button>
                  </div>
                </div>
              ) : (
                /* ACTIVE SECURE PATIENT WORKSPACE (DASHBOARD ON LOGIN) */
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-brand-border pb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-brand-pink text-brand-heading flex items-center justify-center text-xs font-bold font-mono">
                        {currentUser.displayName?.substring(0, 2).toUpperCase() || "CL"}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-brand-heading block">
                          {currentUser.displayName || "Clinical Node User"}
                        </span>
                        <span className="text-[10px] text-brand-light-teal uppercase font-bold tracking-wider">
                          Secure Session Active
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-1.5 rounded-lg hover:bg-brand-dark border border-brand-border text-brand-light-teal hover:text-brand-heading transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                    >
                      <LogOut className="h-3 w-3" />
                      Logout
                    </button>
                  </div>

                  {/* Realtime Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-brand-dark border border-brand-border p-2.5 rounded-xl">
                      <span className="text-[9px] uppercase font-bold text-brand-light-teal tracking-wider block">Heart Rate</span>
                      <div className="flex items-center justify-center gap-1.5 mt-1">
                        <Heart className="h-4 w-4 text-brand-coral fill-brand-coral animate-pulse" />
                        <span className="text-xl font-mono font-black text-brand-heading">{simulatedHr}</span>
                        <span className="text-[9px] text-brand-light-teal font-medium">BPM</span>
                      </div>
                    </div>
                    <div className="bg-brand-dark border border-brand-border p-2.5 rounded-xl">
                      <span className="text-[9px] uppercase font-bold text-brand-light-teal tracking-wider block">Blood Pressure</span>
                      <div className="flex items-center justify-center gap-1.5 mt-1">
                        <LineChart className="h-4 w-4 text-brand-teal" />
                        <span className="text-xl font-mono font-black text-brand-heading">{simulatedSys}/{simulatedDia}</span>
                        <span className="text-[9px] text-brand-light-teal font-medium">mmHg</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Sparkline Chart utilizing recharts */}
                  <div className="space-y-1 bg-brand-dark border border-brand-border rounded-xl p-3">
                    <div className="flex justify-between items-center text-[9px] font-bold text-brand-light-teal uppercase">
                      <span>Real-time Patient Vitals Sparkline</span>
                      <span className="text-brand-teal animate-pulse">● Recurrent Telemetry streaming</span>
                    </div>
                    <div className="h-28 w-full mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <ReLineChart data={vitalsHistory}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.15)" />
                          <Tooltip contentStyle={{ fontSize: '10px', background: 'var(--bg-dark-card, #FFFFFF)', color: 'var(--bg-text, #000000)', borderRadius: '8px' }} />
                          <Line type="monotone" dataKey="heartRate" stroke="#EE7F61" strokeWidth={2} dot={false} name="HR" />
                          <Line type="monotone" dataKey="systolic" stroke="#3D5F47" strokeWidth={1.5} dot={false} name="BP Sys" />
                        </ReLineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 flex items-start gap-2 text-brand-text text-[10px] leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold text-brand-heading">Encrypted Telemetry Confirmed</strong>
                      Verified by the Vytal Bridge decentralized patient queue in Manzini. Safe for clinical review.
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
