import {capitalizeAllFirstLetters} from './helpers';

export const lessonTypes = {
  harmony: '',
  rhythm: '',
  technique: '',
  sight_reading: '',
  theory: '',
  aural: '',
};

export const readableLessonTypes = Object.keys(lessonTypes).map((type) =>
  capitalizeAllFirstLetters(type.replaceAll('_', ' '))
);

export function isLessonType(value: string): value is LessonType {
  return value in lessonTypes === true;
}

export type LessonType = keyof typeof lessonTypes | '';

export type LessonProp = {
  lesson: Lesson;
};

export type Lesson = {
  email: string;
  lessonID: string;
  type: LessonType;
  description: string;
  title: string;
  steps: Step[];
};

export type Step = {
  id: string;
  title?: string;
  url?: string;
  file?: FileList;
  description: string;
  practiceMin: number;
  practiceMax: number;
  arrayIndex: number;
};

export type User = {
  username: string;
} & Login;

export type Login = {
  password: string;
  email: string;
};

export type API_OPERATION = 'register' | 'login' | 'getLessons' | 'createLesson' | 'getLesson' | 'deleteLesson';

export type POSTABLE = Lesson | User | Login | {lessonId: string} | {lessonId: string; user_email: string};
