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
  AreaChart,
  Area,
} from "recharts";
import { aiOverviewsGrowth, ctrImpact } from "@/data";

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

export default function ImpactSection() {
  const impactStats = [
    {
      stat: "61%",
      label: "CTR Decline",
      desc: "Click-through rates dropped 61% on results with AI Overviews",
      source: "DataSlayer",
      color: "#ef4444",
    },
    {
      stat: "⅓",
      label: "Publisher Traffic Lost",
      desc: "Global publisher Google traffic dropped by a third in 2025",
      source: "Press Gazette",
      color: "#f59e0b",
    },
    {
      stat: "79%",
      label: "Top Link CTR Drop",
      desc: "The #1 organic result loses 79% of its CTR when AI Overviews appear",
      source: "Authoritas",
      color: "#ef4444",
    },
    {
      stat: "475%",
      label: "AI Overview Surge",
      desc: "Year-over-year increase in AI Overview visibility on mobile (Sep 2024→Sep 2025)",
      source: "seoClarity",
      color: "#6366f1",
    },
  ];

  return (
    <section className="py-32 px-6 bg-[#08080d]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Impact on{" "}
            <span className="gradient-text">Traditional Search</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            The rise of AI search isn&apos;t just adding new options — it&apos;s actively
            cannibalizing traditional search traffic. Publishers and businesses are
            feeling the squeeze.
          </p>
        </motion.div>

        {/* Impact stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactStats.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#12121a] border border-zinc-800/50 rounded-2xl p-6"
            >
              <div
                className="text-4xl font-black font-mono mb-2"
                style={{ color: item.color }}
              >
                {item.stat}
              </div>
              <div className="text-white font-semibold mb-2">{item.label}</div>
              <div className="text-sm text-zinc-500 mb-3">{item.desc}</div>
              <div className="text-xs text-zinc-600 font-mono">Source: {item.source}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Overviews Growth */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#12121a] border border-zinc-800/50 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-lg font-semibold mb-2 text-zinc-300">
              AI Overviews in US Search Results
            </h3>
            <p className="text-sm text-zinc-500 mb-6">
              From 2% to 60% in 18 months
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={aiOverviewsGrowth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAIO" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} fontFamily="JetBrains Mono" />
                <YAxis stroke="#71717a" fontSize={11} fontFamily="JetBrains Mono" tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="percent"
                  name="AI Overview Presence"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fill="url(#colorAIO)"
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-xs text-zinc-600 mt-2 font-mono">
              Sources: Digital Bloom, Xponent21, seoClarity
            </p>
          </motion.div>

          {/* CTR Impact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#12121a] border border-zinc-800/50 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-lg font-semibold mb-2 text-zinc-300">
              Click-Through Rate Impact
            </h3>
            <p className="text-sm text-zinc-500 mb-6">
              CTR with vs without AI Overviews (Sep 2025)
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ctrImpact} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="category" stroke="#71717a" fontSize={11} fontFamily="JetBrains Mono" />
                <YAxis stroke="#71717a" fontSize={11} fontFamily="JetBrains Mono" tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="organic" name="Organic CTR" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="paid" name="Paid CTR" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-zinc-600 mt-2 font-mono">
              Source: Seer Interactive, Digital Bloom
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
