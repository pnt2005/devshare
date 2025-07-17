import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { Inter } from 'next/font/google'
import { UserProvider } from '@/contexts/UserContext'
import { Toaster } from 'react-hot-toast'
import Sidebar from '@/components/Sidebar'

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
          <Navbar />
          <div>
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6 pl-56">{children}</main>
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
