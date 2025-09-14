'use server';

/**
 * @fileOverview Analyzes article content from text to determine its likelihood of being real or fake.
 *
 * - analyzeArticleFromText - A function that analyzes the article content from text.
 * - AnalyzeArticleFromTextInput - The input type for the analyzeArticleFromText function.
 * - AnalyzeArticleFromTextOutput - The return type for the analyzeArticleFromText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeArticleFromTextInputSchema = z.object({
  text: z.string().describe('The text of the article to analyze.'),
});
export type AnalyzeArticleFromTextInput = z.infer<
  typeof AnalyzeArticleFromTextInputSchema
>;

const AnalyzeArticleFromTextOutputSchema = z.object({
  assessment: z
    .enum(['Likely Real', 'Likely Fake'])
    .describe('The assessment of the article content.'),
  explanation: z.string().describe('The explanation for the assessment.'),
});
export type AnalyzeArticleFromTextOutput = z.infer<
  typeof AnalyzeArticleFromTextOutputSchema
>;

export async function analyzeArticleFromText(
  input: AnalyzeArticleFromTextInput
): Promise<AnalyzeArticleFromTextOutput> {
  return analyzeArticleFromTextFlow(input);
}

const analyzeArticlePrompt = ai.definePrompt({
  name: 'analyzeArticleFromTextPrompt',
  input: {schema: AnalyzeArticleFromTextInputSchema},
  output: {schema: AnalyzeArticleFromTextOutputSchema},
  prompt: `You are an AI assistant that analyzes article content to determine if it is likely real or fake.

  Analyze the content from the article text provided and determine its likelihood of being real or fake.
  Then, provide a brief explanation of why the content received its assessment.

  The text to analyze is: {{{text}}}

  Your response should be structured as follows:
  {
    "assessment": "Likely Real" | "Likely Fake",
    "explanation": "Explanation of why the content received its assessment."
  }`,
});

const analyzeArticleFromTextFlow = ai.defineFlow(
  {
    name: 'analyzeArticleFromTextFlow',
    inputSchema: AnalyzeArticleFromTextInputSchema,
    outputSchema: AnalyzeArticleFromTextOutputSchema,
  },
  async input => {
    const {output} = await analyzeArticlePrompt(input);
    return output!;
  }
);
