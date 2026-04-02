"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { formatDate, getScoreColor, getScoreBarColor } from "@/lib/utils";
import { History, Trash2, ChevronRight, Code2 } from "lucide-react";
import type { HistoryItem } from "@/types";
import { ScoreCard } from "@/components/review/ScoreCard";
import { IssuesSection } from "@/components/review/IssuesSection";
import { SuggestionsPanel } from "@/components/review/SuggestionsPanel";
import { toast } from "sonner";

const LANG_LABELS: Record<string, string> = {
  javascript: "JS",
  python: "PY",
  java: "JA",
  cpp: "C++",
};

const LANG_COLORS: Record<string, string> = {
  javascript: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  python: "bg-sky-500/15 text-sky-400 border-sky-500/20",
  java: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  cpp: "bg-violet-500/15 text-violet-400 border-violet-500/20",
};

export default function HistoryPage() {
  const { history, clearHistory } = useStore();
  const [selected, setSelected] = useState<HistoryItem | null>(null);

  if (selected) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-8">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-6"
        >
          ← Back to History
        </button>
        <div className="space-y-5">
          <div className="rounded-xl border border-white/[0.08] bg-[#0d0d10] p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-2 py-0.5 text-xs font-bold rounded border ${LANG_COLORS[selected.language]}`}>
                {LANG_LABELS[selected.language]}
              </span>
              <span className="text-xs text-white/30 font-mono">{formatDate(selected.date)}</span>
            </div>
            <pre className="text-xs font-mono text-white/40 leading-relaxed whitespace-pre-wrap break-all line-clamp-4">
              {selected.codeSnippet}
            </pre>
          </div>
          <ScoreCard score={selected.result.score} />
          <IssuesSection
            bugs={selected.result.bugs}
            improvements={selected.result.improvements}
            bestPractices={selected.result.bestPractices}
          />
          <SuggestionsPanel suggestions={selected.result.suggestions} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-6 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
              <History className="w-3.5 h-3.5 text-white/50" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Review History</h1>
          </div>
          <p className="text-sm text-white/40 ml-9">{history.length} previous analyses</p>
        </div>

        {history.length > 0 && (
          <button
            onClick={() => {
              clearHistory();
              toast.success("History cleared");
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-1">
            <Code2 className="w-6 h-6 text-white/20" />
          </div>
          <p className="text-sm font-medium text-white/40">No history yet</p>
          <p className="text-xs text-white/20">Run your first code analysis to see results here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {history.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border border-white/[0.06] bg-[#0d0d10] hover:bg-white/[0.03] hover:border-white/[0.1] transition-all group text-left"
            >
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded border shrink-0 ${LANG_COLORS[item.language]}`}>
                {LANG_LABELS[item.language]}
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/40 font-mono truncate">{item.codeSnippet}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {/* Mini score bar */}
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getScoreBarColor(item.score)}`}
                      style={{ width: `${(item.score / 10) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs font-mono font-bold ${getScoreColor(item.score)}`}>
                    {item.score.toFixed(1)}
                  </span>
                </div>

                <span className="text-[10px] text-white/20 font-mono hidden md:block">
                  {formatDate(item.date)}
                </span>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
