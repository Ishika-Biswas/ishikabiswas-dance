import { client, biographyQuery, teachingQuery } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

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

  const teachers = bio?.teachers || [
    { name: 'Vidushi Saswati Sen', tradition: 'Kathak · Lucknow Gharana', period: '2021 – Continuing' },
    { name: 'Guru Sampita Chatterjee', tradition: 'Kathak · Lucknow Gharana', period: '2000 – Continuing · 20+ years' },
    { name: 'Vidushi Sharmila Mukherjee', tradition: 'Odissi', period: '2022 – Continuing' },
    { name: 'Contemporary & Physical', tradition: 'Motionhouse · Aerial Impulse · Warrior Pathways', period: '2024' },
  ]

  const qualifications = bio?.qualifications || [
    { institution: 'Pracheen Kala Kendra, Chandigarh', qualification: 'Sangeet Bhaskar', year: '2021', distinction: 'with Distinction' },
    { institution: 'Prayag Sangeet Samiti', qualification: '4th year', distinction: 'with Distinction' },
    { institution: 'Banichakra Kathak Dance Exam', qualification: 'First Position', distinction: '5th year' },
  ]

  const masterclasses = bio?.masterclasses || [
    { artist: 'Pt. Birju Maharaj' },
    { artist: 'Vidushi Kumudini Lakhia' },
    { artist: 'Smt. Sanjukta Sinha' },
    { artist: 'Vishal Krishna' },
    { artist: 'Venessa Maria Mirza' },
    { artist: 'Kalaripayattu · Warrior Pathways' },
    { artist: 'Circus Aerial · Aerial Impulse 2024' },
  ]

  const tags = bio?.tags || ['Lucknow Gharana', 'Outdoor Arts', 'Climate & Ecology', 'Ensemble Work', 'Cardiff, Wales']

  return (
    <main>
      <section className="about-section">
        <div className="about-grid">

          {/* Sidebar */}
          <div className="about-sidebar">
            <span className="label">About</span>
            <h1 className="about-sidebar-title">
              Kathak<br />Choreographer<br />&amp; Performer
            </h1>
            <div>
              {tags.map((tag: string, i: number) => (
                <div key={i} className="about-tag">{tag}</div>
              ))}
            </div>
            {bio?.profileImage && (
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/5', marginTop: 40, borderRadius: 2, overflow: 'hidden' }}>
                <Image src={urlFor(bio.profileImage).width(400).url()} alt="Ishika Biswas" fill style={{ objectFit: 'cover' }} />
              </div>
            )}
          </div>

          {/* Body */}
          <div className="about-body-text">
            <p>I am a Kathak choreographer and performer based in Cardiff, Wales. Twenty years of rigorous training under Guru Sampita Chatterjee in the Lucknow Gharana tradition, and a continuing study with Vidushi Saswati Sen. The form is not a starting point for me — it is a living inheritance I have spent my life inside.</p>
            <p>In recent years I have been asking what happens when Kathak leaves the stage and stands in the world as it actually is. I take the tatkaar outdoors, onto grass, into public squares, where the ghungroos compete with wind and the chakkar has no wings to disappear into. The form carries differently in open air.</p>
            <p>My work sits at the intersection of classical Indian dance form, outdoor contemporary performance, live music, and live visual art. I hold a South Asian sacred geography and Welsh landscape in the same body — because I hold them in my own life. That is where the work comes from.</p>
            <p>I have performed across India and the UK, including at the Royal Birmingham Conservatoire, Welsh Parliament, St. Fagans National Museum Wales, Techniquest Cardiff, and Prerona Dance Festival Kolkata. I teach classical Kathak and fusion styles across Cardiff through Kalakrishti Cultural Space.</p>

            {/* Training */}
            <div className="section-divider">
              <span className="label">Training &amp; Lineage</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginTop: 16 }}>
                {teachers.map((t: any, i: number) => (
                  <div key={i} className="training-card">
                    <p className="training-card-name">{t.name}</p>
                    <p className="training-card-detail">{t.tradition}{t.period ? ` · ${t.period}` : ''}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualifications */}
            <div className="section-divider">
              <span className="label">Formal Qualifications</span>
              <div style={{ marginTop: 16 }}>
                {qualifications.map((q: any, i: number) => (
                  <div key={i} className="qual-item">
                    {q.institution} — {q.qualification}{q.year ? ` (${q.year})` : ''}{q.distinction ? ` · ${q.distinction}` : ''}
                  </div>
                ))}
              </div>
            </div>

            {/* Masterclasses */}
            <div className="section-divider">
              <span className="label">Masterclasses &amp; Workshops</span>
              <div style={{ marginTop: 16 }}>
                {masterclasses.map((m: any, i: number) => (
                  <span key={i} className="master-tag">{m.artist}</span>
                ))}
              </div>
            </div>

            {/* Teaching */}
            {teaching?.length > 0 && (
              <div className="section-divider">
                <span className="label">Teaching</span>
                {teaching.map((t: any, i: number) => (
                  <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid var(--sand)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: 'var(--earth)' }}>{t.organisation}</h3>
                      {t.current && <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--river)' }}>Current</span>}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--bark)', opacity: 0.75, marginBottom: 8 }}>{t.role}{t.location ? ` · ${t.location}` : ''}{t.period ? ` · ${t.period}` : ''}</p>
                    {t.description && <p style={{ fontSize: 15, color: 'var(--earth)', opacity: 0.8, lineHeight: 1.7 }}>{t.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Default teaching if none in Sanity */}
            {!teaching?.length && (
              <div className="section-divider">
                <span className="label">Teaching</span>
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: 'var(--earth)', marginBottom: 8 }}>Kalakrishti Cultural Space</h3>
                  <p style={{ fontSize: 13, color: 'var(--bark)', opacity: 0.75, marginBottom: 8 }}>Dance Teacher &amp; Instructor · Cardiff · 2025–Present</p>
                  <p style={{ fontSize: 15, color: 'var(--earth)', opacity: 0.8, lineHeight: 1.7 }}>Classical Kathak and fusion styles for children (6–12), teens (13–18), and adults (18+).</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
