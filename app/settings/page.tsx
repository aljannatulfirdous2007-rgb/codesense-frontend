"use client";

import { useState } from "react";
import { useStore } from "@/store";
import { Settings, Sun, Moon, Key, Save, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { darkMode, toggleDarkMode, apiKey, setApiKey } = useStore();
  const [localKey, setLocalKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    setApiKey(localKey);
    toast.success("Settings saved!", {
      description: localKey ? "API key stored locally." : "Settings updated.",
    });
  };

  return (
    <div className="max-w-[600px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
            <Settings className="w-3.5 h-3.5 text-white/50" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Settings</h1>
        </div>
        <p className="text-sm text-white/40 ml-9">Configure your CodeSense experience</p>
      </div>

      <div className="space-y-4">
        {/* Appearance */}
        <section className="rounded-xl border border-white/[0.08] bg-[#0d0d10] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.06]">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Appearance
            </h2>
          </div>
          <div className="px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80">Theme</p>
                <p className="text-xs text-white/35 mt-0.5">
                  Switch between dark and light mode
                </p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  darkMode
                    ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/15"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/15"
                }`}
              >
                {darkMode ? (
                  <>
                    <Moon className="w-3.5 h-3.5" />
                    Dark Mode
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5" />
                    Light Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* API Key */}
        <section className="rounded-xl border border-white/[0.08] bg-[#0d0d10] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.06]">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              API Configuration
            </h2>
          </div>
          <div className="px-5 py-4 space-y-4">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-white/70 mb-2">
                <Key className="w-3.5 h-3.5 text-white/30" />
                Anthropic API Key
              </label>
              <p className="text-xs text-white/30 mb-3 leading-relaxed">
                Add your Anthropic API key to enable real AI-powered analysis. Without it, the app uses mock data.{" "}
                <a
                  href="https://console.anthropic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400/70 hover:text-violet-400 transition-colors"
                >
                  Get a key →
                </a>
              </p>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={localKey}
                  onChange={(e) => setLocalKey(e.target.value)}
                  placeholder="sk-ant-api03-..."
                  className="w-full px-4 py-2.5 pr-10 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm font-mono text-white/70 placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/30 transition-all"
                />
                <button
                  onClick={() => setShowKey((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {localKey && (
                <p className="text-[10px] text-white/20 mt-1.5 font-mono">
                  {localKey.slice(0, 12)}{"•".repeat(20)}
                </p>
              )}
            </div>

            <div className="rounded-lg bg-amber-500/[0.06] border border-amber-500/15 px-3 py-2.5">
              <p className="text-xs text-amber-400/70 leading-relaxed">
                ⚠️ Your API key is stored locally in your browser and never sent to any server other than Anthropic.
              </p>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="rounded-xl border border-white/[0.08] bg-[#0d0d10] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.06]">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40">
              About
            </h2>
          </div>
          <div className="px-5 py-4 space-y-2">
            {[
              ["Version", "1.0.0"],
              ["Model", "claude-sonnet-4-20250514"],
              ["Framework", "Next.js 14 (App Router)"],
              ["Editor", "Monaco Editor"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <span className="text-xs text-white/35">{k}</span>
                <span className="text-xs font-mono text-white/50">{v}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm text-white
            bg-gradient-to-r from-violet-600 to-indigo-600
            hover:from-violet-500 hover:to-indigo-500
            hover:shadow-lg hover:shadow-violet-500/20
            active:scale-[0.99] transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-[#080809]"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
