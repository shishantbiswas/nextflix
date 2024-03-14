'use client'

import React, { useRef } from 'react'
import MovieItem from './MovieItem'
import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { VscArrowCircleLeft, VscArrowCircleRight } from 'react-icons/vsc';



const MovieRow = ({data,title,type,endpointName}:{data:any,title:string,type:string,endpointName:string}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
const router  = useRouter()
const pathname = usePathname()
const params =useSearchParams()


  return (
    <>
    <div className='w-[100%] lg:flex lg:flex-col justify-center '>
    <div className='sm:flex items-start sm:items-center  justify-between w-[79%]'>
    <h1 className='font-bold text-md sm:text-3xl lg:text-5xl p-4 capitalize'>
      {!params.get('title') ? title : params.get('title')} 
    </h1>
      {pathname=='/'&&
      <>
    <div className='flex items-center sm:gap-2 justify-between sm:justify-center pl-2 pr-6'>
    {pathname=='/' && <button 
        onClick={()=>router.push(`/nextpage?endpointName=${endpointName}&pageNo=2&title=${title}&type=${type}`)} 
        className=' font-medium text-sm lg:text-xl rounded-full hover:text-black px-2 py-1 transition-all duration-200 hover:bg-white  '>Show More</button>}  
        <div className='flex'>
        <VscArrowCircleLeft
      className='
      rounded-full hover:text-gray-100 transition-all duration-150 left-2 opacity-80 text-gray-400 lg:text-[35px] text-3xl hover:text-[50px] sm:w-[50px] cursor-pointer'
      onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
      />
      <VscArrowCircleRight
       className='lg:text-[35px] text-3xl hover:text-[50px] sm:w-[50px]
       rounded-full hover:text-gray-100 transition-all duration-150 right-2 opacity-80 text-gray-400   cursor-pointer'
       onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
       />
        </div>
        </div>
      </>}
      </div>
      <div
       ref={scrollRef}
      className={`h-fit overflow-x-scroll scroll-smooth scrollbar-hide  ${pathname=='/' && " whitespace-nowrap" }`}>
        <div className={`${pathname=='/nextpage' && 'grid pr-4 lg:pr-0 grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 grid-row-1 '}`}>
       {data.results?.map((movie:any) =>
       <MovieItem type={type}  key={movie.id} movie={movie} />
       )}
       </div>
        </div>
      </div>
    </>

  )
}

export default MovieRow
