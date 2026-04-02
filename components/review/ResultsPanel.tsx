"use client";

import { useStore } from "@/store";
import { ScoreCard } from "./ScoreCard";
import { IssuesSection } from "./IssuesSection";
import { SuggestionsPanel } from "./SuggestionsPanel";
import { formatDate } from "@/lib/utils";
import { Clock, RefreshCw } from "lucide-react";

export function ResultsPanel() {
  const { result, isAnalyzing, setResult } = useStore();

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white/70">Analyzing your code…</p>
          <p className="text-xs text-white/30 mt-1">Checking for bugs, patterns & improvements</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
        <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-1">
          <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-sm font-medium text-white/40">No analysis yet</p>
        <p className="text-xs text-white/20 max-w-xs">
          Paste or write your code in the editor, then click "Analyze Code" to get detailed feedback.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-400">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white/60">Analysis Results</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-white/25 text-xs font-mono">
            <Clock className="w-3 h-3" />
            {formatDate(result.analyzedAt)}
          </div>
          <button
            onClick={() => setResult(null)}
            className="p-1.5 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.05] transition-all"
            title="Clear results"
            aria-label="Clear analysis results"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <ScoreCard score={result.score} />
      <IssuesSection
        bugs={result.bugs}
        improvements={result.improvements}
        bestPractices={result.bestPractices}
      />
      <SuggestionsPanel suggestions={result.suggestions} />
    </div>
  );
}
