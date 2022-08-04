export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      DATABASE_URL: string;
      NEXT_PUBLIC_CLOURDINARY_URL: string;
      NEXT_PUBLIC_CLOURDINARY_NAME: string;
    }
  }
}
