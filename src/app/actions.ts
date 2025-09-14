
"use server";

import { analyzeArticleFromUrl, AnalyzeArticleFromUrlOutput } from "@/ai/flows/analyze-article-from-url";
import { analyzeArticleFromText } from "@/ai/flows/analyze-article-from-text";

type FormState = {
  data: AnalyzeArticleFromUrlOutput | null;
  error: string | null;
  timestamp: number;
};

export async function analyzeUrlOrText(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const type = formData.get("type") as "url" | "text";
  const value = formData.get("value") as string;

  if (!value || value.trim().length === 0) {
    return { data: null, error: `Please provide a ${type} to analyze.`, timestamp: Date.now() };
  }

  try {
    let result;
    if (type === 'url') {
      result = await analyzeArticleFromUrl({ url: value });
    } else {
      result = await analyzeArticleFromText({ text: value });
    }
    
    if (!result.assessment || !result.explanation) {
      throw new Error("The AI returned an incomplete analysis. Please try again.");
    }
    return { data: result, error: null, timestamp: Date.now() };
  } catch (e: any) {
    console.error(e);
    return {
      data: null,
      error: e.message || "An unknown error occurred during analysis.",
      timestamp: Date.now(),
    };
  }
}
