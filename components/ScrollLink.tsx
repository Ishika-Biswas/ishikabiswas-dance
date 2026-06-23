'use client'

export default function ScrollLink({ href, children, style }: { href: string; children: React.ReactNode; style?: React.CSSProperties }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}
