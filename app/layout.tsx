import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MD Siam Islam - Messenger Bot',
  description: 'Facebook Messenger Bot for MD Siam Islam Page',
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
