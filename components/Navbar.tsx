'use client'
import React from 'react'
import { MdHomeFilled } from "react-icons/md";
import SearchInput from './SearchInput';
import Link from 'next/link';


const Navbar = () => {

  return (
      <div className='absolute w-full flex items-center justify-between sm:flex pt-3 px-4 z-30 bg-gradient-to-b from-black '>
      <Link href={'/'} >
      <h1 className='text-red-600 hidden sm:block font-bold cursor-pointer text-5xl'>Nextflix</h1>
        <div className='border-2 rounded-full p-2 sm:hidden'>
        <MdHomeFilled
        size={20}
         />
        </div>
      </Link>
     <div className='flex justify-center items-center '>
  <SearchInput/>
    </div>
    </div>
    
  )
}

export default Navbar
