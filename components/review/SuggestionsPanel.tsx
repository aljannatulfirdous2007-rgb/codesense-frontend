"use client";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import type { Suggestion } from "@/types";
import { Copy, Check, Sparkles } from "lucide-react";

interface SuggestionsPanelProps {
  suggestions: Suggestion[];
}

function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="rounded-xl border border-white/[0.08] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d0d10] border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-xs font-medium text-white/70">{suggestion.title}</span>
        </div>
        <button
          onClick={() => copy(suggestion.code)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.07] text-white/50 hover:text-white/80 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="px-4 py-4 bg-[#080809] overflow-x-auto text-xs font-mono text-emerald-300/80 leading-relaxed whitespace-pre">
        {suggestion.code}
      </pre>
    </div>
  );
}

export function SuggestionsPanel({ suggestions }: SuggestionsPanelProps) {
  if (!suggestions.length) return null;

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
        Suggested Improvements
      </h3>
      <div className="space-y-3" role="list" aria-label="Code suggestions">
        {suggestions.map((s) => (
          <SuggestionCard key={s.id} suggestion={s} />
        ))}
      </div>
    </div>
  );
}
