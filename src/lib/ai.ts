import { createClient } from '@supabase/supabase-js';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function generateMarketingContent(type: 'ad' | 'email' | 'seo', context: any) {
  const prompt = `
    Act as a senior growth marketing strategist for "NexaSphere Clean", a luxury AI-powered cleaning SaaS.
    Generate a ${type} based on the following context:
    ${JSON.stringify(context)}
    
    Requirements:
    - Tone: Premium, professional, trustworthy
    - Focus on: Convenience, AI-precision, luxury standards
    - Include: Compelling headlines, persuasive body text, and clear CTAs
  `;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001",
        "messages": [
          { "role": "user", "content": prompt }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Generation Error:", error);
    return null;
  }
}
