# Ishika Biswas — Artist Portfolio

Next.js 14 + Sanity CMS artist portfolio site.

## Stack

- **Next.js 14** — App Router, server components, ISR
- **Sanity CMS** — Content management (project ID: `ivizmjvy`)
- **Vercel** — Deployment
- **TypeScript** — Type safety

## Sanity Studio

Your CMS is live at:
**https://ishika-biswas-studio.sanity.studio/**

Log in with your Sanity account to manage:
- Site Settings (name, tagline, email, phone, hero image)
- Biography (bio text, teachers, qualifications, masterclasses)
- Projects (NADI and future works)
- Performances (all past and upcoming performances)
- Photos (gallery management)
- Press (reviews, mentions, awards)
- Teaching (Kalakrishti and other positions)

## Local Development

```bash
npm install
cp .env.local.example .env.local
# Fill in your SANITY_API_TOKEN from sanity.io/manage
npm run dev
```

## Vercel Environment Variables

Add these in your Vercel project settings under Environment Variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=ivizmjvy
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<your token from sanity.io/manage → API → Tokens>
```

## Getting your Sanity API Token

1. Go to https://sanity.io/manage
2. Select project `ivizmjvy`
3. Go to API → Tokens
4. Create a new token with **Editor** permissions
5. Copy and add to Vercel environment variables

## Content Migration

Start by adding content in this order in Sanity Studio:
1. **Site Settings** — add your name, email, phone, hero statement
2. **Biography** — add your full bio, teachers, qualifications
3. **Projects** — add NADI first, set Featured = true
4. **Performances** — add Leicester July 2026 and Journeys October 2026 as Upcoming
5. **Photos** — upload performance photos from Ed Choo sessions
6. **Teaching** — add Kalakrishti

## Revalidation

Pages revalidate every 60 seconds. After saving content in Sanity Studio, changes appear on the site within 60 seconds automatically.

## File Structure

```
app/
  page.tsx          — Homepage (hero + NADI + performances)
  about/page.tsx    — About, training, teaching
  work/page.tsx     — All projects and performance history
  work/[slug]/      — Individual project pages
  contact/page.tsx  — Contact
components/
  Nav.tsx           — Fixed navigation
lib/
  sanity.ts         — Client, queries, urlFor helper
```
