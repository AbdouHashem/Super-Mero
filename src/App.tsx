import { onAuthStateChanged, signInWithPopup, signOut, type User } from 'firebase/auth';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AboutSuperMero } from './components/AboutSuperMero';
import { CoursesSection } from './components/CoursesSection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HonorBoard } from './components/HonorBoard';
import { LearningTracks, type TrackId } from './components/LearningTracks';
import { NewsletterCta } from './components/NewsletterCta';
import { ParentContactSection } from './components/ParentContactSection';
import { QuizSection } from './components/QuizSection';
import { SiteFooter } from './components/SiteFooter';
import { toFallbackCourseRecords } from './data/coursesCatalog';
import { auth, FIREBASE_ENABLED, googleAuthProvider } from './lib/firebase';
import {
  clearStudentProgress,
  ensureUserProfile,
  seedDefaultCoursesIfAdmin,
  subscribeCourses,
  subscribeStudentProgress,
  upsertStudentProgress,
} from './services/database';
import { stopSpeech } from './utils/sound';
import type {
  CourseRecord,
  StudentProgressRecord,
  UserProfile,
  UserRole,
} from './types/database';

interface SavedProgress {
  stars: number;
  completedIds: string[];
  muted: boolean;
}

const STORAGE_KEY = 'super-mira-progress-v1';

function loadInitialProgress(): SavedProgress {
  if (typeof window === 'undefined') {
    return { stars: 0, completedIds: [], muted: false };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { stars: 0, completedIds: [], muted: false };
    const parsed = JSON.parse(raw) as Partial<SavedProgress>;
    return {
      stars: typeof parsed.stars === 'number' ? parsed.stars : 0,
      completedIds: Array.isArray(parsed.completedIds) ? parsed.completedIds : [],
      muted: Boolean(parsed.muted),
    };
  } catch {
    return { stars: 0, completedIds: [], muted: false };
  }
}

export default function App() {
  const [progress, setProgress] = useState<SavedProgress>(loadInitialProgress);
  const [activeTrack, setActiveTrack] = useState<TrackId>('alphabet');

  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [firestoreCourses, setFirestoreCourses] = useState<CourseRecord[]>([]);
  const [studentProgress, setStudentProgress] = useState<StudentProgressRecord[]>([]);
  const pendingRoleRef = useRef<Exclude<UserRole, 'admin'>>('student');

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  // Subscribe to public courses catalog
  useEffect(() => {
    const unsubscribe = subscribeCourses((coursesList) => {
      setFirestoreCourses(coursesList);
    });
    return () => unsubscribe();
  }, []);

  // Auth state & profile synchronization
  useEffect(() => {
    if (!FIREBASE_ENABLED || !auth) {
      setProfile(null);
      setStudentProgress([]);
      setAuthLoading(false);
      return;
    }

    let progressUnsub: (() => void) | null = null;

    const authUnsub = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      if (progressUnsub) {
        progressUnsub();
        progressUnsub = null;
      }

      if (!user) {
        setProfile(null);
        setStudentProgress([]);
        setAuthLoading(false);
        return;
      }

      void (async () => {
        try {
          const userProfile = await ensureUserProfile(user, pendingRoleRef.current);
          setProfile(userProfile);

          if (userProfile.role === 'admin') {
            await seedDefaultCoursesIfAdmin();
          }

          progressUnsub = subscribeStudentProgress(user.uid, (records) => {
            setStudentProgress(records);
          });
        } finally {
          setAuthLoading(false);
        }
      })();
    });

    return () => {
      authUnsub();
      if (progressUnsub) progressUnsub();
    };
  }, []);

  const displayedCourses = useMemo(() => {
    if (firestoreCourses.length > 0) return firestoreCourses;
    return toFallbackCourseRecords();
  }, [firestoreCourses]);

  const progressMap = useMemo(() => {
    const map: Record<string, StudentProgressRecord> = {};
    for (const item of studentProgress) {
      map[item.course_id] = item;
    }
    return map;
  }, [studentProgress]);

  const combinedCompletedCount = useMemo(() => {
    const ids = new Set(progress.completedIds);
    for (const item of studentProgress) {
      if (item.completed) ids.add(item.course_id);
    }
    return ids.size;
  }, [progress.completedIds, studentProgress]);

  const handleSignIn = async (role: Exclude<UserRole, 'admin'>) => {
    if (!FIREBASE_ENABLED || !auth || !googleAuthProvider) return;
    pendingRoleRef.current = role;
    await signInWithPopup(auth, googleAuthProvider);
  };

  const handleSignOut = async () => {
    if (!FIREBASE_ENABLED || !auth) return;
    await signOut(auth);
  };

  const handleEarnStars = (starsEarned: number) => {
    setProgress((prev) => ({
      ...prev,
      stars: prev.stars + starsEarned,
    }));
  };

  const handleCompleteLesson = (lessonId: string, starsEarned: number) => {
    setProgress((prev) => {
      if (prev.completedIds.includes(lessonId)) {
        return prev;
      }
      return {
        ...prev,
        stars: prev.stars + starsEarned,
        completedIds: [...prev.completedIds, lessonId],
      };
    });
  };

  const handleCompleteCourse = async (course: CourseRecord, score = 100) => {
    handleCompleteLesson(course.id, 5);
    if (authUser && profile && course.isSynced) {
      await upsertStudentProgress({
        userId: authUser.uid,
        courseId: course.id,
        completed: true,
        score,
      });
    }
  };

  const handleToggleMute = () => {
    setProgress((prev) => {
      const nextMuted = !prev.muted;
      if (nextMuted) {
        stopSpeech();
      }
      return { ...prev, muted: nextMuted };
    });
  };

  const handleResetProgress = () => {
    setProgress((prev) => ({
      stars: 0,
      completedIds: [],
      muted: prev.muted,
    }));
    if (authUser) {
      void clearStudentProgress(authUser.uid);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div dir="rtl" className="min-h-screen hero-backdrop-pattern flex flex-col">
      <Header onStartLearning={() => scrollToSection('tracks')} />

      <main className="flex-1">
        <HeroSection
          onStartJourney={() => scrollToSection('tracks')}
          onJumpToQuiz={() => scrollToSection('quiz')}
        />

        <HonorBoard
          stars={progress.stars}
          completedLessonsCount={combinedCompletedCount}
          muted={progress.muted}
          onToggleMute={handleToggleMute}
          onResetProgress={handleResetProgress}
          profile={profile}
          authLoading={authLoading}
          cloudSyncEnabled={FIREBASE_ENABLED}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
        />

        <AboutSuperMero />

        <LearningTracks
          activeTrack={activeTrack}
          onSelectTrack={setActiveTrack}
          completedIds={progress.completedIds}
          muted={progress.muted}
          onCompleteLesson={handleCompleteLesson}
        />

        <CoursesSection
          courses={displayedCourses}
          progressMap={progressMap}
          localCompletedIds={progress.completedIds}
          profile={profile}
          muted={progress.muted}
          onCompleteCourse={handleCompleteCourse}
        />

        <QuizSection muted={progress.muted} onEarnStars={handleEarnStars} />

        <ParentContactSection muted={progress.muted} />

        <NewsletterCta muted={progress.muted} />
      </main>

      <SiteFooter />
    </div>
  );
}
