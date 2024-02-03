'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaCircleInfo } from 'react-icons/fa6';
import { IoIosCloseCircle } from 'react-icons/io';

const Video = () => {
    const params = useSearchParams()
    
    const apiSrc = "https://vidsrc.to/embed/movie/"
    const twoEmbedApi = "https://www.2embed.cc/embed/"
    const superApi = 'https://multiembed.mov/?video_id='
    const smashystream ='https://embed.smashystream.com/playere.php?tmdb='
    const key = process.env.NEXT_PUBLIC_TMDB_KEY
    
    const [selectedOption, setSelectedOption] = useState('Vidsrc');
    const [movie, setMovie] = useState(apiSrc + params.get('tmdbId'))
    const [title, setTitle] = useState('')
    const [rating, setRating] = useState()
    const [date, setDate] = useState()
    const [modal,setModal]=useState(false)
  //  console.log(movie);


useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${params.get('tmdbId')}?api_key=${key}`).then((res)=>{
        if(res.data.id == params.get('tmdbId') ){
        setTitle(res.data.title);
        setDate(res.data.release_date);
        setRating(res.data.overview);
        }})
    }, [movie])
    
    const handleSubmit = () => {
       //event.preventDefault();
       if(selectedOption=='Vidsrc'){
        if (apiSrc && params.get('tmdbId')) {
            setMovie(apiSrc + params.get('tmdbId'));
        }
    } else if(selectedOption=='2Embed'){
        if (twoEmbedApi && params.get('tmdbId')) {
            setMovie(twoEmbedApi + params.get('tmdbId'));
        }
    } else if(selectedOption=='SuperEmbed'){
      if (superApi && params.get('tmdbId')) {
          setMovie(superApi + params.get('tmdbId'));
      }
    }else if(selectedOption=='SmashyStream'){
      if (smashystream && params.get('tmdbId')) {
          setMovie(smashystream + params.get('tmdbId'));
      }
  }
 };



  return (
    <div className='w-[100%] p-4 pr-8'>
      {modal && (
        <div className='absolute top-[35%] rounded-xl left-[40%] bg-pink-900 w-[500px] p-4 '>
          <IoIosCloseCircle onClick={()=>setModal(false)}  className='cursor-pointer hover:text-red-600 transition-all duration-200 absolute top-2 right-2' size={40} />
          <div>
            <h1 className='text-2xl font-semibold mb-2'>What are Provider ? </h1>
              <p className='opacity-80'>Provider are thrid parties that hold the Movie/Series Source at there sever, diffrent providers ensure that a Movie/Series is available at all times.</p>
              <h1 className='text-2xl font-semibold my-2'>What if they do not work</h1>
              <p className='opacity-80'>
                  Not all the time you will be able see the Movie/Series because Providers themselves don&apos;t have the data on them which is why you&apos;ll see the Movie at the Home page that doesn&apos;t lead to a Source.
              </p>
          </div>
          <button onClick={()=>setModal(false)} className='w-full rounded-md mt-6 px-4 py-2 bg-white text-black'>Countinue with the Show</button>
        </div>
      )}
     <div className="">
      <div className=" ">
        <header className="w-full h-[260px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
        <iframe
        allowFullScreen={true}
        className='w-full h-full bg-black rounded-xl overflow-hidden'
        src={movie}></iframe>
        </header>
        <div className="flex mt-8 rounded-xl overflow-hidden bg-blue-900">
          <div className=" lg:w-[70%] p-4">
            <h1 className="text-2xl lg:text-5xl mb-4">
              {title ? title : '404 Not Found'}
            </h1>
            <h1 className="">
              {date}
            </h1>
            <h1 className="">
              {rating ? rating : null}
            </h1>
          </div>
          <div className='min-w-[30%] p-4 '>
              <div className='w-full h-full'>
              <form
            className='h-fit'
            //onSubmit={handleSubmit} 
            >
            <label className='text-xl '>
               <span className='flex gap-1'>Choose Provider<FaCircleInfo onClick={()=>setModal(true)} size={15} /></span>
                <select 
                className='bg-black pl-4 py-0.5 rounded-full w-[170px] ' 
                value={selectedOption} 
                onChange={(event)=>{
                  setSelectedOption(event.target.value)
                  handleSubmit()
                  }}>
                <option value="Vidsrc">Vidsrc</option>
                <option value="2Embed">2Embed</option>
                <option value="SuperEmbed">Super Embed</option>
                <option value="SmashyStream">Smashy Stream</option>
                </select>
            </label>
        </form>
              </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Video
