"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import KeyStats from "@/components/KeyStats";
import Timeline from "@/components/Timeline";
import Predictions from "@/components/Predictions";
import Sources from "@/components/Sources";

// Dynamic imports for chart components (they use window/DOM)
const UserGrowthChart = dynamic(() => import("@/components/UserGrowthChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
const MarketShareChart = dynamic(() => import("@/components/MarketShareChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
const ImpactSection = dynamic(() => import("@/components/ImpactSection"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
const RevenueChart = dynamic(() => import("@/components/RevenueChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

function ChartSkeleton() {
  return (
    <div className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#12121a] border border-zinc-800/50 rounded-2xl p-8 animate-pulse">
          <div className="h-6 w-48 bg-zinc-800 rounded mb-4" />
          <div className="h-4 w-72 bg-zinc-800/50 rounded mb-8" />
          <div className="h-[400px] bg-zinc-800/30 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <div id="stats">
        <KeyStats />
      </div>
      <div id="growth">
        <UserGrowthChart />
      </div>
      <div id="market">
        <MarketShareChart />
      </div>
      <div id="revenue">
        <RevenueChart />
      </div>
      <div id="timeline">
        <Timeline />
      </div>
      <div id="impact">
        <ImpactSection />
      </div>
      <div id="predictions">
        <Predictions />
      </div>
      <div id="sources">
        <Sources />
      </div>
    </main>
  );
}
