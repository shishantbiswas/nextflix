import React, { useEffect, useState } from 'react'
import { createImageUrl } from '../services/apiEndpoint'
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { AiFillPlayCircle } from "react-icons/ai";
import { useRouter } from 'next/navigation';

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
  imdb_id?:number;
  name?:string;
  first_air_date?:string
  images?:{
    webp?:{
      large_image_url?:string;
    }
  }
  synopsis?:string;
  mal_id?:number;
  title_english?:string;
 }
 

const MovieItem = ({movie}:{movie:Movie}) => {  
    const {title,backdrop_path,overview,first_air_date,mal_id,title_english,synopsis,poster_path,imdb_id,id,images,release_date,name}=movie
//    console.log(movie);
    
  const router = useRouter();
  const VideoHandler =()=>{
    router.push(`/video${mal_id ? `?malId=${mal_id}&type=mal` : `?tmdbId=${id}&type=tmdb`}`)
  }

  return (
    
    <div className='relative w-[200px] lg:w-[300px] 2xl:w-[350px] 2xl:hover:w-[380px] inline-block rounded-lg overflow-hidden cursor-pointer m-2 transition-all duration-200  hover:outline outline-white/50  '>
      {/* todo rotate border animate */}
     <img
     className=' lg:w-full lg:h-[400px] xl:h-[540px] object-cover object-center'
     src={!mal_id ? ((createImageUrl(poster_path ,"w500"))):images?.webp?.large_image_url} alt={title}/>
     <div className='absolute h-full top-0 left-0 w-full transition-all bg-black/80 backdrop-blur-md opacity-0 hover:opacity-100 p-4
     lg:p-6 '>
        <p
        className='whitespace-normal text-lg md:text-2xl  flex justify-start items-start font-semibold lg:text-4xl mb-2'
        >{title ? (title?title : title_english) : name}</p>
        <p className='text-[13px] md:text-md opacity-70'>{release_date?release_date:first_air_date}</p>
        <p className=' whitespace-normal line-clamp-4
         xl:line-clamp-[10] text-[15px] pt-1 opacity-70'>{overview ? overview : synopsis}</p>
        <button
         onClick={VideoHandler}
         className='absolute bottom-4 left-4 flex items-center justify-center'>
         <AiFillPlayCircle 
         size={40}
         /><h1 className='pl-2 text-xl font-medium'>Play Now</h1>
         </button>
     </div>
    </div>
  )
}

export default MovieItem
