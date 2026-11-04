import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import githubActivityHandler from './api/github-activity.ts'

declare const process: { env: Record<string, string | undefined> }

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  if (env.GITHUB_TOKEN) process.env.GITHUB_TOKEN = env.GITHUB_TOKEN

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'local-github-activity-api',
        configureServer(server) {
          server.middlewares.use('/api/github-activity', (req, res, next) => {
            if ((req as unknown as { method?: string }).method !== 'GET') return next()
            const apiResponse = {
              setHeader: (name: string, value: string) => res.setHeader(name, value),
              status(code: number) {
                res.statusCode = code
                return this
              },
              json(body: unknown) {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(body))
              },
            }
            void githubActivityHandler(req as unknown as { method?: string }, apiResponse)
          })
        },
      },
    ],
  }
})
