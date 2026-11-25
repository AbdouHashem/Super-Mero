import type { Timestamp } from 'firebase/firestore';

export type UserRole = 'student' | 'parent' | 'admin';

export type CourseCategory =
  | 'تأسيس القراءة'
  | 'القواعد المبسطة'
  | 'القصص التفاعلية';

export interface UserProfile {
  id: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: Timestamp;
}

export interface CourseRecord {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  age_group: string;
  thumbnail_url?: string;
  video_url?: string;
  worksheet_url?: string;
  is_free: boolean;
  created_at: Timestamp;
  isSynced?: boolean;
}

export interface StudentProgressRecord {
  id: string;
  user_id: string;
  course_id: string;
  completed: boolean;
  score: number;
  updated_at: Timestamp;
}

export interface SubscriberRecord {
  id: string;
  email: string;
  subscribed_at: Timestamp;
}
