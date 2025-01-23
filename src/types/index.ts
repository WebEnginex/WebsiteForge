export type ProjectType = 'vitrine' | 'webapp' | 'ecommerce';

export type QuestionType = 
  | 'text'
  | 'select'
  | 'multiselect'
  | 'color-scheme';

export interface Question {
  id: string;
  category: string;
  question: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Answer {
  questionId: string;
  value: string | string[] | ColorScheme;
  category?: string;
  aiSuggestion?: boolean;
}

export interface QuestionSet {
  [key: string]: Question[];
}
