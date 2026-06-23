import { client, allProjectsQuery, allPerformancesQuery, allPhotosQuery, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

async function getData() {
  const [projects, performances, photos] = await Promise.all([
    client.fetch(allProjectsQuery),
    client.fetch(allPerformancesQuery),
    client.fetch(allPhotosQuery),
  ])
  return { projects, performances, photos }
}

export default async function Work() {
  const { projects, performances, photos } = await getData()

  return (
    <main>
      {/* Projects */}
      <section style={{ background: 'var(--parchment)', padding: '120px 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 56 }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(42px, 5vw, 64px)', fontWeight: 300, color: 'var(--earth)' }}>Work</h1>
          </div>

          {/* Projects grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginBottom: 2 }}>
            {projects?.map((p: any, i: number) => (
              <Link key={i} href={`/work/${p.slug?.current || '#'}`} style={{
                background: p.featured ? 'var(--earth)' : 'var(--white)',
                padding: '48px 40px',
                textDecoration: 'none',
                display: 'block',
                gridColumn: p.featured ? '1 / -1' : undefined,
                transition: 'background 0.25s',
              }}>
                <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: p.featured ? 'var(--gold)' : 'var(--river)', marginBottom: 16, display: 'block' }}>
                  {p.status === 'current' ? 'Current' : p.status === 'touring' ? 'Touring' : p.status === 'rnd' ? 'R&D' : 'Project'} · {p.year}
                </span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: p.featured ? 36 : 28, fontWeight: 400, color: p.featured ? 'var(--cream)' : 'var(--earth)', marginBottom: 12, lineHeight: 1.2 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 15, color: p.featured ? 'var(--sand)' : 'var(--earth)', opacity: 0.7, lineHeight: 1.7 }}>
                  {p.shortDescription}
                </p>
                {p.commission && (
                  <p style={{ marginTop: 20, fontSize: 12, letterSpacing: '0.08em', color: p.featured ? 'var(--gold)' : 'var(--bark)', opacity: 0.7 }}>
                    {p.commission}
                  </p>
                )}
              </Link>
            ))}
          </div>

          {/* Performance timeline */}
          <div style={{ marginTop: 80 }}>
            <span className="label" style={{ marginBottom: 32 }}>Performance History</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {performances?.map((p: any, i: number) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '100px 1fr auto',
                  gap: 32, alignItems: 'start',
                  background: 'var(--white)', padding: '28px 32px',
                }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: 'var(--bark)', lineHeight: 1, paddingTop: 2 }}>
                    {p.dateDisplay?.split(' ').slice(-1)[0] || new Date(p.date).getFullYear()}
                  </p>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: 'var(--earth)', marginBottom: 4, lineHeight: 1.2 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: 14, color: 'var(--earth)', opacity: 0.6, lineHeight: 1.6 }}>
                      {p.festival || p.venue}{p.city ? ` · ${p.city}` : ''}{p.notes ? ` · ${p.notes}` : ''}
                    </p>
                  </div>
                  <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--river)', background: 'rgba(61,96,96,0.08)', padding: '5px 10px', borderRadius: 2, alignSelf: 'start', whiteSpace: 'nowrap' }}>
                    {p.type === 'rnd' ? 'R&D' : p.type === 'upcoming' ? 'Upcoming' : p.type === 'recital' ? 'Recital' : p.type === 'festival' ? 'Festival' : p.type === 'commissioned' ? 'Commissioned' : 'Performance'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      {photos?.length > 0 && (
        <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
          <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 56px' }}>
            <span className="label" style={{ marginBottom: 32 }}>Gallery</span>
            <div style={{ columns: 3, gap: 3 }}>
              {photos.map((photo: any, i: number) => (
                <div key={i} style={{ breakInside: 'avoid', marginBottom: 3, position: 'relative', overflow: 'hidden' }}>
                  <Image
                    src={urlFor(photo.image).width(600).url()}
                    alt={photo.title || 'Performance photo'}
                    width={600}
                    height={400}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                  {photo.credit && (
                    <p style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--bark)', opacity: 0.6, marginTop: 4 }}>
                      © {photo.credit}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
