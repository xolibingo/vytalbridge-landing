import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Mail, Shield, Check, Clipboard, Sparkles, AlertCircle, Share2, Twitter, Facebook, ArrowRight, Eye, EyeOff, Trash2, Download, Plus } from "lucide-react";
import { WaitlistEntry } from "../types";

// Seed initial mock participants to populate the waitlist for demonstration
const INITIAL_WAITLIST: WaitlistEntry[] = [
  {
    id: "1",
    name: "Dr. Evelyn Ramirez, OB/GYN",
    email: "e.ramirez@womenshealth.org",
    role: "healthcare-professional",
    signupDate: "2026-07-01",
    position: 1,
    referrals: 14,
    referralCode: "EVELYN14"
  },
  {
    id: "2",
    name: "Clara Vance",
    email: "clara.vance@gmail.com",
    role: "expecting-mother",
    signupDate: "2026-07-03",
    position: 2,
    referrals: 8,
    referralCode: "CLARA88"
  },
  {
    id: "3",
    name: "Marcus Sterling",
    email: "marcus.sterling@partners.co",
    role: "partner",
    signupDate: "2026-07-05",
    position: 3,
    referrals: 5,
    referralCode: "MARCUS5"
  },
  {
    id: "4",
    name: "Elena Rostova",
    email: "elena.r@md.com",
    role: "healthcare-professional",
    signupDate: "2026-07-08",
    position: 4,
    referrals: 3,
    referralCode: "ELENAMD"
  }
];

export default function WaitlistForm() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WaitlistEntry["role"]>("expecting-mother");
  const [submitted, setSubmitted] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<WaitlistEntry | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Search state
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResult, setSearchResult] = useState<WaitlistEntry | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Clipboard copies
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Console toggle
  const [showConsole, setShowConsole] = useState(false);

  // Load waitlist from local storage or seed initial
  useEffect(() => {
    const stored = localStorage.getItem("vytal_waitlist");
    if (stored) {
      try {
        setWaitlist(JSON.parse(stored));
      } catch (e) {
        setWaitlist(INITIAL_WAITLIST);
      }
    } else {
      setWaitlist(INITIAL_WAITLIST);
      localStorage.setItem("vytal_waitlist", JSON.stringify(INITIAL_WAITLIST));
    }
  }, []);

  // Save changes helper
  const saveWaitlist = (list: WaitlistEntry[]) => {
    setWaitlist(list);
    localStorage.setItem("vytal_waitlist", JSON.stringify(list));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    // Check if duplicate email
    const existing = waitlist.find(item => item.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentEntry(existing);
      setSubmitted(true);
      return;
    }

    // Generate positional rank
    const nextPosition = waitlist.length + 1;
    const cleanName = name.replace(/[^a-zA-Z0-9\s]/g, "");
    const initials = cleanName.substring(0, 3).toUpperCase() || "VYT";
    const refCode = `${initials}${Math.floor(100 + Math.random() * 900)}`;

    const newEntry: WaitlistEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      signupDate: new Date().toISOString().split('T')[0],
      position: nextPosition,
      referrals: 0,
      referralCode: refCode
    };

    const updatedList = [...waitlist, newEntry];
    saveWaitlist(updatedList);
    setCurrentEntry(newEntry);
    setSubmitted(true);
    
    // Reset fields
    setName("");
    setEmail("");
  };

  // Search existing registration
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const found = waitlist.find(item => item.email.toLowerCase() === searchEmail.toLowerCase().trim());
    setSearchResult(found || null);
  };

  // Simulated Referral trigger - users can click this to see how the waitlist position jumps
  const handleSimulateReferral = () => {
    if (!currentEntry) return;
    
    const updated = waitlist.map(item => {
      if (item.id === currentEntry.id) {
        const nextReferrals = item.referrals + 1;
        // Jumps 3 spots up per referral, cap at position 1
        const nextPosition = Math.max(1, item.position - 3);
        return {
          ...item,
          referrals: nextReferrals,
          position: nextPosition
        };
      }
      return item;
    });

    // Re-rank items slightly or update matching ranks
    const sorted = [...updated].sort((a, b) => {
      // Sort primarily by referrals (descending), then by date or original position
      if (b.referrals !== a.referrals) {
        return b.referrals - a.referrals;
      }
      return a.position - b.position;
    });

    // Recalculate rank positions
    const finalRanked = sorted.map((item, idx) => ({
      ...item,
      position: idx + 1
    }));

    saveWaitlist(finalRanked);
    const refreshedEntry = finalRanked.find(item => item.id === currentEntry.id) || null;
    setCurrentEntry(refreshedEntry);
  };

  // Remove someone from waitlist
  const handleRemove = (id: string) => {
    const filtered = waitlist.filter(item => item.id !== id);
    const reRanked = filtered.map((item, idx) => ({
      ...item,
      position: idx + 1
    }));
    saveWaitlist(reRanked);
    if (currentEntry && currentEntry.id === id) {
      setSubmitted(false);
      setCurrentEntry(null);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["Rank", "Name", "Email", "Role", "Signup Date", "Referrals", "Referral Code"];
    const rows = waitlist.map(item => [
      item.position,
      `"${item.name}"`,
      item.email,
      item.role,
      item.signupDate,
      item.referrals,
      item.referralCode
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `vytal_bridge_waitlist_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    const refLink = `${window.location.origin}?ref=${currentEntry?.referralCode || "vytal"}`;
    navigator.clipboard.writeText(refLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentEntry?.referralCode || "");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full space-y-8" id="waitlist-card">
      <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Subtle decorative background circle */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-brand-pink/15 rounded-full filter blur-2xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-pink/20 text-brand-heading border border-brand-pink/35 mb-3">
                  Early Cohort Now Open
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-heading tracking-tight">
                  Secure your early invitation
                </h3>
                <p className="text-brand-text mt-2 text-sm sm:text-base">
                  Vytal Bridge is entering closed beta in Fall 2026. Join the prioritized queue to gain early access, wearable testing priority, and maternal community resources.
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                {errorMsg && (
                  <div className="bg-brand-coral/10 border border-brand-coral/20 rounded-xl p-3 flex items-center gap-3 text-brand-coral text-xs" id="form-error">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Name Input */}
                <div className="relative">
                  <label className="block text-xs font-bold text-brand-heading mb-1.5 uppercase tracking-wide">Your Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-light-teal" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-brand-border rounded-xl pl-12 pr-4 py-3.5 text-brand-heading placeholder-[#9C9A8E] focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal text-sm transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label className="block text-xs font-bold text-brand-heading mb-1.5 uppercase tracking-wide">Your Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-light-teal" />
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-brand-border rounded-xl pl-12 pr-4 py-3.5 text-brand-heading placeholder-[#9C9A8E] focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal text-sm transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Role Select */}
                <div>
                  <label className="block text-xs font-bold text-brand-heading mb-1.5 uppercase tracking-wide">How do you identify?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole("expecting-mother")}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                        role === "expecting-mother"
                          ? "bg-brand-teal border-transparent text-white font-semibold shadow-sm"
                          : "bg-[#FAF9F6]/80 border-brand-border text-brand-light-teal hover:border-brand-teal hover:text-brand-teal hover:bg-[#FAF9F6]"
                      }`}
                    >
                      🤰 Expecting Mother
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("healthcare-professional")}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                        role === "healthcare-professional"
                          ? "bg-brand-teal border-transparent text-white font-semibold shadow-sm"
                          : "bg-[#FAF9F6]/80 border-brand-border text-brand-light-teal hover:border-brand-teal hover:text-brand-teal hover:bg-[#FAF9F6]"
                      }`}
                    >
                      🩺 Care Provider / MD
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("partner")}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                        role === "partner"
                          ? "bg-brand-teal border-transparent text-white font-semibold shadow-sm"
                          : "bg-[#FAF9F6]/80 border-brand-border text-brand-light-teal hover:border-brand-teal hover:text-brand-teal hover:bg-[#FAF9F6]"
                      }`}
                    >
                      🤝 Birth Partner
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("other")}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-medium text-center transition-all ${
                        role === "other"
                          ? "bg-brand-teal border-transparent text-white font-semibold shadow-sm"
                          : "bg-[#FAF9F6]/80 border-brand-border text-brand-light-teal hover:border-brand-teal hover:text-brand-teal hover:bg-[#FAF9F6]"
                      }`}
                    >
                      ⭐ Advocate / Investor
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-bold py-4 px-6 rounded-xl shadow-md shadow-brand-teal/10 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 border border-transparent"
                  id="join-waitlist-btn"
                >
                  Join Waiting List
                  <ArrowRight className="h-4 w-4" />
                </motion.button>

                <p className="text-center text-[11px] text-brand-light-teal mt-3 leading-normal">
                  By joining, you agree to receive medical guidelines and product updates. We never share your healthcare interest flags.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="signup-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-4"
              id="signup-success-view"
            >
              <div className="mx-auto h-16 w-16 bg-brand-teal text-white rounded-full flex items-center justify-center mb-6">
                <Check className="h-8 w-8" />
              </div>
              
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-pink/20 text-brand-heading mb-3 border border-brand-pink/35">
                Successfully Enrolled
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-heading tracking-tight">
                Welcome to Vytal Bridge, {currentEntry?.name}!
              </h3>
              <p className="text-brand-text mt-2 text-sm sm:text-base max-w-md mx-auto">
                Your email <strong className="text-brand-teal font-semibold">{currentEntry?.email}</strong> is secured on our maternal care launch queue.
              </p>

              {/* Position Card */}
              <div className="bg-[#FAF9F6] border border-brand-border rounded-2xl p-6 my-6 max-w-sm mx-auto flex flex-col items-center relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-pink/10 rounded-full filter blur-xl" />
                <span className="text-xs uppercase text-brand-light-teal font-semibold tracking-wider">Your Waitlist Position</span>
                <span className="text-5xl font-mono font-black text-brand-coral mt-2 mb-1 animate-pulse">
                  #{currentEntry?.position}
                </span>
                <span className="text-xs text-brand-light-teal">out of {waitlist.length} early advocates</span>

                {/* Referral Tracker */}
                <div className="w-full mt-4 pt-4 border-t border-brand-border flex justify-between items-center text-xs">
                  <span className="text-brand-light-teal">Referrals: <strong className="text-brand-heading font-mono">{currentEntry?.referrals}</strong></span>
                  <button
                    onClick={handleSimulateReferral}
                    className="text-brand-teal hover:text-brand-teal/80 flex items-center gap-1 font-semibold transition-colors bg-white border border-brand-border px-2.5 py-1 rounded hover:bg-[#FAF9F6]"
                    title="Simulate someone signing up with your referral code"
                  >
                    <Sparkles className="h-3 w-3" /> Simulate Referral
                  </button>
                </div>
              </div>

              {/* Refer and Share Section */}
              <div className="space-y-4 max-w-sm mx-auto bg-white border border-brand-border p-4 rounded-xl shadow-sm">
                <p className="text-xs text-brand-text font-medium leading-relaxed text-left">
                  🚀 <strong className="text-brand-heading">Priority Reward Unlock</strong>: Share your link! For every friend who signs up, you bypass 3 people in the queue to receive <span className="text-brand-coral font-bold">Priority Launch Access</span> on launch day and <span className="text-brand-teal font-bold">top priority placement</span> for our upcoming early wearable testing queue!
                </p>

                {/* Copy Link */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`${window.location.origin}?ref=${currentEntry?.referralCode}`}
                    className="bg-[#FAF9F6] border border-brand-border rounded-lg px-3 py-2 text-xs text-brand-text flex-1 select-all outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 p-2 rounded-lg transition-colors flex items-center justify-center border border-brand-teal/10 cursor-pointer"
                    title="Copy Link"
                  >
                    {copiedLink ? <Check className="h-4 w-4 text-emerald-700" /> : <Clipboard className="h-4 w-4" />}
                  </button>
                </div>

                {/* Social Buttons */}
                <div className="flex justify-center gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=I%20just%20secured%20my%20spot%20on%20the%20@VytalBridge%20maternal%20health%20waitlist!%20Join%20me%20to%20support%20expecting%20mothers:%20${window.location.origin}?ref=${currentEntry?.referralCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#FAF9F6] hover:bg-[#FAF9F6]/80 text-brand-text text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 border border-brand-border transition-colors"
                  >
                    <Twitter className="h-3.5 w-3.5 text-sky-600" />
                    Tweet
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#FAF9F6] hover:bg-[#FAF9F6]/80 text-brand-text text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 border border-brand-border transition-colors"
                  >
                    <Facebook className="h-3.5 w-3.5 text-blue-600" />
                    Share
                  </a>
                </div>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-brand-light-teal hover:text-brand-teal underline mt-6 block mx-auto cursor-pointer"
              >
                Register another email
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick check spots for existing members */}
      <div className="bg-white border border-brand-border rounded-2xl p-5 shadow-sm" id="waitlist-checker-box">
        <h4 className="text-sm font-semibold text-brand-heading mb-2">Already joined? Check your queue position</h4>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="email"
            placeholder="Search registered email..."
            value={searchEmail}
            onChange={(e) => {
              setSearchEmail(e.target.value);
              setSearchAttempted(false);
            }}
            className="flex-1 bg-[#FAF9F6] border border-brand-border rounded-xl px-4 py-2 text-xs text-brand-heading focus:outline-none focus:border-brand-teal placeholder-[#9C9A8E]"
            required
          />
          <button
            type="submit"
            className="bg-brand-teal text-white hover:bg-brand-teal/90 font-semibold px-4 py-2 rounded-xl text-xs transition-all border border-transparent cursor-pointer"
          >
            Check Spot
          </button>
        </form>

        <AnimatePresence>
          {searchAttempted && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 text-xs overflow-hidden"
            >
              {searchResult ? (
                <div className="bg-brand-teal/10 border border-brand-teal/20 rounded-xl p-3 flex justify-between items-center text-brand-teal">
                  <div>
                    <span className="font-semibold block text-brand-heading">{searchResult.name}</span>
                    <span className="text-[10px] text-brand-light-teal">{searchResult.role.replace('-', ' ')}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-brand-coral block">Rank #{searchResult.position}</span>
                    <span className="text-[10px] text-brand-light-teal">{searchResult.referrals} referrals</span>
                  </div>
                </div>
              ) : (
                <div className="bg-[#FAF9F6] border border-brand-border rounded-xl p-3 text-brand-light-teal">
                  No matching record found for "<span className="text-brand-heading font-medium">{searchEmail}</span>". Ready to join the waitlist above?
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle Transparency Console / Admin Panel */}
      <div className="border border-brand-border rounded-2xl overflow-hidden bg-[#FAF9F6]/40 shadow-sm">
        <button
          onClick={() => setShowConsole(!showConsole)}
          className="w-full flex items-center justify-between p-4 text-xs font-semibold text-brand-light-teal hover:text-brand-teal transition-colors bg-[#FAF9F6] border-b border-brand-border"
          id="transparency-console-toggle"
        >
          <span className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-brand-teal" />
            Waitlist Integrity & Transparency Console (Admin Tools)
          </span>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span>{showConsole ? "Hide" : "Show queue"} ({waitlist.length})</span>
            {showConsole ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </div>
        </button>

        <AnimatePresence>
          {showConsole && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white p-4 space-y-4 overflow-hidden border-t border-brand-border"
              id="transparency-console-body"
            >
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-light-teal">Active Live Database Queue (Client-Stored Persistence)</span>
                <button
                  onClick={handleExportCSV}
                  className="text-brand-teal hover:text-brand-teal/85 transition-colors flex items-center gap-1.5 font-semibold"
                >
                  <Download className="h-3.5 w-3.5" /> Export Waitlist CSV
                </button>
              </div>

              {/* Queue table */}
              <div className="max-h-56 overflow-y-auto border border-brand-border rounded-xl bg-[#FAF9F6]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-brand-border text-brand-light-teal bg-[#FAF9F6]/80">
                      <th className="p-2.5 font-medium w-12 text-center">Rank</th>
                      <th className="p-2.5 font-medium">Name</th>
                      <th className="p-2.5 font-medium hidden sm:table-cell">Identity</th>
                      <th className="p-2.5 font-medium">Email</th>
                      <th className="p-2.5 font-medium text-center w-16">Referrals</th>
                      <th className="p-2.5 font-medium text-center w-10">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-brand-light-teal">
                          Waitlist is currently empty. Start registering above!
                        </td>
                      </tr>
                    ) : (
                      waitlist.map((item) => (
                        <tr key={item.id} className="border-b border-brand-border hover:bg-[#FAF9F6] text-brand-text">
                          <td className="p-2.5 text-center font-bold text-brand-coral">{item.position}</td>
                          <td className="p-2.5 font-semibold text-brand-heading">{item.name}</td>
                          <td className="p-2.5 hidden sm:table-cell text-brand-light-teal">
                            {item.role === "expecting-mother" && "🤰 Mother"}
                            {item.role === "healthcare-professional" && "🩺 Clinic MD"}
                            {item.role === "partner" && "🤝 Support"}
                            {item.role === "other" && "⭐ Supporter"}
                          </td>
                          <td className="p-2.5 font-mono text-[10px] select-all truncate max-w-[120px] sm:max-w-none">{item.email}</td>
                          <td className="p-2.5 text-center font-mono">{item.referrals}</td>
                          <td className="p-2.5 text-center">
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="text-brand-light-teal hover:text-brand-coral transition-colors p-1"
                              title="Delete Signup"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
