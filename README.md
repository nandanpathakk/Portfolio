This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Google Analytics (optional)

Analytics is off unless you set a GA4 measurement ID. No npm package is used:
the site loads Google's own `gtag.js` with `next/script`.

1. In Google Analytics, create a GA4 property and a **Web** data stream, then copy
   its measurement ID (it looks like `G-XXXXXXXXXX`).
2. Add it to `.env.local` for local production builds, and to the Vercel project's
   environment variables for the live site:

   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

How it behaves:

- Only runs in production builds (`next build` + `next start`, or on Vercel), never in `next dev`.
- Nothing from Google loads until a visitor clicks **Allow** on the banner. "No thanks"
  is remembered, and browsers sending Global Privacy Control never see the banner.
- Google signals and ad personalisation are switched off. Visitors can change their
  choice from "Analytics settings" in the footer.
- The Content Security Policy in `next.config.ts` allows only the Google tag domains.

Custom events sent (alongside GA's automatic page views, scrolls and outbound clicks):

| Event | When |
| --- | --- |
| `resume_open` | Résumé opened (`from`: hero, nav, contact) |
| `email_click` | Email link clicked (`from`: contact, case_study) |
| `profile_click` | LinkedIn or GitHub clicked (`site`) |
| `case_study_open` | "Read the story" clicked on the home page (`project`) |
| `project_view` | A project panel scrolled into view (`project`) |
| `case_study_finished` | Reader reached the end of a case study (`project`) |
| `apk_download` | APK download clicked (`project`, `from`) |
| `project_open` | A case study's main project link clicked (`project`) |
| `see_work_click` | "See the work" clicked in the hero |
| `assistant_question` | Assistant used (`source`: suggestion or typed; suggestion id only, never typed text) |

Add a new click event by putting `data-track="event_name"` on a link or button;
any `data-track-*` attribute becomes an event parameter.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
