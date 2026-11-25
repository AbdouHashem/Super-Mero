import { BrandEmblem } from './BrandEmblem';

const QUICK_LINKS = [
  { href: '#hero', label: 'الرئيسية' },
  { href: '#about', label: 'تعرف على سوبر ميرو' },
  { href: '#tracks', label: 'مسارات التأسيس' },
  { href: '#quiz', label: 'ركن الألعاب' },
  { href: '#honor-board', label: 'لوحة الشرف' },
  { href: '#parent-contact', label: 'حجز حصة تجريبية' },
];

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-[#E5DEC9] pt-12 mt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Logo & Short Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <BrandEmblem className="w-20" />
              <div>
                <p className="font-display text-2xl font-extrabold text-[#0F6F6B]">
                  سوبر ميرو
                </p>
                <p className="text-xs font-bold text-[#B99322]">
                  تَعَلُّمُ الْعَرَبِيَّةِ بِسُهُولَةٍ وَمُتْعَةٍ
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-[#333333]/85 leading-relaxed max-w-md arabic-vocalized">
              مِنَصَّةٌ تَعْلِيمِيَّةٌ تَفَاعُلِيَّةٌ لِتَأْسِيسِ طُلَّابِ الْمَرْحَلَةِ الِابْتِدَائِيَّةِ فِي اللُّغَةِ الْعَرَبِيَّةِ عَبْرَ الْحُرُوفِ وَالتَّهْجِئَةِ وَالْقَوَاعِدِ وَالْقِصَصِ الْمُمْتِعَةِ.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-display text-base font-extrabold text-[#0F6F6B]">
              رَوَابِطُ سَرِيعَةٌ
            </h3>
            <nav
              aria-label="روابط أقسام الموقع"
              className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm font-medium text-[#333333]/85"
            >
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#0F6F6B] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Golden Circular Social Media Icons */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-display text-base font-extrabold text-[#0F6F6B]">
              تَابِعْنَا عَلَى التَّوَاصُلِ الِاجْتِمَاعِيِّ
            </h3>
            <p className="text-xs sm:text-sm text-[#333333]/75">
              فِيدْيُوهَاتٌ تَعْلِيمِيَّةٌ وَأَنْشِطَةٌ يَوْمِيَّةٌ لِلْأَطْفَالِ
            </p>
            <div className="flex items-center gap-3 pt-1">
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="يوتيوب سوبر ميرو"
                className="w-11 h-11 rounded-full bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] flex items-center justify-center shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="إنستغرام سوبر ميرو"
                className="w-11 h-11 rounded-full bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] flex items-center justify-center shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تيك توك سوبر ميرو"
                className="w-11 h-11 rounded-full bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] flex items-center justify-center shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="فيسبوك سوبر ميرو"
                className="w-11 h-11 rounded-full bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] flex items-center justify-center shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave & Copyright Strip */}
      <div className="relative bg-[#0F6F6B] text-white overflow-hidden">
        <svg
          aria-hidden="true"
          className="block w-full h-6 sm:h-8 text-white"
          preserveAspectRatio="none"
          viewBox="0 0 1440 54"
        >
          <path
            d="M0,0 L1440,0 L1440,18 C1120,52 720,46 360,18 C180,4 70,12 0,24 Z"
            fill="#FFFFFF"
          />
          <path
            d="M0,24 C70,12 180,4 360,18 C720,46 1120,52 1440,18"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3.5"
          />
        </svg>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-5 pt-1 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <p className="font-display text-sm sm:text-base font-bold text-white">
            جميع الحقوق محفوظة لمنصة سوبر ميرو © 2026
          </p>
          <p className="font-display text-sm sm:text-base font-medium text-[#FDE68A] arabic-vocalized">
            مَعاً نَرْتَقِي بِاللُّغَةِ الْعَرَبِيَّةِ
          </p>
        </div>
      </div>
    </footer>
  );
}
