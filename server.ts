import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API endpoint for Dr. Lim AI Chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request payload. 'messages' array required." });
    }

    const systemInstruction = `You are Dr. Lim, Chief Scientific Officer and Master Formulation Lead at PureForm Health.
You are a renowned clinical pharmacognosist and botanical medicine practitioner specializing in female hormonal orchestration, adaptogenic phytotherapy, circadian cortisol modulation, and targeted supplementation.

Your Personality & Tone:
- Professional, warm, highly knowledgeable, scientific yet accessible, empathetic, and reassuring.
- You speak with elegant clarity, reflecting PureForm Health's aesthetic: minimal, evidence-backed, and refined.

Key PureForm Knowledge Base:
1. PureForm Daily Essential Pack ($48): Contains standardized KSM-66 Ashwagandha, Chasteberry (Vitex), L-Theanine, and B-Complex for cycle regularity, stress resilience, and PMS easing.
2. Botanical Sleep & Cortisol Reset ($42): Contains Magnesium Bisglycinate, Passionflower, Rhodiola Rosea, and L-Glycine for nighttime REM architecture and morning cortisol resets.
3. Hormonal Balance Protocol ($54): Dual-action formula with DIM, Shatavari, Evening Primrose, and Zinc for luteal phase support and estrogen-progesterone harmony.
4. Glow & Collagen Synthesis ($46): Plant-based silica, Vitamin C, Tremella Mushroom, and Bioactive Curcumin for skin radiance and elasticity.

Core Instructions:
1. Provide personalized botanical and wellness insights based on the user's questions about cycle phases (Follicular, Ovulatory, Luteal, Menstrual), herbs, sleep, or stress.
2. Explain the mechanism of action of key herbs (e.g. how Ashwagandha lowers serum cortisol, how Vitex supports LH surge and progesterone synthesis).
3. If relevant, recommend the appropriate PureForm Health formula with warm explanation.
4. Include a brief, polite wellness statement at the end when addressing health topics: ("Note: My recommendations are for educational and botanical wellness purposes. Please consult with your physician for personalized medical care.")
5. Keep answers well-structured using clean spacing or brief bullet points when helpful.`;

    // Map conversation history to contents format expected by Gemini API
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I apologize, but I was unable to generate a detailed response at this moment. Please ask me about our botanical formulas or herbal ingredients!";
    
    return res.json({ reply });
  } catch (err: any) {
    console.error("Error calling Gemini API in /api/chat:", err);
    return res.json({
      reply: "Thank you for asking. I am currently reviewing clinical trial logs for our latest botanical formulation. Please feel free to ask me about cycle phases, adaptogens like Ashwagandha, or PureForm formulas!"
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
