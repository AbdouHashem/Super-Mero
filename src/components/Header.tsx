import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onStartLearning: () => void;
}

export function Header({ onStartLearning }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#hero', label: 'الرئيسية' },
    { href: '#about', label: 'عن المعلمة' },
    { href: '#tracks', label: 'مسارات التأسيس' },
    { href: '#quiz', label: 'ركن الألعاب' },
    { href: '#honor-board', label: 'لوحة الشرف' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#E5DEC9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo & Wordmark */}
        <a
          href="#hero"
          className="inline-flex items-center gap-2.5 font-display text-xl sm:text-2xl font-extrabold text-[#0F6F6B] tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F6F6B] rounded-lg"
        >
          <img
            src="/assets/aistudio/image_d989967f_8b20d1a4.jpg"
            alt="شعار سوبر ميرو"
            referrerPolicy="no-referrer"
            className="w-11 h-11 rounded-full object-cover border border-[#D4AF37] bg-white shadow-xs shrink-0"
          />
          <span>سوبر ميرو</span>
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-7 text-base font-medium text-[#333333]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#0F6F6B] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F6F6B] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onStartLearning}
            className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] font-display font-bold text-sm transition-transform active:scale-[0.98] shadow-sm cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6F6B]"
          >
            ابدأ التعلّم
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-[#E5DEC9] text-[#0F6F6B] hover:bg-[#EEF6F5] transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E5DEC9] px-4 py-4 space-y-2 shadow-sm">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-[#0F6F6B] hover:bg-[#EEF6F5] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onStartLearning();
            }}
            className="w-full min-h-[44px] mt-2 px-5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] font-display font-bold text-base cursor-pointer"
          >
            ابدأ التعلّم الآن
          </button>
        </div>
      )}
    </header>
  );
}
