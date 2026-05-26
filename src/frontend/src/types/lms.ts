export type LessonType = "video" | "article" | "quiz" | "assignment";
export type LessonCompletionStatus = "notStarted" | "inProgress" | "completed";

export interface Program {
  id: string;
  title: string;
  description: string;
  createdAt: bigint;
}

export interface Course {
  id: string;
  programId: string;
  title: string;
  description: string;
  thumbnail: string | null;
  createdAt: bigint;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  order: number;
  createdAt: bigint;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  lessonType: LessonType;
  content: string;
  videoUrl: string | null;
  order: number;
  createdAt: bigint;
}

export interface QuizQuestion {
  id: string;
  lessonId: string;
  question: string;
  questionType: string;
  options: string[];
  correctAnswer: string;
  order: number;
}

export interface LessonProgress {
  id: string;
  lessonId: string;
  internId: string;
  status: LessonCompletionStatus;
  completedAt: bigint | null;
}

export interface QuizAttempt {
  id: string;
  lessonId: string;
  internId: string;
  score: number;
  answers: string[];
  attemptedAt: bigint;
}

export interface AssignmentSubmission {
  id: string;
  lessonId: string;
  internId: string;
  submissionLink: string;
  grade: number | null;
  feedback: string | null;
  submittedAt: bigint;
  gradedAt: bigint | null;
}

export interface LMSCertificate {
  id: string;
  courseId: string;
  internId: string;
  issuedAt: bigint;
}

export interface CourseProgress {
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
}
