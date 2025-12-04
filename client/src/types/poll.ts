export interface ISurvey {
  name_poll: string;
  question_text: string;
  is_public?: boolean;
  options: Array<{ option_text: string }>;
}
