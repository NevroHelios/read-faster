export interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface ReadingContent {
  id: number;
  text: string;
  wpm: number;
  questions: Question[];
}

export interface Level {
  id: number;
  name: string;
  content: ReadingContent;
  isLocked: boolean;
  requiredWPM: number;
}