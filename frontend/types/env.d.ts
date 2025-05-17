export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_ANON_KEY: string;
      SUPABASE_PROJECT_URL: string;
      REACT_APP_BASE_URL_CLIENT: string;
      REACT_APP_BASE_URL_BACKEND: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}


