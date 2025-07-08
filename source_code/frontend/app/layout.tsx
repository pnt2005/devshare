import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { Inter } from 'next/font/google'
import { UserProvider } from '@/contexts/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevShare Lite',
  description: 'Diễn đàn chia sẻ kiến thức IT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" data-theme="winter">
      <body className={inter.className}>
        <UserProvider>
          <Navbar/>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
