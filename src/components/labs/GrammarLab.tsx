import { CheckCircle2, Star } from 'lucide-react';
import { useState } from 'react';
import {
  DEMONSTRATIVE_ITEMS,
  GENDER_ITEMS,
  NOUN_VERB_ITEMS,
} from '../../data/arabicCurriculum';
import { playTone, speakArabic } from '../../utils/sound';

interface GrammarLabProps {
  completedIds: string[];
  muted: boolean;
  onCompleteLesson: (lessonId: string, starsEarned: number) => void;
}

type GrammarTopic = 'nounVerb' | 'gender' | 'demonstratives';

export function GrammarLab({
  completedIds,
  muted,
  onCompleteLesson,
}: GrammarLabProps) {
  const [topic, setTopic] = useState<GrammarTopic>('nounVerb');

  const [nvIndex, setNvIndex] = useState(0);
  const [nvFeedback, setNvFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const [gIndex, setGIndex] = useState(0);
  const [gFeedback, setGFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const [dIndex, setDIndex] = useState(0);
  const [dFeedback, setDFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  const currentNV = NOUN_VERB_ITEMS[nvIndex];
  const currentGender = GENDER_ITEMS[gIndex];
  const currentDemo = DEMONSTRATIVE_ITEMS[dIndex];

  const handleNvAnswer = (choice: 'اسْمٌ' | 'فِعْلٌ') => {
    const isCorrect = choice === currentNV.type;
    if (isCorrect) {
      playTone('success', muted);
      speakArabic(`أَحْسَنْتَ! ${currentNV.word} ${currentNV.type}`, muted);
      setNvFeedback({
        correct: true,
        message: `أَحْسَنْتَ يَا بَطَلُ! (${currentNV.word}) ${currentNV.type} — ${currentNV.explanation}`,
      });
      const key = `grammar-nv-${currentNV.id}`;
      if (!completedIds.includes(key)) {
        onCompleteLesson(key, 2);
      }
    } else {
      playTone('tryAgain', muted);
      setNvFeedback({
        correct: false,
        message: `حَاوِلْ مَرَّةً أُخْرَى! تَذَكَّرْ: الِاسْمُ يَدُلُّ عَلَى شَيْءٍ أَوْ إِنْسَانٍ، وَالْفِعْلُ يَدُلُّ عَلَى عَمَلٍ.`,
      });
    }
  };

  const handleGenderAnswer = (choice: string) => {
    const isCorrect = choice === currentGender.correctAnswer;
    if (isCorrect) {
      playTone('success', muted);
      speakArabic(`مُمْتَازٌ! ${choice}`, muted);
      setGFeedback({
        correct: true,
        message: `مُمْتَازٌ يَا نَجْمُ! الْإِجَابَةُ الصَّحِيحَةُ هِيَ (${choice}).`,
      });
      const key = `grammar-g-${currentGender.id}`;
      if (!completedIds.includes(key)) {
        onCompleteLesson(key, 2);
      }
    } else {
      playTone('tryAgain', muted);
      setGFeedback({
        correct: false,
        message: `لَا بَأْسَ! انْتَبِهْ لِلتَّاءِ الْمَرْبُوطَةِ أَوْ مَعْنَى الْكَلِمَةِ وَحَاوِلْ مُجَدَّداً.`,
      });
    }
  };

  const handleDemoAnswer = (choice: 'هَذَا' | 'هَذِهِ' | 'هَؤُلَاءِ') => {
    const isCorrect = choice === currentDemo.correctPronoun;
    if (isCorrect) {
      playTone('success', muted);
      speakArabic(`${choice} ${currentDemo.sentenceAfter}`, muted);
      setDFeedback({
        correct: true,
        message: `رَائِعٌ! (${choice} ${currentDemo.sentenceAfter}) — لِأَنَّهَا ${currentDemo.hint}.`,
      });
      const key = `grammar-d-${currentDemo.id}`;
      if (!completedIds.includes(key)) {
        onCompleteLesson(key, 2);
      }
    } else {
      playTone('tryAgain', muted);
      setDFeedback({
        correct: false,
        message: `حَاوِلْ مَرَّةً أُخْرَى! تَلْمِيحٌ: الْكَلِمَةُ تَدُلُّ عَلَى (${currentDemo.hint}).`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-topic Segmented Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#F8F6F0] rounded-2xl border border-[#E5DEC9] w-fit">
        <button
          type="button"
          onClick={() => {
            setTopic('nounVerb');
            playTone('tap', muted);
          }}
          className={`min-h-[44px] px-4 py-2 rounded-xl font-display font-bold text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap ${
            topic === 'nounVerb'
              ? 'bg-[#0F6F6B] text-white shadow-sm'
              : 'text-[#0F6F6B] hover:bg-white'
          }`}
        >
          الِاسْمُ وَالْفِعْلُ
        </button>
        <button
          type="button"
          onClick={() => {
            setTopic('gender');
            playTone('tap', muted);
          }}
          className={`min-h-[44px] px-4 py-2 rounded-xl font-display font-bold text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap ${
            topic === 'gender'
              ? 'bg-[#0F6F6B] text-white shadow-sm'
              : 'text-[#0F6F6B] hover:bg-white'
          }`}
        >
          الْمُذَكَّرُ وَالْمُؤَنَّثُ
        </button>
        <button
          type="button"
          onClick={() => {
            setTopic('demonstratives');
            playTone('tap', muted);
          }}
          className={`min-h-[44px] px-4 py-2 rounded-xl font-display font-bold text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap ${
            topic === 'demonstratives'
              ? 'bg-[#0F6F6B] text-white shadow-sm'
              : 'text-[#0F6F6B] hover:bg-white'
          }`}
        >
          أَسْمَاءُ الإِشَارَةِ
        </button>
      </div>

      {/* Topic 1: Noun & Verb */}
      {topic === 'nounVerb' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 bg-[#EEF6F5] rounded-2xl border border-[#D6E5E3] p-6 space-y-4">
            <h3 className="font-display text-xl font-extrabold text-[#0F6F6B]">
              قَاعِدَةُ الِاسْمِ وَالْفِعْلِ
            </h3>
            <div className="bg-white rounded-xl border border-[#D6E5E3] p-4 space-y-1">
              <p className="font-display font-bold text-[#0F6F6B]">١. الِاسْمُ:</p>
              <p className="text-sm sm:text-base text-[#333333] arabic-vocalized">
                مَا يَدُلُّ عَلَى إِنْسَانٍ أَوْ حَيَوَانٍ أَوْ نَبَاتٍ أَوْ مَكَانٍ (مِثْلُ: أَسَدٌ، مَدْرَسَةٌ).
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#D6E5E3] p-4 space-y-1">
              <p className="font-display font-bold text-[#B99322]">٢. الْفِعْلُ:</p>
              <p className="text-sm sm:text-base text-[#333333] arabic-vocalized">
                مَا يَدُلُّ عَلَى عَمَلٍ أَوْ حَرَكَةٍ فِي زَمَنٍ مُعَيَّنٍ (مِثْلُ: يَكْتُبُ، قَرَأَ، ارْسُمْ).
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5DEC9] p-6 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between text-sm font-bold text-[#333333]/70">
              <span>تَدْرِيبٌ تَفَاعُلِيٌّ</span>
              <span className="tabular-nums">
                السُّؤَالُ {nvIndex + 1} مِنْ {NOUN_VERB_ITEMS.length}
              </span>
            </div>

            <div className="text-center py-4 space-y-3">
              <p className="text-base font-medium text-[#333333]/80">
                هَلْ هَذِهِ الْكَلِمَةُ اسْمٌ أَمْ فِعْلٌ؟
              </p>
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#F8F6F0] border border-[#D4AF37]">
                <span className="font-display text-4xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                  {currentNV.word}
                </span>
                {completedIds.includes(`grammar-nv-${currentNV.id}`) && (
                  <CheckCircle2 className="w-6 h-6 text-[#0F6F6B]" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(['اسْمٌ', 'فِعْلٌ'] as const).map((choice) => (
                <button
                  key={choice}
                  type="button"
                  onClick={() => handleNvAnswer(choice)}
                  className="min-h-[54px] rounded-2xl bg-[#FAF3DC] hover:bg-[#D4AF37] border border-[#D4AF37] text-[#143B39] font-display text-xl font-extrabold transition-colors cursor-pointer"
                >
                  {choice}
                </button>
              ))}
            </div>

            {nvFeedback && (
              <div
                className={`rounded-2xl p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  nvFeedback.correct
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <p className="font-display font-bold text-sm sm:text-base arabic-vocalized">
                  {nvFeedback.message}
                </p>
                {nvFeedback.correct && (
                  <button
                    type="button"
                    onClick={() => {
                      setNvIndex((prev) => (prev + 1) % NOUN_VERB_ITEMS.length);
                      setNvFeedback(null);
                    }}
                    className="min-h-[42px] px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] font-display font-bold text-sm cursor-pointer whitespace-nowrap shrink-0"
                  >
                    الْكَلِمَةُ التَّالِيَةُ
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Topic 2: Masculine & Feminine */}
      {topic === 'gender' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 bg-[#EEF6F5] rounded-2xl border border-[#D6E5E3] p-6 space-y-4">
            <h3 className="font-display text-xl font-extrabold text-[#0F6F6B]">
              الْمُذَكَّرُ وَالْمُؤَنَّثُ
            </h3>
            <div className="bg-white rounded-xl border border-[#D6E5E3] p-4 space-y-1">
              <p className="font-display font-bold text-[#0F6F6B]">الْمُذَكَّرُ:</p>
              <p className="text-sm sm:text-base text-[#333333] arabic-vocalized">
                كُلُّ اسْمٍ نُشِيرُ إِلَيْهِ بِـ (هَذَا) مِثْلُ: وَلَدٌ، مُعَلِّمٌ، طَبِيبٌ.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-[#D6E5E3] p-4 space-y-1">
              <p className="font-display font-bold text-[#B99322]">الْمُؤَنَّثُ:</p>
              <p className="text-sm sm:text-base text-[#333333] arabic-vocalized">
                كُلُّ اسْمٍ نُشِيرُ إِلَيْهِ بِـ (هَذِهِ) وَغَالِباً يَنْتَهِي بِالتَّاءِ الْمَرْبُوطَةِ (ـة / ة) مِثْلُ: مُعَلِّمَةٌ، طَالِبَةٌ.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5DEC9] p-6 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between text-sm font-bold text-[#333333]/70">
              <span>اخْتَرِ التَّحْوِيلَ الصَّحِيحَ</span>
              <span className="tabular-nums">
                التَّدْرِيبُ {gIndex + 1} مِنْ {GENDER_ITEMS.length}
              </span>
            </div>

            <div className="text-center py-4 space-y-2">
              <div className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#F8F6F0] border border-[#D4AF37]">
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                  {currentGender.promptWord}
                </span>
                {completedIds.includes(`grammar-g-${currentGender.id}`) && (
                  <CheckCircle2 className="w-6 h-6 text-[#0F6F6B]" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentGender.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleGenderAnswer(opt)}
                  className="min-h-[54px] px-4 rounded-2xl bg-[#FAF3DC] hover:bg-[#D4AF37] border border-[#D4AF37] text-[#143B39] font-display text-xl font-extrabold transition-colors cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>

            {gFeedback && (
              <div
                className={`rounded-2xl p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  gFeedback.correct
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <p className="font-display font-bold text-sm sm:text-base arabic-vocalized">
                  {gFeedback.message}
                </p>
                {gFeedback.correct && (
                  <button
                    type="button"
                    onClick={() => {
                      setGIndex((prev) => (prev + 1) % GENDER_ITEMS.length);
                      setGFeedback(null);
                    }}
                    className="min-h-[42px] px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] font-display font-bold text-sm cursor-pointer whitespace-nowrap shrink-0"
                  >
                    التَّدْرِيبُ التَّالِي
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Topic 3: Demonstratives */}
      {topic === 'demonstratives' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 bg-[#EEF6F5] rounded-2xl border border-[#D6E5E3] p-6 space-y-3">
            <h3 className="font-display text-xl font-extrabold text-[#0F6F6B]">
              أَسْمَاءُ الإِشَارَةِ
            </h3>
            <div className="bg-white rounded-xl border border-[#D6E5E3] p-3.5">
              <p className="font-display font-bold text-[#0F6F6B]">هَذَا ← لِلْمُفْرَدِ الْمُذَكَّرِ</p>
              <p className="text-sm text-[#333333]/80 arabic-vocalized">مِثَالٌ: هَذَا قَلَمٌ جَمِيلٌ.</p>
            </div>
            <div className="bg-white rounded-xl border border-[#D6E5E3] p-3.5">
              <p className="font-display font-bold text-[#B99322]">هَذِهِ ← لِلْمُفْرَدِ الْمُؤَنَّثِ</p>
              <p className="text-sm text-[#333333]/80 arabic-vocalized">مِثَالٌ: هَذِهِ وَرْدَةٌ عَطِرَةٌ.</p>
            </div>
            <div className="bg-white rounded-xl border border-[#D6E5E3] p-3.5">
              <p className="font-display font-bold text-[#0F6F6B]">هَؤُلَاءِ ← لِلْجَمْعِ الْعَاقِلِ</p>
              <p className="text-sm text-[#333333]/80 arabic-vocalized">مِثَالٌ: هَؤُلَاءِ أَطْفَالٌ مُبْدِعُونَ.</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5DEC9] p-6 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between text-sm font-bold text-[#333333]/70">
              <span>أَكْمِلِ الْجُمْلَةَ بِاسْمِ الإِشَارَةِ الصَّحِيحِ</span>
              <span className="tabular-nums">
                الْجُمْلَةُ {dIndex + 1} مِنْ {DEMONSTRATIVE_ITEMS.length}
              </span>
            </div>

            <div className="text-center py-4">
              <div className="inline-flex flex-wrap items-center justify-center gap-3 px-7 py-5 rounded-2xl bg-[#F8F6F0] border border-[#D4AF37]">
                <span className="px-4 py-1 rounded-xl bg-[#EEF6F5] text-[#0F6F6B] font-display text-2xl font-extrabold">
                  ........
                </span>
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                  {currentDemo.sentenceAfter}
                </span>
                {completedIds.includes(`grammar-d-${currentDemo.id}`) && (
                  <CheckCircle2 className="w-6 h-6 text-[#0F6F6B]" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(['هَذَا', 'هَذِهِ', 'هَؤُلَاءِ'] as const).map((pronoun) => (
                <button
                  key={pronoun}
                  type="button"
                  onClick={() => handleDemoAnswer(pronoun)}
                  className="min-h-[54px] rounded-2xl bg-[#FAF3DC] hover:bg-[#D4AF37] border border-[#D4AF37] text-[#143B39] font-display text-xl font-extrabold transition-colors cursor-pointer"
                >
                  {pronoun}
                </button>
              ))}
            </div>

            {dFeedback && (
              <div
                className={`rounded-2xl p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  dFeedback.correct
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  {dFeedback.correct && <Star className="w-5 h-5 fill-[#D4AF37] text-[#B99322] shrink-0" />}
                  <p className="font-display font-bold text-sm sm:text-base arabic-vocalized">
                    {dFeedback.message}
                  </p>
                </div>
                {dFeedback.correct && (
                  <button
                    type="button"
                    onClick={() => {
                      setDIndex((prev) => (prev + 1) % DEMONSTRATIVE_ITEMS.length);
                      setDFeedback(null);
                    }}
                    className="min-h-[42px] px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] font-display font-bold text-sm cursor-pointer whitespace-nowrap shrink-0"
                  >
                    الْجُمْلَةُ التَّالِيَةُ
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
