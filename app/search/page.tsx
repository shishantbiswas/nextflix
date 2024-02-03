'use client'
import axios from 'axios'
import {  useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Result from '@/components/Result'

const Search = () => {

  const params = useSearchParams()
  const [data, setdata] = useState<Movie[]>([])
  const key = process.env.NEXT_PUBLIC_TMDB_KEY

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${params.get('query')}&api_key=${key}`).then((response)=>{
      const fullResult = response.data.results
      setdata(fullResult);
  })}, [params.get('query')])
  
   

      interface Movie {
        id: string;
       }
  
  return (
    <div>
      <div className=' pt-20 lg:pt-0'>
      <h1 className='text-3xl pl-2 text-gray-300 mb-3 font-bold mt-6'>Tmdb Search Result</h1>
    {(data?.map((elem)  => (
    <Result key={elem.id} movie={elem} />
    )))}
    </div>
    </div>
  )
}

export default Search
