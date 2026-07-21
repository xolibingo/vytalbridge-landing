import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Copy, CheckCircle2, ClipboardList, Sparkles, Send, MessageSquare } from "lucide-react";
import { addSurveyResponse } from "../lib/db";

// External survey link URL
export const SURVEY_FORM_URL = "https://tally.so/r/gD1yQd";

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Expecting Mother / Parent");
  const [priorityTopic, setPriorityTopic] = useState("Blood Pressure & Pre-eclampsia");
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    // Check if user has already seen or dismissed the popup in this session
    const isDismissed = sessionStorage.getItem("vytal_exit_popup_dismissed");
    if (isDismissed) return;

    // 1. Desktop Exit Intent (Mouse leaves top of screen)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 25) {
        setIsVisible(true);
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(SURVEY_FORM_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleOpenSurvey = () => {
    window.open(SURVEY_FORM_URL, "_blank", "noopener,noreferrer");
  };

  const handleSubmitSurvey = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!feedbackText.trim() && !email.trim()) {
      setErrorMsg("Please provide a quick comment or your email to submit.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addSurveyResponse(email, role, priorityTopic, feedbackText);
      setIsSuccess(true);
      sessionStorage.setItem("vytal_exit_popup_dismissed", "true");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit survey. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto" id="exit-intent-overlay">
          {/* Backdrop blur/dim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-brand-heading/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="bg-brand-dark-card border-2 border-brand-pink/50 rounded-[32px] w-full max-w-lg shadow-2xl p-6 sm:p-8 relative overflow-hidden text-center my-8 z-10 max-h-[90vh] overflow-y-auto"
            id="exit-intent-modal"
          >
            {/* Elegant Background Blobs */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-pink/20 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-brand-teal/10 rounded-full filter blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-brand-dark/40 text-brand-light-teal hover:text-brand-heading transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {!isSuccess ? (
              <div className="space-y-5 relative z-10">
                {/* Visual Icon */}
                <div className="mx-auto h-14 w-14 rounded-2xl bg-brand-dark flex items-center justify-center text-brand-coral border border-brand-pink/30 relative">
                  <div className="absolute -top-1 -right-1 animate-bounce">
                    <Sparkles className="h-4 w-4 text-brand-coral fill-brand-coral" />
                  </div>
                  <ClipboardList className="h-7 w-7" />
                </div>

                {/* Catchy Header */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-brand-coral bg-brand-pink/20 px-2.5 py-1 rounded-full border border-brand-pink/35 uppercase tracking-wider">
                    Community Survey
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-heading tracking-tight">
                    Before you go...
                  </h3>
                  <p className="text-brand-light-teal text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                    Help us shape maternal healthcare in Eswatini! Complete our quick 1-minute survey or open the survey form.
                  </p>
                </div>

                {/* Primary Action Card: Open External Survey Form Link */}
                <div className="bg-brand-dark/60 p-4 rounded-2xl border border-brand-border text-left space-y-3 shadow-inner">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase font-bold text-brand-coral block">Official Feedback Form</span>
                      <p className="text-xs font-bold text-brand-heading truncate">Vytal Bridge Community Survey</p>
                    </div>
                    <button
                      onClick={handleOpenSurvey}
                      className="bg-brand-teal hover:bg-brand-teal/90 text-white px-3 py-2 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5 text-xs font-bold shrink-0"
                    >
                      <span>Open Form</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-brand-light-teal pt-1 border-t border-brand-border/40">
                    <span className="truncate pr-2 font-mono text-[9.5px]">{SURVEY_FORM_URL}</span>
                    <button
                      onClick={handleCopyLink}
                      className="text-brand-coral hover:underline flex items-center gap-1 font-semibold shrink-0 cursor-pointer"
                    >
                      <Copy className="h-3 w-3" />
                      {copiedLink ? "Copied!" : "Copy link"}
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-brand-border/60 w-full" />
                  <span className="bg-brand-dark-card px-3 text-[10px] uppercase font-bold text-brand-light-teal/80 shrink-0">
                    Or fill out quick survey here
                  </span>
                </div>

                {/* Quick Embedded Survey Form */}
                <form onSubmit={handleSubmitSurvey} className="space-y-3 text-left">
                  {errorMsg && (
                    <p className="text-xs text-brand-coral font-medium bg-brand-coral/10 border border-brand-coral/20 rounded-xl py-2 px-3">
                      {errorMsg}
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-brand-light-teal mb-1">
                        I am an:
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-heading focus:outline-none focus:border-brand-teal cursor-pointer"
                      >
                        <option value="Expecting Mother / Parent">Expecting Mother / Parent</option>
                        <option value="Healthcare Worker / Midwife">Healthcare Worker / Midwife</option>
                        <option value="Clinical Partner">Clinical Partner / OBGYN</option>
                        <option value="Community Advocate">Community Advocate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-brand-light-teal mb-1">
                        Top Monitoring Need:
                      </label>
                      <select
                        value={priorityTopic}
                        onChange={(e) => setPriorityTopic(e.target.value)}
                        className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-heading focus:outline-none focus:border-brand-teal cursor-pointer"
                      >
                        <option value="Blood Pressure & Pre-eclampsia">Blood Pressure & Pre-eclampsia</option>
                        <option value="Fetal Movement & Kick Counter">Fetal Movement & Kick Counter</option>
                        <option value="Remote Midwife Consultation">Remote Midwife Consultation</option>
                        <option value="Emergency Alert Escalation">Emergency Alert Escalation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-light-teal mb-1">
                      Your feedback or suggestions:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="What features or care support would help most?"
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="w-full bg-brand-dark border border-brand-border rounded-xl p-2.5 text-xs text-brand-heading placeholder-[#9C9A8E] focus:outline-none focus:border-brand-teal resize-none"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Your email address (optional for updates)..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-brand-dark border border-brand-border rounded-xl px-3 py-2.5 text-xs text-brand-heading placeholder-[#9C9A8E] focus:outline-none focus:border-brand-teal"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {isSubmitting ? "Submitting Survey..." : "Submit Survey Feedback"}
                  </button>
                </form>

                <button
                  onClick={handleDismiss}
                  className="text-[10px] text-brand-light-teal/80 underline hover:text-brand-heading transition-colors pt-1 block mx-auto cursor-pointer"
                >
                  No thanks, skip survey for now
                </button>
              </div>
            ) : (
              <div className="space-y-6 relative z-10 py-4">
                {/* Success Icon */}
                <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                  <MessageSquare className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-brand-heading">
                    Survey Submitted!
                  </h3>
                  <p className="text-xs text-brand-light-teal max-w-xs mx-auto leading-relaxed">
                    Thank you for sharing your invaluable feedback. Your responses directly guide our maternal telemetry development.
                  </p>
                </div>

                <div className="bg-brand-dark/40 p-4 rounded-2xl border border-brand-border space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-brand-coral uppercase">Share Survey Link</span>
                    <button
                      onClick={handleCopyLink}
                      className="text-[10px] text-brand-teal font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="h-3 w-3" />
                      {copiedLink ? "Link Copied!" : "Copy Survey URL"}
                    </button>
                  </div>
                  <button
                    onClick={handleOpenSurvey}
                    className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>View Full External Survey Form</span>
                    <ExternalLink className="h-3.5 w-3.5" />
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
