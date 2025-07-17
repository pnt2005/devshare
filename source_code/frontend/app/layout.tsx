import { UserProvider } from '@/contexts/UserContext'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevShare Lite',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="winter">
        <body className={`${inter.className} min-h-screen`}>
            <Toaster position="top-center" reverseOrder={false} />
            <UserProvider>
                {children}
            </UserProvider>
        </body>
    </html>
  )
}
