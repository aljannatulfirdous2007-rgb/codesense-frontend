"use client";

import dynamic from "next/dynamic";
import { AnalyzeButton } from "@/components/review/AnalyzeButton";
import { ResultsPanel } from "@/components/review/ResultsPanel";
import { useStore } from "@/store";
import { Zap } from "lucide-react";

// Dynamically import Monaco to avoid SSR
const CodeEditor = dynamic(
  () => import("@/components/editor/CodeEditor").then((m) => m.CodeEditor),
  {
    ssr: false,
    loading: () => (
      <div className="h-[380px] rounded-xl border border-white/[0.08] bg-[#0a0a0c] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
          <span className="text-xs text-white/30">Loading editor…</span>
        </div>
      </div>
    ),
  }
);

export default function CodeReviewPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            AI Code Reviewer
          </h1>
        </div>
        <p className="text-sm text-white/40 ml-9">
          Analyze your code for bugs, performance, and best practices
        </p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">
        {/* Left: Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Code Input
            </h2>
          </div>

          <CodeEditor />

          {/* Stats row */}
          <div className="flex items-center justify-between">
            <CodeStats />
            <AnalyzeButton />
          </div>
        </div>

        {/* Right: Results */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Analysis Output
          </h2>
          <ResultsPanel />
        </div>
      </div>
    </div>
  );
}

function CodeStats() {
  const { code, language } = useStore();
  const lines = code ? code.split("\n").length : 0;
  const chars = code ? code.length : 0;

  return (
    <div className="flex items-center gap-4">
      <Stat label="Lines" value={lines} />
      <Stat label="Chars" value={chars} />
      <Stat label="Lang" value={language.charAt(0).toUpperCase() + language.slice(1)} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-xs text-white/25 font-mono">
      <span className="text-white/40">{value}</span>{" "}
      <span className="text-white/20">{label}</span>
    </div>
  );
}
