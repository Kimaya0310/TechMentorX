'use server';

import { recommendSchemes, type WelfareSchemeInput } from "@/ai/flows/welfare-scheme-recommendation";

export async function getWelfareSchemeRecommendations(input: WelfareSchemeInput) {
  try {
    const result = await recommendSchemes(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to get recommendations from AI service." };
  }
}
