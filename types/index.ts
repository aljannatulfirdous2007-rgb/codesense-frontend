export type Language = "javascript" | "python" | "java" | "cpp";

export interface Issue {
  id: string;
  title: string;
  description: string;
  line?: number;
  severity: "bug" | "improvement" | "best_practice";
}

export interface Suggestion {
  id: string;
  title: string;
  code: string;
  language: Language;
}

export interface ReviewResult {
  score: number;
  bugs: Issue[];
  improvements: Issue[];
  bestPractices: Issue[];
  suggestions: Suggestion[];
  analyzedAt: Date;
  language: Language;
  codeSnippet: string;
}

export interface HistoryItem {
  id: string;
  language: Language;
  score: number;
  date: Date;
  result: ReviewResult;
  codeSnippet: string;
}

export interface AppState {
  code: string;
  language: Language;
  result: ReviewResult | null;
  isAnalyzing: boolean;
  history: HistoryItem[];
  darkMode: boolean;
  apiKey: string;
}
