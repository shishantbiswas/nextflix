'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { VscArrowCircleLeft } from "react-icons/vsc";
import Navbar from '@/components/Navbar';



const Video = () => {
    const params = useSearchParams()
    const apiSrc = process.env.NEXT_PUBLIC_VIDSRC_URL
    const twoEmbedApi = process.env.NEXT_PUBLIC_TWO_EMBED_BASE_URL
    const superApi = process.env.NEXT_PUBLIC_SUPEREMBED_BASE_URL

    const [selectedOption, setSelectedOption] = useState('Vidsrc');
    const [movie, setMovie] = useState(apiSrc && params.get('id') ? apiSrc + params.get('id') : '')
    const [title, setTitle] = useState('')
    const [rating, setRating] = useState()
    const [date, setDate] = useState()


useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${params.get('id')}?api_key=c3461f21e07062aa64bd4cbc049b2d98`).then((res)=>{
        if(res.data.id == params.get('id') ){
        setTitle(res.data.title);
        setDate(res.data.release_date);
        setRating(res.data.overview);
        }else{
        axios.get(`https://www.omdbapi.com/?i=${params.get('id')}&apikey=3301b064`).then((res)=>{
            setTitle(res.data.Title);
            setDate(res.data.Released);
            setRating(res.data.Plot);
        })
        }
        })
    }, [movie])
    
    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
       if(selectedOption=='Vidsrc'){
        if (apiSrc && params.get('id')) {
            setMovie(apiSrc + params.get('id'));
        }
    } else if(selectedOption=='2Embed'){
        if (twoEmbedApi && params.get('id')) {
            setMovie(twoEmbedApi + params.get('id'));
        }
    } else if(selectedOption=='SuperEmbed'){
        if (superApi && params.get('id')) {
            setMovie(superApi + params.get('id'));
        }
    }
 };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
       setSelectedOption(event.target.value);
    };

  return (
    <div>
    <div className='opacity-30 hover:opacity-100 transition-all'>
    <Navbar/>  
    </div>  
     <div className="justify-center pt-28 w-screen content-start flex-wrap  p-5 ">
      <div className="gap-5 flex max-lg:flex-col max-md:items-stretch max-md:gap-0">
        <header className="flex h-[396px] flex-col lg:h-[470px] xl:h-[550px] items-stretch w-full md:w-full max-md:ml-0">
        <iframe
        allowFullScreen={true}
        className='w-full h-full bg-black'
        src={movie}></iframe>
        </header>
        <div className="flex  flex-col items-stretch xl:min-w-[300px]  lg:min-w-[250px] mt-10 md:m-0 md:w-[44%] max-md:w-full max-md:ml-0">
          <div className="bg-black/40 rounded-lg  w-full sm:w-full flex grow flex-col px-4 py-2  items-start md:min-w-fit sm:mt-0 mt-10 max-md:pr-5">
            <div>
            </div>
          <Link 
          className='opacity-20 border rounded-md px-2 hover:opacity-100 flex items-center justify-between transition-all  group text-md mb-2' href={'/'}>
            Return Home
            <span 
            className='group-hover:pl-8 pl-2 transition-all  group-hover:text-red-600'>
              <VscArrowCircleLeft size={20}/>
          </span>
          </Link>
          {/* <Link href={`/api/download?url=${movie}`}>lololo
          </Link> */}
            <h1 className=" opacity-20 transition-all font-bold hover:opacity-100  sm:text-[28px]  max-md:text-4xl">
              {title ? title : 'ERROR: Resource Not Found'}
            </h1>
            <h1 className=" opacity-20 transition-all hover:opacity-100  sm:text-[17px] p-0  whitespace-nowrap mt-2 max-md:text-4xl">
              {date}
            </h1>
            <h1 className=" opacity-20 transition-all hover:opacity-100  sm:text-[25px]  md:text-[18px]  mt-2 mb-9 max-md:text-4xl">
              {rating ? rating : 'In some cases, The Movie Information could not be fetched but the video might still work'}
            </h1>
            <form
            className='opacity-20 w-full transition-all hover:opacity-100 '
            onSubmit={handleSubmit} >
            <label className='text-xl '>
               Choose a Server :<br/>
                <select className='text-xl my-1 p-2 bg-black/50 border rounded-lg  hover:text-black hover:bg-white' value={selectedOption} onChange={handleSelectChange}>
                <option value="Vidsrc">Vidsrc</option>
                <option value="2Embed">2Embed</option>
                <option value="SuperEmbed">Super Embed</option>
                </select>
            </label><br/>
            <button type='submit' className='my-2 border px-2 py-1 rounded-lg hover:text-black hover:bg-white' >Confirm</button>
        </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Video
