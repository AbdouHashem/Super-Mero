import { BookOpenCheck, CheckCircle2, FileText, PlayCircle, Plus, Sparkles } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import type { CourseCategory, CourseRecord, StudentProgressRecord, UserProfile } from '../types/database';
import { createCourse, seedDefaultCoursesIfAdmin } from '../services/database';
import { playTone } from '../utils/sound';

interface CoursesSectionProps {
  courses: CourseRecord[];
  progressMap: Record<string, StudentProgressRecord>;
  localCompletedIds: string[];
  profile: UserProfile | null;
  muted: boolean;
  onCompleteCourse: (course: CourseRecord, score?: number) => Promise<void> | void;
}

const CATEGORIES: ('الكل' | CourseCategory)[] = [
  'الكل',
  'تأسيس القراءة',
  'القواعد المبسطة',
  'القصص التفاعلية',
];

export function CoursesSection({
  courses,
  progressMap,
  localCompletedIds,
  profile,
  muted,
  onCompleteCourse,
}: CoursesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'الكل' | CourseCategory>('الكل');
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [savingCourseId, setSavingCourseId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CourseCategory>('تأسيس القراءة');
  const [ageGroup, setAgeGroup] = useState('٦ - ٩ سنوات');
  const [isFree, setIsFree] = useState(true);
  const [submittingNew, setSubmittingNew] = useState(false);

  const isAdmin = profile?.role === 'admin';
  const filteredCourses =
    selectedCategory === 'الكل'
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  const handleCompleteClick = async (course: CourseRecord) => {
    setSavingCourseId(course.id);
    try {
      await onCompleteCourse(course, 100);
      playTone('success', muted);
    } finally {
      setSavingCourseId(null);
    }
  };

  const handleSeedDefaults = async () => {
    setSeeding(true);
    try {
      await seedDefaultCoursesIfAdmin();
      playTone('success', muted);
    } finally {
      setSeeding(false);
    }
  };

  const handleCreateCourse = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setSubmittingNew(true);
    try {
      await createCourse({
        title,
        description,
        category,
        age_group: ageGroup,
        thumbnail_url: '/src/assets/images/story_garden_letters_1795535662630.jpg',
        video_url: '#tracks',
        worksheet_url: '#newsletter-cta',
        is_free: isFree,
      });
      setTitle('');
      setDescription('');
      setShowAdminForm(false);
      playTone('success', muted);
    } finally {
      setSubmittingNew(false);
    }
  };

  return (
    <section id="courses" className="py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-sm font-bold text-[#B99322]">مَكْتَبَةُ الدَّوْرَاتِ وَالدُّرُوسِ</p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F6F6B] arabic-vocalized">
              دَوْرَاتُ سُوبَر مِيرُو الْمُتَدَرِّجَةُ
            </h2>
            <p className="text-base text-[#333333] arabic-vocalized">
              اخْتَرِ الدَّرْسَ الْمُنَاسِبَ لِعُمْرِ طِفْلِكَ وَتَتَبَّعْ نِسْبَةَ الْإِنْجَازِ وَالدَّرَجَاتِ فِي سِجِلِّ التَّقَدُّمِ.
            </p>
          </div>

          {isAdmin && (
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleSeedDefaults}
                disabled={seeding}
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#EEF6F5] hover:bg-[#DFEEEC] text-[#0F6F6B] border border-[#C8D8D6] text-sm font-bold cursor-pointer disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4" />
                <span>{seeding ? 'جَارٍ النَّشْرُ...' : 'مُزَامَنَةُ الدَّوْرَاتِ الْأَسَاسِيَّةِ'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowAdminForm((prev) => !prev)}
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39] text-sm font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إِضَافَةُ دَرْسٍ</span>
              </button>
            </div>
          )}
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  playTone('tap', muted);
                }}
                aria-pressed={active}
                className={`min-h-[42px] px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#0F6F6B] text-white'
                    : 'bg-white text-[#333333] border border-[#E5DEC9] hover:border-[#D4AF37]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Admin Course Creator */}
        {isAdmin && showAdminForm && (
          <form
            onSubmit={handleCreateCourse}
            className="bg-white rounded-3xl border border-[#D4AF37] p-6 space-y-4 shadow-sm"
          >
            <h3 className="font-display text-lg font-extrabold text-[#0F6F6B]">
              إِضَافَةُ دَوْرَةٍ أَوْ دَرْسٍ جَدِيدٍ
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#333333]">عُنْوَانُ الدَّرْسِ</label>
                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={160}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مِثَالٌ: تَعَلُّمُ التَّنْوِينِ بِالْفَتْحِ"
                  className="w-full min-h-[44px] px-4 rounded-xl bg-[#F8F6F0] border border-[#E5DEC9] focus:border-[#0F6F6B] focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#333333]">التَّصْنِيفُ</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CourseCategory)}
                  className="w-full min-h-[44px] px-4 rounded-xl bg-[#F8F6F0] border border-[#E5DEC9] focus:border-[#0F6F6B] focus:outline-none"
                >
                  <option value="تأسيس القراءة">تأسيس القراءة</option>
                  <option value="القواعد المبسطة">القواعد المبسطة</option>
                  <option value="القصص التفاعلية">القصص التفاعلية</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#333333]">الْفِئَةُ الْعُمْرِيَّةُ</label>
                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={60}
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  className="w-full min-h-[44px] px-4 rounded-xl bg-[#F8F6F0] border border-[#E5DEC9] focus:border-[#0F6F6B] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  id="course-is-free"
                  type="checkbox"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                  className="w-5 h-5 accent-[#0F6F6B]"
                />
                <label htmlFor="course-is-free" className="text-sm font-bold text-[#333333]">
                  دَرْسٌ مَجَّانِيٌّ
                </label>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-[#333333]">الْوَصْفُ التَّفْصِيلِيُّ</label>
              <textarea
                rows={3}
                required
                minLength={4}
                maxLength={1000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-[#F8F6F0] border border-[#E5DEC9] focus:border-[#0F6F6B] focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAdminForm(false)}
                className="min-h-[44px] px-5 rounded-xl bg-[#F8F6F0] text-[#333333] font-bold text-sm cursor-pointer"
              >
                إِلْغَاءٌ
              </button>
              <button
                type="submit"
                disabled={submittingNew}
                className="min-h-[44px] px-6 rounded-xl bg-[#0F6F6B] hover:bg-[#0B5653] text-white font-bold text-sm cursor-pointer disabled:opacity-60"
              >
                {submittingNew ? 'جَارٍ الْحَفْظُ...' : 'نَشْرُ الدَّرْسِ'}
              </button>
            </div>
          </form>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => {
            const dbProgress = progressMap[course.id];
            const isCompleted =
              Boolean(dbProgress?.completed) || localCompletedIds.includes(course.id);

            return (
              <article
                key={course.id}
                className="bg-white rounded-3xl border border-[#E5DEC9] overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  {course.thumbnail_url && (
                    <div className="h-44 w-full overflow-hidden bg-[#F8F6F0] border-b border-[#E5DEC9]">
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs font-bold text-[#B99322]">
                      <span>
                        {course.category} · {course.age_group}
                      </span>
                      <span className="text-[#0F6F6B]">
                        {course.is_free ? 'مَجَّانِيٌّ' : 'بَاقَةُ التَّمَيُّزِ'}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-extrabold text-[#0F6F6B] arabic-vocalized">
                      {course.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#333333]/85 leading-relaxed arabic-vocalized">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-[#F2ECE0] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs font-bold text-[#0F6F6B]">
                    {course.video_url && (
                      <a
                        href={course.video_url}
                        className="inline-flex items-center gap-1.5 hover:underline"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>التَّطْبِيقُ</span>
                      </a>
                    )}
                    {course.worksheet_url && (
                      <a
                        href={course.worksheet_url}
                        className="inline-flex items-center gap-1.5 hover:underline text-[#B99322]"
                      >
                        <FileText className="w-4 h-4" />
                        <span>وَرَقَةُ الْعَمَلِ</span>
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={savingCourseId === course.id}
                    onClick={() => handleCompleteClick(course)}
                    className={`inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                      isCompleted
                        ? 'bg-[#EEF6F5] text-[#0F6F6B] border border-[#0F6F6B]/30'
                        : 'bg-[#D4AF37] hover:bg-[#C19B26] text-[#143B39]'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>مُكْتَمِلٌ ({dbProgress?.score ?? 100}٪)</span>
                      </>
                    ) : (
                      <>
                        <BookOpenCheck className="w-4 h-4" />
                        <span>
                          {savingCourseId === course.id ? 'جَارٍ الْحَفْظُ...' : 'إِتْمَامُ الدَّرْسِ'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
