export {};
declare global {
  interface UserState {
    isLoggedIn: boolean;
    refresh: boolean;
    userID: string;
    displayName?: string;
    imageURL?: string;
    chatID: string;
    token: string;
  }

  interface Tokens {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
  }

  interface UserInfo {
    sub: string;
  }
}
