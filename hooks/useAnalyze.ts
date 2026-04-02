"use client";

import { useCallback } from "react";
import { useStore } from "@/store";
import { analyzeCode } from "@/lib/api";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

export function useAnalyze() {
  const {
    code,
    language,
    apiKey,
    setResult,
    setIsAnalyzing,
    addHistory,
    isAnalyzing,
  } = useStore();

  const analyze = useCallback(async () => {
    if (!code.trim()) {
      toast.error("No code to analyze", {
        description: "Please write or paste some code first.",
      });
      return;
    }

    if (isAnalyzing) {
      toast.info("Already analyzing", {
        description: "Please wait for the current analysis to complete.",
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      const result = await analyzeCode(code, language, apiKey || undefined);
      setResult(result);
      addHistory({
        id: uuid(),
        language,
        score: result.score,
        date: new Date(),
        result,
        codeSnippet: code.slice(0, 120),
      });
      toast.success("Analysis complete!", {
        description: `Score: ${result.score}/10`,
      });
    } catch (err) {
      console.error(err);
      toast.error("Analysis failed", {
        description: "Please check your code and try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [code, language, apiKey, isAnalyzing, setResult, setIsAnalyzing, addHistory]);

  return { analyze };
}
