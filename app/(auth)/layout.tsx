import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { AuthContextProvider } from '@/context/AuthContext'

const poppins = Poppins({ subsets: ['latin'],weight:['100','200','300','400','500','600','700','800','900']})

export const metadata: Metadata = {
  title: 'Nextflix',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
        <AuthContextProvider>
          <div className='lg:flex w-screen'>
          {children}
          </div>
        </AuthContextProvider>
  )
}
