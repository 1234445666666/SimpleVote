export interface ISurvey {
  id: number;
  question: string;
  options: string[];
  isPublic: boolean;
  userId: number;
}
