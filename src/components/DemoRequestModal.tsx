import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Building2, User, Mail, Phone, MessageSquare, Calendar, CheckCircle2, ShieldAlert } from "lucide-react";

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
  const [clinicName, setClinicName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinicName || !contactName || !email || !phoneNumber) {
      setError("Please fill out all required clinical contact fields.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const handleReset = () => {
    setClinicName("");
    setContactName("");
    setEmail("");
    setPhoneNumber("");
    setNotes("");
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/85 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-white border border-brand-border rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative z-10"
            id="demo-modal-container"
          >
            {/* Atmospheric light pink glow in the top-right corner of the modal */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-pink/20 rounded-full filter blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="p-6 border-b border-brand-border/60 flex justify-between items-center bg-brand-light-pink/10 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-brand-pink/20 border border-brand-pink/40 text-brand-heading rounded-xl">
                  <Calendar className="h-5 w-5 text-brand-coral" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-brand-heading">Request Dashboard Demo</h3>
                  <p className="text-[10px] uppercase tracking-wider text-brand-light-teal font-semibold">For Clinics & Care Networks</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-brand-dark text-brand-light-teal hover:text-brand-heading transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 relative z-10">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-xs text-brand-text leading-relaxed">
                    Request a high-fidelity virtual demonstration of the **Vytal Bridge** maternal vitals hub, clinician dashboards, and patient-reported outcomes telemetry.
                  </p>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-red-600 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Clinic Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-brand-light-teal tracking-wider block">
                      Clinic / Healthcare Institution *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-light-teal" />
                      <input
                        type="text"
                        required
                        value={clinicName}
                        onChange={(e) => setClinicName(e.target.value)}
                        placeholder="e.g., Manzini Health Clinic"
                        className="w-full bg-brand-dark/20 border border-brand-border rounded-xl py-2.5 pl-10 pr-4 text-xs text-brand-heading placeholder:text-brand-light-teal/60 focus:border-brand-pink focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Contact Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-brand-light-teal tracking-wider block">
                      Contact Person *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-light-teal" />
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g., Dr. Thabo Dlamini"
                        className="w-full bg-brand-dark/20 border border-brand-border rounded-xl py-2.5 pl-10 pr-4 text-xs text-brand-heading placeholder:text-brand-light-teal/60 focus:border-brand-pink focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email & Phone side-by-side on larger screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Professional Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-brand-light-teal tracking-wider block">
                        Professional Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-light-teal" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g., dlamini@health.org"
                          className="w-full bg-brand-dark/20 border border-brand-border rounded-xl py-2.5 pl-10 pr-4 text-xs text-brand-heading placeholder:text-brand-light-teal/60 focus:border-brand-pink focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-brand-light-teal tracking-wider block">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-light-teal" />
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="e.g., +268 76585309"
                          className="w-full bg-brand-dark/20 border border-brand-border rounded-xl py-2.5 pl-10 pr-4 text-xs text-brand-heading placeholder:text-brand-light-teal/60 focus:border-brand-pink focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-brand-light-teal tracking-wider block">
                      Specific Integration Needs / Scale (Optional)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-brand-light-teal" />
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g., Seeking continuous blood pressure integration for 40 patient cohorts."
                        rows={3}
                        className="w-full bg-brand-dark/20 border border-brand-border rounded-xl py-2.5 pl-10 pr-4 text-xs text-brand-heading placeholder:text-brand-light-teal/60 focus:border-brand-pink focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white text-xs font-semibold py-3 rounded-xl transition-all cursor-pointer shadow-md shadow-brand-teal/10 flex items-center justify-center gap-2"
                    >
                      <span>Submit Request for Proposal & Demo</span>
                    </button>
                    <p className="text-[10px] text-brand-light-teal/80 text-center mt-3">
                      By submitting, you agree to our HIPAA institutional sandbox terms.
                    </p>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-serif font-bold text-brand-heading">Demo Request Submitted!</h4>
                    <p className="text-xs text-brand-text leading-relaxed max-w-sm mx-auto">
                      Thank you, <strong className="text-brand-heading">{contactName}</strong>. We have registered <strong className="text-brand-heading">{clinicName}</strong> for a dedicated Vytal Bridge dashboard walkthrough.
                    </p>
                    <p className="text-xs text-brand-light-teal bg-brand-dark/35 border border-brand-border/60 p-3 rounded-xl max-w-sm mx-auto">
                      Our institutional relations team will contact you at <span className="font-semibold text-brand-teal">{email}</span> within 24 hours to coordinate a convenient live video sandbox review.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="bg-brand-heading text-white px-6 py-2.5 rounded-xl text-xs font-semibold hover:bg-brand-heading/90 transition-all shadow-sm"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
