import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='mt-12 border-t-4 pt-8 px-3 pb-8 capitalize'>
      <Link href={'/'}
      className=' px-2 py-2 font-bold rounded-xl hover:border hover:text-black hover:bg-white'
      // todo href
      >Home</Link>
    </div>
  )
}

export default Footer
