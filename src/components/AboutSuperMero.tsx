import { BookOpen } from 'lucide-react';
import { useState } from 'react';

const STATS = [
  { value: '+٥٠٠', label: 'دَرْسٌ تَعْلِيمِيٌّ مُبَسَّطٌ' },
  { value: '+١٠,٠٠٠', label: 'طَالِبٍ وَطَالِبَةٍ' },
  { value: '+١٠٠', label: 'قِصَّةٍ تَفَاعُلِيَّةٍ' },
];

export function AboutSuperMero() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="about" className="py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-sm p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Column 1: Watercolor Circular Portrait Frame with Arabic Letters & Pen Nib */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                {/* Soft Watercolor Splashes Backdrop */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 340 340"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                >
                  <defs>
                    <radialGradient id="wcTeal" cx="35%" cy="30%" r="60%">
                      <stop offset="0%" stopColor="#0F6F6B" stopOpacity="0.24" />
                      <stop offset="65%" stopColor="#0F6F6B" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#0F6F6B" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="wcGold" cx="70%" cy="72%" r="58%">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.32" />
                      <stop offset="65%" stopColor="#D4AF37" stopOpacity="0.10" />
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Watercolor organic washes */}
                  <circle cx="135" cy="125" r="120" fill="url(#wcTeal)" />
                  <circle cx="215" cy="215" r="115" fill="url(#wcGold)" />
                  {/* Delicate dashed & solid golden ornamental rings */}
                  <circle
                    cx="170"
                    cy="170"
                    r="134"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    strokeOpacity="0.65"
                  />
                  <circle
                    cx="170"
                    cy="170"
                    r="122"
                    fill="none"
                    stroke="#0F6F6B"
                    strokeWidth="1.5"
                    strokeOpacity="0.25"
                  />
                </svg>

                {/* Light Floating Arabic Letters & Calligraphy Pen Nib */}
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-6 font-display text-2xl font-extrabold text-[#0F6F6B]/35 select-none pointer-events-none"
                >
                  ض
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-6 right-4 font-display text-xl font-extrabold text-[#D4AF37]/75 select-none pointer-events-none"
                >
                  أَ
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-8 left-3 font-display text-xl font-extrabold text-[#D4AF37]/70 select-none pointer-events-none"
                >
                  ق
                </span>

                {/* Calligraphy Pen Nib Ornament */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 48 48"
                  className="absolute bottom-3 left-4 w-11 h-11 drop-shadow-sm pointer-events-none"
                  fill="none"
                >
                  <path
                    d="M38 6 L26 27 L19 20 Z"
                    fill="#D4AF37"
                    stroke="#0F6F6B"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 20 L9 37 C16 38 23 34 26 27 Z"
                    fill="#0F6F6B"
                  />
                  <circle cx="27.5" cy="19.5" r="2" fill="#FFFFFF" />
                </svg>

                {/* Circular Portrait Frame */}
                <div className="relative w-52 h-52 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white ring-2 ring-[#D4AF37] shadow-md bg-[#F8F6F0]">
                  {!imgFailed ? (
                    <img
                      src="/assets/aistudio/Premium_Arabic_Learning_Brand_Board__3__e778b0aa.png"
                      alt="الصورة الشخصية للمعلمة سوبر ميرو"
                      referrerPolicy="no-referrer"
                      onError={() => setImgFailed(true)}
                      className="absolute max-w-none pointer-events-none select-none"
                      style={{
                        width: '520%',
                        height: 'auto',
                        left: '-26.2%',
                        top: '-17.6%',
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#EEF6F5] text-[#0F6F6B]">
                      <BookOpen className="w-12 h-12" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Column 2: Warm Story & Mission + 3 Gold Highlight Statistics */}
            <div className="lg:col-span-7 text-right space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-bold text-[#B99322]">
                  قِصَّةُ الشَّغَفِ وَالتَّعْلِيمِ
                </p>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                  تَعَرَّفْ عَلَى سُوبَر مِيرُو
                </h2>
                <div className="flex items-center gap-2.5 max-w-[180px]" aria-hidden="true">
                  <span className="h-[1.5px] flex-1 bg-[#D4AF37]/70" />
                  <span className="w-2 h-2 rotate-45 bg-[#D4AF37] shrink-0" />
                  <span className="h-[1.5px] flex-1 bg-[#D4AF37]/70" />
                </div>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-[#333333] leading-relaxed arabic-vocalized">
                <p>
                  وُلِدَتْ فِكْرَةُ <strong className="text-[#0F6F6B]">سُوبَر مِيرُو</strong> مِنْ رِسَالَةٍ تَرْبَوِيَّةٍ دَافِئَةٍ تُؤْمِنُ بِأَنَّ اللُّغَةَ الْعَرَبِيَّةَ هِيَ لُغَةُ الْجَمَالِ وَالْإِبْدَاعِ، وَأَنَّ كُلَّ طِفْلٍ يَسْتَحِقُّ أَنْ يَبْدَأَ رِحْلَتَهُ مَعَ الْحُرُوفِ وَالْكَلِمَاتِ بِابْتِسَامَةٍ وَفُضُولٍ لَا بِالْحِفْظِ التَّقْلِيدِيِّ.
                </p>
                <p>
                  نَعْمَلُ عَلَى تَبْسِيطِ قَوَاعِدِ الْعَرَبِيَّةِ وَتَقْدِيمِهَا فِي قَالَبٍ تَفَاعُلِيٍّ مَلِيءٍ بِالْقِصَصِ الْمُصَوَّرَةِ وَالْأَلْعَابِ الصَّوْتِيَّةِ، لِنَغْرِسَ فِي قُلُوبِ الْجِيلِ الْجَدِيدِ حُبَّ الْقِرَاءَةِ السَّلِيمَةِ وَالْكِتَابَةِ الْوَاثِقَةِ مُنْذُ الصِّغَرِ.
                </p>
              </div>

              {/* 3 Highlight Statistics in Gold */}
              <div className="pt-4 border-t border-[#E5DEC9] grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-[#F8F6F0] border border-[#E5DEC9] p-4 sm:p-5 text-center sm:text-right space-y-1"
                  >
                    <p
                      dir="ltr"
                      className="font-display text-3xl sm:text-4xl font-extrabold text-[#D4AF37] tabular-nums"
                    >
                      {stat.value}
                    </p>
                    <p className="font-display text-sm font-bold text-[#0F6F6B] arabic-vocalized">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
