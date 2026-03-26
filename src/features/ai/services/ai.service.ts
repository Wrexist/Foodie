import { supabase } from '@/lib/supabase';

export const aiService = {
  async summarizeReview(notes: string, items: { name: string; category: string }[]) {
    const { data, error } = await supabase.functions.invoke('summarize-review', {
      body: { notes, items },
    });
    if (error) throw error;
    return data.summary as string;
  },

  async extractTags(notes: string, items: { name: string; category: string }[]) {
    const { data, error } = await supabase.functions.invoke('extract-tags', {
      body: { notes, items },
    });
    if (error) throw error;
    return data.tags as { name: string; category: string }[];
  },

  async generateTasteProfile(userId: string) {
    const { data, error } = await supabase.functions.invoke('taste-profile', {
      body: { userId },
    });
    if (error) throw error;
    return data.profile;
  },
};
