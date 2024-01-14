'use client'
import axios from 'axios'
import {  useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Result from '@/components/Result'
import Navbar from '@/components/Navbar'

const Search = () => {

  const params = useSearchParams()
  const [data, setdata] = useState<Movie[]>([])
  const [omdb, setOmdb] = useState<Movie[]>([])
  const key = process.env.NEXT_PUBLIC_TMDB_KEY
  const omdbApi = process.env.NEXT_PUBLIC_OMDB_BASE_URL

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${params.get('query')}&api_key=${key}`).then((response)=>{
      const fullResult = response.data.results
      setdata(fullResult);
  })}, [params.get('query')])
  
   
  //  omdb
  
      useEffect(() => {
        axios.get(`${omdbApi}s=${params.get('query')}`).then((response)=>{
          const fullResult = response.data.Search
          setOmdb(fullResult);
        });  
      }, [params.get('query')])
      
      interface Movie {
        id: string;
       }
  
  return (
    <div>
      <Navbar/>
      <div className=' pt-20'>
    <h1 className='text-3xl pl-2 text-gray-300 mb-3 font-bold '>Omdb Search Result</h1>
    {(omdb?.map((elem)  => (
      <Result key={elem.id} movie={elem} />
      )))}
      <h1 className='text-3xl pl-2 text-gray-300 mb-3 font-bold mt-6'>Tmdb Search Result</h1>
    {(data?.map((elem)  => (
    <Result key={elem.id} movie={elem} />
    )))}
    </div>
    </div>
  )
}

export default Search
