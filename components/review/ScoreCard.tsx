"use client";

import { getScoreColor, getScoreBarColor, getScoreLabel } from "@/lib/utils";

interface ScoreCardProps {
  score: number;
}

export function ScoreCard({ score }: ScoreCardProps) {
  const pct = (score / 10) * 100;
  const color = getScoreColor(score);
  const barColor = getScoreBarColor(score);
  const label = getScoreLabel(score);

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0d0d10] p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">
            Code Quality Score
          </h3>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-bold font-mono tabular-nums ${color}`}>
              {score.toFixed(1)}
            </span>
            <span className="text-white/25 text-lg font-mono">/ 10</span>
          </div>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
            score >= 8
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : score >= 6
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
              : "bg-red-500/10 text-red-400 border-red-500/20"
          }`}
        >
          {label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 bg-white/[0.05] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-white/20 font-mono">0</span>
        <span className="text-[10px] text-white/20 font-mono">10</span>
      </div>
    </div>
  );
}
