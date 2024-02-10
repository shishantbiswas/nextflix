import React from 'react'
import { createImageUrl } from '../services/apiEndpoint'
import { AiFillPlayCircle } from "react-icons/ai";
import { usePathname, useRouter } from 'next/navigation';


export default function AnimeItem  ({movie}:{movie:any})  {  
    const {title,episode,plot,thumbnail,type,year,genres,embed_url}=movie
   
   const pathname = usePathname()

  const router = useRouter();


  return (
    
    <div className={`relative
     hover:shadow-[0px_0px_15px_rgb(95,95,95,1)]   
     inline-block rounded-lg overflow-hidden cursor-pointer m-2 transition-all duration-200   ${pathname=='/' && 'w-[150px] lg:w-[200px] 2xl:w-[250px] 2xl:hover:w-[270px]  lg:h-[300px] xl:h-[400px]'}`}>
     <img
     className={`lg:w-full object-cover object-center ${ pathname=='/nextpage' || pathname=='/anime' ? '':'lg:h-[300px] xl:h-[400px]'}`}
     src={thumbnail} 
     alt={title}/>
     <div 
     className='absolute h-full top-0 left-0 w-full transition-all bg-black/80 backdrop-blur-md opacity-0 hover:opacity-100 p-3  xl:pl-3 group'>
        <p
        className={` whitespace-normal font-semibold mb-2 leading-[16px] transform duration-[300ms]  ${pathname=='/nextpage' ? 'text-[20px] group-hover:leading-[28px]' :'text-[36px] group-hover:leading-[36px]'}  `}
        >{title}</p>
        <p 
        className='text-[13px] md:text-md opacity-10  duration-500 group-hover:opacity-70 '>{year}</p>
        <p 
        className=' whitespace-normal line-clamp-4  duration-500 group-hover:opacity-70 
          text-[15px] pt-1 opacity-10'>{plot}</p>
        <button
         onClick={()=>console.log('lololol')}
         className='absolute bottom-4 left-4 flex items-center justify-center xl:opacity-0 group-hover:opacity-100 delay-600 transition-all transform duration-[500ms]'>
         <AiFillPlayCircle 
         size={40}
         /><h1 className='pl-2 text-xl font-medium'>Play Now</h1>
         </button>
     </div>
    </div>
  )
}

