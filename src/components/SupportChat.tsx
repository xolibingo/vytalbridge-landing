import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Stethoscope, Building, MapPin, Check, Heart } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  time: string;
}

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Siyakwamukela! Welcome to the Vytal Bridge Clinical Support desk. How can we support your clinic or doula network today?",
      time: "Just now"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: "Is it HIPAA compliant?", reply: "Yes! Vytal Bridge runs a fully end-to-end encrypted, HIPAA-compliant architecture. No personal health records are shared with unverified external services." },
    { label: "How to run in Eswatini?", reply: "Our main regional pilot is headquartered at Manzini Medical Centre. We are currently recruiting additional maternal health clinics across Manzini and the Lubombo region." },
    { label: "Clinic partnership models", reply: "We offer complimentary dashboard access to partner clinics, doula groups, and midwives during our closed clinical beta in Fall 2026." }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newMsg: Message = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    setInput("");

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      let botReply = "Thank you for reaching out to Vytal Bridge. Your clinical inquiry has been prioritized. Feel free to call us directly at +268 76585309 or email research@vytalbridge.com.";
      
      const lower = text.toLowerCase();
      if (lower.includes("hipaa") || lower.includes("security") || lower.includes("privacy")) {
        botReply = "Absolutely. All telemetry is AES-256 encrypted end-to-end. We use a Zero-Knowledge backend to ensure clinics and mothers maintain total control of medical data.";
      } else if (lower.includes("eswatini") || lower.includes("manzini") || lower.includes("swaziland")) {
        botReply = "Our physical regional coordination desk is at the Manzini Medical Centre in Manzini, Eswatini (+268 76585309). We'd love to organize an in-person demo for local clinics.";
      } else if (lower.includes("cost") || lower.includes("free") || lower.includes("price")) {
        botReply = "During our closed beta phase, access is free for selected partner clinics. We also provide initial testing wearable batches to high-priority maternal cohorts.";
      }

      setMessages(prev => [...prev, {
        sender: "bot",
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="floating-support-chat">
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-80 sm:w-96 h-[480px] bg-white border border-brand-border rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4 relative"
            id="support-chat-window"
          >
            {/* Atmospheric pink glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-pink/20 rounded-full filter blur-2xl pointer-events-none" />

            {/* Chat Header */}
            <div className="p-4 bg-brand-light-pink/40 border-b border-brand-border flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="h-10 w-10 rounded-xl bg-brand-teal flex items-center justify-center text-white">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-heading">Clinical Support Desk</h4>
                  <p className="text-[9px] text-brand-light-teal font-medium uppercase tracking-wider">Vytal Bridge Lead Advisor</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-brand-dark text-brand-light-teal hover:text-brand-heading transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF9F6]/30 relative z-10 text-xs">
              
              {/* Eswatini Office Notice Badge */}
              <div className="bg-brand-pink/15 border border-brand-pink/30 p-2.5 rounded-xl space-y-1 text-[10px] text-brand-heading">
                <div className="flex items-center gap-1 font-bold">
                  <MapPin className="h-3 w-3 text-brand-coral" />
                  <span>Manzini Coordination Desk</span>
                </div>
                <p className="text-brand-light-teal leading-relaxed">
                  Serving Manzini, Eswatini and regional clinics. Call: <span className="font-mono font-semibold">+268 76585309</span>
                </p>
              </div>

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                    msg.sender === "user"
                      ? "bg-brand-teal text-white rounded-tr-none"
                      : "bg-white border border-brand-border text-brand-heading rounded-tl-none"
                  }`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <span className={`text-[8px] mt-1 block text-right ${
                      msg.sender === "user" ? "text-white/70" : "text-brand-light-teal"
                    }`}>{msg.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-brand-border rounded-2xl rounded-tl-none p-3 max-w-[80%] shadow-sm">
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-brand-light-teal rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-brand-light-teal rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-brand-light-teal rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Presets */}
            {messages.length === 1 && (
              <div className="p-3 bg-white border-t border-brand-border space-y-1.5 z-10">
                <span className="text-[9px] text-brand-light-teal uppercase font-bold tracking-wider block">Suggested Questions</span>
                <div className="flex flex-col gap-1">
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(p.label)}
                      className="text-left bg-brand-dark/40 hover:bg-brand-pink/15 text-[10px] text-brand-heading p-2 rounded-lg border border-brand-border/60 transition-colors cursor-pointer block truncate"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-white border-t border-brand-border flex gap-2 items-center relative z-10"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask clinical support desk..."
                className="flex-1 bg-brand-dark/20 border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-heading placeholder:text-brand-light-teal/50 focus:border-brand-pink focus:outline-none"
              />
              <button
                type="submit"
                className="bg-brand-teal text-white p-2.5 rounded-xl hover:bg-brand-teal/90 transition-all flex items-center justify-center cursor-pointer flex-shrink-0"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button with heartbeat/pulse animation effect */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-14 w-14 bg-brand-teal text-white rounded-full flex items-center justify-center shadow-lg shadow-brand-teal/20 cursor-pointer relative"
        id="support-chat-trigger"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative flex items-center justify-center"
            >
              {/* Outer pink pulse waves */}
              <div className="absolute -inset-2 rounded-full bg-brand-pink/35 animate-ping opacity-70" />
              <MessageSquare className="h-6 w-6 relative z-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
