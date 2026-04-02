import type { Language, ReviewResult, Issue, Suggestion } from "@/types";
import { getFullUrl, API_ENDPOINTS } from "./config";

const MOCK_DELAY = 2200;

// Transform backend response to frontend format
function transformBackendResponse(
  data: any,
  code: string,
  language: Language
): ReviewResult {
  const issuesToIssue = (items: string[], severity: "bug" | "improvement" | "best_practice"): Issue[] => {
    return items.map((text, index) => ({
      id: `${severity}-${index}`,
      title: text.split(" — ")[0] || text,
      description: text.split(" — ")[1] || "",
      line: undefined,
      severity,
    }));
  };

  return {
    score: data.score,
    bugs: issuesToIssue(data.bugs || [], "bug"),
    improvements: issuesToIssue(data.improvements || [], "improvement"),
    bestPractices: issuesToIssue(data.best_practices || [], "best_practice"),
    suggestions: [],
    analyzedAt: new Date(data.created_at || Date.now()),
    language,
    codeSnippet: code.slice(0, 200),
  };
}

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
  // Try to use backend API first
  try {
    const response = await fetch(getFullUrl(API_ENDPOINTS.REVIEW_CODE), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        code, 
        language 
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return transformBackendResponse(data, code, language);
    }
  } catch (e) {
    console.warn("Backend API not available, using mock mode", e);
  }

  // Mock fallback
  await new Promise((r) => setTimeout(r, MOCK_DELAY));
  return generateMockResult(code, language);
}

// History functions
export async function getHistory(): Promise<Array<{ id: number; language: string; score: number; created_at: string }>> {
  try {
    const response = await fetch(getFullUrl(API_ENDPOINTS.HISTORY));
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    console.warn("Failed to fetch history", e);
  }
  return [];
}

export async function getReviewDetail(id: number): Promise<ReviewResult | null> {
  try {
    const response = await fetch(getFullUrl(API_ENDPOINTS.HISTORY_DETAIL(id)));
    if (response.ok) {
      const data = await response.json();
      return transformBackendResponse(data, "", data.language as Language);
    }
  } catch (e) {
    console.warn("Failed to fetch review detail", e);
  }
  return null;
}

export async function deleteReview(id: number): Promise<boolean> {
  try {
    const response = await fetch(getFullUrl(API_ENDPOINTS.DELETE_REVIEW(id)), {
      method: "DELETE",
    });
    return response.ok;
  } catch (e) {
    console.warn("Failed to delete review", e);
    return false;
  }
}
