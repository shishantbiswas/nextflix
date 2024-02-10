'use client'

import React, { useRef } from 'react'
import { usePathname } from 'next/navigation'
import AnimeItem from './AnimeItem';

export default function AnimeRow  ({data}:{data:any}) {
  const scrollRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname()


  return (
    <>
    <div className='w-[100%] lg:flex lg:flex-col justify-center '>
    <div className='flex items-center  justify-between w-[79%]'>
    <h1 className='font-bold text-2xl md:text-5xl p-4 capitalize'>
      Anime List
    </h1>
    <p className='font-normal'>Content not Available In search <strong>BETA TESTING NEW API</strong></p>
      </div>
      <div
       ref={scrollRef}
      className={`h-fit overflow-x-scroll scroll-smooth scrollbar-hide lg:w-[98%]  ${pathname=='/' && "w-[95%]  whitespace-nowrap" }`}>
        <div className={'grid grid-cols-5 grid-row-1 '}>
       {data?.map((movie:any,index:number) =>
       <div key={index}>
        <AnimeItem  movie={movie} />
       </div>
       )}
       </div>
        </div>
      </div>
    </>

  )
}

