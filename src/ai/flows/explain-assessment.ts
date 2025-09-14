'use server';

/**
 * @fileOverview Explains the assessment of an article's likelihood of being real or fake.
 *
 * - explainAssessment - A function that provides a brief explanation of why the content received its assessment.
 * - ExplainAssessmentInput - The input type for the explainAssessment function.
 * - ExplainAssessmentOutput - The return type for the explainAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainAssessmentInputSchema = z.object({
  articleContent: z.string().describe('The content of the article to assess.'),
  assessment: z.string().describe('The assessment of the article (e.g., Likely Real, Likely Fake).'),
});
export type ExplainAssessmentInput = z.infer<typeof ExplainAssessmentInputSchema>;

const ExplainAssessmentOutputSchema = z.object({
  explanation: z.string().describe('A brief explanation of why the content received its assessment.'),
});
export type ExplainAssessmentOutput = z.infer<typeof ExplainAssessmentOutputSchema>;

export async function explainAssessment(input: ExplainAssessmentInput): Promise<ExplainAssessmentOutput> {
  return explainAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainAssessmentPrompt',
  input: {schema: ExplainAssessmentInputSchema},
  output: {schema: ExplainAssessmentOutputSchema},
  prompt: `You are an AI assistant that explains why an article received a particular assessment.

  Article Content: {{{articleContent}}}
  Assessment: {{{assessment}}}

  Provide a brief explanation of why the content received its assessment, highlighting the key points that influenced the determination.
  `,
});

const explainAssessmentFlow = ai.defineFlow(
  {
    name: 'explainAssessmentFlow',
    inputSchema: ExplainAssessmentInputSchema,
    outputSchema: ExplainAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
