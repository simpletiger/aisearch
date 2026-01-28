"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SubscribeModal from "./SubscribeModal";

export default function Hero() {
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-mono tracking-widest uppercase text-orange-400 mb-6">
            Data Journalism · January 2026
          </p>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-8">
            <span className="gradient-text">The AI Search</span>
            <br />
            <span className="text-white">Report</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            In just two years, AI-powered search has exploded from a novelty to a force
            reshaping how billions of people find information. This is the data behind
            the biggest disruption to search in 25 years.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-6 text-sm font-mono text-zinc-500"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              800M ChatGPT users
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              17% of all queries
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
              $20B OpenAI revenue
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <button
            onClick={() => setShowSubscribe(true)}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 cursor-pointer"
          >
            Subscribe for Monthly Updates
          </button>

          <a
            href="#stats"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-400 transition-colors text-sm"
          >
            <span>Scroll to explore</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ↓
            </motion.span>
          </a>
        </motion.div>
      </div>

      <SubscribeModal 
        isOpen={showSubscribe} 
        onClose={() => setShowSubscribe(false)} 
      />
    </section>
  );
}
