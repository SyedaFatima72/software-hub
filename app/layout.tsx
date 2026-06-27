import type { Metadata } from 'next'
import  './globals.css'

export const metadata: Metadata = {
  title: 'Software Hub - Template Marketplace',
  description: 'Explore our premium collection of website & software templates.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}