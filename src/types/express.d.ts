import type { Roles } from "../types/types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: Roles;
      };
    }
  }
}

export {};