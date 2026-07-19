import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Download, BookOpen, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import { addSubscriber } from "../lib/db";
import { generatePregnancyGuidePDF } from "../lib/pdfGenerator";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // Check if user has already seen or dismissed the popup in this session
    const isDismissed = sessionStorage.getItem("vytal_exit_popup_dismissed");
    if (isDismissed) return;

    // 1. Desktop Exit Intent (Mouse leaves top of screen)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 25) {
        setIsVisible(true);
        // Remove listener after trigger to prevent double triggers
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    // 2. Mobile / Tablet Timeout Fallback (Show after 25 seconds of active reading)
    const mobileFallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 25000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileFallbackTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("vytal_exit_popup_dismissed", "true");
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addSubscriber(email);
      setIsSuccess(true);
      sessionStorage.setItem("vytal_exit_popup_dismissed", "true");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPDF = () => {
    generatePregnancyGuidePDF();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" id="exit-intent-overlay">
          {/* Backdrop blur/dim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-brand-heading/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="bg-brand-dark-card border-2 border-brand-pink/50 rounded-[32px] w-full max-w-lg shadow-2xl p-6 sm:p-8 relative overflow-hidden text-center"
            id="exit-intent-modal"
          >
            {/* Elegant Background Blobs */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-pink/20 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-brand-teal/10 rounded-full filter blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-brand-dark/40 text-brand-light-teal hover:text-brand-heading transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {!isSuccess ? (
              <div className="space-y-6 relative z-10">
                {/* Visual Icon */}
                <div className="mx-auto h-16 w-16 rounded-2xl bg-brand-dark flex items-center justify-center text-brand-coral border border-brand-pink/30 relative">
                  <div className="absolute -top-1 -right-1 animate-bounce">
                    <Sparkles className="h-4 w-4 text-brand-coral fill-brand-coral" />
                  </div>
                  <BookOpen className="h-8 w-8" />
                </div>

                {/* Catchy Header */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-brand-coral bg-brand-pink/20 px-2.5 py-1 rounded-full border border-brand-pink/35 uppercase tracking-wider">
                    Free Pregnancy Resource
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-heading tracking-tight">
                    Before you go...
                  </h3>
                  <p className="text-brand-light-teal text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                    Subscribe to our clinical dispatch newsletter today and instantly receive our <strong>Maternal Care Guide: Safe Pregnancy Vitals Tips</strong>.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubscribe} className="space-y-3">
                  {errorMsg && (
                    <p className="text-xs text-brand-coral font-medium bg-brand-coral/10 border border-brand-coral/20 rounded-xl py-2 px-3">
                      {errorMsg}
                    </p>
                  )}
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-light-teal" />
                    <input
                      type="email"
                      placeholder="Enter your email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-brand-dark border border-brand-border rounded-xl pl-10 pr-3 py-3 text-xs text-brand-heading placeholder-[#9C9A8E] focus:outline-none focus:border-brand-teal"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                  >
                    {isSubmitting ? "Claiming your Guide..." : "Get Guide & Join Newsletter"}
                  </button>
                </form>

                <button
                  onClick={handleDismiss}
                  className="text-[10px] text-brand-light-teal/80 underline hover:text-brand-heading transition-colors"
                >
                  No thanks, I don't want the free guide
                </button>
              </div>
            ) : (
              <div className="space-y-6 relative z-10 py-4">
                {/* Success Icon */}
                <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-brand-heading">
                    Subscription Confirmed!
                  </h3>
                  <p className="text-xs text-brand-light-teal max-w-xs mx-auto leading-relaxed">
                    We have successfully dispatched a welcome confirmation to your inbox. Your clinical guide is ready below.
                  </p>
                </div>

                <div className="bg-brand-dark/20 p-4 rounded-2xl border border-brand-border flex items-center justify-between gap-3 text-left">
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase font-bold text-brand-coral block">Vytal Resource Ready</span>
                    <p className="text-xs font-bold text-brand-heading truncate">Pregnancy_Care_Guide.pdf</p>
                  </div>
                  <button
                    onClick={handleDownloadPDF}
                    className="bg-brand-teal hover:bg-brand-teal/90 text-white p-2.5 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center flex-shrink-0"
                    title="Download Guide"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={handleDismiss}
                  className="bg-brand-dark border border-brand-border text-brand-heading text-xs font-semibold px-6 py-2.5 rounded-xl hover:bg-brand-dark transition-colors cursor-pointer"
                >
                  Done, return to Vytal Bridge
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
