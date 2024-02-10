'use client'
import FancyBtn from '@/components/FancyBtn';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaCircleInfo } from 'react-icons/fa6';
import { IoIosCloseCircle } from 'react-icons/io';


const Video = () => {
    const params = useSearchParams()
    
    //movies embedding api
    const apiSrc = "https://vidsrc.to/embed/movie/"
    const twoEmbedApi = "https://www.2embed.cc/embed/"
    const superApi = 'https://multiembed.mov/?video_id='
    const smashystream ='https://embed.smashystream.com/playere.php?tmdb='

    //tv embedding api
    const twoEmbedtvApi = 'https://www.2embed.cc/embedtvfull/'
    const vidsrcTvapi = 'https://vidsrc.to/embed/tv/'

    const key = process.env.NEXT_PUBLIC_TMDB_KEY

    const paramsType = params.get('type');
    const tmdbId = params.get('tmdbId');
    
    const [selectedOption, setSelectedOption] = useState('Vidsrc');
    const [movie, setMovie] = useState((paramsType=='movie') ? apiSrc + params.get('tmdbId') :vidsrcTvapi + params.get('tmdbId'))
    const [movieData, setMovieData] = useState({})
    const [modal,setModal]=useState(false)


    useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/${paramsType}/${params.get('tmdbId')}?api_key=${key}`).then((res)=>{
       setMovieData(res.data)
      })     
    }, [movie])

    
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const apiMap: { [key: string]: { [key: string]: string } } = {
    movie: {
      'Vidsrc': apiSrc,
      '2Embed': twoEmbedApi,
      'SuperEmbed': superApi,
      'SmashyStream': smashystream,
    },
    tv: {
      'VidsrcTV': vidsrcTvapi,
      '2EmbedTv': twoEmbedtvApi,
    },
  };

  let selectedApi = null;
  if (paramsType !== null && selectedOption !== null) {
    selectedApi = apiMap[paramsType]?.[selectedOption];
  }
  if (selectedApi) {
    setMovie(selectedApi + tmdbId);
  }
};

 const {
  title,
  date,
  rating,
  name,
  genres,
  overview,
  homepage,
  number_of_seasons,
  number_of_episodes,
  status,
  type,
  first_air_date,
  episode_run_time,
  last_episode_to_air

}:any = movieData




  return (
    <div className='w-[100%] p-4 pr-8'>
      {modal && (
        <div className='absolute top-[25%] rounded-xl left-[35%] bg-black/80 w-[500px] p-4 '>
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
        <header className="w-full h-[260px] sm:h-[300px] md:h-[400px] lg:h-[600px]">
        <iframe
        allowFullScreen={true}
        className='w-full h-full bg-black rounded-xl overflow-hidden'
        src={movie}></iframe>
        </header>
        <div className="flex mt-8 rounded-xl overflow-hidden bg-black/60">
          <div className=" lg:w-[70%] p-4">
            <h1 className="text-2xl lg:text-5xl mb-4">
              {title ? title : name}
            </h1>
            <h1 className="">
              {date}
            </h1>
            <h1 className="text-xl w-[70%]">
              {overview}
            </h1>
            <h1 className="my-4">
              {rating ? rating : type}
            </h1>
            <div className='text-sm opacity-75'>
            <h1 className='flex gap-2 font-medium ' >{genres?.map((e:{name:string,id:number})=>(
                <p key={e.id}>{e.name}</p>
            ))}</h1>
              <h1>{homepage}</h1>
            </div>
            <div className='my-8'>
        <Link href='/' className='text-lg p-2 px-3 bg-white text-black rounded-2xl'>Back To Home</Link>
        </div>
          </div>
          <div className='min-w-[30%] p-4 '>
              <div className='w-full h-full '>
              <form
            className=' w-full transition-all hover:opacity-100 '
            onSubmit={handleSubmit} >
            <label className='text-xl '>
            <span className='flex gap-1'>Choose Provider<FaCircleInfo onClick={()=>setModal(true)} size={15} /></span>
                <select className='text-xl my-1 p-2 bg-black/50 border rounded-lg  hover:text-black hover:bg-white' value={selectedOption} onChange={(e)=>setSelectedOption(e.target.value)}>
                {params.get('type')=='tv' ? (
                    <>
                      <option value='VidsrcTV'>tv Vidsrc</option>
                      <option value='2EmbedTv'>2 embed tv</option>
                    </>
                ) : (
                  <>
                    <option value="Vidsrc">Vidsrc</option>
                    <option value="2Embed">2Embed</option>
                    <option value="SuperEmbed">Super Embed</option>
                    <option value="SmashyStream">Smashy Stream</option>
                  </>
                )
              }
                </select>
            </label><br/>
            <button type='submit' 
            className='my-2 px-2 py-1 rounded-lg bg-white text-black' 
            >Confirm</button>
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
