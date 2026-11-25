import { CheckCircle2, RotateCcw, Sparkles, Star, Volume2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { SPELLING_WORDS, type SpellingWord } from '../../data/arabicCurriculum';
import { playTone, speakArabic } from '../../utils/sound';

interface SpellingLabProps {
  completedIds: string[];
  muted: boolean;
  onCompleteLesson: (lessonId: string, starsEarned: number) => void;
}

function deterministicShuffle(items: string[], seedStr: string): { id: number; text: string }[] {
  const indexed = items.map((text, id) => ({ id, text }));
  let seed = seedStr.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const copy = [...indexed];
  for (let i = copy.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = seed % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  if (copy.length > 1 && copy.every((item, idx) => item.id === idx)) {
    [copy[0], copy[copy.length - 1]] = [copy[copy.length - 1], copy[0]];
  }
  return copy;
}

export function SpellingLab({
  completedIds,
  muted,
  onCompleteLesson,
}: SpellingLabProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord: SpellingWord = SPELLING_WORDS[wordIndex];
  const [selectedTileIds, setSelectedTileIds] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const shuffledTiles = useMemo(
    () => deterministicShuffle(currentWord.pieces, currentWord.id),
    [currentWord.id, currentWord.pieces]
  );

  const lessonKey = `spelling-${currentWord.id}`;
  const isCompleted = completedIds.includes(lessonKey);

  const assembledPieces = selectedTileIds.map(
    (id) => shuffledTiles.find((t) => t.id === id)?.text || ''
  );

  const selectWord = (idx: number) => {
    setWordIndex(idx);
    setSelectedTileIds([]);
    setFeedback('idle');
    playTone('tap', muted);
  };

  const handleTileClick = (tileId: number, text: string) => {
    if (selectedTileIds.includes(tileId) || feedback === 'correct') return;

    playTone('tap', muted);
    speakArabic(text, muted);

    const nextIds = [...selectedTileIds, tileId];
    setSelectedTileIds(nextIds);

    if (nextIds.length === currentWord.pieces.length) {
      const built = nextIds
        .map((id) => shuffledTiles.find((t) => t.id === id)?.text || '')
        .join('');
      const target = currentWord.pieces.join('');

      if (built === target) {
        setFeedback('correct');
        playTone('success', muted);
        speakArabic(`أَحْسَنْتَ! ${currentWord.word}`, muted);
        if (!isCompleted) {
          onCompleteLesson(lessonKey, 3);
        }
      } else {
        setFeedback('wrong');
        playTone('tryAgain', muted);
      }
    } else {
      setFeedback('idle');
    }
  };

  const handleResetWord = () => {
    setSelectedTileIds([]);
    setFeedback('idle');
    playTone('tap', muted);
  };

  const handleNextWord = () => {
    const nextIdx = (wordIndex + 1) % SPELLING_WORDS.length;
    selectWord(nextIdx);
  };

  return (
    <div className="space-y-6">
      {/* Word Selector Strip */}
      <div className="flex flex-wrap items-center gap-2">
        {SPELLING_WORDS.map((item, idx) => {
          const active = idx === wordIndex;
          const done = completedIds.includes(`spelling-${item.id}`);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectWord(idx)}
              className={`min-h-[44px] px-4 py-2 rounded-xl font-display font-bold text-base transition-all cursor-pointer inline-flex items-center gap-2 border ${
                active
                  ? 'bg-[#0F6F6B] text-white border-[#0A4F4C] shadow-sm'
                  : done
                  ? 'bg-[#FAF3DC] text-[#0F6F6B] border-[#D4AF37]'
                  : 'bg-white text-[#0F6F6B] border-[#E5DEC9] hover:bg-[#EEF6F5]'
              }`}
            >
              <span className="arabic-vocalized">{item.word}</span>
              {done && <CheckCircle2 className="w-4 h-4 text-[#0F6F6B] shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Interactive Spelling Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Word Clue & Syllable Analysis */}
        <div className="lg:col-span-5 bg-[#EEF6F5] rounded-2xl border border-[#D6E5E3] p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#0F6F6B]">
              <span>تَحْلِيلُ وَتَرْكِيبُ الْكَلِمَةِ</span>
              <span>الْمُسْتَوَى: {currentWord.level}</span>
            </div>
            <h3 className="font-display text-2xl font-extrabold text-[#0F6F6B] arabic-vocalized">
              رَكِّبْ كَلِمَةَ: ({currentWord.word})
            </h3>
            <p className="text-base text-[#333333] arabic-vocalized">{currentWord.hint}</p>
          </div>

          {/* Syllable Breakdown */}
          <div className="bg-white rounded-2xl border border-[#D6E5E3] p-4 space-y-2">
            <p className="text-xs font-bold text-[#333333]/70">الْمَقَاطِعُ الصَّوْتِيَّةُ لِلْكَلِمَةِ</p>
            <div className="flex flex-wrap items-center gap-2">
              {currentWord.syllables.map((syl, i) => (
                <button
                  key={`${currentWord.id}-syl-${i}`}
                  type="button"
                  onClick={() => {
                    playTone('tap', muted);
                    speakArabic(syl, muted);
                  }}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#F8F6F0] hover:bg-[#FAF3DC] border border-[#E5DEC9] font-display text-xl font-bold text-[#0F6F6B] cursor-pointer"
                >
                  {syl}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playTone('tap', muted);
              speakArabic(currentWord.word, muted);
            }}
            className="w-full min-h-[46px] px-5 py-3 rounded-xl bg-[#0F6F6B] hover:bg-[#0A4F4C] text-white font-display font-bold text-base inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Volume2 className="w-5 h-5" />
            <span>اسْمَعِ الْكَلِمَةَ كَامِلَةً</span>
          </button>
        </div>

        {/* Word Builder Zone */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5DEC9] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-display font-bold text-lg text-[#0F6F6B]">
                اضْغَطْ عَلَى الْحُرُوفِ بِالتَّرْتِيبِ الصَّحِيحِ:
              </p>
              <button
                type="button"
                onClick={handleResetWord}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-xl bg-[#F8F6F0] hover:bg-[#EFECE3] text-[#333333] text-sm font-bold cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إِعَادَةٌ</span>
              </button>
            </div>

            {/* Target Slots */}
            <div className="min-h-[96px] rounded-2xl bg-[#F8F6F0] border-2 border-dashed border-[#D4AF37]/60 p-4 flex flex-wrap items-center justify-center gap-3">
              {currentWord.pieces.map((_, idx) => {
                const placed = assembledPieces[idx];
                return (
                  <div
                    key={`slot-${idx}`}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center font-display text-3xl font-extrabold border-2 transition-all ${
                      placed
                        ? feedback === 'correct'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                          : feedback === 'wrong'
                          ? 'bg-amber-50 border-amber-500 text-amber-900'
                          : 'bg-white border-[#0F6F6B] text-[#0F6F6B]'
                        : 'bg-white/75 border-[#E5DEC9] text-[#333333]/30'
                    }`}
                  >
                    {placed || idx + 1}
                  </div>
                );
              })}
            </div>

            {/* Scrambled Pieces */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {shuffledTiles.map((tile) => {
                const used = selectedTileIds.includes(tile.id);
                return (
                  <button
                    key={tile.id}
                    type="button"
                    disabled={used || feedback === 'correct'}
                    onClick={() => handleTileClick(tile.id, tile.text)}
                    className={`min-w-[68px] min-h-[68px] px-4 rounded-2xl font-display text-3xl font-extrabold border-2 transition-all ${
                      used
                        ? 'bg-[#F8F6F0] border-[#E5DEC9] text-[#333333]/40 opacity-50 cursor-default'
                        : 'bg-[#FAF3DC] hover:bg-[#F5E8BE] border-[#D4AF37] text-[#0F6F6B] shadow-sm hover:-translate-y-0.5 cursor-pointer'
                    }`}
                  >
                    {tile.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Banner */}
          <div className="pt-2">
            {feedback === 'correct' && (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F6F6B] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg text-emerald-900 arabic-vocalized">
                      أَحْسَنْتَ يَا بَطَلُ! كَلِمَةٌ صَحِيحَةٌ: ({currentWord.word})
                    </p>
                    <p className="text-sm text-emerald-800 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#D4AF37] text-[#B99322]" />
                      <span>حَصَلْتَ عَلَى ٣ نُجُومٍ ذَهَبِيَّةٍ!</span>
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleNextWord}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] font-display font-bold text-sm cursor-pointer whitespace-nowrap shrink-0"
                >
                  الْكَلِمَةُ التَّالِيَةُ
                </button>
              </div>
            )}

            {feedback === 'wrong' && (
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="font-display font-bold text-base text-amber-900 arabic-vocalized">
                  لَا بَأْسَ يَا صَدِيقِي! حَاوِلْ تَرْتِيبَ الْحُرُوفِ مَرَّةً أُخْرَى.
                </p>
                <button
                  type="button"
                  onClick={handleResetWord}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#FAF3DC] hover:bg-[#F5E8BE] border border-[#D4AF37] text-[#143B39] font-display font-bold text-sm cursor-pointer whitespace-nowrap shrink-0"
                >
                  حَاوِلْ مُجَدَّداً
                </button>
              </div>
            )}

            {feedback === 'idle' && (
              <p className="text-sm text-[#333333]/70 text-center">
                رَكِّبْ كُلَّ كَلِمَةٍ لِتَحْصُلَ عَلَى ٣ نُجُومٍ فِي لَوْحَةِ الشَّرَفِ.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
