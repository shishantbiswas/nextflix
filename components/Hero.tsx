'use client'
import React, { useState } from 'react'
import { createImageUrl } from '../services/apiEndpoint';
import { useRouter } from 'next/navigation';
import { UserAuth } from '../context/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { FaPlay } from 'react-icons/fa6';
import { MdOutlineWatchLater } from 'react-icons/md';
import {motion} from 'framer-motion'
import { FaCheckCircle, FaPause } from 'react-icons/fa';
import { IoIosPause } from 'react-icons/io';

const Hero = ({data}:{data:any}) => {  
  const router = useRouter();
  const {title,name,first_air_date,title_english, backdrop_path, release_date,images,synopsis, overview,id} = data;

  const {user}=UserAuth();

  const [like, setLike] = useState(false);
const [PlayText, setPlayText] = useState("Play");  
  const markWatchLater = async()=>{
    const userEmail = user?.email;
    const userVerified = user?.emailVerified
    if (userEmail && userVerified) {
      const userDoc = doc(db,'users',userEmail)
      setLike(!like)
      await updateDoc(userDoc,{
        watchLater:arrayUnion({...data,type:'movie'}),
      })
    }else(alert("Login to save Movies and Shows to Watch Later"))
  }

  const playHandler = ()=>{
    setPlayText("Playing")
    router.push(`/video/movie/${id}`)
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
          className='absolute sm:w-[70%] lg:w-[40%] text-end top-[40%] lg:top-[35%] right-0 p-4 md:p-8'>
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
            className='mt-4  mb-4 flex flex-col sm:gap-0 gap-2 sm:flex-row justify-end items-center text-white'>
              <motion.button
              initial={{color:'black'}} 
              whileHover={{color:'white', transition:{duration:3}}}
              onClick={playHandler}
              className='flex text-sm w-[90%] hover:bg-red-600 sm:w-fit items-center gap-1 bg-white transition-all duration-200 text-black py-2 px-5 sm:mr-3 rounded-full '>
               {PlayText=='Play' ? <FaPlay /> : <IoIosPause />}           
                  {PlayText}
              </motion.button>
              
              <button 
              onClick={markWatchLater}
              className='flex text-sm w-[90%]  sm:w-fit items-center gap-1 border transition-all duration-200 text-white py-2 px-5 sm:mr-3 rounded-full hover:bg-white/10'>
              {like==true ? <FaCheckCircle /> : <MdOutlineWatchLater />}
                {like ? "Saved" : "Watch Later"}
              </button>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Hero

