'use client'
import React, {  useEffect, useState } from 'react'
import { createImageUrl } from '@/services/apiEndpoint';
import { useRouter } from 'next/navigation';
import { UserAuth } from '@/context/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { TbDeviceWatchPlus } from 'react-icons/tb';
import { CiPlay1 } from 'react-icons/ci';
import { FaPlay } from 'react-icons/fa6';
import { MdOutlineWatchLater } from 'react-icons/md';

const Hero = ({data}:{data:any}) => {  
  const router = useRouter();
  const VideoHandler =()=>{
    router.push(`/video?tmdbId=${id}&type=movie`)
  }
  const {title,name,first_air_date,title_english, backdrop_path, release_date,images,synopsis, overview,id} = data;

  const {user}=UserAuth();

  const [like, setLike] = useState(false); 
  
  const markWatchLater = async()=>{
    const userEmail = user?.email;
    if (userEmail) {
      const userDoc = doc(db,'users',userEmail)
      setLike(!like)
      await updateDoc(userDoc,{
        watchLater:arrayUnion({...data}),
      })
    }else(alert("login karo"))
  }



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
              className='flex items-center gap-1 bg-white transition-all duration-200 text-black py-2 px-5 mr-3 rounded-full hover:bg-red-600 hover:text-white'>
                <FaPlay />
                Play
              </button>
              <button 
              onClick={markWatchLater}
              className='flex items-center gap-1 border transition-all duration-200 text-white py-2 px-5 mr-3 rounded-full hover:bg-white/10'>
              <MdOutlineWatchLater />
              Watch Later
              </button>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Hero

