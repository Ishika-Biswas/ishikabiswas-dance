import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ivizmjvy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// ── QUERIES ──────────────────────────────────────────────────────────────────

export const siteSettingsQuery = `*[_type == "siteSettings"][0]`

export const biographyQuery = `*[_type == "biography"][0]{
  title, shortBio, fullBio, tags, profileImage,
  qualifications, teachers, masterclasses
}`

export const featuredProjectQuery = `*[_type == "project" && featured == true] | order(order asc)[0]{
  title, titleHindi, slug, status, year,
  shortDescription, fullDescription,
  duration, format, commission, supporters,
  ensemble, coverImage, gallery, videoUrl, movements
}`

export const allProjectsQuery = `*[_type == "project"] | order(order asc){
  title, titleHindi, slug, status, year,
  shortDescription, coverImage, featured, commission
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  title, titleHindi, slug, status, year,
  shortDescription, fullDescription,
  duration, format, commission, supporters,
  ensemble, coverImage, gallery, videoUrl, movements
}`

export const upcomingPerformancesQuery = `*[_type == "performance" && upcoming == true] | order(date asc){
  title, venue, festival, city, country,
  dateDisplay, type, image, notes, project->{ title, slug }
}`

export const allPerformancesQuery = `*[_type == "performance"] | order(date desc){
  title, venue, festival, city, country,
  dateDisplay, date, type, upcoming, featured, notes,
  project->{ title, slug }
}`

export const featuredPhotosQuery = `*[_type == "photo" && featured == true] | order(date desc){
  title, image, credit, date, category,
  project->{ title, slug }
}`

export const allPhotosQuery = `*[_type == "photo"] | order(date desc){
  title, image, credit, date, category,
  project->{ title, slug }
}`

export const featuredPressQuery = `*[_type == "press" && featured == true] | order(date desc){
  publication, headline, quote, date, url, type
}`

export const allPressQuery = `*[_type == "press"] | order(date desc){
  publication, headline, quote, date, url, type
}`

export const teachingQuery = `*[_type == "teaching"] | order(current desc){
  organisation, location, period, role,
  description, ageGroups, styles, current, image
}`
