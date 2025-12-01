export interface ISurvey {
  id: number;
  question: string;
  options: string[];
  isPublic: boolean;
  surveyId: number;
  authorId: number;
}
