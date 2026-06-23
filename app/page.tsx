import { client, featuredProjectQuery, upcomingPerformancesQuery, siteSettingsQuery, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 60

async function getData() {
  const [settings, project, performances] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(featuredProjectQuery),
    client.fetch(upcomingPerformancesQuery),
  ])
  return { settings, project, performances }
}

export default async function Home() {
  const { settings, project, performances } = await getData()

  return (
    <main>
      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        background: 'var(--ink)',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 55% 70% at 65% 45%, #3D2810 0%, transparent 55%), radial-gradient(ellipse 35% 50% at 15% 75%, #1A3535 0%, transparent 45%), var(--ink)',
        }} />

        {/* River ripple SVG */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 320, overflow: 'hidden' }}>
          <svg viewBox="0 0 1400 320" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', opacity: 0.12 }}>
            <path d="M-100,160 C150,80 350,240 600,160 C850,80 1050,240 1300,160" stroke="#C9A96E" strokeWidth="1.5" fill="none"/>
            <path d="M-100,190 C130,110 330,270 580,190 C830,110 1030,270 1280,190" stroke="#3D6060" strokeWidth="1" fill="none"/>
            <path d="M-100,130 C170,50 370,210 620,130 C870,50 1070,210 1320,130" stroke="#8C6E4B" strokeWidth="0.8" fill="none"/>
            <path d="M-100,220 C110,140 310,300 560,220 C810,140 1010,300 1260,220" stroke="#C9A96E" strokeWidth="0.5" fill="none" opacity="0.4"/>
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 2, padding: '140px 56px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', maxWidth: 1000 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24, opacity: 0.85 }}>
            Kathak Choreographer &amp; Performer · Cardiff, Wales
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(60px, 9vw, 108px)', fontWeight: 300, lineHeight: 0.92, color: 'var(--cream)', letterSpacing: '-0.015em', marginBottom: 36 }}>
            Ishika<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Biswas</em>
          </h1>
          <p style={{ fontSize: 16, color: 'var(--sand)', opacity: 0.75, maxWidth: 480, lineHeight: 1.7, marginBottom: 52 }}>
            {settings?.heroStatement || 'Twenty years inside the form. Now taking it outdoors, into public space, into conversation with the world as it actually is.'}
          </p>
          <Link href="#nadi" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cream)', textDecoration: 'none' }}>
            Discover NADI
            <span style={{ display: 'block', width: 48, height: 1, background: 'var(--gold)' }} />
          </Link>
        </div>

        <div style={{ position: 'relative', zIndex: 2, padding: '28px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sand)', opacity: 0.4 }}>
            <span style={{ display: 'block', width: 32, height: 1, background: 'var(--gold)', opacity: 0.5 }} />
            Scroll
          </div>
          <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--sand)', opacity: 0.35 }}>Cardiff · Wales · UK</span>
        </div>
      </section>

      {/* ── NADI ── */}
      {project && (
        <section id="nadi" style={{ background: 'var(--white)', padding: '120px 0 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, padding: '0 56px 80px', maxWidth: 1160, margin: '0 auto' }}>
            {/* Left */}
            <div>
              <span className="label label-river">Current Work · Co-commissioned · {project.year}</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(52px, 7vw, 86px)', fontWeight: 300, lineHeight: 0.95, color: 'var(--earth)', marginBottom: 10 }}>
                {project.title}
              </h2>
              {project.titleHindi && (
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 50px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--gold)', marginBottom: 40 }}>
                  {project.titleHindi}
                </p>
              )}
              <p style={{ fontSize: 17, lineHeight: 1.85, color: 'var(--earth)', opacity: 0.8, marginBottom: 20 }}>
                {project.shortDescription}
              </p>
              <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, fontStyle: 'italic', fontWeight: 300, lineHeight: 1.65, color: 'var(--river)', borderLeft: '2px solid var(--gold)', paddingLeft: 24, margin: '36px 0' }}>
                The river is not saved. The river is still at risk. But you have stood beside her for twenty minutes, and the body remembers what it stands beside.
              </blockquote>

              {/* Ensemble */}
              {project.ensemble && (
                <div style={{ marginTop: 40 }}>
                  <span className="label">The Ensemble</span>
                  {project.ensemble.filter((m: any) => m.section === 'performer').map((m: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '13px 0', borderBottom: '1px solid var(--sand)', fontSize: 15 }}>
                      <span style={{ fontWeight: 400 }}>{m.name}</span>
                      <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bark)', opacity: 0.65 }}>{m.role}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 28 }}>
                    <span className="label">Creative Team</span>
                    {project.ensemble.filter((m: any) => m.section === 'creative').map((m: any, i: number) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '13px 0', borderBottom: '1px solid var(--sand)', fontSize: 15 }}>
                        <span style={{ fontWeight: 400, fontStyle: 'italic', color: 'var(--bark)' }}>{m.name}</span>
                        <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--bark)', opacity: 0.65 }}>{m.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {/* Canvas panorama — decorative */}
              <div>
                <span className="label">Six-Canvas Horizontal Panorama</span>
                <div style={{ width: '100%', height: 180, display: 'flex', gap: 3, borderRadius: 4, overflow: 'hidden' }}>
                  {['cs-1','cs-2','cs-3','cs-4','cs-5','cs-6'].map((c, i) => (
                    <div key={i} className={`cs ${c}`} style={{ flex: 1 }} />
                  ))}
                </div>
                <p style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--bark)', opacity: 0.5, marginTop: 8 }}>
                  Badhon Khan · Live painting · Middle two canvases desecrated each performance
                </p>
              </div>

              {/* Project gallery image if available */}
              {project.gallery?.[0] && (
                <div style={{ position: 'relative', width: '100%', height: 260, borderRadius: 2, overflow: 'hidden' }}>
                  <Image
                    src={urlFor(project.gallery[0]).width(600).url()}
                    alt={project.gallery[0].caption || project.title}
                    fill style={{ objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Supporters */}
              {project.supporters && (
                <div>
                  <span className="label">Supported By</span>
                  <div style={{ fontSize: 13, color: 'var(--earth)', opacity: 0.65, lineHeight: 2.1 }}>
                    {project.supporters.map((s: any, i: number) => (
                      <div key={i}>
                        <span style={{ textTransform: 'capitalize' }}>
                          {s.role === 'cocommissioned' ? 'Co-commissioned by' :
                           s.role === 'supported' ? 'Supported by' :
                           s.role === 'facilitated' ? 'Rehearsals facilitated by' : 'In association with'}
                        </span>{' '}
                        {s.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Performances band */}
          {performances?.length > 0 && (
            <div style={{ background: 'var(--earth)', padding: '64px 56px' }}>
              <div style={{ maxWidth: 1160, margin: '0 auto', display: 'flex', gap: 0, alignItems: 'stretch' }}>
                {performances.slice(0, 3).map((p: any, i: number) => (
                  <div key={i} style={{ flex: 1, padding: '0 48px', borderRight: i < performances.length - 1 ? '1px solid rgba(201,169,110,0.2)' : 'none', paddingLeft: i === 0 ? 0 : undefined }}>
                    <span className="label label-gold">{p.type === 'rnd' ? 'R&D Sharing' : p.type === 'upcoming' ? 'Upcoming' : 'Performance'}</span>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 300, color: 'var(--cream)', lineHeight: 1, marginBottom: 12 }}>
                      {p.dateDisplay}
                    </p>
                    <p style={{ fontSize: 14, color: 'var(--sand)', opacity: 0.7, lineHeight: 1.6 }}>
                      {p.festival || p.venue}<br />
                      {p.city}{p.country ? `, ${p.country}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
