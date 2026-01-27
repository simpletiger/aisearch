"use client";

import { motion } from "framer-motion";
import { keyStats } from "@/data";

export default function KeyStats() {
  return (
    <section id="stats" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The Numbers That{" "}
            <span className="gradient-text">Define the Shift</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl">
            Key statistics that capture the scale and speed of AI search&apos;s
            rise as of late 2025.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <div className="bg-[#12121a] border border-zinc-800/50 rounded-2xl p-8 hover:border-zinc-700/50 transition-all duration-300 glow-hover h-full">
                <div
                  className="text-5xl sm:text-6xl font-black mb-3 font-mono"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-white font-semibold text-lg mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-zinc-500">{stat.subtext}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
