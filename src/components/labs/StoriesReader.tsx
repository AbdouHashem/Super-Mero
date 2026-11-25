import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Star, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { SUPER_MIRA_STORIES, type Story } from '../../data/arabicCurriculum';
import { playTone, speakArabic, stopSpeech } from '../../utils/sound';

interface StoriesReaderProps {
  completedIds: string[];
  muted: boolean;
  onCompleteLesson: (lessonId: string, starsEarned: number) => void;
}

export function StoriesReader({
  completedIds,
  muted,
  onCompleteLesson,
}: StoriesReaderProps) {
  const [activeStory, setActiveStory] = useState<Story>(SUPER_MIRA_STORIES[0]);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const storyKey = `story-${activeStory.id}`;
  const isCompleted = completedIds.includes(storyKey);
  const isLastPage = pageIndex === activeStory.pages.length - 1;

  const handleSelectStory = (story: Story) => {
    stopSpeech();
    setActiveStory(story);
    setPageIndex(0);
    setSelectedAnswer(null);
    playTone('tap', muted);
  };

  const handleAnswerQuestion = (optionIdx: number) => {
    setSelectedAnswer(optionIdx);
    if (optionIdx === activeStory.correctIndex) {
      playTone('success', muted);
      if (!isCompleted) {
        onCompleteLesson(storyKey, 4);
      }
    } else {
      playTone('tryAgain', muted);
    }
  };

  return (
    <div className="space-y-6">
      {/* Story Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SUPER_MIRA_STORIES.map((story) => {
          const active = story.id === activeStory.id;
          const done = completedIds.includes(`story-${story.id}`);
          return (
            <button
              key={story.id}
              type="button"
              onClick={() => handleSelectStory(story)}
              className={`text-right rounded-2xl border overflow-hidden transition-all cursor-pointer flex flex-col ${
                active
                  ? 'bg-[#EEF6F5] border-[#0F6F6B] shadow-sm'
                  : 'bg-white border-[#E5DEC9] hover:border-[#D4AF37]'
              }`}
            >
              <div className="h-36 w-full bg-[#F8F6F0] overflow-hidden">
                {!failedImages[story.id] ? (
                  <img
                    src={story.image}
                    alt={story.title}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [story.id]: true }))
                    }
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#0F6F6B]">
                    <BookOpen className="w-10 h-10" />
                  </div>
                )}
              </div>
              <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-[#333333]/65">{story.readingLevel}</p>
                  <h4 className="font-display font-bold text-base text-[#0F6F6B] arabic-vocalized mt-0.5">
                    {story.title}
                  </h4>
                </div>
                {done && (
                  <p className="text-xs font-bold text-[#0F6F6B] inline-flex items-center gap-1 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>مَقْرُوءَةٌ وَمُكْتَمِلَةٌ</span>
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Story Reader Stage */}
      <div className="bg-white rounded-3xl border border-[#E5DEC9] p-5 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Illustration */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-[#F8F6F0] border border-[#E5DEC9] min-h-[240px]">
            {!failedImages[activeStory.id] ? (
              <img
                src={activeStory.image}
                alt={activeStory.title}
                referrerPolicy="no-referrer"
                onError={() =>
                  setFailedImages((prev) => ({ ...prev, [activeStory.id]: true }))
                }
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-8 text-[#0F6F6B]">
                <BookOpen className="w-16 h-16" />
              </div>
            )}
          </div>

          {/* Story Page Content */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-2xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                    {activeStory.title}
                  </h3>
                  <p className="text-sm text-[#333333]/75 arabic-vocalized">{activeStory.subtitle}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playTone('tap', muted);
                    speakArabic(activeStory.pages[pageIndex], muted);
                  }}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#0F6F6B] hover:bg-[#0A4F4C] text-white font-display font-bold text-sm inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>اسْتَمِعْ لِلصَّفْحَةِ</span>
                </button>
              </div>

              <div className="rounded-2xl bg-[#F8F6F0] border border-[#E5DEC9] p-5 sm:p-6">
                <p className="font-display text-xl sm:text-2xl font-semibold text-[#333333] arabic-vocalized">
                  {activeStory.pages[pageIndex]}
                </p>
              </div>
            </div>

            {/* Comprehension check on last page */}
            {isLastPage && (
              <div className="rounded-2xl bg-[#FAF3DC] border border-[#D4AF37] p-5 space-y-3">
                <p className="font-display font-bold text-base text-[#0F6F6B] arabic-vocalized">
                  سُؤَالُ الْفَهْمِ: {activeStory.question}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activeStory.options.map((opt, idx) => {
                    const picked = selectedAnswer === idx;
                    const correct = idx === activeStory.correctIndex;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleAnswerQuestion(idx)}
                        className={`min-h-[46px] px-3 py-2 rounded-xl font-display font-bold text-base border transition-colors cursor-pointer ${
                          picked
                            ? correct
                              ? 'bg-[#0F6F6B] text-white border-[#0A4F4C]'
                              : 'bg-amber-200 text-[#143B39] border-amber-400'
                            : 'bg-white hover:bg-[#EEF6F5] text-[#0F6F6B] border-[#E5DEC9]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {selectedAnswer === activeStory.correctIndex && (
                  <p className="text-sm font-bold text-[#0F6F6B] inline-flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-[#D4AF37] text-[#B99322]" />
                    <span>أَحْسَنْتَ يَا قَارِئَنَا الْبَطَلَ! حَصَلْتَ عَلَى ٤ نُجُومٍ!</span>
                  </p>
                )}
              </div>
            )}

            {/* Page Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E5DEC9]">
              <button
                type="button"
                disabled={pageIndex === 0}
                onClick={() => {
                  setPageIndex((p) => Math.max(0, p - 1));
                  playTone('tap', muted);
                }}
                className={`min-h-[44px] px-4 py-2 rounded-xl font-display font-bold text-sm inline-flex items-center gap-2 transition-colors ${
                  pageIndex === 0
                    ? 'bg-[#F8F6F0] text-[#333333]/35 cursor-not-allowed'
                    : 'bg-[#EEF6F5] hover:bg-[#DFEEEC] text-[#0F6F6B] cursor-pointer'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
                <span>الصَّفْحَةُ السَّابِقَةُ</span>
              </button>

              <span className="text-sm font-bold text-[#333333]/75 tabular-nums">
                صَفْحَة {pageIndex + 1} مِنْ {activeStory.pages.length}
              </span>

              <button
                type="button"
                disabled={isLastPage}
                onClick={() => {
                  setPageIndex((p) => Math.min(activeStory.pages.length - 1, p + 1));
                  playTone('tap', muted);
                }}
                className={`min-h-[44px] px-4 py-2 rounded-xl font-display font-bold text-sm inline-flex items-center gap-2 transition-colors ${
                  isLastPage
                    ? 'bg-[#F8F6F0] text-[#333333]/35 cursor-not-allowed'
                    : 'bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] cursor-pointer'
                }`}
              >
                <span>الصَّفْحَةُ التَّالِيَةُ</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
