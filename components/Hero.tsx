'use client'
import React, {  useEffect, useState } from 'react'
import { createImageUrl } from '@/services/apiEndpoint';
import { useRouter } from 'next/navigation';

interface DataProps {
  data: any
 }

const Hero = ({data}:DataProps) => {  
  const router = useRouter();
  const VideoHandler =()=>{
    router.push(`/video?tmdbId=${id}&type=movie`)
  }
  const {title,name,first_air_date,title_english, backdrop_path, release_date,images,mal_id,trailer,synopsis, overview,id} = data;

  // console.log(data);
  
  const openTrailer = () => {
    window.open(trailer.url, "_blank");
 };

  return(
    <>
    <div className='w-full  h-[550px] lg:h-[750px] scrollbar-hide overflow-hidden'>
      <div className='w-full h-full '>
        <div className='absolute w-screen h-[550px] lg:h-[750px] bg-gradient-to-t from-[#151515]'/>
          <img 
          className=' w-full h-full  object-cover object-top'
          src={ images ? images.webp.large_image_url : createImageUrl(backdrop_path,"original")} 
          alt={title ? title : name } />
          <div
          className='absolute w-[50%] lg:w-[40%] text-end top-[40%] lg:top-[35%] right-0 p-4 md:p-8'>
            <h1 
            className='md:text-6xl text-4xl font-semibold'
            >{title_english ? title_english : (title?title:name) }</h1>
            <p 
            className='text-gray-400 mt-2 text-sm'
            >{release_date ? release_date : first_air_date}<br/>
            </p>
            <p 
            className='w-full line-clamp-4  text-gray-200'>
              {overview? overview:synopsis}
              </p>
            <div
            className='mt-4 mb-4 flex justify-end items-center'>
              <button 
              onClick={VideoHandler}
              className='bg-white transition-all duration-200 text-black py-2 px-5 mr-3 rounded-full hover:bg-red-600 hover:text-white'>
                Play
              </button>
              {mal_id ? (
                 <p
                 className='border-white border transition-all duration-200 py-2 px-5 mr-3 rounded-full hover:bg-red-600 hover:text-white'
                 onClick={openTrailer}
                 >Watch Trailer</p>
              ):null}
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Hero

