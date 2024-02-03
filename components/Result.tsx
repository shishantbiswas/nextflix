import React from 'react'
import { createImageUrl } from '../services/apiEndpoint'
import { AiFillPlayCircle } from "react-icons/ai";
import { useRouter } from 'next/navigation';


const MovieItem = ({movie}:{movie:any}) => {

  const navigate = useRouter();
    const {Title,title,backdrop_path,poster_path,Poster,id,release_date}=movie;

    const handleView=()=>{
      navigate.push(`video/?tmdbId=${id}&type=tmdb`)
    }

  return (
    <>
    <div className='relative min-h-[180px] min-w-[300] align-middle  lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2
     transition-all'>
     <img
     className='sm:w-[300px] md:w-full lg:w-[370px]  h-[200px] object-cover object-top'
     src={!Poster ? (createImageUrl(backdrop_path ?? poster_path ,"w500")):(Poster)} alt={!Title ? (title):(Title)}/>

     <div className='absolute h-full top-0 left-0 w-full transition-all bg-black/80 opacity-0 hover:opacity-100 px-3'>
        <p
        className='whitespace-normal text-md md:text-sm flex justify-start pt-3 items-start h-full font-nsans-bold flex-col'
        >{!Title ? (title):(Title)}<br/>
        <span className=' font-nsans-light'>{release_date}</span>
        </p>
        <button
        onClick={handleView}
         className='absolute bottom-4 left-4 flex items-center justify-center'>
         <AiFillPlayCircle 
         size={50}
         /><h1 className='pl-2'>Play Now</h1>
         </button>
     </div>
    </div>
    </>
  )
}

export default MovieItem;
