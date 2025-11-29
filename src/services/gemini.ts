import { GoogleGenAI } from "@google/genai";

// Initialize AI Client
// The API Key is injected via vite.config.ts from the .env file (VITE_API_KEY)
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API KEY MISSING: Please create a .env file in the root directory with VITE_API_KEY=your_key_here");
  }
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

// 1. Generate Article Body HTML
export const generateArticleContent = async (title: string, category: string, location: string = "Global"): Promise<string> => {
  const ai = getClient();
  const prompt = `
    You are a senior financial editor. Write a comprehensive, SEO-optimized blog post about "${title}" in the category "${category}".
    
    Target Audience Context: The reader is located in ${location}. Ensure currency references, financial regulations, and general advice are appropriate for this region.
    
    Structure:
    1. Introduction (hook the reader immediately).
    2. 4-6 detailed subsections with H2 headings.
    3. "Key Takeaways" list.
    4. "FAQ" section relevant to ${location}.
    
    Format: Return ONLY raw HTML body content (no <html>, <head>, <body>). Use <h2>, <h3>, <p>, <ul>, <li>, <strong>.
  `;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "<p>Content generation failed.</p>";
  } catch (e) {
    console.error("Gemini Generation Error:", e);
    return `<p>Content unavailable. Please ensure your API Key is valid. (${e instanceof Error ? e.message : 'Unknown error'})</p>`;
  }
};

// 2. Generate Trending Topics (The "Self-Updating" Feature)
export const generateTrendingTopics = async (location: string = "Global"): Promise<Array<{title: string, category: string, slug: string}>> => {
  const ai = getClient();
  const prompt = `
    Generate 5 trending, high-traffic finance article titles for 2025 specifically relevant to investors and consumers in ${location}.
    Topics should cover: Crypto, Inflation, Housing Market, or AI Investing in this region.
    Return a JSON array ONLY. Format:
    [{"title": "...", "category": "...", "slug": "..."}]
    Ensure slugs are URL-friendly (kebab-case).
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to fetch trending topics", e);
    return [];
  }
};

// 3. Generate Metadata for Dynamic Articles
export const generateArticleMetadata = async (slug: string, location: string = "Global") => {
  const ai = getClient();
  const prompt = `
    Based on the slug "${slug}", generate plausible metadata for a finance article tailored for ${location}.
    Return JSON ONLY:
    {
      "title": "Catchy Title Based on Slug",
      "category": "One of: Credit Cards, Insurance, Investing, Loans",
      "summary": "2 sentence summary",
      "author": "Expert Name",
      "publishDate": "Current Date"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || "{}");
  } catch (e) {
    throw new Error("Could not generate metadata");
  }
};

// 4. AI Chat Assistant
export const askAIAboutArticle = async (question: string, context: string, location: string = "Global"): Promise<string> => {
  const ai = getClient();
  const prompt = `
    Context Article: ${context.substring(0, 3000)}...
    
    User Location: ${location}
    User Question: ${question}
    
    Answer the user's question specifically based on the context provided above. If relevant, mention how it applies to ${location}. Keep it brief and helpful.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "I couldn't answer that right now.";
  } catch (e) {
    console.error("Chat Error", e);
    return "I'm having trouble connecting to the server.";
  }
};