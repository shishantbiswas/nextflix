'use client'
import React, {  useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

type DataProps = {
  data: {
    data: {
       title: string;
       image: string;
       category: []; 
       url: string; 
       id: number; 
       provider:string
      };
  }
 }

const ScrapeHero = ({data}:DataProps) => {  
  const router = useRouter();
  const VideoHandler =()=>{
    router.push(`/video?provider=${provider}&ref=${url}`)
  }
  const {title,image,category,url,id,provider} = data.data;

  // console.log(data);
  

  return(
    <>
    <div className='w-full  h-[550px] lg:h-[750px] scrollbar-hide overflow-hidden'>
      <div className='w-full h-full '>
        <div className='absolute w-full h-[550px] lg:h-[750px] bg-gradient-to-t from-[#151515]'/>
          <img 
          className=' w-full h-full  object-cover object-top'
          src={image} 
          alt={title} />
          <div
          className='absolute w-[40%] text-end top-[40%] lg:top-[35%] right-0 p-4 md:p-8'>
            <h1 
            className='md:text-6xl text-4xl font-semibold'
            >{title}</h1>
            <p 
            className='text-gray-400 mt-2 text-sm'
            >
            {category.map((cat, index) => (
            <p key={index}>{cat}</p>
            ))}  
            <br/>
            </p>
            <div
            className='mt-4 mb-4 flex justify-end items-center'>
              <button 
              onClick={VideoHandler}
              className='bg-white transition-all duration-200 text-black py-2 px-5 mr-3 rounded-full hover:bg-red-600 hover:text-white'>
                Play
              </button>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default ScrapeHero

