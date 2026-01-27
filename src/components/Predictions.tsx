"use client";

import { motion } from "framer-motion";

const predictions = [
  {
    source: "Gartner",
    prediction: "Traditional search engine volume will drop 25% by 2026",
    year: "2026",
    confidence: "High",
    url: "https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents",
  },
  {
    source: "TTMS Research",
    prediction: "LLM-based search will reach 30-50%+ usage share by 2028-2030",
    year: "2028-30",
    confidence: "Medium",
    url: "https://ttms.com/llm-powered-search-vs-traditional-search-2025-2030-forecast/",
  },
  {
    source: "Gartner",
    prediction: "GenAI agents will prompt a $58 billion market shake-up by 2027",
    year: "2027",
    confidence: "High",
    url: "https://www.gartner.com/en/articles/strategic-predictions-for-2026",
  },
  {
    source: "eMarketer",
    prediction: "GenAI will reach 51% of US internet users by 2029",
    year: "2029",
    confidence: "Medium",
    url: "https://www.emarketer.com/content/genai-user-forecast-2025",
  },
  {
    source: "Coherent MI",
    prediction: "AI Search market: $43.6B (2025) → $108.9B (2032) at 14% CAGR",
    year: "2032",
    confidence: "Medium",
    url: "https://www.coherentmarketinsights.com/industry-reports/ai-search-engines-market",
  },
  {
    source: "OpenAI",
    prediction: "Targeting $125 billion in revenue by 2029",
    year: "2029",
    confidence: "Aspirational",
    url: "https://www.demandsage.com/chatgpt-statistics/",
  },
  {
    source: "Anthropic",
    prediction: "Projects $70 billion in revenue by 2028",
    year: "2028",
    confidence: "Aspirational",
    url: "https://techcrunch.com/2025/11/04/anthropic-expects-b2b-demand-to-boost-revenue-to-70b-in-2028-report/",
  },
];

const confidenceColors: Record<string, string> = {
  High: "text-green-400 bg-green-500/10 border-green-500/20",
  Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  Aspirational: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
};

export default function Predictions() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Future Predictions</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl">
            What analysts and industry leaders predict for the future of AI search.
            The consensus: this is just the beginning.
          </p>
        </motion.div>

        <div className="space-y-4">
          {predictions.map((item, i) => (
            <motion.a
              key={item.prediction}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="block bg-[#12121a] border border-zinc-800/50 rounded-xl p-6 hover:border-zinc-700/50 transition-all duration-300 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono font-semibold text-indigo-400">
                      {item.source}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${confidenceColors[item.confidence]}`}>
                      {item.confidence}
                    </span>
                  </div>
                  <p className="text-white text-lg font-medium group-hover:text-indigo-300 transition-colors">
                    {item.prediction}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-3xl font-black font-mono text-zinc-600">
                    {item.year}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
