// ── ChatGPT Weekly Active Users ──
// Updated: March 2026
// Source: OpenAI, TechCrunch, Search Engine Land
export const chatgptUsers = [
  { date: "Jan 2023", users: 50 },
  { date: "Aug 2023", users: 100 },
  { date: "Aug 2024", users: 200 },
  { date: "Oct 2024", users: 250 },
  { date: "Dec 2024", users: 300 },
  { date: "Feb 2025", users: 400 },
  { date: "Apr 2025", users: 800 },
  { date: "Feb 2026", users: 900 },
];

// ── Multi-platform user growth (MAU in millions) ──
// Updated: March 2026
export const platformGrowth = [
  { date: "Q4 2023", ChatGPT: 50, Gemini: 7, Claude: 2.9, Perplexity: 2 },
  { date: "Q2 2024", ChatGPT: 150, Gemini: 30, Claude: 5, Perplexity: 8 },
  { date: "Q4 2024", ChatGPT: 300, Gemini: 80, Claude: 10, Perplexity: 15 },
  { date: "Q2 2025", ChatGPT: 600, Gemini: 200, Claude: 19, Perplexity: 30 },
  { date: "Q4 2025", ChatGPT: 858, Gemini: 650, Claude: 30, Perplexity: 45 },
  { date: "Q1 2026", ChatGPT: 900, Gemini: 750, Claude: 35, Perplexity: 50 },
];

// ── Market share over time (% of total digital queries) ──
// Updated: March 2026
// Source: First Page Sage Feb 2026 Report
export const marketShare = [
  { date: "Q1 2023", Google: 99, ChatGPT: 0.5, Other: 0.5 },
  { date: "Q4 2023", Google: 97, ChatGPT: 1, Other: 2 },
  { date: "Q2 2024", Google: 94, ChatGPT: 3, Other: 3 },
  { date: "Q4 2024", Google: 90, ChatGPT: 7, Other: 3 },
  { date: "Q2 2025", Google: 83, ChatGPT: 12, Other: 5 },
  { date: "Q4 2025", Google: 77.9, ChatGPT: 17.1, Other: 5 },
  { date: "Q1 2026", Google: 76.1, ChatGPT: 18.5, Other: 5.4 },
];

// ── Revenue growth (ARR in billions) ──
// Updated: March 2026
// Source: CNBC, Reuters, Business Insider
export const revenueData = [
  { date: "2022", OpenAI: 0.03, Anthropic: 0.01, Perplexity: 0 },
  { date: "2023", OpenAI: 1.0, Anthropic: 0.1, Perplexity: 0.003 },
  { date: "2024", OpenAI: 3.7, Anthropic: 1.0, Perplexity: 0.02 },
  { date: "2025", OpenAI: 20, Anthropic: 10, Perplexity: 0.2 },
  { date: "2026 (proj)", OpenAI: 26, Anthropic: 14, Perplexity: 0.5 },
];

// ── Google AI Overviews presence in search results ──
// Updated: March 2026
// Source: Conductor 2026 Benchmarks, Search Engine Land
export const aiOverviewsGrowth = [
  { date: "May 2024", percent: 2 },
  { date: "Sep 2024", percent: 4 },
  { date: "Jan 2025", percent: 6.5 },
  { date: "Mar 2025", percent: 13 },
  { date: "Jun 2025", percent: 30 },
  { date: "Sep 2025", percent: 45 },
  { date: "Nov 2025", percent: 60 },
  { date: "Mar 2026", percent: 68 },
];

// ── CTR impact ──
export const ctrImpact = [
  { category: "Without AI Overviews", organic: 15, paid: 13 },
  { category: "With AI Overviews", organic: 8, paid: 6.3 },
];

// ── Search by intent ──
// Updated: February 2026
// Source: First Page Sage
export const intentData = [
  { intent: "Navigational", Google: 93, ChatGPT: 3 },
  { intent: "Informational", Google: 71, ChatGPT: 23 },
  { intent: "Transactional", Google: 90, ChatGPT: 5 },
  { intent: "Creative", Google: 29, ChatGPT: 64 },
];

// ── Age demographics ──
// Updated: February 2026
// Source: First Page Sage
export const ageData = [
  { age: "13-24", Google: 74, ChatGPT: 17 },
  { age: "25-44", Google: 80, ChatGPT: 13 },
  { age: "45-64", Google: 86, ChatGPT: 8 },
  { age: "65+", Google: 89, ChatGPT: 5 },
];

// ── Key stats ──
// Updated: March 2026
export const keyStats = [
  {
    value: "900M",
    label: "ChatGPT Weekly Active Users",
    subtext: "Up from 50M in Jan 2023",
    color: "#6366f1",
  },
  {
    value: "18.5%",
    label: "AI Share of Digital Queries",
    subtext: "Up from <1% in early 2023",
    color: "#8b5cf6",
  },
  {
    value: "2B",
    label: "Google AI Overviews Users",
    subtext: "Available in 200+ countries",
    color: "#06b6d4",
  },
  {
    value: "$20B",
    label: "OpenAI Annual Revenue",
    subtext: "Targeting $280B by 2030",
    color: "#10b981",
  },
  {
    value: "68%",
    label: "US Searches with AI Overviews",
    subtext: "As of March 2026",
    color: "#f59e0b",
  },
  {
    value: "50M",
    label: "ChatGPT Paying Subscribers",
    subtext: "5%+ of weekly active users",
    color: "#ef4444",
  },
];

// ── Timeline events ──
// Updated: February 2026
export const timelineEvents = [
  {
    date: "Nov 30, 2022",
    title: "ChatGPT Launches",
    description: "OpenAI releases ChatGPT. Reaches 1 million users in 5 days — the fastest-growing consumer app ever.",
    icon: "🚀",
  },
  {
    date: "Feb 2023",
    title: "100 Million Users",
    description: "ChatGPT hits 100M monthly active users in just 2 months, shattering growth records.",
    icon: "📈",
  },
  {
    date: "Mar 2023",
    title: "GPT-4 & Claude Launch",
    description: "OpenAI releases GPT-4. Anthropic launches Claude publicly. The AI race intensifies.",
    icon: "⚡",
  },
  {
    date: "Dec 2023",
    title: "Google Launches Gemini",
    description: "Google rebrands Bard to Gemini and launches its multi-modal AI model family.",
    icon: "🌟",
  },
  {
    date: "May 2024",
    title: "Google AI Overviews Roll Out",
    description: "Google begins integrating AI-generated summaries directly into search results at scale.",
    icon: "🔍",
  },
  {
    date: "Oct 2024",
    title: "ChatGPT Search Launches",
    description: "OpenAI launches ChatGPT Search, directly challenging Google's core product.",
    icon: "🎯",
  },
  {
    date: "Q4 2024",
    title: "Google Below 90%",
    description: "Google's global search market share drops below 90% for the first time since 2015.",
    icon: "📉",
  },
  {
    date: "Feb 2025",
    title: "400M Weekly Users",
    description: "ChatGPT reaches 400 million weekly active users. OpenAI raises $40B at massive valuation.",
    icon: "💰",
  },
  {
    date: "Apr 2025",
    title: "800M Weekly Users",
    description: "ChatGPT doubles to 800M weekly users in weeks. AI search share hits 12%.",
    icon: "🔥",
  },
  {
    date: "Jun 2025",
    title: "OpenAI Hits $10B ARR",
    description: "OpenAI reaches $10 billion in annual recurring revenue. Announces 3 million paying business users.",
    icon: "💵",
  },
  {
    date: "Jul 2025",
    title: "AI Overviews Hit 2B Users",
    description: "Google AI Overviews reaches 2 billion monthly users. AI Mode hits 100M in US & India.",
    icon: "🌍",
  },
  {
    date: "Nov 2025",
    title: "AI Overviews in 60% of Searches",
    description: "AI Overviews now appear in 60% of US search results. CTRs continue falling.",
    icon: "⚠️",
  },
  {
    date: "Jan 2026",
    title: "DeepSeek Emerges",
    description: "DeepSeek gains 10 million downloads, introducing new competition in the AI search space.",
    icon: "🐉",
  },
  {
    date: "Feb 2026",
    title: "Anthropic Hits $380B Valuation",
    description: "Anthropic raises $30B at $380B valuation. Run-rate revenue reaches $14B, with Claude Code alone at $2.5B.",
    icon: "💰",
  },
  {
    date: "Feb 2026",
    title: "ChatGPT Reaches 900M Users",
    description: "ChatGPT hits 900M weekly active users, approaching 1B milestone. 50M paying subscribers confirmed.",
    icon: "🚀",
  },
  {
    date: "Mar 2026",
    title: "Claude Hits #1 on App Store",
    description: "Claude reaches #1 on Apple App Store following Anthropic's Pentagon contract stance, with users defecting from ChatGPT.",
    icon: "📱",
  },
];

// ── Sources ──
// Updated: March 2026
export const sources = [
  { name: "DemandSage — ChatGPT Statistics", url: "https://www.demandsage.com/chatgpt-statistics/" },
  { name: "First Page Sage — Google vs ChatGPT Market Share", url: "https://firstpagesage.com/seo-blog/google-vs-chatgpt-market-share-report/" },
  { name: "TechCrunch — AI Overviews 2B Users", url: "https://techcrunch.com/2025/07/23/googles-ai-overviews-have-2b-monthly-users-ai-mode-100m-in-the-us-and-india/" },
  { name: "CNBC — OpenAI $10B Revenue", url: "https://www.cnbc.com/2025/06/09/openai-hits-10-billion-in-annualized-revenue-fueled-by-chatgpt-growth.html" },
  { name: "Reuters — Anthropic $183B Valuation", url: "https://www.reuters.com/business/anthropics-valuation-more-than-doubles-183-billion-after-13-billion-fundraise-2025-09-02/" },
  { name: "Search Engine Land — Google Below 90%", url: "https://searchengineland.com/google-search-market-share-drops-2024-450497" },
  { name: "Gartner — 25% Search Volume Drop Prediction", url: "https://www.gartner.com/en/newsroom/press-releases/2024-02-19-gartner-predicts-search-engine-volume-will-drop-25-percent-by-2026-due-to-ai-chatbots-and-other-virtual-agents" },
  { name: "Forbes — AI Search Traffic Impact", url: "https://www.forbes.com/sites/torconstantino/2025/04/14/the-60-problem---how-ai-search-is-draining-your-traffic/" },
  { name: "Xponent21 — AI Overviews 60% of Searches", url: "https://xponent21.com/insights/google-ai-overviews-surpass-60-percent/" },
  { name: "Business of Apps — Gemini Statistics", url: "https://www.businessofapps.com/data/google-gemini-statistics/" },
  { name: "Business of Apps — Perplexity Statistics", url: "https://www.businessofapps.com/data/perplexity-ai-statistics/" },
  { name: "Adobe — ChatGPT as Search Engine", url: "https://www.adobe.com/express/learn/blog/chatgpt-as-a-search-engine" },
  { name: "Yahoo/YouGov — Gen Z AI Usage Poll", url: "https://www.yahoo.com/news/article/poll-82-of-gen-z-adults-use-ai-chatbots-is-that-a-problem-185559057.html" },
  { name: "Coherent Market Insights — AI Search Market Size", url: "https://www.coherentmarketinsights.com/industry-reports/ai-search-engines-market" },
  { name: "PYMNTS — Gemini Outpaces ChatGPT Growth", url: "https://www.pymnts.com/artificial-intelligence-2/2025/googles-gemini-outpaces-openais-chatgpt-in-monthly-active-user-growth" },
  { name: "Sacra — Anthropic Revenue", url: "https://sacra.com/c/anthropic/" },
  { name: "Seer Interactive — AIO CTR Impact", url: "https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update" },
  { name: "Digital Bloom — Organic Traffic Crisis", url: "https://thedigitalbloom.com/learn/2025-organic-traffic-crisis-analysis-report/" },
  { name: "Press Gazette — Publisher Traffic Drop", url: "https://pressgazette.co.uk/media-audience-and-business-data/google-traffic-down-2025-trends-report-2026/" },
  { name: "DemandSage — DeepSeek Statistics", url: "https://www.demandsage.com/deepseek-statistics/" },
  { name: "TechCrunch — ChatGPT 900M Users", url: "https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users/" },
  { name: "Reuters — Anthropic $380B Valuation", url: "https://www.reuters.com/technology/anthropic-valued-380-billion-latest-funding-round-2026-02-12/" },
  { name: "CNBC — Anthropic $30B Funding Round", url: "https://www.cnbc.com/2026/02/12/anthropic-closes-30-billion-funding-round-at-380-billion-valuation.html" },
  { name: "TechCrunch — Gemini 750M Users", url: "https://techcrunch.com/2026/02/04/googles-gemini-app-has-surpassed-750m-monthly-active-users/" },
  { name: "First Page Sage — AI Chatbot Market Share Feb 2026", url: "https://firstpagesage.com/reports/top-generative-ai-chatbots" },
  { name: "Business Insider — Perplexity Revenue", url: "https://www.businessinsider.com/perplexity-shifts-to-subscriptions-business-growth-2026-2" },
  { name: "Conductor — 2026 AI Search Benchmarks", url: "https://www.superlines.io/articles/ai-search-statistics/" },
];
