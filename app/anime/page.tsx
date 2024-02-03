import Hero from '@/components/Hero'
import MovieRow from '@/components/MovieRow'
import endpoint from '@/services/apiEndpoint'
import React from 'react'

const Anime = async () => {
  const animeMovie          = await getData(endpoint.animeMovie)
  const anime               = await getData(endpoint.anime)
  const jikan_result        = await getData(endpoint.jikan_popular)


  let randomPopularMovie = null;
  if (jikan_result && jikan_result.data) {
    randomPopularMovie = jikan_result.data[Math.floor(Math.random() * jikan_result.data.length)];
  }
  
  return (
    <div>
      <Hero data={randomPopularMovie}/>
      <MovieRow title='Anime'             data={anime}/>
      <MovieRow title='Trending'      data={animeMovie}/>
      <MovieRow title='Popular Anime Movies'      data={jikan_result}/>
    </div>
  )
}
async function getData(endpoint:any) {
  const res = await fetch(endpoint)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}


export default Anime
