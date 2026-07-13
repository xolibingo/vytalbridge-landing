import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, CheckCircle, Shield, Award, Calendar, ChevronLeft, ChevronRight, Twitter, Linkedin, Instagram, ArrowRight, Rss, Copy, Check } from "lucide-react";
import { Testimonial } from "../types";

export default function SocialProof() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: "t1",
      name: "Dr. Sarah Jenkins, MFM Specialist",
      role: "Maternal-Fetal Medicine Expert, Stanford Health",
      quote: "Continuous vitals logging is the missing bridge in high-risk maternal care. Vytal Bridge provides clinicians with high-quality telemetry, and expecting mothers with unprecedented security.",
      rating: 5,
      verified: true
    },
    {
      id: "t2",
      name: "Clara Thompson",
      role: "Expecting mother of twins (Week 28)",
      quote: "Knowing that Vytal Bridge automatically logs my blood pressure trends and baby heart rate gives me absolute peace of mind. It feels like having my clinical care team right by my side.",
      rating: 5,
      verified: true
    },
    {
      id: "t3",
      name: "Aiden Carter, Certified Doula",
      role: "Birth Advocate & Founder, Nest Maternal Care",
      quote: "Labor can be overwhelming. Vytal's contraction compass simplifies everything, allowing families to confidently navigate early labor signals and reduce unnecessary early hospital visits.",
      rating: 5,
      verified: true
    }
  ];

  const milestones = [
    {
      quarter: "Q1 2026",
      title: "Wearable Sync & Core Architecture",
      status: "completed",
      desc: "Completed secure bluetooth firmware integrations with FDA-cleared vital monitors."
    },
    {
      quarter: "Q2 2026",
      title: "Clinical Observational Pilot",
      status: "completed",
      desc: "Ran a 150-mother pilot verifying telemetry accuracy and low-latency routing."
    },
    {
      quarter: "Q3 2026",
      title: "Closed Beta Early Cohort",
      status: "active",
      desc: "Opening waiting list slots to enroll 500 expecting mothers and clinic partners."
    },
    {
      quarter: "Q4 2026",
      title: "Official App Store Launch",
      status: "upcoming",
      desc: "Full launch of iOS and Android applications with live doctor-routing nodes."
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="space-y-12" id="social-proof-section">
      {/* Clinician Advisory & Testimonials Banner */}
      <div className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-brand-teal/5 rounded-full filter blur-2xl pointer-events-none" />
        <Quote className="absolute top-6 right-8 h-20 w-20 text-brand-accent-beige/20 rotate-12 pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Visual Endorsement Badge */}
          <div className="w-full md:w-1/3 text-center md:text-left border-b md:border-b-0 md:border-r border-brand-border pb-6 md:pb-0 md:pr-8 flex flex-col justify-center items-center md:items-start">
            <div className="h-12 w-12 rounded-full bg-brand-coral/10 text-brand-coral flex items-center justify-center mb-4">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-heading tracking-tight">
              Clinical & Advocate Endorsement
            </h3>
            <p className="text-xs text-brand-light-teal mt-2 leading-relaxed">
              Vytal Bridge is designed in strict consultation with OB/GYNs, midwives, and remote monitoring engineers.
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-brand-teal text-xs font-semibold">
              <Shield className="h-4 w-4 text-brand-teal" /> FDA-Compliant Telemetry Standard
            </div>
          </div>

          {/* Slidable testimonials */}
          <div className="flex-1 w-full min-h-[160px] flex flex-col justify-between">
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-coral text-brand-coral" />
                    ))}
                  </div>

                  <p className="text-brand-text italic text-sm sm:text-base leading-relaxed">
                    "{testimonials[activeTestimonial].quote}"
                  </p>

                  <div className="flex items-center gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-brand-heading flex items-center gap-1.5">
                        {testimonials[activeTestimonial].name}
                        {testimonials[activeTestimonial].verified && (
                          <CheckCircle className="h-3.5 w-3.5 text-brand-teal" title="Verified Advisor" />
                        )}
                      </h4>
                      <p className="text-xs text-brand-light-teal">
                        {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider triggers */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-brand-border">
              <span className="text-xs text-brand-light-teal font-mono">
                {activeTestimonial + 1} / {testimonials.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-1.5 rounded-lg bg-brand-dark border border-brand-border text-brand-light-teal hover:text-brand-teal transition-all cursor-pointer"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-1.5 rounded-lg bg-brand-dark border border-brand-border text-brand-light-teal hover:text-brand-teal transition-all cursor-pointer"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Milestones Timeline */}
      <div className="space-y-6" id="milestones-box">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-serif font-bold text-brand-heading tracking-tight flex items-center justify-center md:justify-start gap-2">
            <Calendar className="h-5 w-5 text-brand-teal" /> Our Launch Roadmap
          </h3>
          <p className="text-sm text-brand-light-teal mt-1">
            See our incremental progress towards establishing safe, clinical remote maternal observation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {milestones.map((milestone, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all relative ${
                milestone.status === "active"
                  ? "bg-brand-dark-card border-brand-teal ring-1 ring-brand-teal/20 shadow-md"
                  : milestone.status === "completed"
                  ? "bg-brand-dark-card border-brand-border shadow-sm opacity-90"
                  : "bg-brand-dark/40 border-brand-border opacity-70"
              }`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono font-bold text-brand-coral">{milestone.quarter}</span>
                {milestone.status === "completed" && (
                  <span className="bg-brand-accent-beige text-brand-teal border border-brand-teal/15 px-2 py-0.5 rounded text-[10px] font-semibold">Done</span>
                )}
                {milestone.status === "active" && (
                  <span className="bg-brand-coral/15 text-brand-coral px-2 py-0.5 rounded text-[10px] font-semibold animate-pulse border border-brand-coral/10">Enrolling</span>
                )}
                {milestone.status === "upcoming" && (
                  <span className="bg-brand-dark text-brand-light-teal px-2 py-0.5 rounded text-[10px] font-semibold border border-brand-border">Pending</span>
                )}
              </div>
              <h4 className="text-sm font-semibold text-brand-heading tracking-tight leading-snug">{milestone.title}</h4>
              <p className="text-xs text-brand-text mt-1.5 leading-normal">{milestone.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Social Profiles & Share Node */}
      <div className="bg-brand-dark-card border border-brand-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm" id="social-connectivity-card">
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="text-lg font-serif font-bold text-brand-heading">Join the Vytal Core Community</h3>
          <p className="text-xs text-brand-text max-w-md">
            Follow our design releases, maternal clinical studies, and medical advice publications across our social pipelines.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center items-center">
          {/* Twitter Link */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-xl bg-brand-dark hover:bg-brand-dark/80 text-brand-text flex items-center justify-center transition-all border border-brand-border group"
            title="Follow us on Twitter"
            id="twitter-social-link"
          >
            <Twitter className="h-5 w-5 text-brand-light-teal group-hover:text-sky-600 group-hover:scale-105 transition-all" />
          </a>

          {/* LinkedIn Link */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-xl bg-brand-dark hover:bg-brand-dark/80 text-brand-text flex items-center justify-center transition-all border border-brand-border group"
            title="Connect on LinkedIn"
            id="linkedin-social-link"
          >
            <Linkedin className="h-5 w-5 text-brand-light-teal group-hover:text-blue-600 group-hover:scale-105 transition-all" />
          </a>

          {/* Instagram Link */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-xl bg-brand-dark hover:bg-brand-dark/80 text-brand-text flex items-center justify-center transition-all border border-brand-border group"
            title="Follow on Instagram"
            id="instagram-social-link"
          >
            <Instagram className="h-5 w-5 text-brand-light-teal group-hover:text-rose-500 group-hover:scale-105 transition-all" />
          </a>

          {/* Substack Link */}
          <a
            href="https://substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-xl bg-brand-dark hover:bg-brand-dark/80 text-brand-text flex items-center justify-center transition-all border border-brand-border group"
            title="Read our Substack Publication"
            id="substack-social-link"
          >
            <Rss className="h-5 w-5 text-brand-light-teal group-hover:text-amber-600 group-hover:scale-105 transition-all" />
          </a>

          <div className="h-6 w-px bg-brand-border mx-1 hidden sm:block" />

          {/* Copy URL */}
          <button
            onClick={handleCopyLink}
            className="bg-brand-teal text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 hover:bg-brand-teal/90 transition-all cursor-pointer shadow-md shadow-brand-teal/5 border border-transparent"
            title="Copy Page URL to Clipboard"
            id="share-app-url-btn"
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Share Page
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
