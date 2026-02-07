// WelfareSchemeRecommendation.ts
'use server';

/**
 * @fileOverview A welfare scheme recommendation AI agent.
 *
 * - recommendSchemes - A function that handles the welfare scheme recommendation process.
 * - WelfareSchemeInput - The input type for the recommendSchemes function.
 * - WelfareSchemeOutput - The return type for the recommendSchemes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WelfareSchemeInputSchema = z.object({
  age: z.number().describe('The age of the user.'),
  income: z.number().describe('The annual income of the user.'),
  disabilityStatus: z
    .string()
    .describe(
      'The disability status of the user. Options: yes, no, not applicable.'
    ),
});
export type WelfareSchemeInput = z.infer<typeof WelfareSchemeInputSchema>;

const WelfareSchemeOutputSchema = z.object({
  schemes: z
    .array(z.string())
    .describe('A list of relevant welfare schemes for the user.'),
});
export type WelfareSchemeOutput = z.infer<typeof WelfareSchemeOutputSchema>;

export async function recommendSchemes(
  input: WelfareSchemeInput
): Promise<WelfareSchemeOutput> {
  return welfareSchemeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'welfareSchemePrompt',
  input: {schema: WelfareSchemeInputSchema},
  output: {schema: WelfareSchemeOutputSchema},
  prompt: `You are an AI assistant that recommends welfare schemes based on user details.

  Based on the following details, recommend relevant welfare schemes.

  Age: {{{age}}}
  Income: {{{income}}}
  Disability Status: {{{disabilityStatus}}}

  Consider various factors and provide a list of suitable schemes.
  Output only a list of scheme names. Do not provide any additional information.
  If there are no suitable schemes, respond with an empty array.
  `,
});

const welfareSchemeFlow = ai.defineFlow(
  {
    name: 'welfareSchemeFlow',
    inputSchema: WelfareSchemeInputSchema,
    outputSchema: WelfareSchemeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
