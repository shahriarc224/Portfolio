# Md. Shahriar Chowdhury Portfolio

A responsive, single-page developer portfolio built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and React Icons.

## Run locally

1. Install Node.js (20 or newer).
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Create a production build: `npm run build`
5. Preview the production build: `npm run preview`

## Personalize the content

- **Location:** replace `YOUR CITY, COUNTRY` in `src/App.tsx`.
- **Portrait:** replace `public/shahriar-portrait.jpeg` with your preferred photo, keeping the same filename or updating the image path in `src/App.tsx`.
- **Journey:** edit the clearly marked placeholder entries in `src/data/portfolio.ts`.
- **Projects:** add project objects to the `projects` array in `src/data/portfolio.ts`; project cards render from that array automatically.
- **Achievements:** edit the `achievements` array in `src/data/portfolio.ts`; the source photos are optimized into `public/images/achievements/` for display.
- **News article:** edit `newsArticle` in `src/data/portfolio.ts`; the publication links and clipping images are stored there.
- **Email:** replace `you@example.com` in `src/App.tsx`.
- **Contact delivery:** configure `VITE_CONTACT_ENDPOINT` in `.env.local` with a service endpoint that accepts a `multipart/form-data` POST. Without it, the form shows a demo mode message and sends nothing.
- **Social URLs:** edit the `socials` array in `src/data/portfolio.ts`.
- **Résumé:** replace `public/resume.pdf` with your PDF. The navbar downloads it from `/resume.pdf`.

The theme toggle follows the system preference on first visit and stores a manual choice in local storage. Project, timeline, social, email, and location content intentionally use placeholders where requested.
