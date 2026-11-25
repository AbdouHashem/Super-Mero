import type { User } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import { DEFAULT_COURSES_CATALOG } from '../data/coursesCatalog';
import {
  db,
  FIREBASE_ENABLED,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';
import type {
  CourseCategory,
  CourseRecord,
  StudentProgressRecord,
  UserProfile,
  UserRole,
} from '../types/database';

const ADMIN_EMAIL = 'a.m.hashem20@gmail.com';
const LOCAL_SUBSCRIBED_KEY = 'super-mero-subscribed-hashes-v1';

function sanitizeId(raw: string): string {
  return raw
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 120);
}

async function hashEmailToId(email: string): Promise<string> {
  const normalized = email.trim().toLowerCase();
  if (typeof window !== 'undefined' && window.crypto?.subtle) {
    const encoded = new TextEncoder().encode(normalized);
    const digest = await window.crypto.subtle.digest('SHA-256', encoded);
    const bytes = Array.from(new Uint8Array(digest));
    return bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  let hash = 0;
  for (let i = 0; i < normalized.length; i += 1) {
    hash = (hash * 31 + normalized.charCodeAt(i)) >>> 0;
  }
  return `sub_${hash.toString(16)}_${normalized.length}`;
}

export async function ensureUserProfile(
  user: User,
  preferredRole: Exclude<UserRole, 'admin'> = 'student'
): Promise<UserProfile> {
  if (!FIREBASE_ENABLED || !db) {
    return {
      id: user.uid,
      full_name:
        (user.displayName || user.email?.split('@')[0] || 'طالب سوبر ميرو').trim().slice(0, 120),
      role: preferredRole,
      created_at: new Date().toISOString() as unknown as UserProfile['created_at'],
    };
  }
  const path = `profiles/${user.uid}`;
  const ref = doc(db, 'profiles', user.uid);

  try {
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }

    const isBootstrapAdmin =
      user.email?.toLowerCase() === ADMIN_EMAIL && user.emailVerified;
    const role: UserRole = isBootstrapAdmin ? 'admin' : preferredRole;
    const fullName = (user.displayName || user.email?.split('@')[0] || 'طالب سوبر ميرو')
      .trim()
      .slice(0, 120);

    const payload: Record<string, unknown> = {
      id: user.uid,
      full_name: fullName,
      role,
      created_at: serverTimestamp(),
    };

    if (
      user.photoURL &&
      user.photoURL.startsWith('https://') &&
      user.photoURL.length <= 500
    ) {
      payload.avatar_url = user.photoURL;
    }

    await setDoc(ref, payload);
    const created = await getDoc(ref);
    return created.data() as UserProfile;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateUserProfileName(
  userId: string,
  fullName: string
): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;
  const cleaned = fullName.trim().slice(0, 120);
  if (!cleaned) return;
  const path = `profiles/${userId}`;
  try {
    await updateDoc(doc(db, 'profiles', userId), {
      full_name: cleaned,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export function subscribeCourses(
  onUpdate: (courses: CourseRecord[]) => void
): Unsubscribe {
  if (!FIREBASE_ENABLED || !db) {
    onUpdate([]);
    return () => {};
  }
  const path = 'courses';
  const q = query(collection(db, 'courses'), orderBy('created_at', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: CourseRecord[] = snapshot.docs.map((docSnap) => ({
        ...(docSnap.data() as CourseRecord),
        isSynced: true,
      }));
      onUpdate(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export async function seedDefaultCoursesIfAdmin(): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;
  const path = 'courses';
  try {
    const existingSnap = await getDocs(collection(db, 'courses'));
    const existingIds = new Set(existingSnap.docs.map((d) => d.id));

    for (const course of DEFAULT_COURSES_CATALOG) {
      if (existingIds.has(course.id)) continue;
      const payload: Record<string, unknown> = {
        id: course.id,
        title: course.title.slice(0, 160),
        description: course.description.slice(0, 1000),
        category: course.category,
        age_group: course.age_group.slice(0, 60),
        is_free: course.is_free,
        created_at: serverTimestamp(),
      };
      if (course.thumbnail_url) payload.thumbnail_url = course.thumbnail_url;
      if (course.video_url) payload.video_url = course.video_url;
      if (course.worksheet_url) payload.worksheet_url = course.worksheet_url;

      await setDoc(doc(db, 'courses', course.id), payload);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export interface CreateCourseInput {
  title: string;
  description: string;
  category: CourseCategory;
  age_group: string;
  thumbnail_url?: string;
  video_url?: string;
  worksheet_url?: string;
  is_free: boolean;
}

export async function createCourse(input: CreateCourseInput): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;
  const id = sanitizeId(`course-${Date.now()}`);
  const path = `courses/${id}`;
  const payload: Record<string, unknown> = {
    id,
    title: input.title.trim().slice(0, 160),
    description: input.description.trim().slice(0, 1000),
    category: input.category,
    age_group: input.age_group.trim().slice(0, 60),
    is_free: Boolean(input.is_free),
    created_at: serverTimestamp(),
  };
  if (input.thumbnail_url?.trim()) {
    payload.thumbnail_url = input.thumbnail_url.trim().slice(0, 500);
  }
  if (input.video_url?.trim()) {
    payload.video_url = input.video_url.trim().slice(0, 500);
  }
  if (input.worksheet_url?.trim()) {
    payload.worksheet_url = input.worksheet_url.trim().slice(0, 500);
  }

  try {
    await setDoc(doc(db, 'courses', id), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeStudentProgress(
  userId: string,
  onUpdate: (records: StudentProgressRecord[]) => void
): Unsubscribe {
  if (!FIREBASE_ENABLED || !db) {
    onUpdate([]);
    return () => {};
  }
  const path = 'student_progress';
  const q = query(
    collection(db, 'student_progress'),
    where('user_id', '==', userId)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map(
        (docSnap) => docSnap.data() as StudentProgressRecord
      );
      onUpdate(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export async function upsertStudentProgress(params: {
  userId: string;
  courseId: string;
  completed: boolean;
  score: number;
}): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;
  const progressId = sanitizeId(`${params.userId}__${params.courseId}`);
  const path = `student_progress/${progressId}`;
  const ref = doc(db, 'student_progress', progressId);
  const clampedScore = Math.max(0, Math.min(100, Math.round(params.score)));

  try {
    const existingSnap = await getDoc(ref);
    if (existingSnap.exists()) {
      const existingData = existingSnap.data() as StudentProgressRecord;
      await updateDoc(ref, {
        completed: existingData.completed || params.completed,
        score: Math.max(existingData.score, clampedScore),
        updated_at: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        id: progressId,
        user_id: params.userId,
        course_id: params.courseId,
        completed: params.completed,
        score: clampedScore,
        updated_at: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function clearStudentProgress(userId: string): Promise<void> {
  if (!FIREBASE_ENABLED || !db) return;
  const path = 'student_progress';
  try {
    const q = query(
      collection(db, 'student_progress'),
      where('user_id', '==', userId)
    );
    const snap = await getDocs(q);
    await Promise.all(snap.docs.map((docSnap) => deleteDoc(docSnap.ref)));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

function getLocalSubscribedHashes(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_SUBSCRIBED_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveLocalSubscribedHash(hash: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalSubscribedHashes();
    if (!current.includes(hash)) {
      window.localStorage.setItem(
        LOCAL_SUBSCRIBED_KEY,
        JSON.stringify([...current, hash])
      );
    }
  } catch {
    // Ignore storage quota errors
  }
}

export async function subscribeNewsletter(
  email: string
): Promise<'created' | 'already_subscribed'> {
  const normalized = email.trim().toLowerCase().slice(0, 254);
  const subscriberId = await hashEmailToId(normalized);

  if (getLocalSubscribedHashes().includes(subscriberId)) {
    return 'already_subscribed';
  }

  if (!FIREBASE_ENABLED || !db) {
    saveLocalSubscribedHash(subscriberId);
    return 'created';
  }

  const path = `subscribers/${subscriberId}`;
  try {
    await setDoc(doc(db, 'subscribers', subscriberId), {
      id: subscriberId,
      email: normalized,
      subscribed_at: serverTimestamp(),
    });
    saveLocalSubscribedHash(subscriberId);
    return 'created';
  } catch (error) {
    // When deterministic doc already exists and update is restricted to admins,
    // handle duplicate email cleanly without leaking PII.
    if (
      error instanceof Error &&
      (error.message.includes('already-exists') ||
        error.message.includes('Missing or insufficient permissions'))
    ) {
      saveLocalSubscribedHash(subscriberId);
      return 'already_subscribed';
    }
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
