import Navbar from '../../components/Navbar'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'],weight:['100','200','300','400','500','600','700','800','900']})


export const metadata: Metadata = {
  title: 'Watch Later - Nextflix',
  description: 'Nextflix clone built with Next.js and Tailwind CSS',
}

export default function WatchLaterAuth({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <html lang="en">
      <body className={poppins.className}>
      <div className='lg:flex w-screen'>
            <Navbar/>
            <div className='w-[100vw]'>
          {children}
            </div>
          </div>
        </body>
    </html>
  )
}
