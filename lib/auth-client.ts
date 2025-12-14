import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://flashcard-app-gilt-five.vercel.app",
});
