import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppState, Language, ReviewResult, HistoryItem } from "@/types";

interface Store extends AppState {
  setCode: (code: string) => void;
  setLanguage: (lang: Language) => void;
  setResult: (result: ReviewResult | null) => void;
  setIsAnalyzing: (v: boolean) => void;
  addHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
  toggleDarkMode: () => void;
  setApiKey: (key: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      code: "",
      language: "javascript",
      result: null,
      isAnalyzing: false,
      history: [],
      darkMode: true,
      apiKey: "",

      setCode: (code) => set({ code }),
      setLanguage: (language) => set({ language }),
      setResult: (result) => set({ result }),
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
      addHistory: (item) =>
        set((s) => ({ history: [item, ...s.history].slice(0, 50) })),
      clearHistory: () => set({ history: [] }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      setApiKey: (apiKey) => set({ apiKey }),
    }),
    {
      name: "codesense-store",
      partialize: (s) => ({
        history: s.history,
        darkMode: s.darkMode,
        apiKey: s.apiKey,
        language: s.language,
      }),
    }
  )
);
