/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  // ajoute d'autres variables si tu en as
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}