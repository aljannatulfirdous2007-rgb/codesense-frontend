"use client";

import { Loader2, Zap } from "lucide-react";
import { useStore } from "@/store";
import { useAnalyze } from "@/hooks/useAnalyze";

export function AnalyzeButton() {
  const { code, isAnalyzing } = useStore();
  const { analyze } = useAnalyze();
  const disabled = !code.trim() || isAnalyzing;

  return (
    <button
      onClick={analyze}
      disabled={disabled}
      aria-label={isAnalyzing ? "Analyzing code" : "Analyze code"}
      className="relative flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 
        bg-gradient-to-r from-violet-600 to-indigo-600
        hover:from-violet-500 hover:to-indigo-500
        hover:shadow-lg hover:shadow-violet-500/25
        active:scale-[0.98]
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100
        focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-[#080809]"
    >
      {isAnalyzing ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Analyzing…
        </>
      ) : (
        <>
          <Zap className="w-4 h-4" strokeWidth={2.5} />
          Analyze Code
        </>
      )}
    </button>
  );
}
