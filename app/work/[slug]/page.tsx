import { client, projectBySlugQuery, allProjectsQuery, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import { PortableText } from 'next-sanity'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await client.fetch(allProjectsQuery)
  return projects.map((p: any) => ({ slug: p.slug?.current })).filter(Boolean)
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await client.fetch(projectBySlugQuery, { slug: params.slug })
  if (!project) notFound()

  return (
    <main>
      {/* Hero */}
      <section style={{ background: 'var(--ink)', padding: '140px 56px 80px', minHeight: '60vh', display: 'flex', alignItems: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        {project.coverImage && (
          <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
            <Image src={urlFor(project.coverImage).width(1400).url()} alt={project.title} fill style={{ objectFit: 'cover' }} />
          </div>
        )}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
          <span className="label label-gold">{project.year} · {project.format}</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 300, lineHeight: 0.92, color: 'var(--cream)', marginBottom: 16 }}>
            {project.title}
          </h1>
          {project.titleHindi && (
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontStyle: 'italic', color: 'var(--gold)', marginBottom: 24 }}>
              {project.titleHindi}
            </p>
          )}
          <p style={{ fontSize: 17, color: 'var(--sand)', opacity: 0.8, maxWidth: 560, lineHeight: 1.7 }}>
            {project.shortDescription}
          </p>
        </div>
      </section>

      {/* Body */}
      <section style={{ background: 'var(--white)', padding: '80px 56px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 80 }}>
          <div style={{ fontSize: 17, lineHeight: 1.9, color: 'var(--earth)', opacity: 0.82 }}>
            {project.fullDescription ? (
              <PortableText value={project.fullDescription} />
            ) : (
              <p>{project.shortDescription}</p>
            )}

            {/* Movements */}
            {project.movements?.length > 0 && (
              <div style={{ marginTop: 48 }}>
                <span className="label" style={{ marginBottom: 24 }}>Structure</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  {project.movements.map((m: any, i: number) => (
                    <div key={i} style={{ background: 'var(--parchment)', padding: '24px 20px' }}>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400, color: 'var(--earth)', marginBottom: 2 }}>{m.name}</p>
                      {m.nameTranslation && <p style={{ fontSize: 12, color: 'var(--bark)', opacity: 0.7, marginBottom: 8, letterSpacing: '0.05em' }}>{m.nameTranslation}</p>}
                      {m.description && <p style={{ fontSize: 14, color: 'var(--earth)', opacity: 0.7, lineHeight: 1.6 }}>{m.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {project.gallery?.length > 0 && (
              <div style={{ marginTop: 56 }}>
                <span className="label" style={{ marginBottom: 24 }}>Gallery</span>
                <div style={{ columns: 2, gap: 3 }}>
                  {project.gallery.map((img: any, i: number) => (
                    <div key={i} style={{ breakInside: 'avoid', marginBottom: 3 }}>
                      <Image src={urlFor(img).width(700).url()} alt={img.caption || project.title} width={700} height={467} style={{ width: '100%', height: 'auto', display: 'block' }} />
                      {img.caption && <p style={{ fontSize: 11, color: 'var(--bark)', opacity: 0.6, marginTop: 4 }}>{img.caption}{img.credit ? ` · © ${img.credit}` : ''}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ position: 'sticky', top: 100 }}>
              {/* Meta */}
              <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid var(--sand)' }}>
                {[
                  { label: 'Duration', val: project.duration },
                  { label: 'Format', val: project.format },
                  { label: 'Commission', val: project.commission },
                ].filter(r => r.val).map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, fontSize: 14, padding: '12px 0', borderBottom: '1px solid rgba(140,110,75,0.1)' }}>
                    <span style={{ minWidth: 90, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--bark)', opacity: 0.65, paddingTop: 2 }}>{r.label}</span>
                    <span style={{ color: 'var(--earth)' }}>{r.val}</span>
                  </div>
                ))}
              </div>

              {/* Ensemble */}
              {project.ensemble?.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <span className="label">Ensemble</span>
                  {project.ensemble.map((m: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(140,110,75,0.1)', fontSize: 14 }}>
                      <span style={{ color: m.section === 'creative' ? 'var(--bark)' : 'var(--earth)', fontStyle: m.section === 'creative' ? 'italic' : 'normal' }}>{m.name}</span>
                      <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--bark)', opacity: 0.6 }}>{m.role}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Supporters */}
              {project.supporters?.length > 0 && (
                <div>
                  <span className="label">Supported By</span>
                  {project.supporters.map((s: any, i: number) => (
                    <div key={i} style={{ fontSize: 13, color: 'var(--earth)', opacity: 0.65, marginBottom: 8, lineHeight: 1.5 }}>
                      <span style={{ display: 'block', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--bark)', opacity: 0.6, marginBottom: 2 }}>
                        {s.role === 'cocommissioned' ? 'Co-commissioned by' : s.role === 'supported' ? 'Supported by' : s.role === 'facilitated' ? 'Facilitated by' : 'In association with'}
                      </span>
                      {s.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
