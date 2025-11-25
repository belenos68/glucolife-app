import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  // Récupère toutes les variables d’environnement (Vercel + .env)
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    define: {
      // Injection explicite dans le bundle
      'process.env': env,
    },
  })
}
