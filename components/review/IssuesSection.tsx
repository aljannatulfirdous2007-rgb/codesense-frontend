"use client";

import { useState } from "react";
import { Bug, Lightbulb, CheckCircle2, ChevronDown, MapPin } from "lucide-react";
import type { Issue } from "@/types";
import { cn } from "@/lib/utils";

interface IssueSectionProps {
  bugs: Issue[];
  improvements: Issue[];
  bestPractices: Issue[];
}

interface IssueGroupProps {
  title: string;
  issues: Issue[];
  icon: React.ReactNode;
  color: string;
  badgeCls: string;
}

function IssueGroup({ title, issues, icon, color, badgeCls }: IssueGroupProps) {
  const [open, setOpen] = useState(true);

  if (issues.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/[0.08] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#0d0d10] hover:bg-white/[0.03] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className={color}>{icon}</span>
          <span className="text-sm font-semibold text-white/80">{title}</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeCls}`}>
            {issues.length}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-white/30 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="divide-y divide-white/[0.04]">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="px-4 py-3.5 bg-[#0a0a0c] hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white/85 mb-1">{issue.title}</p>
                  <p className="text-xs text-white/45 leading-relaxed">{issue.description}</p>
                </div>
                {issue.line && (
                  <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.06]">
                    <MapPin className="w-2.5 h-2.5 text-white/30" />
                    <span className="text-[10px] font-mono text-white/40">L{issue.line}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function IssuesSection({ bugs, improvements, bestPractices }: IssueSectionProps) {
  const hasIssues = bugs.length > 0 || improvements.length > 0 || bestPractices.length > 0;

  if (!hasIssues) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
        Issues Found
      </h3>

      <IssueGroup
        title="Bugs"
        issues={bugs}
        icon={<Bug className="w-4 h-4" />}
        color="text-red-400"
        badgeCls="bg-red-500/15 text-red-400"
      />
      <IssueGroup
        title="Improvements"
        issues={improvements}
        icon={<Lightbulb className="w-4 h-4" />}
        color="text-amber-400"
        badgeCls="bg-amber-500/15 text-amber-400"
      />
      <IssueGroup
        title="Best Practices"
        issues={bestPractices}
        icon={<CheckCircle2 className="w-4 h-4" />}
        color="text-sky-400"
        badgeCls="bg-sky-500/15 text-sky-400"
      />
    </div>
  );
}
