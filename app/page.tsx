'use server'
import React from 'react'
import endpoint from '@/services/apiEndpoint'
import MovieRow from '@/components/MovieRow'
import Hero from '@/components/Hero'
import ExtendMovieRow from '@/components/ExtendMovieRow'

const Explore = async () => {
 const popular             = await getData(endpoint.popular)
 const topRatedMovies      = await getData(endpoint.topRatedMovies)
 const trending            = await getData(endpoint.trending)
 const upcoming            = await getData(endpoint.upcoming)
 const popularTvShows      = await getData(endpoint.popularTvShows)
 const airingTodayTvShows  = await getData(endpoint.airingTodayTvShows)
 const netflix             = await getData(endpoint.netflix)
 const hulu                = await getData(endpoint.hulu)
 const disneyPlus          = await getData(endpoint.disneyPlus)
 const amazon              = await getData(endpoint.amazon)
 const appletv             = await getData(endpoint.appletv)
 const paramountPlus       = await getData(endpoint.paramountPlus)
 const hbo                 = await getData(endpoint.hbo)
 const peacock             = await getData(endpoint.peacock)
 const topRatedTvShows     = await getData(endpoint.topRatedTvShows)

 const data = {
  airingTodayTvShows,netflix,hulu,disneyPlus,amazon,appletv,paramountPlus,hbo,peacock,topRatedTvShows
 }

 let randomPopularMovie = null;
 if (trending && trending.results) {
   randomPopularMovie = trending.results[Math.floor(Math.random() * trending.results.length)];
 }

 return (
   <div className='w-screen '>
     <div className='/flex'>
      
      <div className=''>
    <Hero data={randomPopularMovie}/>
    <MovieRow title="popular"           data={popular}/>
    <MovieRow title='Trending'          data={trending} />
    <MovieRow title='Upcoming'          data={upcoming}/>  
    <MovieRow title='Top Rated Movies'  data={topRatedMovies}/>
    <MovieRow title='Popular TV Shows'   data={popularTvShows}/> 
     <ExtendMovieRow data={data}/>
    </div>
    </div>
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
