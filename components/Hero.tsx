'use client'
import React, {  useState } from 'react'
import Navbar from './Navbar';
import { createImageUrl } from '@/services/apiEndpoint';
import { useRouter } from 'next/navigation';

interface DataProps {
  data: any
 }

const Hero = ({data}:DataProps) => {  
  const router = useRouter();
  const openMovie = () =>{
    router.push(`/video?id=${id}`)
  }
  const {title, backdrop_path, release_date, overview,id} = data;
  return(
    <>
    <div className='w-full h-[550px] lg:h-[750px] scrollbar-hide '>
    
      <div className='w-full h-full '>
        <div className='absolute w-full h-[550px] lg:h-[750px] bg-gradient-to-r from-black'/>
          <img 
          className=' w-full h-full object-cover object-top'
          src={createImageUrl(backdrop_path,"original")} 
          alt={title} />
          <div
          className='absolute w-full top-[20%] lg:top-[35%] p-4 md:p-8'>
            <h1 
            className='md:text-5xl text-3xl font-semibold'
            >{title}</h1>
            <div
            className='mt-4 mb-4'>
              <button 
              onClick={openMovie}
                className='bg-white text-black py-2 px-5 mr-3 rounded-full hover:bg-red-600 hover:text-white'>
                Play
              </button>
            </div>
            <p 
            className='text-gray-400 text-sm'
            >{release_date}
            </p>
            <p 
            className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
              {overview}
              </p>
          </div>
      </div>
    </div>
    </>
  )
}

export default Hero

