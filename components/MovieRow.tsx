'use client'

import React, { useRef } from 'react'
import MovieItem from './MovieItem'
import{MdChevronLeft,MdChevronRight}from 'react-icons/md'

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  images:[{}]
 }
 interface Data {
  results?: Movie[];
  data:[];
 }
 

const MovieRow = ({data,title}:{data:Data,title:string}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
 // console.log(data);
  
    
  return (
    <>
    <div className='w-screen'>
    <div className='flex items-center /lg:pr-[21%]'>
    <h1 className='font-bold text-2xl md:text-5xl p-4 capitalize'>
      {title} 
    </h1>
    <div className='flex items-center gap-2 justify-center'>
      <MdChevronLeft
      size={40}
      className='bg-white rounded-full  left-2 opacity-80 text-gray-700 z-10  cursor-pointer'
      onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
      />
      <MdChevronRight
       size={40}
       className='bg-white rounded-full  right-2 opacity-80 text-gray-700 z-10  cursor-pointer'
       onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
       />
      </div>
    </div>
      <div
       ref={scrollRef}
      className='h-fit overflow-x-scroll whitespace-nowrap lg:w-[79%] w-[95%] scroll-smooth scrollbar-hide '>
       {data.results?.map((movie:any) =><MovieItem key={movie.id} movie={movie} />)}
       {data.data ? data.data.map((anime:any)=><MovieItem key={anime.id} movie={anime} />)
       :null}
      </div>
      </div>
    </>

  )
}

export default MovieRow
