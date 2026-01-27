"use client";

import { motion } from "framer-motion";
import { timelineEvents } from "@/data";

export default function Timeline() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Timeline</span> of the AI Search Revolution
          </h2>
          <p className="text-zinc-400 max-w-2xl">
            From ChatGPT&apos;s launch in November 2022 to the reshaping of a
            trillion-dollar industry — every major milestone.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/30 to-transparent" />

          <div className="space-y-8">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={event.date}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="relative pl-16 sm:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-[17px] sm:left-[25px] top-2 w-4 h-4 rounded-full bg-[#12121a] border-2 border-indigo-500/60 shadow-[0_0_10px_rgba(99,102,241,0.3)]" />

                {/* Icon */}
                <div className="absolute left-0 sm:left-1 top-0 text-xl">{event.icon}</div>

                <div className="bg-[#12121a] border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300">
                  <span className="text-xs font-mono text-indigo-400 tracking-wider uppercase">
                    {event.date}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
