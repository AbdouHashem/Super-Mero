import { Award, CheckCircle2, Lock, LogIn, LogOut, RotateCcw, Star, UserCheck, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { ACHIEVEMENT_BADGES } from '../data/arabicCurriculum';
import type { UserProfile, UserRole } from '../types/database';

interface HonorBoardProps {
  stars: number;
  completedLessonsCount: number;
  muted: boolean;
  onToggleMute: () => void;
  onResetProgress: () => void;
  profile: UserProfile | null;
  authLoading: boolean;
  cloudSyncEnabled: boolean;
  onSignIn: (role: Exclude<UserRole, 'admin'>) => Promise<void>;
  onSignOut: () => Promise<void>;
}

const ROLE_LABELS: Record<UserRole, string> = {
  student: 'طَالِبٌ',
  parent: 'وَلِيُّ أَمْرٍ',
  admin: 'مُشْرِفَةُ الْمِنَصَّةِ',
};

export function HonorBoard({
  stars,
  completedLessonsCount,
  muted,
  onToggleMute,
  onResetProgress,
  profile,
  authLoading,
  cloudSyncEnabled,
  onSignIn,
  onSignOut,
}: HonorBoardProps) {
  const [confirmReset, setConfirmReset] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Exclude<UserRole, 'admin'>>('student');
  const [signingIn, setSigningIn] = useState(false);

  const currentBadge =
    [...ACHIEVEMENT_BADGES].reverse().find((b) => stars >= b.minStars) || null;
  const nextBadge = ACHIEVEMENT_BADGES.find((b) => stars < b.minStars) || null;

  const progressPercent = nextBadge
    ? Math.min(100, Math.round((stars / nextBadge.minStars) * 100))
    : 100;

  const handleSignInClick = async () => {
    setSigningIn(true);
    try {
      await onSignIn(selectedRole);
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <section id="honor-board" className="pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-[#E5DEC9] shadow-sm p-5 sm:p-7">
          {/* Student/Parent Profile Sync Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#F2ECE0]">
            {profile ? (
              <div className="flex items-center gap-3.5">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-[#D4AF37] shrink-0"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#EEF6F5] border border-[#0F6F6B]/30 flex items-center justify-center text-[#0F6F6B] shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <p className="font-display font-extrabold text-base text-[#0F6F6B]">
                    {profile.full_name}
                  </p>
                  <p className="text-xs font-bold text-[#B99322]">
                    {ROLE_LABELS[profile.role]} · نَتَائِجُكَ مَحْفُوظَةٌ فِي حِسَابِكَ
                  </p>
                </div>
              </div>
            ) : cloudSyncEnabled ? (
              <div className="space-y-0.5">
                <p className="font-display font-bold text-sm sm:text-base text-[#0F6F6B]">
                  احْفَظْ نُجُومَكَ وَتَقَدُّمَكَ عَبْرَ جَمِيعِ الْأَجْهِزَةِ
                </p>
                <p className="text-xs sm:text-sm text-[#333333]/75">
                  يُمْكِنُكَ التَّعَلُّمُ مُبَاشَرَةً أَوْ تَسْجِيلُ الدُّخُولِ لِمُزَامَنَةِ سِجِلِّ التَّقَدُّمِ وَالدَّرَجَاتِ.
                </p>
              </div>
            ) : (
              <div className="space-y-0.5">
                <p className="font-display font-bold text-sm sm:text-base text-[#0F6F6B]">
                  التَّعَلُّمُ التَّفَاعُلِيُّ مُتَاحٌ مُبَاشَرَةً
                </p>
                <p className="text-xs sm:text-sm text-[#333333]/75">
                  يَتِمُّ حِفْظُ نُجُومِكَ وَتَقَدُّمِكَ تِلْقَائِيًّا عَلَى هَذَا الْجِهَازِ.
                </p>
              </div>
            )}

            {cloudSyncEnabled && (
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {profile ? (
                  <button
                    type="button"
                    onClick={() => void onSignOut()}
                    className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-xl bg-[#F8F6F0] hover:bg-[#EFECE3] text-[#333333] border border-[#E5DEC9] text-sm font-bold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>تَسْجِيلُ الْخُرُوجِ</span>
                  </button>
                ) : (
                  <>
                    <select
                      aria-label="نوع الحساب"
                      value={selectedRole}
                      onChange={(e) =>
                        setSelectedRole(e.target.value as Exclude<UserRole, 'admin'>)
                      }
                      className="min-h-[42px] px-3 rounded-xl bg-[#F8F6F0] border border-[#E5DEC9] text-sm font-bold text-[#333333]"
                    >
                      <option value="student">حِسَابُ طَالِبٍ</option>
                      <option value="parent">حِسَابُ وَلِيِّ أَمْرٍ</option>
                    </select>
                    <button
                      type="button"
                      disabled={authLoading || signingIn}
                      onClick={handleSignInClick}
                      className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-xl bg-[#0F6F6B] hover:bg-[#0B5653] text-white text-sm font-bold cursor-pointer disabled:opacity-60"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>
                        {signingIn ? 'جَارٍ التَّسْجِيلُ...' : 'دُخُولٌ بِحِسَابِ جُوجِل'}
                      </span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Top summary row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-[#E5DEC9]">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-[#FAF3DC] border border-[#D4AF37] flex items-center justify-center text-[#B99322] shrink-0">
                  <Star className="w-8 h-8 fill-[#D4AF37] text-[#B99322]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#333333]/75">لَوْحَةُ الشَّرَفِ وَالنُّجُومِ</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-extrabold text-[#0F6F6B] tabular-nums">
                      {stars}
                    </span>
                    <span className="text-base font-bold text-[#B99322]">نَجْمَةً ذَهَبِيَّةً</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block h-10 w-px bg-[#E5DEC9]" aria-hidden="true" />

              <div>
                <p className="text-sm font-medium text-[#333333]/75">اللَّقَبُ الْحَالِيُّ</p>
                <p className="font-display text-lg font-bold text-[#0F6F6B] arabic-vocalized">
                  {currentBadge ? currentBadge.title : 'بَطَلٌ فِي بِدَايَةِ الرِّحْلَةِ'}
                </p>
                <p className="text-xs text-[#333333]/70 tabular-nums">
                  أَنْشِطَةٌ مُنْجَزَةٌ: {completedLessonsCount}
                </p>
              </div>
            </div>

            {/* Progress bar toward next badge + controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:min-w-[360px]">
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-[#333333]">
                  <span>
                    {nextBadge
                      ? `الْوِسَامُ التَّالِي: ${nextBadge.title}`
                      : 'تَمَّ فَتْحُ جَمِيعِ الْأَوْسِمَةِ!'}
                  </span>
                  <span className="font-bold text-[#0F6F6B] tabular-nums">
                    {nextBadge ? `${stars} / ${nextBadge.minStars}` : '١٠٠٪'}
                  </span>
                </div>
                <div
                  className="w-full h-3.5 rounded-full bg-[#F8F6F0] border border-[#E5DEC9] overflow-hidden"
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="نسبة التقدم نحو الوسام التالي"
                >
                  <div
                    className="h-full bg-[#D4AF37] transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={onToggleMute}
                  className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 rounded-xl bg-[#EEF6F5] hover:bg-[#DFEEEC] text-[#0F6F6B] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
                  aria-label={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{muted ? 'الصَّوْتُ مَكْتُومٌ' : 'الصَّوْتُ مُفَعَّلٌ'}</span>
                </button>

                {!confirmReset ? (
                  <button
                    type="button"
                    onClick={() => setConfirmReset(true)}
                    className="inline-flex items-center justify-center min-h-[44px] w-11 rounded-xl bg-[#F8F6F0] hover:bg-[#EFECE3] text-[#333333] border border-[#E5DEC9] transition-colors cursor-pointer"
                    title="إعادة ضبط التقدم"
                    aria-label="إعادة ضبط التقدم"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onResetProgress();
                        setConfirmReset(false);
                      }}
                      className="min-h-[44px] px-3 rounded-xl bg-[#FAF3DC] hover:bg-[#F2E3B3] text-[#143B39] border border-[#D4AF37] text-xs font-bold cursor-pointer whitespace-nowrap"
                    >
                      تَأْكِيدُ التَّصْفِيرِ
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmReset(false)}
                      className="min-h-[44px] px-3 rounded-xl bg-[#F8F6F0] hover:bg-[#EFECE3] text-[#333333] text-xs font-bold cursor-pointer whitespace-nowrap"
                    >
                      إِلْغَاءٌ
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Badges Row */}
          <div className="pt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {ACHIEVEMENT_BADGES.map((badge) => {
              const unlocked = stars >= badge.minStars;
              return (
                <div
                  key={badge.id}
                  className={`rounded-2xl p-3.5 border transition-colors flex items-center gap-3 ${
                    unlocked
                      ? 'bg-[#FAF3DC]/70 border-[#D4AF37] text-[#0F6F6B]'
                      : 'bg-[#F8F6F0]/80 border-[#E5DEC9] text-[#333333]/60'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      unlocked
                        ? 'bg-[#D4AF37] text-[#143B39]'
                        : 'bg-[#E5DEC9]/70 text-[#333333]/60'
                    }`}
                  >
                    {unlocked ? <Award className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-sm truncate arabic-vocalized">
                      {badge.title}
                    </p>
                    <p className="text-xs flex items-center gap-1 mt-0.5">
                      {unlocked ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0F6F6B] shrink-0" />
                          <span className="text-[#0F6F6B] font-semibold">مَفْتُوحٌ</span>
                        </>
                      ) : (
                        <span className="tabular-nums">{badge.requirementText}</span>
                      )}
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
