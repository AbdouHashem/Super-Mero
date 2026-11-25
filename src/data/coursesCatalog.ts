import { Timestamp } from 'firebase/firestore';
import type { CourseRecord } from '../types/database';

export const DEFAULT_COURSES_CATALOG: Omit<CourseRecord, 'created_at' | 'isSynced'>[] = [
  {
    id: 'course-reading-letters',
    title: 'تَأْسِيسُ الْحُرُوفِ وَالْحَرَكَاتِ الثَّلَاثِ',
    description:
      'رِحْلَةٌ مُمْتِعَةٌ لِتَعَلُّمِ نُطْقِ الْحُرُوفِ الْهِجَائِيَّةِ بِالْفَتْحَةِ وَالضَّمَّةِ وَالْكَسْرَةِ مَعَ الْأَمْثِلَةِ الْمُصَوَّرَةِ وَالنُّطْقِ الصَّوْتِيِّ.',
    category: 'تأسيس القراءة',
    age_group: '٤ - ٧ سنوات',
    thumbnail_url: '/src/assets/images/story_garden_letters_1795535662630.jpg',
    video_url: '#tracks',
    worksheet_url: '#newsletter-cta',
    is_free: true,
  },
  {
    id: 'course-reading-madd',
    title: 'مَهَارَاتُ الْمُدُودِ وَالتَّهْجِئَةِ السَّلِيمَةِ',
    description:
      'تَدْرِيبٌ عَمَلِيٌّ عَلَى التَّمْيِيزِ بَيْنَ الْحَرَكَةِ الْقَصِيرَةِ وَالْمَدِّ بِالْأَلِفِ وَالْوَاوِ وَالْيَاءِ وَتَرْكِيبِ الْكَلِمَاتِ.',
    category: 'تأسيس القراءة',
    age_group: '٦ - ٩ سنوات',
    thumbnail_url: '/src/assets/images/story_brave_pencil_1795535661396.jpg',
    video_url: '#tracks',
    worksheet_url: '#newsletter-cta',
    is_free: true,
  },
  {
    id: 'course-grammar-basics',
    title: 'أَسَاسِيَّاتُ النَّحْوِ: الِاسْمُ وَالْفِعْلُ وَالْإِشَارَةُ',
    description:
      'شَرْحٌ مُبَسَّطٌ لِلتَّفْرِيقِ بَيْنَ الِاسْمِ وَالْفِعْلِ وَالْمُذَكَّرِ وَالْمُؤَنَّثِ وَاسْتِخْدَامِ (هَذَا / هَذِهِ / هَؤُلَاءِ).',
    category: 'القواعد المبسطة',
    age_group: '٧ - ١٠ سنوات',
    thumbnail_url: '/src/assets/images/story_planet_words_1795535662553.jpg',
    video_url: '#tracks',
    worksheet_url: '#newsletter-cta',
    is_free: true,
  },
  {
    id: 'course-stories-supermero',
    title: 'سِلْسِلَةُ قِصَصِ سُوبَر مِيرُو التَّفَاعُلِيَّةِ',
    description:
      'قِصَصٌ مَشْكُولَةٌ بِالْكَامِلِ مَعَ اسْتِمَاعٍ صَوْتِيٍّ وَأَسْئِلَةِ فَهْمٍ مَقْرُوءٍ تُنَمِّي حُبَّ الْمُطَالَعَةِ لَدَى الطِّفْلِ.',
    category: 'القصص التفاعلية',
    age_group: '٥ - ٩ سنوات',
    thumbnail_url: '/src/assets/images/story_garden_letters_1795535662630.jpg',
    video_url: '#tracks',
    worksheet_url: '#newsletter-cta',
    is_free: false,
  },
];

export function toFallbackCourseRecords(): CourseRecord[] {
  const now = Timestamp.now();
  return DEFAULT_COURSES_CATALOG.map((item) => ({
    ...item,
    created_at: now,
    isSynced: false,
  }));
}
