export type ProjectType = 'vitrine' | 'webapp' | 'ecommerce';

export type QuestionType = 'text' | 'select' | 'multiselect' | 'color' | 'color-scheme';

export interface Question {
  id: string;
  category: string;
  question: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}

export interface Answer {
  questionId: string;
  question: string;
  value: string;
  category?: string;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export type QuestionSet = {
  [key in ProjectType]: Question[];
};
