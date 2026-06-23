import { client, siteSettingsQuery } from '@/lib/sanity'

export const revalidate = 60

export default async function Contact() {
  const settings = await client.fetch(siteSettingsQuery)

  return (
    <main>
      <section style={{ background: 'var(--ink)', padding: '120px 0 80px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 56px', textAlign: 'center', width: '100%' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 28, opacity: 0.8 }}>
            Get in touch
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1, marginBottom: 28 }}>
            Work together,<br />or just talk about rivers
          </h1>
          <p style={{ fontSize: 16, color: 'var(--sand)', opacity: 0.7, marginBottom: 52, lineHeight: 1.7 }}>
            For performance bookings, commissioning enquiries, press, collaboration, teaching enquiries, or a conversation about the work.
          </p>
          <a href={`mailto:${settings?.email || 'ibishikabiswas@gmail.com'}`} style={{
            display: 'inline-block',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 24, fontStyle: 'italic',
            color: 'var(--gold)', textDecoration: 'none',
            borderBottom: '1px solid rgba(201,169,110,0.35)',
            paddingBottom: 4,
          }}>
            {settings?.email || 'ibishikabiswas@gmail.com'}
          </a>
          {settings?.phone && (
            <a href={`tel:${settings.phone.replace(/\s/g, '')}`} style={{ display: 'block', marginTop: 16, fontSize: 15, color: 'var(--sand)', opacity: 0.5, textDecoration: 'none', letterSpacing: '0.05em' }}>
              {settings.phone}
            </a>
          )}

          <div style={{ marginTop: 72, paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, textAlign: 'left' }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.5, marginBottom: 8 }}>Based</p>
              <p style={{ fontSize: 14, color: 'var(--sand)', opacity: 0.6, lineHeight: 1.6 }}>
                {settings?.location || 'Cardiff, Wales, UK'}<br />Available for touring internationally
              </p>
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.5, marginBottom: 8 }}>Teaching</p>
              <p style={{ fontSize: 14, color: 'var(--sand)', opacity: 0.6, lineHeight: 1.6 }}>
                Kalakrishti Cultural Space<br />Cardiff · Classical &amp; Fusion Kathak
              </p>
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.5, marginBottom: 8 }}>Watch</p>
              <p style={{ fontSize: 14, lineHeight: 1.6 }}>
                <a href={settings?.youtubeUrl || 'https://www.youtube.com/@ishikabiswas_nrtya'} style={{ color: 'var(--sand)', opacity: 0.6, textDecoration: 'none' }}>
                  YouTube · @ishikabiswas_nrtya
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
