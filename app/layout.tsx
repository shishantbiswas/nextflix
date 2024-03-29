import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import { AuthContextProvider } from '../context/AuthContext'

const poppins = Poppins({ subsets: ['latin'],weight:['100','200','300','400','500','600','700','800','900']})

export const metadata: Metadata = {
  title: 'Home - Nextflix',
  description: 'Nextflix clone built with Next.js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <html lang="en">
      <body className={poppins.className}>
        <AuthContextProvider>
          <div className='lg:flex w-screen'>
            <Navbar/>
            <div className='lg:w-[100%]'>
          {children}
            </div>
          </div>
        </AuthContextProvider>
        </body>
    </html>
  )
}
