import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Ishika Biswas — Kathak Choreographer & Performer',
  description: 'Kathak choreographer and performer based in Cardiff, Wales. Currently developing NADI — an outdoor Kathak-contemporary ensemble performance exploring rivers, memory, and the human-water relationship.',
  openGraph: {
    title: 'Ishika Biswas — Kathak Choreographer',
    description: 'Twenty years inside the form. Now taking it outdoors.',
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
