/* eslint-disable @typescript-eslint/no-unused-vars */
import "next-auth";

export interface UserType {
  pk: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

declare module "next-auth" {
  interface User {
    id: string;
    access: string;
    user: UserType;
  }

  interface Session {
    access_token: string;
    user: UserType;
    groups: string[];
    error: string | undefined;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
    access_token: string;
    error: string | undefined;
  }
}
