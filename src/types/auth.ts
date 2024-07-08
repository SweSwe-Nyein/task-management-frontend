export type authState = {
  loading: boolean;
  authErrors: authError | undefined;
  isAuthenticated: boolean;
}

export type LoginBody = {
  email: string;
  password: string;
}

export type RegisterBody = {
  full_name: string;
  email: string;
  password: string;
}

export type LoginResponse = {
  success: boolean;
  token: {
    access_token: string;
    refresh_token: string;
  };
}

export type RegisterResponse = {
  access_token: string;
  refresh_token: string;
}

export type authError = {
  status: number;
  message: string;
  errors: string[];
}

export type LogoutResponse = {
  message: string;
}