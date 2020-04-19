interface UserSessionData {
  id: number;
  name: string;
}

declare namespace Express {
  export interface Request {
    user: UserSessionData;
  }
}
