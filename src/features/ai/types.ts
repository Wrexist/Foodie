export interface TasteProfile {
  topCuisines: string[];
  flavorPreferences: string[];
  pricePreference: string | null;
  diningStyle: string | null;
  generatedAt: string;
}

export interface ExtractedTag {
  name: string;
  category: string;
}
