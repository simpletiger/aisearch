"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { revenueData } from "@/data";

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] border border-zinc-700/50 rounded-xl p-4 shadow-xl">
        <p className="text-zinc-400 text-sm mb-2 font-mono">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: ${entry.value}B
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  return (
    <section className="py-40">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The <span className="gradient-text">Money</span> Behind AI Search
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Annual recurring revenue (in billions). OpenAI went from $1B to $20B in just
            two years. Anthropic&apos;s run-rate hit $5B+ by August 2025.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#12121a] border border-zinc-800/50 rounded-2xl p-6 sm:p-8 glow"
        >
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="date" stroke="#71717a" fontSize={12} fontFamily="JetBrains Mono" />
              <YAxis stroke="#71717a" fontSize={12} fontFamily="JetBrains Mono" tickFormatter={(v) => `$${v}B`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 13, fontFamily: "JetBrains Mono" }} />
              <Bar dataKey="OpenAI" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
              <Bar dataKey="Anthropic" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={32} />
              <Bar dataKey="Perplexity" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-zinc-600 mt-4 font-mono">
            Sources: CNBC, Reuters, Sacra, Business of Apps
          </p>
        </motion.div>

        {/* Valuation callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          {[
            { company: "OpenAI", valuation: "$300B+", detail: "After $40B raise, Mar 2025", color: "#6366f1" },
            { company: "Anthropic", valuation: "$350B", detail: "Planned raise, Jan 2026", color: "#f59e0b" },
            { company: "Perplexity", valuation: "$18-28B", detail: "$915M total funding", color: "#10b981" },
          ].map((item, i) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#12121a] border border-zinc-800/50 rounded-xl p-6 text-center"
            >
              <div className="text-sm text-zinc-500 mb-1 font-mono">{item.company}</div>
              <div className="text-3xl font-black font-mono" style={{ color: item.color }}>
                {item.valuation}
              </div>
              <div className="text-xs text-zinc-600 mt-1">{item.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
