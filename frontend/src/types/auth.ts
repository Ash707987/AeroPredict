export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  username: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}
