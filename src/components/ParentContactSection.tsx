import { CheckCircle2, MessageCircle, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { playTone } from '../utils/sound';
import { BrandEmblem } from './BrandEmblem';

interface ParentContactSectionProps {
  muted: boolean;
}

const WHATSAPP_NUMBER = '201000000000';

export function ParentContactSection({ muted }: ParentContactSectionProps) {
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('الصف الأول الابتدائي');
  const [parentPhone, setParentPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const buildWhatsAppUrl = () => {
    const text = studentName.trim()
      ? `السلام عليكم معلمة سوبر ميرو، أود حجز حصة تجريبية للطالب/ة: ${studentName.trim()} (${grade})، رقم التواصل: ${parentPhone.trim() || 'غير محدد'}${notes.trim() ? `، ملاحظات: ${notes.trim()}` : ''}`
      : 'السلام عليكم معلمة سوبر ميرو، أود الاستفسار عن حصص التأسيس في اللغة العربية.';
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !parentPhone.trim()) {
      setErrorMsg('يُرْجَى كِتَابَةُ اسْمِ الطَّالِبِ وَرَقْمِ الْهَاتِفِ أَوِ الْوَاتْسَابِ لِلتَّوَاصُلِ.');
      playTone('tryAgain', muted);
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
    playTone('success', muted);
  };

  return (
    <section id="parent-contact" className="py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-white border border-[#E5DEC9] shadow-sm p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Info & Direct WhatsApp */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2.5">
                <p className="text-sm font-bold text-[#B99322]">
                  لِأَوْلِيَاءِ الْأُمُورِ وَالِاشْتِرَاكِ
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                  احْجِزْ حِصَّةً تَجْرِيبِيَّةً مَعَ الْمُعَلِّمَةِ سُوبَر مِيرُو
                </h2>
                <p className="text-base text-[#333333] leading-relaxed arabic-vocalized">
                  سَجِّلْ بَيَانَاتِ طِفْلِكَ لِتَحْدِيدِ مُسْتَوَاهُ فِي الْقِرَاءَةِ وَالْكِتَابَةِ وَبَدْءِ رِحْلَةِ التَّأْسِيسِ الْمُمْتِعَةِ، أَوْ تَوَاصَلْ مُبَاشَرَةً عَبْرَ وَاتْسَاب.
                </p>
              </div>

              <div className="rounded-2xl bg-[#F8F6F0] border border-[#E5DEC9] p-5 space-y-4">
                <div className="flex items-center gap-3.5">
                  <BrandEmblem className="w-20" />
                  <div className="space-y-1">
                    <p className="font-display font-bold text-base text-[#0F6F6B]">
                      تَوَاصُلٌ مُبَاشِرٌ مَعَ سُوبَر مِيرُو
                    </p>
                    <p className="text-xs sm:text-sm text-[#333333]/80">
                      الْإِجَابَةُ عَنْ جَمِيعِ اسْتِفْسَارَاتِ أَوْلِيَاءِ الْأُمُورِ وَجَدَاوِلِ الْحِصَصِ الْفَرْدِيَّةِ وَالْجَمَاعِيَّةِ.
                    </p>
                  </div>
                </div>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full min-h-[48px] px-5 py-3 rounded-2xl bg-[#0F6F6B] hover:bg-[#0A4F4C] text-white font-display font-bold text-base transition-colors shadow-sm"
                >
                  <MessageCircle className="w-5 h-5 text-[#D4AF37]" />
                  <span>تَوَاصَلْ عَبْرَ وَاتْسَاب مَعَ سُوبَر مِيرُو</span>
                </a>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-7 bg-[#F8F6F0]/70 rounded-2xl border border-[#E5DEC9] p-6 sm:p-7">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <h3 className="font-display text-xl font-extrabold text-[#0F6F6B]">
                    نَمُوذَجُ تَسْجِيلِ الطَّالِبِ لِحِصَّةٍ تَجْرِيبِيَّةٍ
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="student-name"
                        className="block text-sm font-bold text-[#0F6F6B]"
                      >
                        اسْمُ الطَّالِبِ / الطَّالِبَةِ
                      </label>
                      <input
                        id="student-name"
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="مِثَالٌ: عُمَرُ أَحْمَد"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-white border border-[#E5DEC9] text-[#333333] focus:outline-none focus:border-[#0F6F6B] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="student-grade"
                        className="block text-sm font-bold text-[#0F6F6B]"
                      >
                        الْمَرْحَلَةُ الدِّرَاسِيَّةُ
                      </label>
                      <select
                        id="student-grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-white border border-[#E5DEC9] text-[#333333] focus:outline-none focus:border-[#0F6F6B] transition-colors"
                      >
                        <option value="المرحلة التمهيدية (KG)">الْمَرْحَلَةُ التَّمْهِيدِيَّةُ (KG)</option>
                        <option value="الصف الأول الابتدائي">الصَّفُّ الْأَوَّلُ الِابْتِدَائِيُّ</option>
                        <option value="الصف الثاني الابتدائي">الصَّفُّ الثَّانِي الِابْتِدَائِيُّ</option>
                        <option value="الصف الثالث الابتدائي">الصَّفُّ الثَّالِثُ الِابْتِدَائِيُّ</option>
                        <option value="الصف الرابع الابتدائي">الصَّفُّ الرَّابِعُ الِابْتِدَائِيُّ</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="parent-phone"
                        className="block text-sm font-bold text-[#0F6F6B]"
                      >
                        رَقْمُ الْوَاتْسَابِ لِوَلِيِّ الْأَمْرِ
                      </label>
                      <input
                        id="parent-phone"
                        type="tel"
                        dir="ltr"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        placeholder="+20 100 000 0000"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-white border border-[#E5DEC9] text-[#333333] text-right focus:outline-none focus:border-[#0F6F6B] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="student-notes"
                        className="block text-sm font-bold text-[#0F6F6B]"
                      >
                        الْهَدَفُ أَوِ الْمَسَارُ الْمُفَضَّلُ (اخْتِيَارِيٌّ)
                      </label>
                      <input
                        id="student-notes"
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="تَأْسِيسُ الْحُرُوفِ / التَّهْجِئَةُ / النَّحْوُ"
                        className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-white border border-[#E5DEC9] text-[#333333] focus:outline-none focus:border-[#0F6F6B] transition-colors"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-sm font-bold text-amber-900 bg-[#FAF3DC] border border-[#D4AF37] rounded-xl px-4 py-2.5">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full min-h-[50px] px-6 py-3 rounded-2xl bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] font-display font-extrabold text-base sm:text-lg inline-flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    <span>تَسْجِيلُ الْبَيَانَاتِ وَحَجْزُ حِصَّةٍ تَجْرِيبِيَّةٍ</span>
                  </button>
                </form>
              ) : (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#EEF6F5] text-[#0F6F6B] flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-2xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                      تَمَّ تَسْجِيلُ طَلَبِ ({studentName}) بِنَجَاحٍ!
                    </h3>
                    <p className="text-base text-[#333333]/85 arabic-vocalized">
                      يُمْكِنُكَ إِرْسَالُ التَّفَاصِيلِ مُبَاشَرَةً إِلَى وَاتْسَاب الْمُعَلِّمَةِ سُوبَر مِيرُو لِتَأْكِيدِ مَوْعِدِ الْحِصَّةِ التَّجْرِيبِيَّةِ.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[46px] px-6 py-2.5 rounded-xl bg-[#0F6F6B] hover:bg-[#0A4F4C] text-white font-display font-bold text-sm inline-flex items-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                      <span>إِرْسَالٌ عَبْرَ وَاتْسَاب الآن</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setStudentName('');
                        setParentPhone('');
                        setNotes('');
                      }}
                      className="min-h-[46px] px-5 py-2.5 rounded-xl bg-white hover:bg-[#EFECE3] border border-[#E5DEC9] text-[#0F6F6B] font-display font-bold text-sm cursor-pointer"
                    >
                      تَسْجِيلُ طَالِبٍ آخَرَ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
