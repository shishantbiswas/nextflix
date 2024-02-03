'use client'
import React from 'react'
import SearchInput from './SearchInput';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { VscArrowCircleRight } from "react-icons/vsc";


const Navbar = () => {
const pathname = usePathname()
let styles = {};
if(pathname=='/video'){
    styles={
      backgroundColor:''
    }
}else if(pathname==''){

}
 return (
      <div
      style={styles}
      className='flex justify-between items-center lg:items-start lg:flex-col lg:py-3 px-4 bg-gray-900 
       rounded-r-[16px] overflow-hidden  h-[70px] lg:h-screen w-screen lg:min-w-[300px] lg:w-[300px] 
        z-50 sticky top-0 
       '>
      <div className='flex lg:block items-center w-full'>
      <Link href={'/'} >
      <h1 
      className='text-red-600 hover:font-semibold hover:text-6xl transition-all duration-200 mb-2 hover:mb-6 cursor-pointer text-5xl'>
        <span className='hidden md:block'>Nextflix</span>
        <span className='md:hidden'>N</span>
        </h1>
      </Link>
      <div className='flex lg:flex-col '>
        <Link href={'/'} 
        className='text-xl flex items-center justify-between  lg:text-2xl hover:pl-6 py-2 rounded-lg mb-2 opacity-70 hover:opacity-100 font-normal hover:font-semibold
        hover:bg-gradient-to-r from-cyan-500 to-blue-500
        transition-all duration-200 group overflow-hidden '>Home 
        <span className='hidden group-hover:block translate-x-12 group-hover:-translate-x-6  '><VscArrowCircleRight/></span>
        </Link>
        <Link
        className='text-xl flex items-center justify-between lg:text-2xl hover:pl-6 py-2 rounded-lg mb-2 opacity-70 hover:opacity-100 font-normal hover:font-semibold
        hover:bg-gradient-to-r from-blue-500 to-violet-500
        transition-all duration-200 group overflow-hidden'
        href={'/anime'}>Anime
        <span className='hidden group-hover:block translate-x-12 group-hover:-translate-x-6  '><VscArrowCircleRight/></span>
        </Link>
        <Link
        className='text-xl flex items-center justify-between lg:text-2xl hover:pl-6 py-2 rounded-lg mb-2 opacity-70 hover:opacity-100 font-normal hover:font-semibold 
        hover:bg-gradient-to-r from-violet-500 to-fuchsia-500
        transition-all duration-200 group overflow-hidden'
        href={'/animedekho'}>Anime Dekho
        <span className='hidden group-hover:block translate-x-12 group-hover:-translate-x-6  '><VscArrowCircleRight/></span>
        </Link>     
      </div>
      </div>
    <SearchInput />
    </div>
    
  )
}

export default Navbar
