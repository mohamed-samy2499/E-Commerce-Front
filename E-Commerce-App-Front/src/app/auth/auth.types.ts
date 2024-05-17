export interface LoginResponse {
    succeeded: boolean;
    isAuthenticated: boolean;
    username: string;
    email: string;
    roles: string[];
    token: string;
    expiresOn: string;
    errors: string[];
  }
  