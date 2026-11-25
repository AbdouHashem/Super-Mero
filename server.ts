import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const ENABLE_SERVER_TTS = false;
const MAX_TTS_TEXT_LENGTH = 600;
const MAX_CACHE_ITEMS = 120;

const ttsCache = new Map<string, Buffer>();

function getGeminiClient(): GoogleGenAI | null {
  if (!ENABLE_SERVER_TTS) {
    return null;
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function setCachedTts(key: string, audio: Buffer): void {
  if (ttsCache.size >= MAX_CACHE_ITEMS) {
    const oldestKey = ttsCache.keys().next().value;
    if (oldestKey) {
      ttsCache.delete(oldestKey);
    }
  }
  ttsCache.set(key, audio);
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '16kb' }));

  app.post('/api/tts', async (req: Request, res: Response) => {
    if (!ENABLE_SERVER_TTS) {
      res.status(503).json({ error: 'TTS service disabled for local testing' });
      return;
    }

    const rawText = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
    if (!rawText) {
      res.status(400).json({ error: 'النص المطلوب نطقه غير صالح.' });
      return;
    }

    const text = rawText.slice(0, MAX_TTS_TEXT_LENGTH);
    const cached = ttsCache.get(text);
    if (cached) {
      res.setHeader('Content-Type', 'audio/wav');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(cached);
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({ error: 'TTS service unavailable' });
      return;
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text,
                speechMetadata: {
                  style:
                    'Warm, gentle, very clear female Arabic elementary school teacher pronouncing vocalized Arabic letters, diacritics, and short words slowly for children',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio =
        response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (!base64Audio) {
        res.status(502).json({ error: 'Empty audio response' });
        return;
      }

      const wavBuffer = Buffer.from(base64Audio, 'base64');
      setCachedTts(text, wavBuffer);

      res.setHeader('Content-Type', 'audio/wav');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.send(wavBuffer);
    } catch (error) {
      console.error('Gemini TTS error:', error);
      res.status(502).json({ error: 'Failed to generate Arabic speech' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Super Mero server listening on http://0.0.0.0:${PORT}`);
  });
}

void startServer();
