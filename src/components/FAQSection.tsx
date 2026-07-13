import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Lock, ShieldCheck, HelpCircle, HeartHandshake, Gift, Zap } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How does Vytal Bridge safeguard my healthcare data and privacy?",
      category: "Privacy & Security",
      icon: <Lock className="h-4 w-4 text-brand-coral" />,
      answer: "Your security is our absolute priority. Vytal Bridge implements a military-grade, fully HIPAA-compliant architecture. All vitals telemetry, communication channels, and identity markers are fully encrypted end-to-end using industry-leading AES-256 protocols. We strictly enforce a Zero-Knowledge backend—meaning we do not sell, rent, or distribute your healthcare profiles to third-party insurance agencies, marketing firms, or data brokers. You retain absolute ownership of your clinical records."
    },
    {
      question: "Who is the primary target audience for this maternal ecosystem?",
      category: "Target Audience",
      icon: <HeartHandshake className="h-4 w-4 text-brand-teal" />,
      answer: "Vytal Bridge is built for expecting mothers, high-risk maternal patients, and proactive healthcare networks (including OB/GYNs, family midwives, doulas, and birth partners). Our ecosystem bridges the critical data blindspot between traditional clinical appointments, offering safety for families who desire continuous, high-fidelity vitals assurance and automated clinical alert pipelines in their own home."
    },
    {
      question: "What vital metrics does the app monitor, and which wearables are supported?",
      category: "Functionality",
      icon: <ShieldCheck className="h-4 w-4 text-brand-teal" />,
      answer: "The app integrates with leading FDA-cleared and consumer-grade maternal wearables, Bluetooth-enabled blood pressure cuffs, and wearable oxygen sensors. It gathers high-fidelity readings like maternal heart rate, maternal systolic/diastolic blood pressure, fetal pulse, and contraction intervals. It converts these complex data points into clear, real-time feedback loops and securely transmits telemetry to clinical dashboards in case targets exceed safe parameters."
    },
    {
      question: "What is the timeline for the closed clinical beta and official launch?",
      category: "Launch Details",
      icon: <Zap className="h-4 w-4 text-brand-coral" />,
      answer: "Our closed clinical beta will commence in Fall 2026 (tracked in real-time by the countdown timer at the top of our platform). Registering on our waiting list secures your prioritized spot in our launch queue. Initial batches of wearable integrations will be distributed on a rolling basis, starting with early-access waitlist members."
    },
    {
      question: "How does the referral program work and what are the rewards?",
      category: "Referrals",
      icon: <Gift className="h-4 w-4 text-brand-teal" />,
      answer: "Our referral program helps expecting families and clinics gain faster access. Upon signing up for the waitlist, you will receive a unique referral link. For every friend who registers using your link, you will bypass 3 people in the queue, earning 'Priority Launch Access' and immediate eligibility for our early-round complimentary wearable trial packages on launch day. You can track your referral sign-ups and real-time rank directly via our dynamic queue search tool."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden space-y-8" id="faq-section">
      {/* Soft translucent pink atmospheric background glow to add warmth */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-pink/15 rounded-full filter blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-light-pink/20 rounded-full filter blur-[100px] pointer-events-none" />

      {/* FAQ Header */}
      <div className="text-center md:text-left space-y-3 relative z-10">
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-pink/20 text-brand-heading border border-brand-pink/30 uppercase tracking-wider">
          <HelpCircle className="h-3.5 w-3.5 mr-1.5 text-brand-coral" /> Frequently Asked Questions
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-heading tracking-tight">
          Common Questions & Clinical Safeguards
        </h2>
        <p className="text-brand-light-teal text-sm sm:text-base max-w-2xl">
          Learn how we are engineering the first responsive ecosystem for maternal safety, safeguarding patient telemetry, and structuring early launch priority.
        </p>
      </div>

      {/* Accordion Questions */}
      <div className="space-y-4 relative z-10" id="faq-accordion-container">
        {faqs.map((faq, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <div
              key={idx}
              className={`border rounded-2xl transition-all duration-300 ${
                isOpen
                  ? "border-brand-pink bg-brand-light-pink/40 shadow-sm"
                  : "border-brand-border bg-white hover:bg-brand-light-pink/10"
              }`}
              id={`faq-item-${idx}`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full text-left p-5 sm:p-6 flex justify-between items-start gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex gap-4">
                  <div className={`p-2.5 rounded-xl flex-shrink-0 transition-colors ${
                    isOpen ? "bg-white border border-brand-pink/40 text-brand-coral" : "bg-brand-dark border border-brand-border text-brand-light-teal"
                  }`}>
                    {faq.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-light-teal block mb-1">
                      {faq.category}
                    </span>
                    <h4 className="text-base font-semibold text-brand-heading leading-snug">
                      {faq.question}
                    </h4>
                  </div>
                </div>
                <div className={`p-1 rounded-lg transition-transform duration-300 ${
                  isOpen ? "rotate-180 bg-brand-pink/30 text-brand-coral" : "text-brand-light-teal bg-brand-dark"
                }`}>
                  <ChevronDown className="h-5 w-5" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-brand-text leading-relaxed border-t border-brand-border/40 pl-5 sm:pl-16">
                      <p className="bg-white/50 p-4 rounded-xl border border-brand-border/30">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
