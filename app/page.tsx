'use server'
import React from 'react'
import endpoint from '@/services/apiEndpoint'
import MovieRow from '@/components/MovieRow'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'

const Explore = async () => {
 const popular = await getData(endpoint.popular)
 const topRated = await getData(endpoint.topRated)
 const trending = await getData(endpoint.trending)
 const upcoming = await getData(endpoint.upcoming)

 let randomPopularMovie = null;
 if (popular && popular.results) {
   randomPopularMovie = popular.results[Math.floor(Math.random() * popular.results.length)];
 }

 return (
   <div>
      <Navbar/>
     <Hero data={randomPopularMovie}/>
     <MovieRow title="popular" data={popular}/>
     <MovieRow title='Trending' data={trending} />
     <MovieRow title='Upcoming' data={upcoming}/>
     <MovieRow title='Top Rated' data={topRated}/>
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



export default Explore
