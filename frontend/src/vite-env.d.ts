/// <reference types="vite/client" />
/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
      readonly REACT_APP_API_URL: string;
      // add other environment variables here as needed
    }
  }
  