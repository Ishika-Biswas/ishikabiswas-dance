import { client, biographyQuery, teachingQuery } from '@/lib/sanity'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { PortableText } from 'next-sanity'

export const revalidate = 60

async function getData() {
  const [bio, teaching] = await Promise.all([
    client.fetch(biographyQuery),
    client.fetch(teachingQuery),
  ])
  return { bio, teaching }
}

export default async function About() {
  const { bio, teaching } = await getData()

  return (
    <main>
      <section style={{ background: 'var(--cream)', padding: '120px 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 56px', display: 'grid', gridTemplateColumns: '320px 1fr', gap: 100, alignItems: 'start' }}>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: 120 }}>
            <span className="label">About</span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--earth)', marginBottom: 32 }}>
              Kathak<br />Choreographer<br />&amp; Performer
            </h1>
            {bio?.tags && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
                {bio.tags.map((tag: string, i: number) => (
                  <div key={i} style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--river)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ display: 'block', width: 18, height: 1, background: 'var(--gold)' }} />
                    {tag}
                  </div>
                ))}
              </div>
            )}
            {bio?.profileImage && (
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', marginTop: 40, borderRadius: 2, overflow: 'hidden' }}>
                <Image src={urlFor(bio.profileImage).width(400).url()} alt="Ishika Biswas" fill style={{ objectFit: 'cover' }} />
              </div>
            )}
          </div>

          {/* Body */}
          <div>
            <div style={{ fontSize: 17, lineHeight: 1.9, color: 'var(--earth)' }}>
              {bio?.fullBio ? (
                <PortableText value={bio.fullBio} />
              ) : (
                <>
                  <p style={{ marginBottom: 24, opacity: 0.82 }}>I am a Kathak choreographer and performer based in Cardiff, Wales. Twenty years of rigorous training under Guru Sampita Chatterjee in the Lucknow Gharana tradition, and a continuing study with Vidushi Saswati Sen. The form is not a starting point for me — it is a living inheritance I have spent my life inside.</p>
                  <p style={{ marginBottom: 24, opacity: 0.82 }}>In recent years I have been asking what happens when Kathak leaves the stage and stands in the world as it actually is. I take the tatkaar outdoors, onto grass, into public squares, where the ghungroos compete with wind and the chakkar has no wings to disappear into.</p>
                  <p style={{ marginBottom: 24, opacity: 0.82 }}>My work sits at the intersection of classical Indian dance form, outdoor contemporary performance, live music, and live visual art. I hold a South Asian sacred geography and Welsh landscape in the same body — because I hold them in my own life.</p>
                  <p style={{ opacity: 0.82 }}>I have performed across India and the UK, including at the Royal Birmingham Conservatoire, Welsh Parliament, St. Fagans National Museum Wales, and Prerona Dance Festival Kolkata. I teach classical Kathak and fusion styles across Cardiff through Kalakrishti Cultural Space.</p>
                </>
              )}
            </div>

            {/* Training */}
            {bio?.teachers && (
              <div style={{ marginTop: 56, paddingTop: 56, borderTop: '1px solid var(--sand)' }}>
                <span className="label">Training &amp; Lineage</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginTop: 28 }}>
                  {bio.teachers.map((t: any, i: number) => (
                    <div key={i} style={{ background: 'var(--white)', padding: '28px 24px' }}>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400, color: 'var(--earth)', marginBottom: 4 }}>{t.name}</p>
                      <p style={{ fontSize: 13, color: 'var(--bark)', opacity: 0.75, lineHeight: 1.5 }}>{t.tradition}{t.period ? ` · ${t.period}` : ''}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Qualifications */}
            {bio?.qualifications && (
              <div style={{ marginTop: 56, paddingTop: 56, borderTop: '1px solid var(--sand)' }}>
                <span className="label">Formal Qualifications</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
                  {bio.qualifications.map((q: any, i: number) => (
                    <div key={i} style={{ fontSize: 14, color: 'var(--earth)', opacity: 0.75, paddingLeft: 16, borderLeft: '2px solid var(--gold)', lineHeight: 1.5 }}>
                      {q.institution} — {q.qualification}{q.year ? ` (${q.year})` : ''}{q.distinction ? ` · ${q.distinction}` : ''}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Masterclasses */}
            {bio?.masterclasses && (
              <div style={{ marginTop: 56, paddingTop: 56, borderTop: '1px solid var(--sand)' }}>
                <span className="label">Masterclasses &amp; Workshops</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
                  {bio.masterclasses.map((m: any, i: number) => (
                    <span key={i} style={{ fontSize: 12, background: 'var(--sand)', color: 'var(--earth-mid)', padding: '6px 14px', borderRadius: 2, letterSpacing: '0.04em' }}>
                      {m.artist}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Teaching */}
            {teaching?.length > 0 && (
              <div style={{ marginTop: 56, paddingTop: 56, borderTop: '1px solid var(--sand)' }}>
                <span className="label">Teaching</span>
                {teaching.map((t: any, i: number) => (
                  <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid var(--sand)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400 }}>{t.organisation}</h3>
                      {t.current && <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--river)', opacity: 0.8 }}>Current</span>}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--bark)', opacity: 0.7, marginBottom: 8 }}>{t.role}{t.location ? ` · ${t.location}` : ''}{t.period ? ` · ${t.period}` : ''}</p>
                    {t.description && <p style={{ fontSize: 15, color: 'var(--earth)', opacity: 0.75, lineHeight: 1.7 }}>{t.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
