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
 }
 interface Data {
  results?: Movie[];
 }
 

const MovieRow = ({data,title}:{data:Data,title:string}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
    
  return (
    <>
    <h1 className='font-bold md:text-2xl text-3xl p-4 capitalize'>
      {title}
    </h1>
    <div className='relative flex items-center group'>
      <MdChevronLeft
      size={40}
      className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'
      onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
      />
      <MdChevronRight
       size={40}
       className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'
       onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
       />
      <div
       ref={scrollRef}
      className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
       {data.results?.map((movie:Movie) =>
       (
        <MovieItem key={movie.id} movie={movie} />
       ),  
       )}
      </div>
    </div>    
    </>

  )
}

export default MovieRow
