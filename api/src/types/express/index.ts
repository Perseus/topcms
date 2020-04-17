interface UserSessionData {
  id: number;
  name: string;
}

declare module 'Express' {
   interface Request {
    user: UserSessionData;
  }
}
