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
} from "recharts";
import { platformGrowth } from "@/data";

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] border border-zinc-700/50 rounded-xl p-4 shadow-xl">
        <p className="text-zinc-400 text-sm mb-2 font-mono">{label}</p>
        {payload.map((entry) => (
          <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}M users
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function UserGrowthChart() {
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
            <span className="gradient-text">User Growth</span> Across Platforms
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Monthly active users (millions) for the major AI search platforms.
            ChatGPT leads but Gemini is closing the gap fast with 650M total users
            by late 2025.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#12121a] border border-zinc-800/50 rounded-2xl p-6 sm:p-8 glow"
        >
          <ResponsiveContainer width="100%" height={450}>
            <AreaChart data={platformGrowth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorChatGPT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorGemini" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorClaude" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPerplexity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="date" stroke="#71717a" fontSize={12} fontFamily="JetBrains Mono" />
              <YAxis stroke="#71717a" fontSize={12} fontFamily="JetBrains Mono" tickFormatter={(v) => `${v}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 13, fontFamily: "JetBrains Mono" }} />
              <Area type="monotone" dataKey="ChatGPT" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorChatGPT)" />
              <Area type="monotone" dataKey="Gemini" stroke="#06b6d4" strokeWidth={2.5} fill="url(#colorGemini)" />
              <Area type="monotone" dataKey="Claude" stroke="#f59e0b" strokeWidth={2.5} fill="url(#colorClaude)" />
              <Area type="monotone" dataKey="Perplexity" stroke="#10b981" strokeWidth={2.5} fill="url(#colorPerplexity)" />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-zinc-600 mt-4 font-mono">
            Sources: DemandSage, Business of Apps, SQ Magazine, TechCrunch, PYMNTS
          </p>
        </motion.div>
      </div>
    </section>
  );
}
