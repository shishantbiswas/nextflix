import React, { useEffect, useState } from 'react'
import { createImageUrl } from '../services/apiEndpoint'
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { AiFillPlayCircle } from "react-icons/ai";
import axios from 'axios';
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
  tmdb_id?:number;
 }
 

const MovieItem = ({movie}:{movie:Movie}) => {  
    const {title,backdrop_path,poster_path,id,imdb_id,tmdb_id,release_date}=movie
    const [urlId, setUrlId] = useState()
    const [video, setVideo] = useState()

    
  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?i=${imdb_id}&apikey=3301b064`).then((res)=>{
    if(urlId==imdb_id){
      setVideo(res.data.Poster)
    }  
    setUrlId(res.data.imdbID)     
    })
  }, [])

  const router = useRouter();
  const VideoHandler =()=>{
    router.push(`/video?id=${imdb_id ? (imdb_id) : (id)}`)
  }   

  return (
    
    <div className='relative min-h-[180px] w-[190px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2 transition-all hover:w-[300px] lg:hover:w-[360px]'>
     <img
     className=' md:w-full lg:w-full  h-[200px] object-cover object-top'
     src={video ? (video):((createImageUrl(backdrop_path ?? poster_path ,"w500")))} alt={title}/>
     <div className='absolute h-full top-0 left-0 w-full transition-all bg-black/80 opacity-0 hover:opacity-100 px-3'>
        <p
        className='whitespace-normal sm:text-sm md:text-2xl  flex justify-start pt-3 items-start h-full '
        >{title}</p>

        <button
         onClick={VideoHandler}
         className='absolute bottom-4 left-4 flex items-center justify-center'>
         <AiFillPlayCircle 
         size={50}
         /><h1 className='pl-2'>Play Now</h1>
         </button>
     </div>
    </div>
  )
}

export default MovieItem
