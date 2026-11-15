# ResumeIQ

ResumeIQ is an AI-powered resume review app. Upload a PDF or DOCX file, paste
resume text, or try the built-in sample to receive an actionable report with
an overall score, category scores, and line-by-line rewrites.

Built by [Abdulmaleek Odetunde](https://portfolio-puce-eta-57.vercel.app).

<!-- Add a live demo link and one or two screenshots here once deployed. -->

## Features

- Email/password authentication with email confirmation and password reset
- Resume input by:
  - Pasting raw text
  - Uploading PDF or DOCX files (up to 4 MB)
  - Dragging and dropping supported files
- Automatic text extraction:
  - Text-based PDFs are parsed with `pdf-parse`
  - DOCX files are parsed with `mammoth`
  - Scanned PDFs fall back to Gemini transcription
- AI-generated analysis covering:
  - Overall resume score
  - Impact
  - Clarity
  - ATS friendliness
  - Formatting
  - Line-by-line before/after rewrites
- Saved report dashboard for authenticated users
- Client-side PDF export for completed reports
- Responsive interface with loading, error, not-found, and empty states

Google sign-in is planned but not enabled yet.

## Tech stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Supabase Auth and Postgres
- Google Gemini API via `@google/genai`
- Zod for validating AI responses and form input
- React Hook Form for the auth forms
- `pdf-parse` and `mammoth` for document extraction
- `html2pdf.js` for report export

## Requirements

- Node.js 20 or newer
- npm
- A Supabase project
- A Google AI Studio API key with access to the configured Gemini models

## Getting started

```bash
npm install
```

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
GEMINI_API_KEY=your-gemini-api-key

# Local default shown. Set this to your public HTTPS origin in production:
# it is used for auth email links and page metadata.
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Never expose `GEMINI_API_KEY` in client-side code or commit `.env.local`.
Variables prefixed with `NEXT_PUBLIC_` are intentionally available to the
browser.

## Supabase setup

1. **Auth.** Enable the Email provider. Email confirmation is on, so under
   Authentication, URL configuration set the Site URL to your app's origin and
   add `http://localhost:3000/**` and your production origin with `/**` to
   Redirect URLs. Auth emails link back through `/auth/callback`.

2. **Reports table and Row Level Security.** Run in the SQL editor:

```sql
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  file_name text not null,
  job_title text,
  overall_score integer,
  feedback text,
  overview text,
  category_scores jsonb,
  rewrites jsonb,
  created_at timestamptz not null default now()
);

create index reports_user_created_idx
  on public.reports (user_id, created_at desc);

alter table public.reports enable row level security;

create policy "read own reports" on public.reports
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "insert own reports" on public.reports
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "delete own reports" on public.reports
  for delete to authenticated
  using ((select auth.uid()) = user_id);
```

The server code relies on these policies to keep reports private. Never use
the Supabase service role key in this app, because it bypasses them.

The app does not use a `profiles` table. The user's display name comes from
the `full_name` stored in the auth user's metadata at sign-up.

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in before using the
analyze or reports pages.

```bash
npm run lint    # Run ESLint
npm run build   # Create a production build
npm run start   # Serve the production build
```

## Application flow

1. A user signs in through Supabase.
2. The analyze page accepts pasted text or a PDF/DOCX upload.
3. `/api/parse` validates the file, extracts its text, and uses Gemini as a
   fallback for scanned PDFs.
4. `/api/submit` sends the extracted text to Gemini and validates the
   structured response with Zod.
5. The report is stored in Supabase for the signed-in user.
6. The user is redirected to the report page, where scores, rewrites, copying,
   and PDF export are available.

Uploaded files are processed in memory and are not stored. The generated report
is stored and may contain short quoted portions of the resume. Resume text is
sent to the Gemini API, and on the free tier Google may use submitted content
to improve its products. See the in-app [Privacy Policy](/privacy) and
[Terms of Service](/terms) before deploying or changing the data flow.

## Project structure

```text
app/
  page.tsx                 Landing page
  analyze/                 Resume input page
  api/parse/               PDF and DOCX text extraction endpoint
  api/submit/              AI analysis and report creation endpoint
  auth/                    Sign-in/sign-up page, server actions (actions.ts),
                           password reset pages, and the email callback route
  reports/                 Report list and report detail routes
  privacy/, terms/         Legal pages
  error.tsx, not-found.tsx, loading.tsx   Shared fallback states
components/                UI grouped by feature and shared primitives
data/                      Sample resume and client-side form state
lib/
  ai/                      Gemini extraction and analysis logic
  schemas/auth.ts          Zod schemas for the auth forms
  gemini.ts                Gemini client, model list, and rate-limit fallback
  reports.ts               Supabase report reads and writes
  limits.ts                Upload size limit
  timeAgo.ts               Relative date helper
utils/supabase/            Browser, server, and proxy Supabase clients
public/                    Static assets
proxy.ts                   Session refresh and protected-route redirects
```

## Important limits and behavior

- Accepted upload formats are PDF and DOCX.
- The maximum upload size is 4 MB (hosted function request bodies are capped
  at about 4.5 MB on Vercel).
- A PDF must contain at least 50 extracted characters after parsing or
  fallback transcription.
- Scanned PDFs take longer because they are temporarily sent to Gemini.
- If a Gemini model is rate limited or unavailable, the next model in
  `lib/gemini.ts` is tried.
- Free-tier Gemini quotas are shared by all users of the deployment.
- Parsing, analysis, and report routes require authentication.
- PDF export runs in the browser and creates no server-side file.

## Deployment (Vercel)

1. Add the same environment variables in the Vercel project settings. Keep
   `GEMINI_API_KEY` private (no `NEXT_PUBLIC_` prefix) and set
   `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin. `NEXT_PUBLIC_` values are
   inlined at build time, so redeploy after changing them.
2. Add the deployed origin to the Supabase Site URL and Redirect URLs.
3. `pdf-parse` needs extra setup on serverless: `@napi-rs/canvas` is installed,
   `next.config.ts` lists `pdf-parse` and `@napi-rs/canvas` in
   `serverExternalPackages`, and `/api/parse` imports `pdf-parse/worker`
   before `pdf-parse`.
4. The parse and submit routes export `maxDuration = 60`, the maximum on
   Vercel's Hobby plan.
5. Test a text PDF, a scanned PDF, and a DOCX on a preview deployment before
   promoting to production.

## Notes for contributors

- Keep Gemini calls in server-only modules; API keys must not reach the client.
- Keep `AnalysisSchema` in sync with the prompt and the `reports` JSON columns
  when changing report fields.
- Preserve the Supabase RLS boundary when adding report queries or mutations.
- Run `npm run lint` and `npm run build` before submitting changes.

## Contact

Questions or account deletion requests: resumiq.help@gmail.com

## License and project status

ResumeIQ is a free personal project. It may change, become unavailable, or be
shut down. AI feedback is guidance and does not guarantee interviews or
employment outcomes. All rights reserved unless a license file says otherwise.
