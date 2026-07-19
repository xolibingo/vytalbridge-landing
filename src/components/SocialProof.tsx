import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star, CheckCircle, Shield, Award, Calendar, ChevronLeft, ChevronRight, Twitter, Linkedin, Instagram, ArrowRight, Rss, Copy, Check } from "lucide-react";
import { Testimonial } from "../types";

export default function SocialProof() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

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

  // Auto-play interval with pause-on-hover & progress bar sync
  useEffect(() => {
    if (isHovered) return;

    const duration = 6000; // 6 seconds per testimonial
    const intervalTime = 50; // Update progress bar every 50ms
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextTestimonial();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeTestimonial, isHovered]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const nextTestimonial = () => {
    setProgress(0);
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setProgress(0);
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const selectTestimonial = (index: number) => {
    setProgress(0);
    setActiveTestimonial(index);
  };

  // Helper to extract initials for creative avatars
  const getInitials = (name: string) => {
    return name
      .replace("Dr. ", "")
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("");
  };

  return (
    <div className="space-y-12" id="social-proof-section">
      {/* Clinician Advisory & Testimonials Banner */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-brand-dark-card border border-brand-border rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden transition-all duration-300 hover:border-brand-pink/40"
      >
        {/* Immersive background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-brand-teal/5 rounded-full filter blur-3xl pointer-events-none" />
        
        {/* Soft clinical grid design lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        <Quote className="absolute top-6 right-8 h-20 w-20 text-brand-pink/20 rotate-12 pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch relative z-10">
          {/* Visual Endorsement Badge */}
          <div className="w-full md:w-5/12 text-center md:text-left border-b md:border-b-0 md:border-r border-brand-border/60 pb-6 md:pb-0 md:pr-8 lg:pr-12 flex flex-col justify-between items-center md:items-start">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-semibold">
                <Award className="h-4 w-4" />
                <span>Clinical Endorsement</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-heading tracking-tight leading-snug">
                Advocated by medical experts & mothers
              </h3>
              <p className="text-xs text-brand-light-teal leading-relaxed">
                Vytal Bridge is designed in strict collaboration with certified OB/GYNs, high-risk midwives, and clinical telemetry engineers to safeguard remote pregnancy care.
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-6 p-2 rounded-xl bg-brand-light-pink border border-brand-pink/30 text-brand-coral text-[10px] font-bold tracking-wider uppercase">
              <Shield className="h-4 w-4 text-brand-coral" /> FDA-Compliant Telemetry Standard
            </div>
          </div>

          {/* Slidable testimonials (Active Carousel Area) */}
          <div className="flex-1 w-full min-h-[220px] flex flex-col justify-between">
            <div className="relative overflow-hidden flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 30, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.98 }}
                  transition={{ type: "spring", damping: 20, stiffness: 150 }}
                  className="space-y-5 cursor-grab active:cursor-grabbing"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, info) => {
                    if (info.offset.x < -60) {
                      nextTestimonial();
                    } else if (info.offset.x > 60) {
                      prevTestimonial();
                    }
                  }}
                >
                  {/* Rating Stars & Verification */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 bg-brand-light-pink/40 p-1.5 rounded-lg border border-brand-pink/20">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-brand-coral text-brand-coral" />
                      ))}
                    </div>
                    {testimonials[activeTestimonial].verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-teal uppercase tracking-widest bg-brand-teal/5 px-2.5 py-1 rounded-full border border-brand-teal/20">
                        <CheckCircle className="h-3.5 w-3.5 text-brand-teal fill-brand-teal/5" /> Verified Advocate
                      </span>
                    )}
                  </div>

                  {/* Testimonial Quote */}
                  <blockquote className="text-brand-text italic text-base sm:text-lg leading-relaxed relative font-serif">
                    "{testimonials[activeTestimonial].quote}"
                  </blockquote>

                  {/* Author Meta Details with Initials Avatar */}
                  <div className="flex items-center gap-3.5 pt-2">
                    <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-brand-teal via-brand-pink to-brand-coral p-0.5 shadow-sm flex-shrink-0">
                      <div className="h-full w-full rounded-full bg-brand-dark-card flex items-center justify-center font-mono font-bold text-xs text-brand-heading">
                        {getInitials(testimonials[activeTestimonial].name)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-heading">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <p className="text-xs text-brand-light-teal leading-none mt-0.5">
                        {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider triggers & Autoplay Indicator */}
            <div className="space-y-4 mt-6">
              {/* Telemetry Progress Bar */}
              <div className="h-1 w-full bg-brand-border/40 rounded-full overflow-hidden relative">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-brand-teal to-brand-pink"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center">
                {/* Dots Indicator */}
                <div className="flex gap-2.5">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectTestimonial(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === activeTestimonial 
                          ? "w-8 bg-brand-teal shadow-sm" 
                          : "w-2.5 bg-brand-border hover:bg-brand-pink/50"
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow Triggers */}
                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-xl bg-brand-dark border border-brand-border text-brand-light-teal hover:text-brand-coral hover:bg-brand-light-pink transition-all duration-200 cursor-pointer shadow-sm"
                    aria-label="Previous Testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-xl bg-brand-dark border border-brand-border text-brand-light-teal hover:text-brand-coral hover:bg-brand-light-pink transition-all duration-200 cursor-pointer shadow-sm"
                    aria-label="Next Testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
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
            Follow our design releases, maternal clinical studies, and official media channels across our social pipelines.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center items-center">
          {/* WhatsApp Channel */}
          <a
            href="https://whatsapp.com/channel/0029Vb8DnCF6BIEe6WbIDA0E"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3 rounded-xl bg-brand-dark hover:bg-brand-dark/80 text-brand-text flex items-center justify-center gap-2 transition-all border border-brand-border group"
            title="Join us on WhatsApp Channel"
            id="whatsapp-social-link"
          >
            <svg className="h-5 w-5 fill-current text-brand-light-teal group-hover:text-emerald-500 group-hover:scale-105 transition-all" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.765.46 3.42 1.258 4.876L2 22l5.244-1.222A9.914 9.914 0 0012.004 22c5.522 0 10.002-4.478 10.002-10.002S17.525 2 12.004 2zm0 1.636c4.613 0 8.366 3.753 8.366 8.366s-3.753 8.366-8.366 8.366a8.318 8.318 0 01-4.28-1.17l-.307-.182-3.111.724.737-3.036-.2-.318A8.32 8.32 0 013.638 12c0-4.613 3.753-8.364 8.366-8.364zm-1.848 3.518a.636.636 0 00-.46.216c-.16.177-.61.597-.61 1.455s.624 1.688.71 1.808c.088.12 1.21 1.848 2.937 2.59.412.176.732.282.983.361.414.13.79.112 1.088.068.332-.05.624-.206.81-.412.188-.206.188-.382.188-.432 0-.05-.025-.088-.063-.106l-1.3-.642c-.063-.031-.137-.025-.2.012l-.563.702c-.075.093-.15.1-.263.043-.45-.226-1.025-.563-1.463-.956-.375-.337-.625-.75-.7-.875s-.012-.188.044-.244l.325-.375c.037-.05.05-.113.025-.175L10.743 7.3c-.063-.138-.138-.138-.2-.138-.057-.006-.113-.006-.387-.006z"/>
            </svg>
            <span className="text-[11px] font-medium text-brand-text group-hover:text-brand-heading transition-colors hidden sm:inline">WhatsApp</span>
          </a>

          {/* TikTok */}
          <a
            href="https://vt.tiktok.com/ZSX9XeNjt/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3 rounded-xl bg-brand-dark hover:bg-brand-dark/80 text-brand-text flex items-center justify-center gap-2 transition-all border border-brand-border group"
            title="Follow us on TikTok"
            id="tiktok-social-link"
          >
            <svg className="h-4 w-4 fill-current text-brand-light-teal group-hover:text-pink-500 group-hover:scale-105 transition-all" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.14 1.02.99 2.44 1.53 3.86 1.61v3.86c-1.24-.08-2.47-.46-3.52-1.15-.35-.23-.68-.5-.98-.8v4.94c0 1.94-.49 3.86-1.54 5.39-1.2 1.63-3.13 2.69-5.12 2.89-2.31.18-4.65-.67-6.13-2.45C3.12 16.71 2.38 14.12 2.76 11.54c.39-2.28 1.83-4.32 3.9-5.26 1.41-.6 3-.72 4.51-.43v3.91c-.81-.19-1.68-.08-2.41.34-.84.45-1.42 1.34-1.52 2.29-.14 1.15.35 2.33 1.25 3.01.89.65 2.1.75 3.07.24.7-.35 1.15-1.07 1.2-1.85V.02z"/>
            </svg>
            <span className="text-[11px] font-medium text-brand-text group-hover:text-brand-heading transition-colors hidden sm:inline">TikTok</span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/p/Da-eDQOAdL8/?igsh=cW9xaXczYnM0cWV3"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3 rounded-xl bg-brand-dark hover:bg-brand-dark/80 text-brand-text flex items-center justify-center gap-2 transition-all border border-brand-border group"
            title="Follow us on Instagram"
            id="instagram-social-link"
          >
            <Instagram className="h-4 w-4 text-brand-light-teal group-hover:text-rose-500 group-hover:scale-105 transition-all" />
            <span className="text-[11px] font-medium text-brand-text group-hover:text-brand-heading transition-colors hidden sm:inline">Instagram</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/vytal-bridge-158a60422/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BMWPjNyvdQ3Wd3OEqTQXL1g%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3 rounded-xl bg-brand-dark hover:bg-brand-dark/80 text-brand-text flex items-center justify-center gap-2 transition-all border border-brand-border group"
            title="Connect on LinkedIn"
            id="linkedin-social-link"
          >
            <Linkedin className="h-4 w-4 text-brand-light-teal group-hover:text-blue-600 group-hover:scale-105 transition-all" />
            <span className="text-[11px] font-medium text-brand-text group-hover:text-brand-heading transition-colors hidden sm:inline">LinkedIn</span>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/1J79uV4atp/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3 rounded-xl bg-brand-dark hover:bg-brand-dark/80 text-brand-text flex items-center justify-center gap-2 transition-all border border-brand-border group"
            title="Follow on Facebook"
            id="facebook-social-link"
          >
            <svg className="h-4.5 w-4.5 fill-current text-brand-light-teal group-hover:text-blue-600 group-hover:scale-105 transition-all" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
            </svg>
            <span className="text-[11px] font-medium text-brand-text group-hover:text-brand-heading transition-colors hidden sm:inline">Facebook</span>
          </a>

          <div className="h-6 w-px bg-brand-border mx-1 hidden lg:block" />

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
