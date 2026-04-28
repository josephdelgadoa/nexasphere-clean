import { supabase } from '@/lib/supabase/client';

export async function scoreLead(quoteId: string) {
  try {
    // 1. Fetch quote and property details
    const { data: quote, error } = await supabase
      .from('quotes')
      .select('*, properties(*)')
      .eq('id', quoteId)
      .single();

    if (error || !quote) throw new Error('Quote not found');

    const property = quote.properties;
    let score = 50; // Base score

    // 2. Logic-based scoring
    if (property.property_type === 'mansion') score += 30;
    if (property.property_type === 'commercial') score += 20;
    if (property.sq_ft > 3000) score += 15;
    if (property.sq_ft > 5000) score += 10;
    
    // High value zip codes (example)
    const premiumZips = ['94025', '90210', '10001', '94301'];
    if (premiumZips.includes(property.zip_code)) score += 20;

    // 3. Update quote with AI score
    const { error: updateError } = await supabase
      .from('quotes')
      .update({ ai_score: Math.min(score, 100) })
      .eq('id', quoteId);

    if (updateError) throw updateError;

    return score;
  } catch (error) {
    console.error('Lead Scoring Error:', error);
    return null;
  }
}
