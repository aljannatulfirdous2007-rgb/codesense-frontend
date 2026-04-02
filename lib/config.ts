// Backend API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  HEALTH: "/",
  REVIEW_CODE: "/review-code",
  HISTORY: "/history",
  HISTORY_DETAIL: (id: number) => `/history/${id}`,
  DELETE_REVIEW: (id: number) => `/history/${id}`,
} as const;

export function getFullUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}
