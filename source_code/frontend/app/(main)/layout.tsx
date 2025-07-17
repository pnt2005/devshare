import '@/app/globals.css'
import Navbar from '@/components/layout/Navbar'
import { UserProvider } from '@/contexts/UserContext'
import { Toaster } from 'react-hot-toast'
import Sidebar from '@/components/layout/Sidebar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div>
        <Sidebar />
        <main className="flex-1 overflow-y-auto pl-56">{children}</main>
      </div>
    </>
  )
}
