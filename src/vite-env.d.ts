/// <reference types="vite/client" />

/// <reference types="vite/client" />
export {}; // mantiene el archivo como módulo

declare global {
interface ImportMetaEnv {
    VITE_GOOGLE_CLIENT_ID: string;
    VITE_API_BASE_URL: string;
}
interface ImportMeta {
    env: ImportMetaEnv;
}
}
