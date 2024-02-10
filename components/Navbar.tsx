'use client'
import React from 'react'
import SearchInput from './SearchInput';
import Link from 'next/link';
import {  usePathname, useSearchParams } from 'next/navigation';
import { VscArrowCircleRight } from "react-icons/vsc";
import { SiAppletv, SiNetflix, SiPrimevideo } from 'react-icons/si';
import { TbBrandDisney } from 'react-icons/tb';
import { IoHome } from 'react-icons/io5';


const Navbar = () => {
const pathname = usePathname()
const params = useSearchParams()

const isAnime = pathname.split('/')[1]

const isAcitveNextPage = pathname + '/' +params.get('endpointName')


 return (
      <div
      className={`flex justify-between items-center lg:items-start lg:flex-col lg:py-3 px-4 bg-gray-900 
       rounded-br-[16px]  py-3 overflow-hidden h-[70px] lg:h-screen w-screen lg:min-w-[300px] lg:w-[300px] 
        z-50 sticky top-0 border-4 border-l-0 border-t-0 border-gray-800
        ${pathname=='/video' ? 'hidden' :'block'}
      `}>

      <div className='flex lg:block items-center w-full'>
      <Link href={'/'} >
      <h1 
      className='text-red-600 font-semibold  transition-all duration-200 mb-2 lg:mb-4  cursor-pointer text-5xl '>
        <span className='hidden md:block '>Nextflix</span>
        <span className='md:hidden'>N</span>
        </h1>
      </Link>
      <div className='flex lg:flex-col'>
        <Link href={'/'} 
        className={`text-xl flex items-center justify-between  lg:text-2xl py-2 rounded-lg mb-2  font-normal  transition-all duration-200 group overflow-hidden 
        ${pathname=='/' ? 'bg-gradient-to-r from-cyan-500 pl-6 to-blue-500 font-semibold opacity-100'
         :'hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100' }`}>Home 
          <span className={` block ${pathname=='/' ? "-translate-x-6 "
            :
            'group-hover:-translate-x-6 hidden group-hover:block translate-x-12 '}`}
            ><IoHome />
          </span>
        </Link> 

        {/* <Link href={'/anime/1'} 
        className={`text-xl flex items-center justify-between  lg:text-2xl hover:pl-6 py-2 rounded-lg mb-2  font-normal hover:font-semibold
        transition-all duration-200 group overflow-hidden 
        ${isAnime == 'anime' ? 'bg-gradient-to-r from-violet-600 pl-6 to-fuchsia-500 font-semibold opacity-100'
        :
        'hover:bg-gradient-to-r from-violet-600 hover:pl-6 to-fuchsia-500 opacity-70 hover:opacity-100'
       }`}
        >Anime 
        <span 
        className={` block ${isAnime== 'anime'  ? "-translate-x-6 ":'group-hover:-translate-x-6 hidden group-hover:block translate-x-12 '}`}
        ><VscArrowCircleRight/></span>
        </Link>  */}

        <Link href={'/nextpage?endpointName=popularMovies&pageNo=1&title=Popular+Movies&type=movie'} 
        className={`text-xl flex items-center justify-between  lg:text-2xl hover:pl-6 py-2 rounded-lg mb-2 font-normal hover:font-semibold
        transition-all duration-200 group overflow-hidden
        ${isAcitveNextPage=='/nextpage/popularMovies' ? 'bg-gradient-to-r from-green-700 pl-6 to-emerald-600  font-semibold opacity-100'
        :
        'hover:bg-gradient-to-r from-green-700 to-emerald-600 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100'}
        `}>Popular Movies
        <span 
        className={` block ${isAcitveNextPage== '/nextpage/popularMovies'  ? "-translate-x-6 ":'group-hover:-translate-x-6 hidden group-hover:block translate-x-12 '}`}
        ><VscArrowCircleRight/></span>
        </Link> 

        <Link href={'/nextpage?endpointName=animeMovie&pageNo=1&title=Anime+Movies&type=movie'} 
        className={`text-xl flex items-center justify-between  lg:text-2xl hover:pl-6 py-2 rounded-lg mb-2  font-normal hover:font-semibold
        
        transition-all duration-200 group overflow-hidden 
        ${isAcitveNextPage=='/nextpage/animeMovie' ? 'bg-gradient-to-r from-red-700 to-orange-500 pl-6  font-semibold  hover:opacity-100'
        :
        'hover:bg-gradient-to-r from-red-700 to-orange-500 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100'}
        `}>Anime Movies 
        <span 
        className={` block ${isAcitveNextPage== '/nextpage/animeMovie'  ? "-translate-x-6 ":'group-hover:-translate-x-6 hidden group-hover:block translate-x-12 '}`}
        ><VscArrowCircleRight/></span>
        </Link> 

        <h1 className='mt-2 text-md opacity-55'>Streaming Services</h1>
        <Link href={'/nextpage?endpointName=netflix&pageNo=1&title=Netflix&type=tv'} 
        className={`text-xl pl-2 border-l-[3px]  flex items-center justify-between  lg:text-2xl hover:pl-6 py-2 rounded-r-md   mb-2 font-normal hover:font-semibold
        
        transition-all duration-200 group overflow-hidden
        ${isAcitveNextPage=='/nextpage/netflix' ? 'bg-gradient-to-r from-red-700 to-red-500 font-semibold opacity-100  pl-6'
        :
        'hover:bg-gradient-to-r from-red-700 to-red-500 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100'}
        
        `}>Netflix 
        <span 
        className={` block ${isAcitveNextPage== '/nextpage/netflix'  ? "-translate-x-6 ":'group-hover:-translate-x-6 hidden group-hover:block translate-x-12 '}`}
        ><SiNetflix /></span>
        </Link> 

        <Link href={'/nextpage?endpointName=amazon&pageNo=1&title=Amazon&type=tv'} 
        className={`text-xl pl-2 border-l-[3px]  flex items-center justify-between  lg:text-2xl hover:pl-6 py-2 rounded-r-md   mb-2 font-normal hover:font-semibold
        transition-all duration-200 group overflow-hidde
        ${isAcitveNextPage=='/nextpage/amazon' ? 'bg-gradient-to-r from-blue-700 to-blue-400 pl-6 font-semibold opacity-100'
        :
        'hover:bg-gradient-to-r from-blue-700 to-blue-400 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100'}
        `}>Amazon 
        <span className={` block ${isAcitveNextPage== '/nextpage/amazon'  ? "-translate-x-6 ":'group-hover:-translate-x-6 hidden group-hover:block translate-x-12 '}`}><SiPrimevideo fontSize={30} /></span>
        </Link> 

        <Link href={'/nextpage?endpointName=disneyPlus&pageNo=1&title=Disney+Hotstar&type=tv'} 
        className={`text-xl pl-2 border-l-[3px]  flex items-center justify-between  lg:text-2xl hover:pl-6 py-2 rounded-r-md   mb-2  font-normal hover:font-semibold
        transition-all duration-200 group overflow-hidden
        ${isAcitveNextPage=='/nextpage/disneyPlus' ? 'bg-gradient-to-r from-blue-600 to-blue-800 pl-6 font-semibold opacity-100'
        :
        ' hover:bg-gradient-to-r from-blue-600 to-blue-800 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100'}
        `}>Disney Hotstar 
        <span className={` block ${isAcitveNextPage== '/nextpage/disneyPlus'  ? "-translate-x-6 ":'group-hover:-translate-x-6 hidden group-hover:block translate-x-12 '}`}><TbBrandDisney /></span>
        </Link> 

        <Link href={'/nextpage?endpointName=appleTv&pageNo=1&title=Apple+TV&type=tv'} 
        className={`text-xl pl-2 border-l-[3px]  flex items-center justify-between  lg:text-2xl hover:pl-6 py-2 rounded-r-md   mb-2  font-normal hover:font-semibold
        transition-all duration-200 group overflow-hidden
        ${isAcitveNextPage=='/nextpage/appleTv' ? 'bg-gradient-to-r  from-gray-700 to-gray-400  pl-6 font-semibold opacity-100'
        :
        'hover:bg-gradient-to-r  from-gray-700 to-gray-400 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100'}
        `}>Apple TV 
        <span className={` block ${isAcitveNextPage== '/nextpage/appleTv'  ? "-translate-x-6 ":'group-hover:-translate-x-6 hidden group-hover:block translate-x-12 '}`}><SiAppletv /></span>
        </Link> 
      </div>
      </div>
    <div className={`${pathname=='/search' && 'hidden'}`}>
    <SearchInput />
    </div>
    </div>
    
  )
}

export default Navbar
