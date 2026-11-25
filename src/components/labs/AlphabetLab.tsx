import { CheckCircle2, Maximize2, Star, Volume2, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { ARABIC_LETTERS, type ArabicLetter } from '../../data/arabicCurriculum';
import { playTone, speakArabic } from '../../utils/sound';

interface AlphabetLabProps {
  completedIds: string[];
  muted: boolean;
  onCompleteLesson: (lessonId: string, starsEarned: number) => void;
}

export function AlphabetLab({
  completedIds,
  muted,
  onCompleteLesson,
}: AlphabetLabProps) {
  const [selected, setSelected] = useState<ArabicLetter>(ARABIC_LETTERS[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const lessonKey = `letter-${selected.id}`;
  const isCompleted = completedIds.includes(lessonKey);

  const handleSelectLetter = (item: ArabicLetter) => {
    setSelected(item);
    playTone('tap', muted);
    speakArabic(`${item.fatha}، ${item.exampleWord}`, muted);
    if (window.innerWidth < 1024 && stageRef.current) {
      stageRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleSpeakSound = (soundText: string) => {
    playTone('tap', muted);
    speakArabic(soundText, muted);
  };

  const handleMarkDone = () => {
    if (!isCompleted) {
      playTone('star', muted);
      onCompleteLesson(lessonKey, 2);
    }
  };

  const shortVowels = [
    { label: 'فَتْحَة', value: selected.fatha, clue: 'نَفْتَحُ الْفَمَ' },
    { label: 'ضَمَّة', value: selected.damma, clue: 'نَضُمُّ الشَّفَتَيْنِ' },
    { label: 'كَسْرَة', value: selected.kasra, clue: 'نَخْفِضُ الْفَمَ' },
    { label: 'سُكُون', value: selected.sukoon, clue: 'صَوْتٌ هَادِئٌ' },
  ];

  const longVowels = [
    { label: 'مَدٌّ بِالْأَلِفِ', value: selected.maddAlif },
    { label: 'مَدٌّ بِالْوَاوِ', value: selected.maddWaw },
    { label: 'مَدٌّ بِالْيَاءِ', value: selected.maddYaa },
  ];

  return (
    <div className="space-y-6">
      {/* 28 Letters Selector Grid */}
      <div className="bg-[#F8F6F0] rounded-2xl border border-[#E5DEC9] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#0F6F6B]">
              اخْتَرْ أَيَّ حَرْفٍ لِتَسْمَعَ نُطْقَهُ وَحَرَكَاتِهِ
            </h3>
            <p className="text-xs sm:text-sm text-[#333333]/80">
              اضْغَطْ عَلَى الْحَرْفِ لِتَظْهَرَ بِطَاقَةُ الْفَتْحَةِ وَالضَّمَّةِ وَالْكَسْرَةِ وَالْمِثَالِ الْمُصَوَّرِ
            </p>
          </div>
          <span className="text-sm font-bold text-[#0F6F6B] tabular-nums">
            أَتْمَمْتَ {completedIds.filter((id) => id.startsWith('letter-')).length} مِنْ ٢٨ حَرْفاً
          </span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
          {ARABIC_LETTERS.map((item) => {
            const active = item.id === selected.id;
            const done = completedIds.includes(`letter-${item.id}`);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectLetter(item)}
                className={`relative min-h-[46px] rounded-xl font-display text-xl font-bold transition-all cursor-pointer flex items-center justify-center border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6F6B] ${
                  active
                    ? 'bg-[#0F6F6B] text-white border-[#0A4F4C] shadow-sm scale-[1.04]'
                    : done
                    ? 'bg-[#FAF3DC] text-[#0F6F6B] border-[#D4AF37] hover:bg-[#F5E8BE]'
                    : 'bg-white text-[#0F6F6B] border-[#E5DEC9] hover:border-[#0F6F6B] hover:bg-[#EEF6F5]'
                }`}
                aria-label={`حرف ${item.name}`}
              >
                <span>{item.letter}</span>
                {done && (
                  <span
                    className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-[#D4AF37] text-[#143B39] flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Star className="w-2.5 h-2.5 fill-current" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Letter Interactive Stage */}
      <div ref={stageRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Big Letter Hero Card with Emoji Example & Audio */}
        <div className="lg:col-span-5 bg-[#EEF6F5] rounded-3xl border border-[#D6E5E3] p-6 flex flex-col items-center justify-between text-center space-y-5">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F6F6B]">بِطَاقَةُ الْحَرْفِ</span>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF3DC] border border-[#D6E5E3] text-xs font-bold text-[#0F6F6B] cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#0F6F6B]" />
              <span>تَكْبِيرُ الْبِطَاقَةِ</span>
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F6F6B] arabic-vocalized">
              {selected.name}
            </h4>
            <button
              type="button"
              onClick={() => handleSpeakSound(selected.name)}
              className="mx-auto w-36 h-36 rounded-3xl bg-white border-2 border-[#D4AF37] shadow-sm flex items-center justify-center font-display text-7xl font-extrabold text-[#0F6F6B] hover:scale-105 transition-transform cursor-pointer"
              aria-label={`استمع لنطق حرف ${selected.name}`}
            >
              {selected.letter}
            </button>
          </div>

          {/* Illustrated Emoji Example Card */}
          <button
            type="button"
            onClick={() => handleSpeakSound(selected.exampleWord)}
            className="w-full bg-white hover:bg-[#FAF3DC]/70 rounded-2xl border border-[#D6E5E3] hover:border-[#D4AF37] p-4 transition-colors cursor-pointer flex items-center justify-between gap-4 text-right"
          >
            <div className="flex items-center gap-3.5">
              <span
                className="w-16 h-16 rounded-2xl bg-[#F8F6F0] border border-[#E5DEC9] flex items-center justify-center text-4xl shrink-0"
                role="img"
                aria-label={selected.exampleWord}
              >
                {selected.emoji}
              </span>
              <div>
                <p className="text-xs font-medium text-[#333333]/65">مِثَالٌ مُصَوَّرٌ (اضْغَطْ لِلسَّمَاعِ)</p>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                  {selected.exampleWord}
                </p>
                <p className="text-xs sm:text-sm text-[#333333]/80 arabic-vocalized">
                  {selected.exampleSentence}
                </p>
              </div>
            </div>
            <Volume2 className="w-5 h-5 text-[#0F6F6B] shrink-0" />
          </button>

          <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <button
              type="button"
              onClick={() =>
                handleSpeakSound(
                  `${selected.fatha}، ${selected.damma}، ${selected.kasra}، ${selected.exampleWord}`
                )
              }
              className="w-full min-h-[48px] px-4 py-3 rounded-2xl bg-[#0F6F6B] hover:bg-[#0A4F4C] text-white font-display font-bold text-base inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Volume2 className="w-5 h-5" />
              <span>اسْمَعِ النُّطْقَ كَامِلًا</span>
            </button>

            <button
              type="button"
              onClick={handleMarkDone}
              disabled={isCompleted}
              className={`w-full min-h-[46px] px-4 py-2.5 rounded-2xl font-display font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors ${
                isCompleted
                  ? 'bg-emerald-50 text-[#0F6F6B] border border-emerald-200 cursor-default'
                  : 'bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] cursor-pointer shadow-sm'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تَمَّ إِتْقَانُ الْحَرْفِ</span>
                </>
              ) : (
                <>
                  <Star className="w-4 h-4 fill-current" />
                  <span>أَتْمَمْتُ الْحَرْفَ (+٢ نَجْمَة)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Vowels & Forms Panel */}
        <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
          {/* Short Vowels (Fatha, Damma, Kasra, Sukoon) */}
          <div className="bg-white rounded-2xl border border-[#E5DEC9] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
              <h4 className="font-display text-lg font-bold text-[#0F6F6B]">
                ١. الْحَرْفُ بِالْفَتْحَةِ وَالضَّمَّةِ وَالْكَسْرَةِ
              </h4>
              <span className="text-xs font-medium text-[#333333]/70">
                اضْغَطْ عَلَى أَيِّ حَرَكَةٍ لِنُطْقِهَا
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {shortVowels.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSpeakSound(item.value)}
                  className="min-h-[108px] rounded-2xl bg-[#F8F6F0] hover:bg-[#EEF6F5] border border-[#E5DEC9] hover:border-[#0F6F6B] p-3 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer group"
                >
                  <span className="font-display text-4xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                    {item.value}
                  </span>
                  <span className="text-sm font-bold text-[#0F6F6B]">{item.label}</span>
                  <span className="text-[11px] text-[#333333]/70">{item.clue}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Long Vowels (Mudood) */}
          <div className="bg-white rounded-2xl border border-[#E5DEC9] p-5">
            <h4 className="font-display text-lg font-bold text-[#0F6F6B] mb-3.5">
              ٢. الْحَرَكَاتُ الطَّوِيلَةُ (الْمُدُودُ)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {longVowels.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSpeakSound(item.value)}
                  className="min-h-[88px] rounded-2xl bg-[#FAF3DC]/70 hover:bg-[#FAF3DC] border border-[#E8D48A] p-3 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <span className="font-display text-3xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                    {item.value}
                  </span>
                  <span className="text-xs font-bold text-[#9A7818]">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Word Positions */}
          <div className="bg-white rounded-2xl border border-[#E5DEC9] p-5">
            <h4 className="font-display text-lg font-bold text-[#0F6F6B] mb-3.5">
              ٣. شَكْلُ الْحَرْفِ فِي الْكَلِمَةِ
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-[#F8F6F0] border border-[#E5DEC9] p-3">
                <span className="block font-display text-2xl font-bold text-[#0F6F6B]">
                  {selected.initialForm}
                </span>
                <span className="text-xs font-medium text-[#333333]/75">أَوَّلُ الْكَلِمَةِ</span>
              </div>
              <div className="rounded-xl bg-[#F8F6F0] border border-[#E5DEC9] p-3">
                <span className="block font-display text-2xl font-bold text-[#0F6F6B]">
                  {selected.medialForm}
                </span>
                <span className="text-xs font-medium text-[#333333]/75">وَسَطُ الْكَلِمَةِ</span>
              </div>
              <div className="rounded-xl bg-[#F8F6F0] border border-[#E5DEC9] p-3">
                <span className="block font-display text-2xl font-bold text-[#0F6F6B]">
                  {selected.finalForm}
                </span>
                <span className="text-xs font-medium text-[#333333]/75">آخِرُ الْكَلِمَةِ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Focused Big Letter Card Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0F2F2E]/60 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-modal-title"
        >
          <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative">
            <div className="flex items-center justify-between">
              <h3
                id="letter-modal-title"
                className="font-display text-2xl font-extrabold text-[#0F6F6B] arabic-vocalized"
              >
                بِطَاقَةُ {selected.name}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="إغلاق البطاقة"
                className="w-11 h-11 rounded-xl bg-[#F8F6F0] hover:bg-[#EFECE3] text-[#0F6F6B] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: 'فَتْحَة', val: selected.fatha },
                { label: 'ضَمَّة', val: selected.damma },
                { label: 'كَسْرَة', val: selected.kasra },
              ].map((v) => (
                <button
                  key={v.label}
                  type="button"
                  onClick={() => handleSpeakSound(v.val)}
                  className="rounded-2xl bg-[#EEF6F5] hover:bg-[#DFEEEC] border border-[#D6E5E3] p-4 flex flex-col items-center gap-1 cursor-pointer"
                >
                  <span className="font-display text-5xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                    {v.val}
                  </span>
                  <span className="text-sm font-bold text-[#0F6F6B]">{v.label}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleSpeakSound(selected.exampleWord)}
              className="w-full rounded-2xl bg-[#FAF3DC] hover:bg-[#F5E8BE] border border-[#D4AF37] p-5 flex items-center justify-center gap-4 cursor-pointer"
            >
              <span className="text-5xl" role="img" aria-label={selected.exampleWord}>
                {selected.emoji}
              </span>
              <div className="text-right">
                <p className="font-display text-3xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                  {selected.exampleWord}
                </p>
                <p className="text-sm text-[#333333]/85 arabic-vocalized">
                  {selected.exampleSentence}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                handleSpeakSound(
                  `${selected.fatha}، ${selected.damma}، ${selected.kasra}، ${selected.exampleWord}`
                )
              }
              className="w-full min-h-[50px] rounded-2xl bg-[#0F6F6B] hover:bg-[#0A4F4C] text-white font-display font-bold text-base inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-5 h-5" />
              <span>اسْمَعِ النُّطْقَ</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
