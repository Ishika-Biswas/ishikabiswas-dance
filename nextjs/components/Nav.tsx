'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '22px 56px',
      background: scrolled ? 'rgba(242,237,228,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(140,110,75,0.12)' : 'none',
      transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
    }}>
      <Link href="/" style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 19, fontWeight: 400,
        letterSpacing: '0.06em',
        color: scrolled ? 'var(--earth)' : 'var(--cream)',
        textDecoration: 'none',
        transition: 'color 0.4s',
      }}>
        Ishika Biswas
      </Link>
      <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
        {[
          { label: 'NADI', href: '/#nadi' },
          { label: 'About', href: '/about' },
          { label: 'Work', href: '/work' },
          { label: 'Contact', href: '/contact' },
        ].map(({ label, href }) => (
          <li key={label}>
            <Link href={href} style={{
              fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: scrolled ? 'var(--earth)' : 'var(--cream)',
              textDecoration: 'none', opacity: 0.6,
              transition: 'opacity 0.2s, color 0.4s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
