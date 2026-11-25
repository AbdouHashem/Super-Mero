import { BookOpen, BookText, Languages, Puzzle } from 'lucide-react';
import { useRef } from 'react';
import { playTone } from '../utils/sound';
import { AlphabetLab } from './labs/AlphabetLab';
import { GrammarLab } from './labs/GrammarLab';
import { SpellingLab } from './labs/SpellingLab';
import { StoriesReader } from './labs/StoriesReader';

export type TrackId = 'alphabet' | 'spelling' | 'grammar' | 'stories';

interface LearningTracksProps {
  activeTrack: TrackId;
  onSelectTrack: (track: TrackId) => void;
  completedIds: string[];
  muted: boolean;
  onCompleteLesson: (lessonId: string, starsEarned: number) => void;
}

const TRACK_CARDS: {
  id: TrackId;
  title: string;
  subtitle: string;
  meta: string;
  icon: typeof Languages;
  accentBg: string;
  accentText: string;
  borderActive: string;
}[] = [
  {
    id: 'alphabet',
    title: 'الْحُرُوفُ وَالْحَرَكَاتُ',
    subtitle: 'تَعَلَّمِ الْحُرُوفَ الْهِجَائِيَّةَ بِالْفَتْحَةِ وَالضَّمَّةِ وَالْكَسْرَةِ وَالْمُدُودِ',
    meta: '٢٨ حَرْفاً · نُطْقٌ صَوْتِيٌّ',
    icon: Languages,
    accentBg: 'bg-[#EEF6F5]',
    accentText: 'text-[#0F6F6B]',
    borderActive: 'border-[#0F6F6B] bg-[#EEF6F5]',
  },
  {
    id: 'spelling',
    title: 'الْقِرَاءَةُ وَالتَّهْجِئَةُ',
    subtitle: 'تَحْلِيلُ الْمَقَاطِعِ وَتَرْكِيبُ الْكَلِمَاتِ الْمَشْكُولَةِ',
    meta: '٨ كَلِمَاتٍ · مُخْتَبَرُ تَرْكِيبٍ',
    icon: Puzzle,
    accentBg: 'bg-[#FAF3DC]',
    accentText: 'text-[#B99322]',
    borderActive: 'border-[#D4AF37] bg-[#FAF3DC]/70',
  },
  {
    id: 'grammar',
    title: 'الْقَوَاعِدُ النَّحْوِيَّةُ الْبَسِيطَةُ',
    subtitle: 'الِاسْمُ وَالْفِعْلُ، الْمُذَكَّرُ وَالْمُؤَنَّثُ، وَأَسْمَاءُ الإِشَارَةِ',
    meta: '٣ وَحَدَاتٍ · تَطْبِيقٌ فَوْرِيٌّ',
    icon: BookText,
    accentBg: 'bg-[#EEF6F5]',
    accentText: 'text-[#0F6F6B]',
    borderActive: 'border-[#0F6F6B] bg-[#EEF6F5]',
  },
  {
    id: 'stories',
    title: 'قِصَصُ سُوبَر مِيرُو الْقَصِيرَةُ',
    subtitle: 'قِصَصٌ مُصَوَّرَةٌ وَمَشْكُولَةٌ مَعَ أَسْئِلَةِ فَهْمٍ مُشَوِّقَةٍ',
    meta: '٣ قِصَصٍ · قِرَاءَةٌ وَاسْتِمَاعٌ',
    icon: BookOpen,
    accentBg: 'bg-[#FAF3DC]',
    accentText: 'text-[#B99322]',
    borderActive: 'border-[#D4AF37] bg-[#FAF3DC]/70',
  },
];

export function LearningTracks({
  activeTrack,
  onSelectTrack,
  completedIds,
  muted,
  onCompleteLesson,
}: LearningTracksProps) {
  const labContainerRef = useRef<HTMLDivElement | null>(null);

  const handleCardClick = (trackId: TrackId) => {
    onSelectTrack(trackId);
    playTone('tap', muted);
    labContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <section id="tracks" className="py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="max-w-2xl space-y-2.5">
          <p className="text-sm font-bold text-[#B99322]">مَسَارَاتُ التَّأْسِيسِ التَّفَاعُلِيَّةُ</p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F6F6B] arabic-vocalized">
            اخْتَرْ مَسَارَكَ التَّعْلِيمِيَّ وَابْدَأِ الِاسْتِكْشَافَ
          </h2>
          <div className="flex items-center gap-2.5 max-w-[180px]" aria-hidden="true">
            <span className="h-[1.5px] flex-1 bg-[#D4AF37]/70" />
            <span className="w-2 h-2 rotate-45 bg-[#D4AF37] shrink-0" />
            <span className="h-[1.5px] flex-1 bg-[#D4AF37]/70" />
          </div>
          <p className="text-base text-[#333333] arabic-vocalized">
            أَرْبَعَةُ مَسَارَاتٍ مُتَدَرِّجَةٍ تُغَطِّي أَسَاسِيَّاتِ اللُّغَةِ الْعَرَبِيَّةِ لِطُلَّابِ الْمَرْحَلَةِ الِابْتِدَائِيَّةِ.
          </p>
        </div>

        {/* 4 Interactive Track Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRACK_CARDS.map((card) => {
            const Icon = card.icon;
            const isActive = activeTrack === card.id;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCardClick(card.id)}
                aria-pressed={isActive}
                className={`text-right rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6F6B] ${
                  isActive
                    ? `${card.borderActive} shadow-sm ring-1 ring-[#0F6F6B]/15`
                    : 'bg-white border-[#E5DEC9] hover:border-[#D4AF37] hover:-translate-y-0.5'
                }`}
              >
                <div className="space-y-3">
                  <div
                    className={`w-12 h-12 rounded-2xl ${card.accentBg} ${card.accentText} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-lg text-[#0F6F6B] arabic-vocalized">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#333333]/85 leading-relaxed arabic-vocalized">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5DEC9] flex items-center justify-between text-xs font-bold text-[#333333]/70">
                  <span>{card.meta}</span>
                  <span className={isActive ? 'text-[#0F6F6B]' : 'text-[#333333]/50'}>
                    {isActive ? 'مَفْتُوحٌ' : 'افْتَحْ'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Interactive Learning Lab */}
        <div
          ref={labContainerRef}
          className="bg-white rounded-3xl border border-[#E5DEC9] shadow-sm p-5 sm:p-8 scroll-mt-20"
        >
          {activeTrack === 'alphabet' && (
            <AlphabetLab
              completedIds={completedIds}
              muted={muted}
              onCompleteLesson={onCompleteLesson}
            />
          )}
          {activeTrack === 'spelling' && (
            <SpellingLab
              completedIds={completedIds}
              muted={muted}
              onCompleteLesson={onCompleteLesson}
            />
          )}
          {activeTrack === 'grammar' && (
            <GrammarLab
              completedIds={completedIds}
              muted={muted}
              onCompleteLesson={onCompleteLesson}
            />
          )}
          {activeTrack === 'stories' && (
            <StoriesReader
              completedIds={completedIds}
              muted={muted}
              onCompleteLesson={onCompleteLesson}
            />
          )}
        </div>
      </div>
    </section>
  );
}
