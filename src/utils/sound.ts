let audioCtx: AudioContext | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];
let activeUtterance: SpeechSynthesisUtterance | null = null;
let activeBufferSource: AudioBufferSourceNode | null = null;
let activeHtmlAudio: HTMLAudioElement | null = null;
let activeHtmlAudioUrl: string | null = null;
let activeAbortController: AbortController | null = null;
let speechRequestCounter = 0;

const ENABLE_SERVER_TTS = false;
const ttsAudioCache = new Map<string, ArrayBuffer>();
const MAX_CLIENT_TTS_CACHE = 80;

function loadArabicVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedVoices = voices;
  }
  return cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadArabicVoices();
  window.speechSynthesis.addEventListener?.('voiceschanged', loadArabicVoices);
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (Ctx) {
      audioCtx = new Ctx();
    }
  }
  return audioCtx;
}

async function ensureAudioContextRunning(): Promise<AudioContext | null> {
  const ctx = getAudioContext();
  if (!ctx) return null;
  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch {
      // Ignore autoplay errors prior to user gesture
    }
  }
  return ctx;
}

if (typeof window !== 'undefined') {
  const unlock = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      void ctx.resume().catch(() => {});
    }
  };
  window.addEventListener('pointerdown', unlock, { passive: true });
  window.addEventListener('keydown', unlock, { passive: true });
}

function scheduleTone(
  ctx: AudioContext,
  type: 'tap' | 'success' | 'tryAgain' | 'star'
): void {
  const now = ctx.currentTime;

  if (type === 'tap') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.08);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
    return;
  }

  if (type === 'success') {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const start = now + idx * 0.075;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.22);
    });
    return;
  }

  if (type === 'star') {
    const notes = [659.25, 880, 1174.66];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const start = now + idx * 0.06;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.11, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.2);
    });
    return;
  }

  const notes = [392, 329.63];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const start = now + idx * 0.11;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.09, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.16);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.16);
  });
}

export function playTone(
  type: 'tap' | 'success' | 'tryAgain' | 'star',
  muted = false
): void {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    void ctx
      .resume()
      .then(() => {
        if (ctx.state === 'running') {
          scheduleTone(ctx, type);
        }
      })
      .catch(() => {});
    return;
  }

  scheduleTone(ctx, type);
}

function pickPreferredArabicVoice(): SpeechSynthesisVoice | undefined {
  const voices = loadArabicVoices();
  if (voices.length === 0) return undefined;

  return (
    voices.find((v) => v.lang.toLowerCase() === 'ar-sa') ||
    voices.find((v) => v.lang.toLowerCase() === 'ar-eg') ||
    voices.find((v) => v.lang.toLowerCase().startsWith('ar-')) ||
    voices.find((v) => v.lang.toLowerCase().startsWith('ar'))
  );
}

function speakWithBrowserSynthesis(text: string, requestId: number): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    // Small delay avoids Chrome canceling the newly queued utterance synchronously
    window.setTimeout(() => {
      if (requestId !== speechRequestCounter) return;
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        const arabicVoice = pickPreferredArabicVoice();
        if (arabicVoice) {
          utterance.voice = arabicVoice;
          utterance.lang = arabicVoice.lang;
        } else {
          utterance.lang = 'ar-SA';
        }
        utterance.rate = 0.85;
        utterance.pitch = 1.05;
        utterance.volume = 1;
        utterance.onend = () => {
          if (activeUtterance === utterance) activeUtterance = null;
        };
        utterance.onerror = () => {
          if (activeUtterance === utterance) activeUtterance = null;
        };
        activeUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      } catch {
        // Ignore browser synthesis errors
      }
    }, 60);
  } catch {
    // Graceful no-op when speech synthesis is unavailable
  }
}

function stopCurrentPlayback(cancelRequests = true): void {
  if (cancelRequests && activeAbortController) {
    activeAbortController.abort();
    activeAbortController = null;
  }

  if (activeBufferSource) {
    try {
      activeBufferSource.stop();
      activeBufferSource.disconnect();
    } catch {
      // Ignore already-stopped source
    }
    activeBufferSource = null;
  }

  if (activeHtmlAudio) {
    try {
      activeHtmlAudio.pause();
      activeHtmlAudio.currentTime = 0;
    } catch {
      // Ignore
    }
    activeHtmlAudio = null;
  }

  if (activeHtmlAudioUrl) {
    URL.revokeObjectURL(activeHtmlAudioUrl);
    activeHtmlAudioUrl = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  }
  activeUtterance = null;
}

async function playWavArrayBuffer(
  wavBytes: ArrayBuffer,
  requestId: number
): Promise<boolean> {
  if (requestId !== speechRequestCounter) return true;

  const ctx = await ensureAudioContextRunning();
  if (ctx && ctx.state === 'running') {
    try {
      const decoded = await ctx.decodeAudioData(wavBytes.slice(0));
      if (requestId !== speechRequestCounter) return true;
      const source = ctx.createBufferSource();
      source.buffer = decoded;
      source.connect(ctx.destination);
      source.onended = () => {
        if (activeBufferSource === source) activeBufferSource = null;
      };
      activeBufferSource = source;
      source.start(0);
      return true;
    } catch {
      // Fall through to HTMLAudioElement fallback
    }
  }

  try {
    const blob = new Blob([wavBytes], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    activeHtmlAudioUrl = url;
    activeHtmlAudio = audio;
    audio.onended = () => {
      if (activeHtmlAudioUrl === url) {
        URL.revokeObjectURL(url);
        activeHtmlAudioUrl = null;
      }
      if (activeHtmlAudio === audio) {
        activeHtmlAudio = null;
      }
    };
    await audio.play();
    return true;
  } catch {
    return false;
  }
}

function storeClientTtsCache(key: string, bytes: ArrayBuffer): void {
  if (ttsAudioCache.size >= MAX_CLIENT_TTS_CACHE) {
    const oldest = ttsAudioCache.keys().next().value;
    if (oldest) ttsAudioCache.delete(oldest);
  }
  ttsAudioCache.set(key, bytes);
}

export function speakArabic(text: string, muted = false): void {
  const cleanText = text.trim();
  if (muted || !cleanText || typeof window === 'undefined') {
    return;
  }

  const requestId = ++speechRequestCounter;
  stopCurrentPlayback(true);

  // Unlock AudioContext immediately within user gesture before async fetch
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    void ctx.resume().catch(() => {});
  }

  if (!ENABLE_SERVER_TTS) {
    speakWithBrowserSynthesis(cleanText, requestId);
    return;
  }

  const cachedBytes = ttsAudioCache.get(cleanText);
  if (cachedBytes) {
    void playWavArrayBuffer(cachedBytes, requestId).then((played) => {
      if (!played && requestId === speechRequestCounter) {
        speakWithBrowserSynthesis(cleanText, requestId);
      }
    });
    return;
  }

  const controller = new AbortController();
  activeAbortController = controller;

  void (async () => {
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`TTS HTTP ${response.status}`);
      }

      const wavBytes = await response.arrayBuffer();
      if (wavBytes.byteLength < 44) {
        throw new Error('Invalid WAV audio');
      }

      storeClientTtsCache(cleanText, wavBytes);

      if (requestId !== speechRequestCounter) return;
      const played = await playWavArrayBuffer(wavBytes, requestId);
      if (!played && requestId === speechRequestCounter) {
        speakWithBrowserSynthesis(cleanText, requestId);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      if (requestId === speechRequestCounter) {
        speakWithBrowserSynthesis(cleanText, requestId);
      }
    }
  })();
}

export function stopSpeech(): void {
  speechRequestCounter += 1;
  stopCurrentPlayback(true);
}
