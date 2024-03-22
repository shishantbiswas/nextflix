import React, { useEffect, useState } from 'react'
import { createImageUrl } from '../services/apiEndpoint'
import { usePathname, useRouter } from 'next/navigation';
import { UserAuth } from '../context/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { FaPlay } from 'react-icons/fa6';
import { MdOutlineWatchLater } from 'react-icons/md';
import { IoIosPause } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';


const MovieItem = ({movie,type}:{movie:any,type:string}) => {  
    const {title,backdrop_path,overview,first_air_date,url,title_english,synopsis,poster_path,imdb_id,id,image,release_date,name}=movie
   
  const pathname = usePathname()
  const router = useRouter();
  
  const VideoHandler =()=>{
    setPlayClicked(true)
      router.push(`/video/${type}/${id}`)
  }

  const {user} = UserAuth()
const [like, setLike] = useState(false); 
const [playClicked, setPlayClicked] = useState(false);

  
  const markWatchLater = async()=>{
    const userEmail = user?.email;
    if (userEmail) {
      const userDoc = doc(db,'users',userEmail)
      setLike(!like)
      await updateDoc(userDoc,{
        watchLater:arrayUnion({...movie,type:type}),
      })
    }else(alert("login karo"))
  }
  return (
    
    <div className={`relative
     hover:shadow-[0px_0px_15px_rgb(95,95,95,1)]   
     inline-block rounded-lg overflow-hidden  m-2 transition-all duration-200   ${pathname=='/' && 'w-[180px] lg:w-[200px] 2xl:w-[250px] 2xl:hover:w-[270px]  lg:h-[300px] xl:h-[400px]'}`}>
     <img
     className={`lg:w-full object-cover object-center ${ pathname=='/nextpage' ? '':'lg:h-[300px] xl:h-[400px]'}`}
     src={image? image : (createImageUrl(poster_path ? poster_path :  backdrop_path ,"w500"))} 
     alt={title}/>
     <div 
     className='absolute h-full top-0 left-0 w-full transition-all bg-black/80 backdrop-blur-md opacity-0 hover:opacity-100 p-3  xl:pl-3 group'>
        <p
        className={` whitespace-normal font-semibold mb-2 leading-[16px] transform duration-[300ms]  
        ${pathname=='/nextpage' ? ' group-hover:leading-[28px] text-[20px] lg:text-[28px]' :' group-hover:lg:leading-[36px] lg:text-[26px] xl:text-[32px] leading-[20px] text-[20px]'} 
         `}
        >{title ? title : name}</p>
        <p 
        className='text-[13px] md:text-md opacity-10  duration-500 group-hover:opacity-70 '>{release_date?release_date:first_air_date}</p>
        <p 
        className=' whitespace-normal line-clamp-4  duration-500 group-hover:opacity-70 
          text-[15px] pt-1 opacity-10'>{overview ? overview : synopsis}</p>

         <button
         onClick={markWatchLater}
         className='absolute bottom-4 hover:bg-white/30 rounded-lg px-2 py-0.5  flex items-center justify-center xl:opacity-0 group-hover:opacity-100 delay-600 transition-all transform duration-[500ms]'>
          {like==true ? <FaCheckCircle className='text-2xl' /> : <MdOutlineWatchLater className='text-2xl' />}

         <h1 className='pl-2 text-lg lg:text-2xl font-medium'>
         {like ? "Saved" : "Watch Later"}
         </h1>
         </button>
        <button
         onClick={VideoHandler}
         className='absolute bottom-14 hover:bg-white/30 rounded-lg px-2 py-0.5  flex items-center justify-center xl:opacity-0 group-hover:opacity-100 delay-600 transition-all transform duration-[500ms]'>
                         {playClicked==false ? <FaPlay className='text-2xl'/> : <IoIosPause className='text-2xl' />}           
         <h1 className='pl-2 text-lg lg:text-2xl font-medium'>
              {playClicked==false ? (type=="movie" ? "Play Movie" : "Play TV Show") : "Playing"}
          </h1>
         </button>
     </div>
    </div>
  )
}

export default MovieItem
