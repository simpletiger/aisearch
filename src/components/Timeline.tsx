"use client";

import { motion } from "framer-motion";
import { timelineEvents } from "@/data";

export default function Timeline() {
  return (
    <section className="py-40">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Timeline</span> of the AI Search Revolution
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            From ChatGPT&apos;s launch in November 2022 to the reshaping of a
            trillion-dollar industry — every major milestone.
          </p>
        </motion.div>

        <div className="relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 via-amber-500/30 to-transparent hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {timelineEvents.map((event, i) => {
              const isLeft = i % 2 === 0;
              
              return (
                <motion.div
                  key={event.date}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className={`relative md:flex md:items-center md:gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } md:mb-12`}
                >
                  {/* Content card */}
                  <div className={`md:w-[calc(50%-2rem)] ${isLeft ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-[#12121a] border border-zinc-800/50 rounded-xl p-6 hover:border-orange-500/30 transition-all duration-300">
                      <div className={`flex items-center gap-3 mb-2 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
                        <span className="text-2xl">{event.icon}</span>
                        <span className="text-xs font-mono text-orange-400 tracking-wider uppercase">
                          {event.date}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot - hidden on mobile */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0a0f] border-2 border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)] z-10" />

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
