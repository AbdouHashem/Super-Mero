import { CheckCircle2, Flame, Gamepad2, RefreshCw, Star, Volume2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { QUIZ_BANK, type QuizCategory, type QuizQuestion } from '../data/arabicCurriculum';
import { playTone, speakArabic } from '../utils/sound';
import { ConfettiBurst } from './ConfettiBurst';

interface QuizSectionProps {
  muted: boolean;
  onEarnStars: (starsEarned: number) => void;
}

const CATEGORY_TABS: { id: QuizCategory; label: string }[] = [
  { id: 'all', label: 'تَحَدٍّ شَامِلٌ (١٠ أَسْئِلَةٍ)' },
  { id: 'letters', label: 'الْحُرُوفُ وَالْحَرَكَاتُ' },
  { id: 'spelling', label: 'الْقِرَاءَةُ وَالتَّهْجِئَةُ' },
  { id: 'grammar', label: 'الْقَوَاعِدُ النَّحْوِيَّةُ' },
];

function buildRoundQuestions(cat: QuizCategory): QuizQuestion[] {
  const pool =
    cat === 'all' ? [...QUIZ_BANK] : QUIZ_BANK.filter((q) => q.category === cat);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(10, pool.length));
}

export function QuizSection({ muted, onEarnStars }: QuizSectionProps) {
  const [category, setCategory] = useState<QuizCategory>('all');
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => buildRoundQuestions('all'));
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [roundScore, setRoundScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [roundFinished, setRoundFinished] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  const currentQ = questions[questionIdx] || questions[0];

  const progressPercent = roundFinished
    ? 100
    : Math.round(((questionIdx + (selectedOption !== null ? 1 : 0)) / questions.length) * 100);

  const startFreshRound = (nextCategory: QuizCategory) => {
    setCategory(nextCategory);
    setQuestions(buildRoundQuestions(nextCategory));
    setQuestionIdx(0);
    setSelectedOption(null);
    setRoundScore(0);
    setCorrectCount(0);
    setStreak(0);
    setRoundFinished(false);
    playTone('tap', muted);
  };

  const handleChooseOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      playTone('success', muted);
      speakArabic(currentQ.praiseMessage, muted);
      setRoundScore((s) => s + 2);
      setCorrectCount((c) => c + 1);
      setStreak((st) => st + 1);
      setConfettiKey((k) => k + 1);
      onEarnStars(2);
    } else {
      playTone('tryAgain', muted);
      speakArabic('حَاوِلْ فِي السُّؤَالِ التَّالِي يَا بَطَلُ', muted);
      setStreak(0);
    }
  };

  const handleNext = () => {
    playTone('tap', muted);
    if (questionIdx + 1 >= questions.length) {
      setRoundFinished(true);
      playTone('star', muted);
      setConfettiKey((k) => k + 1);
    } else {
      setQuestionIdx((i) => i + 1);
      setSelectedOption(null);
    }
  };

  return (
    <section id="quiz" className="py-10 sm:py-14">
      <ConfettiBurst triggerKey={confettiKey} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-sm p-6 sm:p-10 space-y-8">
          {/* Header & Category Selector */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <p className="text-sm font-bold text-[#B99322] inline-flex items-center gap-2">
                <Gamepad2 className="w-4 h-4" />
                <span>رُكْنُ الْأَلْعَابِ وَالِاخْتِبَارَاتِ التَّفَاعُلِيَّةِ</span>
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                تَحَدِّي النُّجُومِ السَّرِيعُ مَعَ سُوبَر مِيرُو
              </h2>
              <p className="text-base text-[#333333] arabic-vocalized">
                أَسْئِلَةٌ مُتَجَدِّدَةٌ فِي الْحُرُوفِ وَالْمُدُودِ وَأَسْمَاءِ الإِشَارَةِ — اكْسَبْ نَجْمَتَيْنِ مَعَ كُلِّ إِجَابَةٍ صَحِيحَةٍ!
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F8F6F0] rounded-2xl border border-[#E5DEC9]">
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => startFreshRound(tab.id)}
                  className={`min-h-[42px] px-3.5 py-2 rounded-xl font-display font-bold text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap ${
                    category === tab.id
                      ? 'bg-[#0F6F6B] text-white shadow-sm'
                      : 'text-[#0F6F6B] hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quiz Body */}
          {!roundFinished ? (
            <div className="space-y-6">
              {/* Visual Progress Bar & Stats */}
              <div className="rounded-2xl bg-[#F8F6F0] border border-[#E5DEC9] p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-sm font-bold text-[#0F6F6B]">
                    <span>{currentQ.categoryLabel}</span>
                    <span aria-hidden="true" className="text-[#D4AF37]">·</span>
                    <span className="tabular-nums">
                      السُّؤَالُ {questionIdx + 1} مِنْ {questions.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-5 text-sm font-bold">
                    <span className="inline-flex items-center gap-1.5 text-[#B99322] tabular-nums">
                      <Star className="w-4 h-4 fill-[#D4AF37] text-[#B99322]" />
                      <span>نُجُومُ الْجَوْلَةِ: {roundScore}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#0F6F6B] tabular-nums">
                      <Flame className="w-4 h-4" />
                      <span>سِلْسِلَةُ النَّجَاحِ: {streak}</span>
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div
                    className="w-full h-3.5 rounded-full bg-white border border-[#E5DEC9] overflow-hidden"
                    role="progressbar"
                    aria-valuenow={progressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="تقدم الاختبار"
                  >
                    <div
                      className="h-full bg-[#0F6F6B] transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#333333]/70 font-medium tabular-nums">
                    <span>نِسْبَةُ التَّقَدُّمِ</span>
                    <span>{progressPercent}%</span>
                  </div>
                </div>
              </div>

              {/* Question Card */}
              <div className="rounded-2xl bg-[#EEF6F5]/70 border border-[#D6E5E3] p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                    {currentQ.question}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      playTone('tap', muted);
                      speakArabic(currentQ.question, muted);
                    }}
                    className="self-start sm:self-auto min-h-[42px] px-4 py-2 rounded-xl bg-white hover:bg-[#FAF3DC] border border-[#D6E5E3] text-[#0F6F6B] font-display font-bold text-sm inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Volume2 className="w-4 h-4 text-[#0F6F6B]" />
                    <span>اسْمَعِ السُّؤَالَ</span>
                  </button>
                </div>

                {currentQ.highlight && (
                  <div className="flex justify-center">
                    <div className="px-8 py-4 rounded-2xl bg-white border border-[#D6E5E3] font-display text-3xl sm:text-4xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                      {currentQ.highlight}
                    </div>
                  </div>
                )}

                {/* 4 Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentQ.options.map((opt, idx) => {
                    const isPicked = selectedOption === idx;
                    const isCorrect = idx === currentQ.correctIndex;
                    const showResult = selectedOption !== null;

                    let btnClass =
                      'bg-white hover:bg-[#FAF3DC] border-[#D6E5E3] hover:border-[#D4AF37] text-[#0F6F6B]';
                    if (showResult) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-50 border-emerald-600 text-emerald-900';
                      } else if (isPicked) {
                        btnClass = 'bg-amber-50 border-amber-500 text-amber-900';
                      } else {
                        btnClass = 'bg-white/60 border-[#E5DEC9] text-slate-400';
                      }
                    }

                    return (
                      <button
                        key={`${currentQ.id}-${idx}`}
                        type="button"
                        disabled={selectedOption !== null}
                        onClick={() => handleChooseOption(idx)}
                        className={`min-h-[60px] px-5 py-3.5 rounded-2xl border-2 font-display text-xl font-bold transition-all flex items-center justify-between gap-3 ${btnClass} ${
                          selectedOption === null ? 'cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <span className="arabic-vocalized">{opt}</span>
                        {showResult && isCorrect && (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                        )}
                        {showResult && isPicked && !isCorrect && (
                          <XCircle className="w-6 h-6 text-amber-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Encouraging Feedback + Next Button */}
                {selectedOption !== null && (
                  <div
                    className={`rounded-2xl p-4 sm:p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      selectedOption === currentQ.correctIndex
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    <p className="font-display font-bold text-base sm:text-lg arabic-vocalized">
                      {selectedOption === currentQ.correctIndex
                        ? currentQ.praiseMessage
                        : `قَرِيبٌ جِدًّا يَا بَطَلُ! الْإِجَابَةُ الصَّحِيحَةُ هِيَ: (${currentQ.options[currentQ.correctIndex]})`}
                    </p>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="min-h-[46px] px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] font-display font-extrabold text-base cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
                    >
                      {questionIdx + 1 >= questions.length
                        ? 'عَرْضُ النَّتِيجَةِ'
                        : 'السُّؤَالُ التَّالِي'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Round Summary Card */
            <div className="rounded-3xl bg-[#EEF6F5] border border-[#D6E5E3] p-8 text-center space-y-5">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#D4AF37] text-[#143B39] flex items-center justify-center shadow-sm">
                <Star className="w-10 h-10 fill-current" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-3xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                  أَحْسَنْتَ يَا بَطَلَ سُوبَر مِيرُو!
                </h3>
                <p className="text-lg text-[#333333] arabic-vocalized">
                  أَجَبْتَ إِجَابَةً صَحِيحَةً عَنْ{' '}
                  <span className="font-extrabold text-[#0F6F6B] tabular-nums">{correctCount}</span>{' '}
                  مِنْ{' '}
                  <span className="font-extrabold text-[#0F6F6B] tabular-nums">{questions.length}</span>{' '}
                  أَسْئِلَةٍ، وَجَمَعْتَ{' '}
                  <span className="font-extrabold text-[#B99322] tabular-nums">{roundScore}</span>{' '}
                  نَجْمَةً ذَهَبِيَّةً!
                </p>
              </div>
              <button
                type="button"
                onClick={() => startFreshRound(category)}
                className="inline-flex items-center gap-2 min-h-[50px] px-7 py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] font-display font-extrabold text-lg cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-5 h-5" />
                <span>الْعَبْ جَوْلَةً مُتَجَدِّدَةً</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
