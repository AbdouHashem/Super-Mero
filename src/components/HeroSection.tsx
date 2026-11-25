import {
  ArrowLeft,
  Award,
  BookOpen,
  Gamepad2,
  Globe,
  GraduationCap,
  PlaySquare,
  Star,
} from 'lucide-react';
import { useState } from 'react';
import { BrandEmblem } from './BrandEmblem';

interface HeroSectionProps {
  onStartJourney: () => void;
  onJumpToQuiz: () => void;
}

const FEATURE_PILLARS = [
  {
    icon: GraduationCap,
    title: 'دُرُوسٌ مُتَنَوِّعَةٌ',
    desc: 'تَأْسِيسٌ شَامِلٌ مِنَ الْحُرُوفِ إِلَى الْقِصَصِ',
  },
  {
    icon: PlaySquare,
    title: 'مُحْتَوًى تَفَاعُلِيٌّ',
    desc: 'نُطْقٌ صَوْتِيٌّ وَأَلْعَابٌ وَتَرْكِيبُ كَلِمَاتٍ',
  },
  {
    icon: Award,
    title: 'أَوْسِمَةٌ وَنُجُومٌ',
    desc: 'لَوْحَةُ شَرَفٍ تُحَفِّزُ الطِّفْلَ بِاسْتِمْرَارٍ',
  },
  {
    icon: Globe,
    title: 'مُتَاحٌ فِي كُلِّ مَكَانٍ',
    desc: 'يَعْمَلُ بِسَلَاسَةٍ عَلَى الْجَوَّالِ وَالْكُمْبِيُوتَرِ',
  },
];

export function HeroSection({ onStartJourney, onJumpToQuiz }: HeroSectionProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-8 pb-10 sm:pt-12 sm:pb-14"
    >
      {/* Subtle decorative curve & gentle star echoes from visual identity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <svg
          className="absolute -top-6 -left-10 w-64 h-64 text-[#0F6F6B]/10"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M0,0 L160,0 C120,60 70,110 0,140 Z" />
        </svg>
        <svg
          className="absolute top-10 right-10 w-16 h-16 text-[#D4AF37]/25"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50 8 L61 36 L92 38 L68 57 L76 88 L50 71 L24 88 L32 57 L8 38 L39 36 Z" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-sm p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Text & Welcome Column (Right in RTL) */}
            <div className="lg:col-span-7 flex flex-col justify-center text-right space-y-5">
              {/* Brand Board Emblem & Calligraphy Nib Lockup */}
              <div className="flex items-center gap-4">
                <BrandEmblem className="w-24 sm:w-28" />
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#0F6F6B]">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 shrink-0"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M25 5 L18 19 L13 14 Z"
                        fill="#D4AF37"
                        stroke="#0F6F6B"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 14 L7 25 C11 26 16 24 18 19 Z"
                        fill="#0F6F6B"
                      />
                      <circle cx="18.5" cy="13.5" r="1.4" fill="#FFFFFF" />
                    </svg>
                    <span>مِنَصَّةُ تَأْسِيسِ اللُّغَةِ الْعَرَبِيَّةِ</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#B99322]">
                    بِسُهُولَةٍ وَاحْتِرَافٍ لِطُلَّابِ الْمَرْحَلَةِ الِابْتِدَائِيَّةِ
                  </p>
                </div>
              </div>

              <h1
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F6F6B] leading-snug arabic-vocalized"
                style={{ textWrap: 'balance' }}
              >
                تَعَلَّمِ الْعَرَبِيَّةَ مَعَ{' '}
                <span className="text-[#B99322]">سُوبَر مِيرُو</span>{' '}
                بِسُهُولَةٍ وَمُتْعَةٍ!
              </h1>

              {/* Signature Gold Diamond Divider from Brand Board */}
              <div className="flex items-center gap-3 max-w-xs" aria-hidden="true">
                <span className="h-[1.5px] flex-1 bg-gradient-to-l from-[#D4AF37] to-transparent" />
                <span className="w-2.5 h-2.5 rotate-45 bg-[#D4AF37] shrink-0" />
                <span className="h-[1.5px] flex-1 bg-gradient-to-r from-[#D4AF37] to-transparent" />
              </div>

              <p className="text-base sm:text-lg text-[#333333] leading-relaxed max-w-2xl arabic-vocalized">
                انْطَلِقْ مَعَ الْمُعَلِّمَةِ الْبَطَلَةِ سُوبَر مِيرُو فِي رِحْلَةٍ تَفَاعُلِيَّةٍ شَيِّقَةٍ لِتَعَلُّمِ الْحُرُوفِ الْهِجَائِيَّةِ، التَّهْجِئَةِ، الْقَوَاعِدِ النَّحْوِيَّةِ، وَالْقِصَصِ الْقَصِيرَةِ مَعَ جَمْعِ النُّجُومِ الذَّهَبِيَّةِ.
              </p>

              {/* Primary CTA + Secondary Action */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={onStartJourney}
                  className="inline-flex items-center justify-center gap-3 min-h-[54px] px-7 py-3.5 rounded-2xl bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] font-display font-extrabold text-lg sm:text-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6F6B]"
                >
                  <span>ابدأ رحلة التعلم الآن</span>
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={onJumpToQuiz}
                  className="inline-flex items-center justify-center gap-2.5 min-h-[54px] px-6 py-3.5 rounded-2xl bg-[#EEF6F5] hover:bg-[#DFEEEC] text-[#0F6F6B] border border-[#C6DFDC] font-display font-bold text-base sm:text-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6F6B]"
                >
                  <Gamepad2 className="w-5 h-5 text-[#0F6F6B]" />
                  <span>العب وتحدَّ نَفْسَكَ</span>
                </button>
              </div>
            </div>

            {/* Character Illustration Column (Left in RTL) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden bg-[#F8F6F0] border-2 border-[#E8D48A]/80 flex items-center justify-center shadow-sm">
                {!imgFailed ? (
                  <img
                    src="/src/assets/images/super_mero_hero_1795536484806.jpg"
                    alt="شخصية سوبر ميرو المعلمة البطلة الخارقة تحمل كتاباً وتستقبل الأطفال"
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <div className="w-20 h-20 rounded-full bg-[#0F6F6B] text-[#D4AF37] flex items-center justify-center shadow-sm">
                      <Star className="w-10 h-10 fill-current" />
                    </div>
                    <div className="flex items-center gap-2 text-[#0F6F6B] font-display font-bold text-lg">
                      <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                      <span>سُوبَر مِيرُو</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4-Column Feature Strip echoing the Brand Board's 4 Pillars */}
          <div className="mt-8 pt-6 border-t border-[#E5DEC9] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x lg:divide-x-reverse lg:divide-[#E5DEC9]">
            {FEATURE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="flex items-center gap-3.5 lg:px-5 first:lg:pr-0 last:lg:pl-0"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#EEF6F5] border border-[#D6E5E3] text-[#0F6F6B] flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-base text-[#0F6F6B] arabic-vocalized">
                      {pillar.title}
                    </p>
                    <p className="text-xs sm:text-sm text-[#333333]/80 arabic-vocalized">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
