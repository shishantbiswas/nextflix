import type { Metadata } from 'next'
import { AuthContextProvider } from '../../context/AuthContext'

export const metadata: Metadata = {
  title: 'Sign In - Nextflix',
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
