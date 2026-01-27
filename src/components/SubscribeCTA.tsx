"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SubscribeModal from "./SubscribeModal";

export default function SubscribeCTA() {
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <>
      <section className="py-40">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-[#1a1020] via-[#12121a] to-[#0f1a18] p-10 sm:p-14 text-center"
          >
            {/* Background glow effects */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="text-4xl mb-6">🔍</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Don&apos;t Fall Behind on{" "}
                <span className="gradient-text">AI Search</span>
              </h3>
              <p className="text-zinc-300 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Subscribe now and we&apos;ll send you an update once a month so you
                don&apos;t fall behind in your AI Search strategy.
              </p>
              <button
                onClick={() => setShowSubscribe(true)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm hover:from-orange-400 hover:to-amber-400 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 cursor-pointer"
              >
                Subscribe for Monthly Updates
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <SubscribeModal
        isOpen={showSubscribe}
        onClose={() => setShowSubscribe(false)}
      />
    </>
  );
}
