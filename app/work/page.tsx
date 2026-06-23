import { client, allProjectsQuery, allPerformancesQuery, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

async function getData() {
  const [projects, performances] = await Promise.all([
    client.fetch(allProjectsQuery),
    client.fetch(allPerformancesQuery),
  ])
  return { projects, performances }
}

const defaultProjects = [
  { title: 'NADI — नदी', slug: { current: 'nadi' }, status: 'current', year: '2026', shortDescription: 'Outdoor Kathak-contemporary ensemble performance. Co-commissioned by Inspirate & ArtReach. Performing Leicester 2026.', commission: 'Inspirate & ArtReach', featured: true },
  { title: 'Anantashakti', slug: { current: 'anantashakti' }, status: 'touring', year: '2025–26', shortDescription: 'Lead dancer and choreographer. UK Bengali Convention, Navin Kala Nritya Mahotsav ICCR Kolkata.', featured: false },
  { title: 'River Taff Dialogues', slug: { current: 'taff' }, status: 'rnd', year: '2026', shortDescription: 'Research thread in conversation with the Lit in Place residency group working on the Taff.', featured: false },
]

const defaultPerformances = [
  { title: 'NADI', festival: 'An Indian Summer Festival', city: 'Leicester', dateDisplay: '4–5 July 2026', type: 'upcoming', notes: 'Jubilee Square' },
  { title: 'NADI', festival: 'Journeys Festival International', city: 'Leicester', dateDisplay: 'October 2026', type: 'upcoming', notes: '' },
  { title: 'Anantashakti', venue: 'Royal Birmingham Conservatoire', city: 'Birmingham', dateDisplay: 'Aug 2025', type: 'festival', notes: 'UK Bengali Convention' },
  { title: 'Making a Clearing', venue: 'Various Cardiff venues', city: 'Cardiff', dateDisplay: 'Dec 2025–Apr 2026', type: 'commissioned', notes: 'Jo Fong initiative' },
  { title: 'Solo Kathak Recital', venue: 'Techniquest Cardiff', city: 'Cardiff', dateDisplay: 'Nov 2025', type: 'recital', notes: 'Royal College of Psychiatry Annual Conference' },
  { title: 'Diwali Festival', venue: "St. Fagans National Museum Wales", city: 'Cardiff', dateDisplay: 'Oct 2025', type: 'festival', notes: '' },
  { title: 'In the Quest of Peace Within', venue: 'Welsh Parliament', city: 'Cardiff', dateDisplay: 'Oct 2025', type: 'commissioned', notes: '' },
  { title: 'Tagore\'s Dance Philosophy', venue: 'Club 1400', city: 'Cardiff', dateDisplay: 'Jun 2025', type: 'festival', notes: 'South Asian Heritage Month' },
  { title: 'Kathak Recital', festival: 'Prerona Dance Festival', city: 'Kolkata', dateDisplay: 'Sep 2024', type: 'festival', notes: 'India' },
  { title: 'Satyam Jnanam Anantam', venue: 'Kolkata & Vishakhapatnam', city: '', dateDisplay: '2022–23', type: 'commissioned', notes: 'Sangeet Natak Academy' },
  { title: 'Chatusprana', venue: 'Kolkata & Vishakhapatnam', city: '', dateDisplay: '2021–23', type: 'commissioned', notes: 'Sampita Chatterjee' },
]

const festivalHistory = [
  'Bhagirath Dance Festival 2019',
  'Malasree Nityotsav 2018, 2019',
  'Kalabhrith Dance & Music Festival 2017, 2018',
  'Obhyudoy Cultural Festival 2016, 2017, 2018',
  'Banichakra Dance Festival 2018',
  'Pracheen Kala Kendra Mahotsab 2018',
  'Sur o Bani Sanskritik Utsav 2018',
  'Rath Yatra Opening Ceremony · Leamington Spa 2024',
  'UK Bengali Convention · Royal Birmingham Conservatoire 2025',
]

export default async function Work() {
  const { projects, performances } = await getData()

  const displayProjects = projects?.length ? projects : defaultProjects
  const displayPerformances = performances?.length ? performances : defaultPerformances

  return (
    <main>
      <section className="work-section">
        <div className="work-inner">
          <h1 className="work-page-title">Work</h1>

          {/* Projects */}
          <div style={{ marginBottom: 80 }}>
            {displayProjects.map((p: any, i: number) => (
              <Link key={i}
                href={`/work/${p.slug?.current || '#'}`}
                className={`project-card ${p.featured ? 'project-card-featured' : ''}`}
                style={{ gridColumn: p.featured ? '1 / -1' : undefined }}
              >
                <span className="project-card-label">
                  {p.status === 'current' ? 'Current' : p.status === 'touring' ? 'Touring' : p.status === 'rnd' ? 'R&D' : 'Project'} · {p.year}
                </span>
                <h3 className="project-card-title">{p.title}</h3>
                <p className="project-card-desc">{p.shortDescription}</p>
                {p.commission && (
                  <p style={{ marginTop: 16, fontSize: 12, letterSpacing: '0.08em', color: p.featured ? 'var(--gold)' : 'var(--bark)', opacity: 0.7 }}>
                    {p.commission}
                  </p>
                )}
              </Link>
            ))}
          </div>

          {/* Performance history */}
          <div>
            <span className="label" style={{ marginBottom: 24 }}>Performance History</span>
            <div>
              {displayPerformances.map((p: any, i: number) => (
                <div key={i} className="tl-item">
                  <p className="tl-year">
                    {p.dateDisplay?.split(' ').pop() || ''}
                  </p>
                  <div>
                    <h3 className="tl-title">{p.title}</h3>
                    <p className="tl-desc">
                      {p.festival || p.venue}{p.city ? ` · ${p.city}` : ''}{p.notes ? ` · ${p.notes}` : ''}
                    </p>
                  </div>
                  <span className="tl-tag">
                    {p.type === 'rnd' ? 'R&D' :
                     p.type === 'upcoming' ? 'Upcoming' :
                     p.type === 'recital' ? 'Recital' :
                     p.type === 'festival' ? 'Festival' :
                     p.type === 'commissioned' ? 'Commissioned' : 'Performance'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Earlier festivals */}
          <div style={{ marginTop: 48 }}>
            <span className="label" style={{ marginBottom: 16 }}>Earlier Festival Performances</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
              {festivalHistory.map((f, i) => (
                <div key={i} className="festival-item">{f}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
