"use client";

import { motion } from "framer-motion";
import { sources } from "@/data";

export default function Sources() {
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
            <span className="gradient-text">Sources</span> & References
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            All data points in this report are sourced from reputable publications,
            research firms, and official company disclosures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sources.map((source, i) => (
            <motion.a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              className="bg-[#12121a] border border-zinc-800/50 rounded-xl p-4 hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div className="text-sm font-medium text-zinc-300 group-hover:text-indigo-300 transition-colors mb-1">
                {source.name}
              </div>
              <div className="text-xs text-zinc-600 font-mono truncate">
                {source.url.replace("https://", "").split("/")[0]}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-8 border-t border-zinc-800/50 text-center"
        >
          <p className="text-zinc-500 text-sm mb-2">
            Built with Next.js, Tailwind CSS, Recharts & Framer Motion
          </p>
          <p className="text-zinc-600 text-xs font-mono">
            Data compiled January 2026. All figures cited from public sources.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
