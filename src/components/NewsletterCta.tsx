import { BookOpenCheck, CheckCircle2, Mail } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { subscribeNewsletter } from '../services/database';
import { playTone } from '../utils/sound';

interface NewsletterCtaProps {
  muted: boolean;
}

export function NewsletterCta({ muted }: NewsletterCtaProps) {
  const [email, setEmail] = useState('');
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    const cleaned = email.trim().toLowerCase();
    const validEmail =
      cleaned.length >= 5 &&
      cleaned.length <= 254 &&
      /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(cleaned);
    if (!validEmail) {
      setErrorMsg('يُرْجَى إِدْخَالُ بَرِيدٍ إِلكْتْرُونِيٍّ صَحِيحٍ لِتَصِلَكَ أَوْرَاقُ الْعَمَلِ.');
      playTone('tryAgain', muted);
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);
    try {
      const result = await subscribeNewsletter(cleaned);
      setAlreadySubscribed(result === 'already_subscribed');
      setSubscribedEmail(cleaned);
      setEmail('');
      playTone('success', muted);
    } catch {
      setErrorMsg('تَعَذَّرَ إِتْمَامُ الِاشْتِرَاكِ حَالِيًّا، يُرْجَى الْمُحَاوَلَةُ مُجَدَّداً.');
      playTone('tryAgain', muted);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter-cta" className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-3xl border border-[#C8D8D6] shadow-md px-6 py-10 sm:px-12 sm:py-14 text-white"
          style={{
            background:
              'linear-gradient(135deg, #0F6F6B 0%, #165B73 45%, #5B3FA6 100%)',
          }}
        >
          {/* Soft Watercolor Teal & Purple Washes */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 420"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 w-full h-full"
          >
            <defs>
              <radialGradient id="ctaWashTeal" cx="18%" cy="22%" r="55%">
                <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.34" />
                <stop offset="65%" stopColor="#0F6F6B" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#0F6F6B" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="ctaWashPurple" cx="85%" cy="75%" r="55%">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.38" />
                <stop offset="65%" stopColor="#6D28D9" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#6D28D9" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="ctaWashGold" cx="50%" cy="10%" r="45%">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="220" cy="95" r="300" fill="url(#ctaWashTeal)" />
            <circle cx="1000" cy="310" r="320" fill="url(#ctaWashPurple)" />
            <circle cx="620" cy="40" r="240" fill="url(#ctaWashGold)" />
          </svg>

          <div className="relative max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#FDE68A]">
              <BookOpenCheck className="w-5 h-5" />
              <span>هَدَايَا أُسْبُوعِيَّةٌ مَجَّانِيَّةٌ لِأَبْطَالِ اللُّغَةِ الْعَرَبِيَّةِ</span>
            </div>

            <h2
              className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-snug arabic-vocalized"
              style={{ textWrap: 'balance' }}
            >
              احْصُلْ عَلَى أَوْرَاقِ عَمَلٍ وَقِصَصٍ تَفَاعُلِيَّةٍ مَجَّانِيَّةٍ كُلَّ أُسْبُوعٍ!
            </h2>

            <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed arabic-vocalized">
              اشْتَرِكْ مَعَنَا لِيَصِلَكَ كُلَّ أُسْبُوعٍ مَلَفٌّ تَعْلِيمِيٌّ مَشْكُولٌ وَقَابِلٌ لِلطِّبَاعَةِ وَقِصَصٌ مُصَوَّرَةٌ تُنَمِّي مَهَارَاتِ القِرَاءَةِ وَالْكِتَابَةِ لَدَى طِفْلِكَ.
            </p>

            {!subscribedEmail ? (
              <form
                onSubmit={handleSubscribe}
                noValidate
                className="max-w-xl mx-auto space-y-3 pt-2"
              >
                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  <div className="relative flex-1">
                    <Mail
                      aria-hidden="true"
                      className="w-5 h-5 text-[#0F6F6B] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                    <input
                      type="email"
                      dir="ltr"
                      maxLength={254}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      aria-label="أدخل بريدك الإلكتروني"
                      className="w-full min-h-[54px] pr-12 pl-4 py-3 rounded-2xl bg-white text-[#333333] placeholder:text-slate-400 text-right border-2 border-transparent focus:border-[#D4AF37] focus:outline-none shadow-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[54px] px-7 py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#143B39] font-display font-extrabold text-base sm:text-lg shadow-md transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-70"
                  >
                    {isSubmitting ? 'جَارٍ الِاشْتِرَاكُ...' : 'اشترك مجاناً'}
                  </button>
                </div>

                {errorMsg && (
                  <p className="text-sm font-bold text-[#FEF3C7]">{errorMsg}</p>
                )}
              </form>
            ) : (
              <div className="max-w-xl mx-auto rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 p-5 flex flex-col sm:flex-row items-center justify-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-[#FDE68A] shrink-0" />
                <p className="font-display font-bold text-base sm:text-lg text-white arabic-vocalized">
                  {alreadySubscribed
                    ? `بَرِيدُكَ (${subscribedEmail}) مُسَجَّلٌ بِالْفِعْلِ لَدَيْنَا! أَوْرَاقُ الْعَمَلِ فِي انْتِظَارِكَ أُسْبُوعِيًّا.`
                    : `أَهْلاً بِكَ مَعَنَا! سَتَصِلُكَ أَوْرَاقُ الْعَمَلِ وَالْقِصَصُ الْأُسْبُوعِيَّةُ عَلَى (${subscribedEmail}).`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
