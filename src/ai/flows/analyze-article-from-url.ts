'use server';

/**
 * @fileOverview Analyzes article content from a URL to determine its likelihood of being real or fake.
 *
 * - analyzeArticleFromUrl - A function that analyzes the article content from a URL.
 * - AnalyzeArticleFromUrlInput - The input type for the analyzeArticleFromUrl function.
 * - AnalyzeArticleFromUrlOutput - The return type for the analyzeArticleFromUrl function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeArticleFromUrlInputSchema = z.object({
  url: z.string().describe('The URL of the article to analyze.'),
});
export type AnalyzeArticleFromUrlInput = z.infer<
  typeof AnalyzeArticleFromUrlInputSchema
>;

const AnalyzeArticleFromUrlOutputSchema = z.object({
  assessment: z
    .enum(['Likely Real', 'Likely Fake'])
    .describe('The assessment of the article content.'),
  explanation: z.string().describe('The explanation for the assessment.'),
});
export type AnalyzeArticleFromUrlOutput = z.infer<
  typeof AnalyzeArticleFromUrlOutputSchema
>;

export async function analyzeArticleFromUrl(
  input: AnalyzeArticleFromUrlInput
): Promise<AnalyzeArticleFromUrlOutput> {
  return analyzeArticleFromUrlFlow(input);
}

const getArticleContent = ai.defineTool(
  {
    name: 'getArticleContent',
    description: 'Retrieves the content of an article from a URL.',
    inputSchema: z.object({
      url: z.string().describe('The URL of the article.'),
    }),
    outputSchema: z.string(),
  },
  async (input) => {
    try {
      const response = await fetch(input.url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch article content from URL: ${input.url}`
        );
      }
      return await response.text();
    } catch (error: any) {
      console.error('Error fetching article content:', error);
      return `Error fetching article content: ${error.message}`;
    }
  }
);

const analyzeArticlePrompt = ai.definePrompt({
  name: 'analyzeArticlePrompt',
  input: {schema: AnalyzeArticleFromUrlInputSchema},
  output: {schema: AnalyzeArticleFromUrlOutputSchema},
  tools: [getArticleContent],
  prompt: `You are an AI assistant that analyzes article content to determine if it is likely real or fake.

  Analyze the content from the article and determine its likelihood of being real or fake.
  Then, provide a brief explanation of why the content received its assessment.

  The URL to analyze is: {{{url}}}

  Use the getArticleContent tool to retrieve the article content from the URL.

  Your response should be structured as follows:
  {
    "assessment": "Likely Real" | "Likely Fake",
    "explanation": "Explanation of why the content received its assessment."
  }`,
});

const analyzeArticleFromUrlFlow = ai.defineFlow(
  {
    name: 'analyzeArticleFromUrlFlow',
    inputSchema: AnalyzeArticleFromUrlInputSchema,
    outputSchema: AnalyzeArticleFromUrlOutputSchema,
  },
  async input => {
    const {output} = await analyzeArticlePrompt(input);
    return output!;
  }
);
