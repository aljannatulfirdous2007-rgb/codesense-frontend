import type { Language, ReviewResult, Issue, Suggestion } from "@/types";

const MOCK_DELAY = 2200;

function generateMockResult(code: string, language: Language): ReviewResult {
  const lines = code.split("\n").length;
  const score = Math.round((6.5 + Math.random() * 3) * 10) / 10;

  const bugs: Issue[] = [
    {
      id: "b1",
      title: "Potential null reference",
      description:
        "Variable may be undefined before use. Add a null check before accessing properties.",
      line: Math.floor(Math.random() * lines) + 1,
      severity: "bug",
    },
    {
      id: "b2",
      title: "Unhandled promise rejection",
      description:
        "Async function missing try/catch block. Unhandled rejections can crash Node.js processes.",
      line: Math.floor(Math.random() * lines) + 1,
      severity: "bug",
    },
  ];

  const improvements: Issue[] = [
    {
      id: "i1",
      title: "Optimize loop performance",
      description:
        "Cache array length outside loop to avoid repeated property lookups on each iteration.",
      line: Math.floor(Math.random() * lines) + 1,
      severity: "improvement",
    },
    {
      id: "i2",
      title: "Redundant re-renders",
      description:
        "Component re-renders unnecessarily. Consider memoizing expensive computations with useMemo.",
      severity: "improvement",
    },
  ];

  const bestPractices: Issue[] = [
    {
      id: "bp1",
      title: "Use const instead of let",
      description:
        "Variables that are never reassigned should use const for clarity and to prevent accidental mutations.",
      line: 3,
      severity: "best_practice",
    },
    {
      id: "bp2",
      title: "Add JSDoc comments",
      description:
        "Public functions should be documented with parameter types and return values.",
      severity: "best_practice",
    },
    {
      id: "bp3",
      title: "Consistent naming convention",
      description:
        "Mix of camelCase and snake_case detected. Stick to camelCase for JavaScript variables.",
      line: Math.floor(Math.random() * lines) + 1,
      severity: "best_practice",
    },
  ];

  const langMap: Record<Language, string> = {
    javascript: "javascript",
    python: "python",
    java: "java",
    cpp: "cpp",
  };

  const suggestions: Suggestion[] = [
    {
      id: "s1",
      title: "Refactored with error handling",
      code:
        language === "javascript"
          ? `async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) {\n      throw new Error(\`HTTP error: \${response.status}\`);\n    }\n    return await response.json();\n  } catch (error) {\n    console.error('Fetch failed:', error);\n    throw error;\n  }\n}`
          : language === "python"
          ? `def fetch_data(url: str) -> dict:\n    """Fetch data from URL with error handling."""\n    import requests\n    try:\n        response = requests.get(url, timeout=10)\n        response.raise_for_status()\n        return response.json()\n    except requests.RequestException as e:\n        raise RuntimeError(f"Fetch failed: {e}") from e`
          : `// Refactored version\npublic static JsonObject fetchData(String url) throws IOException {\n    HttpClient client = HttpClient.newHttpClient();\n    HttpRequest request = HttpRequest.newBuilder()\n        .uri(URI.create(url))\n        .build();\n    HttpResponse<String> response = client.send(\n        request, HttpResponse.BodyHandlers.ofString());\n    return JsonParser.parseString(response.body()).getAsJsonObject();\n}`,
      language,
    },
  ];

  return {
    score,
    bugs,
    improvements,
    bestPractices,
    suggestions,
    analyzedAt: new Date(),
    language,
    codeSnippet: code.slice(0, 200),
  };
}

export async function analyzeCode(
  code: string,
  language: Language,
  apiKey?: string
): Promise<ReviewResult> {
  if (apiKey) {
    // Real Anthropic API call
    const prompt = `You are a senior code reviewer. Analyze the following ${language} code and respond ONLY with valid JSON in this exact format:
{
  "score": <number 0-10>,
  "bugs": [{"id":"b1","title":"...","description":"...","line":<number or null>,"severity":"bug"}],
  "improvements": [{"id":"i1","title":"...","description":"...","line":<number or null>,"severity":"improvement"}],
  "bestPractices": [{"id":"bp1","title":"...","description":"...","line":<number or null>,"severity":"best_practice"}],
  "suggestions": [{"id":"s1","title":"...","code":"...","language":"${language}"}]
}

Code to review:
\`\`\`${language}
${code}
\`\`\``;

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, apiKey }),
      });
      if (response.ok) {
        const data = await response.json();
        return {
          ...data,
          analyzedAt: new Date(),
          language,
          codeSnippet: code.slice(0, 200),
        };
      }
    } catch (e) {
      console.warn("API call failed, using mock", e);
    }
  }

  // Mock fallback
  await new Promise((r) => setTimeout(r, MOCK_DELAY));
  return generateMockResult(code, language);
}
