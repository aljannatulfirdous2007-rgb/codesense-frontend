"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store";
import { DEFAULT_SNIPPETS } from "@/lib/snippets";
import type { Language } from "@/types";
import { ChevronDown } from "lucide-react";

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
];

const MONACO_LANG_MAP: Record<Language, string> = {
  javascript: "javascript",
  python: "python",
  java: "java",
  cpp: "cpp",
};

export function CodeEditor() {
  const { code, language, setCode, setLanguage } = useStore();
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<unknown>(null);
  const editorInstanceRef = useRef<unknown>(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted state first
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize Monaco editor after mount
  useEffect(() => {
    if (!mounted) return;
    
    // Configure Monaco before importing to avoid worker issues
    // Simple blob-based worker initialization
    (globalThis as unknown as { MonacoEnvironment?: unknown }).MonacoEnvironment = {
      getWorkerUrl: () => {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
          self.MonacoEnvironment = {
            baseUrl: window.location.origin
          };
          importScripts('${window.location.origin}/_next/static/chunks/node_modules_monaco-editor_esm_vs_editor_editor.worker.js');
        `)}`;
      },
    };
    
    // Dynamic import Monaco (avoid SSR issues)
    import("monaco-editor").then((monaco) => {
      monacoRef.current = monaco;

      if (!editorRef.current || editorInstanceRef.current) return;

      // Define dark theme matching our UI
      monaco.editor.defineTheme("codesense-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "4a5568", fontStyle: "italic" },
          { token: "keyword", foreground: "a78bfa" },
          { token: "string", foreground: "34d399" },
          { token: "number", foreground: "f59e0b" },
          { token: "type", foreground: "60a5fa" },
          { token: "function", foreground: "e2e8f0" },
        ],
        colors: {
          "editor.background": "#0a0a0c",
          "editor.foreground": "#cbd5e1",
          "editorLineNumber.foreground": "#2d3748",
          "editorLineNumber.activeForeground": "#4a5568",
          "editor.selectionBackground": "#7c3aed33",
          "editor.lineHighlightBackground": "#ffffff05",
          "editorCursor.foreground": "#a78bfa",
          "editor.wordHighlightBackground": "#7c3aed22",
          "editorBracketMatch.background": "#7c3aed33",
          "editorBracketMatch.border": "#7c3aed",
          "scrollbar.shadow": "#00000000",
          "scrollbarSlider.background": "#ffffff10",
          "scrollbarSlider.hoverBackground": "#ffffff18",
        },
      });

      const instance = monaco.editor.create(editorRef.current!, {
        value: code || DEFAULT_SNIPPETS[language],
        language: MONACO_LANG_MAP[language],
        theme: "codesense-dark",
        fontSize: 13,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        fontLigatures: true,
        lineNumbers: "on",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: "on",
        padding: { top: 16, bottom: 16 },
        renderLineHighlight: "gutter",
        cursorBlinking: "smooth",
        cursorSmoothCaretAnimation: "on",
        smoothScrolling: true,
        contextmenu: false,
        folding: true,
        lineDecorationsWidth: 8,
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        overviewRulerBorder: false,
        scrollbar: {
          verticalScrollbarSize: 6,
          horizontalScrollbarSize: 6,
        },
        // Disable problematic features that cause worker errors
        suggest: {
          showKeywords: false,
          showSnippets: false,
        },
        quickSuggestions: {
          other: false,
          comments: false,
          strings: false,
        },
      });

      editorInstanceRef.current = instance;

      instance.onDidChangeModelContent(() => {
        setCode(instance.getValue());
      });
    });

    return () => {
      if (editorInstanceRef.current) {
        (editorInstanceRef.current as { dispose: () => void }).dispose();
        editorInstanceRef.current = null;
      }
    };
  }, [mounted]);

  // Update language in Monaco when it changes
  useEffect(() => {
    if (!editorInstanceRef.current || !monacoRef.current) return;
    const monaco = monacoRef.current as typeof import("monaco-editor");
    const model = (
      editorInstanceRef.current as { getModel: () => unknown }
    ).getModel() as { uri: unknown } | null;
    if (model) {
      monaco.editor.setModelLanguage(
        model as Parameters<typeof monaco.editor.setModelLanguage>[0],
        MONACO_LANG_MAP[language]
      );
    }
    const newSnippet = DEFAULT_SNIPPETS[language];
    (editorInstanceRef.current as { setValue: (v: string) => void }).setValue(
      newSnippet
    );
    setCode(newSnippet);
  }, [language, setCode]);

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0a0c]">
      {/* Editor toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d0d10] border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/60" />
          <span className="w-3 h-3 rounded-full bg-amber-500/60" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
          <span className="ml-3 text-xs text-white/25 font-mono">
            main.{language === "cpp" ? "cpp" : language === "java" ? "java" : language === "python" ? "py" : "js"}
          </span>
        </div>

        {/* Language selector */}
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="appearance-none flex items-center gap-1.5 pl-3 pr-7 py-1 text-xs font-mono rounded-md bg-white/[0.06] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.09] focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all cursor-pointer"
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value} className="bg-[#1a1a1f]">
                {l.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40 pointer-events-none" />
        </div>
      </div>

      {/* Monaco mount point */}
      <div ref={editorRef} className="h-[380px] w-full" />
    </div>
  );
}
