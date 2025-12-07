export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
}

export interface Poll {
  id: number;
  title: string;
  description?: string;
  user_id: number;
  created_at: string;
  author?: string;
  options_count?: number;
  total_votes?: number;
  options?: PollOption[];
}

export interface PollOption {
  id: number;
  poll_id: number;
  text: string;
  votes: number;
}

export interface Vote {
  id: number;
  user_id: number;
  poll_id: number;
  option_id: number;
  created_at: string;
}

export interface JwtPayload {
  id: number;
  username: string;
  iat?: number;
  exp?: number;
}

export interface WebSocketMessage {
  type: "subscribe" | "votesUpdate";
  pollId?: number;
  votes?: PollOption[];
  timestamp?: string;
}

export interface CreatePollData {
  title: string;
  description?: string;
  options: string[];
}

export interface VoteData {
  optionId: number;
}

export interface AuthRequest {
  email: string;
  password: string;
  username?: string;
}
