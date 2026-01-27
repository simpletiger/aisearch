"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { marketShare, intentData, ageData } from "@/data";

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] border border-zinc-700/50 rounded-xl p-4 shadow-xl">
        <p className="text-zinc-400 text-sm mb-2 font-mono">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MarketShareChart() {
  return (
    <section className="py-40 bg-[#08080d]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Market Share</span> — Google&apos;s Grip Loosens
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Google&apos;s search market share fell below 90% for the first time since 2015
            in Q4 2024. By Q4 2025, ChatGPT alone commands 17% of all digital queries.
          </p>
        </motion.div>

        {/* Main market share chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#12121a] border border-zinc-800/50 rounded-2xl p-6 sm:p-8 glow mb-12"
        >
          <h3 className="text-lg font-semibold mb-6 text-zinc-300">Share of Total Digital Queries (%)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={marketShare} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGoogle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="date" stroke="#71717a" fontSize={12} fontFamily="JetBrains Mono" />
              <YAxis stroke="#71717a" fontSize={12} fontFamily="JetBrains Mono" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 13, fontFamily: "JetBrains Mono" }} />
              <Area type="monotone" dataKey="Google" stroke="#ef4444" strokeWidth={2.5} fill="url(#colorGoogle)" />
              <Area type="monotone" dataKey="ChatGPT" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorAI)" />
              <Area type="monotone" dataKey="Other" stroke="#71717a" strokeWidth={1.5} fill="none" strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-zinc-600 mt-4 font-mono">
            Source: First Page Sage, StatCounter, SparkToro
          </p>
        </motion.div>

        {/* Two smaller charts side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* By Intent */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#12121a] border border-zinc-800/50 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-lg font-semibold mb-2 text-zinc-300">By Search Intent</h3>
            <p className="text-sm text-zinc-500 mb-6">ChatGPT dominates creative queries (64%)</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={intentData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" stroke="#71717a" fontSize={11} fontFamily="JetBrains Mono" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="intent" stroke="#71717a" fontSize={11} fontFamily="JetBrains Mono" width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Google" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={16} />
                <Bar dataKey="ChatGPT" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-zinc-600 mt-2 font-mono">Source: First Page Sage Q4 2025</p>
          </motion.div>

          {/* By Age */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#12121a] border border-zinc-800/50 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-lg font-semibold mb-2 text-zinc-300">By Age Group</h3>
            <p className="text-sm text-zinc-500 mb-6">Younger users adopt AI search faster</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                <XAxis type="number" stroke="#71717a" fontSize={11} fontFamily="JetBrains Mono" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="age" stroke="#71717a" fontSize={11} fontFamily="JetBrains Mono" width={60} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Google" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={16} />
                <Bar dataKey="ChatGPT" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-zinc-600 mt-2 font-mono">Source: First Page Sage Q4 2025</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
