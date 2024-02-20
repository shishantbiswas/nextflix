'use client'
import FancyBtn from '@/components/FancyBtn';
import { createImageUrl } from '@/services/apiEndpoint';
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaCircleInfo } from 'react-icons/fa6';
import { IoIosCloseCircle } from 'react-icons/io';


const Video = () => {
    const params = useSearchParams()
    const router = useRouter()
    
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
    const [recommendation, setRecommendation] = useState([])
    const [modal,setModal]=useState(false)


    useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/${paramsType}/${params.get('tmdbId')}?api_key=${key}`).then((res)=>{
       setMovieData(res.data)
      })     
      // gets recommendation
      axios.get(`https://api.themoviedb.org/3/${paramsType}/${params.get('tmdbId')}/recommendations?api_key=${key}`).then((res)=>{
        setRecommendation(res.data.results)
      })
      handleSubmit()
    }, [movie,params.get('tmdbId')])
   
    
    const recommendedMovie=(e:any)=>{
      router.push(`/video?tmdbId=${e.id}&type=${e.media_type}`)
    }

const handleSubmit = (e?: React.FormEvent) => {
  e?.preventDefault();
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
  last_episode_to_air,

}:any = movieData




  return (
    <div className='w-[100%] p-4 pr-8 outline-none'>
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





        <header className="w-full h-[260px] sm:h-[300px] md:h-[400px] lg:h-[600px] mt-2 outline-none">
        <iframe
        allowFullScreen={true}
        className='w-full h-full bg-black rounded-xl overflow-hidden'
        src={movie}></iframe>
        </header>


        <section className='lg:flex mt-8 rounded-md justify-between p-4 bg-gray-900 '>
          <div className='lg:w-[40%]  pr-4  '>
            <div className=' sticky top-5 p-4 bg-black/20 rounded-xl'>
            <div>
          <div >
            <div >
              <p className='text-xl mb-3 font-semibold'>Currently Viewing</p>
            <h1 className="text-5xl font-semibold lg:mb-4">
              {title ? title : name}
            </h1>
            <p className='text-lg '>Overview : </p>
            <h1 className="text-md leading-tight opacity-70">
              {overview}
            </h1>
            {type && (
              <h1 className='text-sm opacity-75'>
                {type}
              </h1>
            )}
            <div className='text-md mt-2'>
              <h1>Categories :</h1>
            <h1 className='flex gap-2 opacity-60' >{genres?.map((e:{name:string,id:number})=>(
                <p key={e.id}>{e.name}</p>
            ))}</h1>
              {homepage && (
                <>
                <div className='mt-2 '>
                <Link href={homepage}>
                Official website : <br/><span className='underline opacity-60'>{homepage}</span>
                </Link>
              </div>
                </>
              )}
            </div>
            <div className='my-5'>
              <Link href='/' className='text-lg p-2 px-3 bg-white text-black rounded-lg'>Back To Home</Link>
              </div>
        
        <div className='w-full h-full '>
              <form
            className=' w-full transition-all hover:opacity-100 '
            onSubmit={handleSubmit} >
            <label className='text-2xl mb-4 '>
            <span className='flex gap-1'>Choose Provider<FaCircleInfo onClick={()=>setModal(true)} size={15} /></span>
                <select className='text-xl my-1 p-2 bg-black/50 border rounded-lg  hover:text-black hover:bg-white w-full text-center outline-none' value={selectedOption} onChange={(e)=>setSelectedOption(e.target.value)}>
                {params.get('type')=='tv' ? (
                    <>
                      <option value='VidsrcTV'>TV Vidsrc</option>
                      <option value='2EmbedTv'>2Embed TV</option>
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
            className='my-2 text-xl p-2 w-full rounded-lg bg-white text-black overflow-hidden' 
            >Confirm</button>
        </form>
              </div>
          </div>
          </div>
          </div>
            </div>
          </div>


          <div className='lg:w-[60%]'>
          <div className=' bg-blue-2900 p-3 '>
              <h1 className=' text-3xl font-semibold mb-8'>{paramsType=='movie'?'Recommended Movies':'Recommended TV Shows'}</h1>
              <div className='grid md:grid-cols-2 lg:grid-cols-2 md:gap-4 '>
              {recommendation.map((e:any)=>(
                <div key={e.id} className='lg:w-[400px] w-full mb-12'>
                  <img className='object-cover rounded-md w-full lg:w-[400px] lg:h-[450px] ' src={createImageUrl(e.poster_path,'w500')} alt={e.name || e.title} />
                  <div className='flex flex-col justify-between min-h-[400px]'>
                  <div>
                  <h1 className='text-3xl font-semibold mt-4'>
                    {e.title || e.name}
                  </h1>
                  <p className='leading-tight opacity-60 mt-2'>{e.overview}</p>
                  <p className='opacity-60  mt-4'> Released In {e.release_date}</p>
                  <p className='opacity-60 my-0.5'>Average Voting {e.vote_average}</p>
                  </div>
                  <button
                  className='bg-white text-black hover:text-white hover:bg-black transition-all duration-50 text-xl capitalize font-semibold rounded-xl px-4 py-2  text-center'
                  onClick={()=>recommendedMovie(e)}>Play This {paramsType}</button>
                  </div>
                </div>
              ))}
              </div>
          </div>
          </div>
        </section>


      </div>
    </div>
    </div>
  )
}

export default Video
