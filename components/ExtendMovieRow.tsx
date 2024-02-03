'use client'

import React, { useRef, useState } from 'react'
import MovieItem from './MovieItem'
import{MdChevronLeft,MdChevronRight}from 'react-icons/md'
import MovieRow from './MovieRow'
 

const ExtendMovieRow = ({data}:{data:any}) => {
    const {airingTodayTvShows,netflix,hulu,disneyPlus,amazon,appletv,paramountPlus,hbo,peacock,topRatedTvShows} =data 
  const [clicked, setClicked] = useState(false)
  
    
  return (
    <>
      <div className=''>
      {!clicked &&  <button
        className='py-2 px-4 mb-12 text-5xl hover:text-6xl w-[79%] transition-all duration-300 text-center  rounded-full '
        onClick={()=>setClicked(true)}>
          <span className='my-12 rounded-full px-8 py-2'>Show More ...</span>
          </button>}
        {clicked && (
            <>
        <MovieRow title='Netflix'          data={netflix}/>
        <MovieRow title='Hulu'              data={hulu}/>
        <MovieRow title='Disney +'          data={disneyPlus}/>
        <MovieRow title='Amazon'            data={amazon}/>
        <MovieRow title='Paramount +'       data={paramountPlus}/>
        <MovieRow title='HBO'               data={hbo}/>
        <MovieRow title='Apple TV'          data={appletv}/>
        <MovieRow title='Top Rated TV Shows' data={topRatedTvShows}/>
        <MovieRow title='Peacock'            data={peacock}/>
        <MovieRow title="Today's Tv Shows"   data={airingTodayTvShows}/>
            </>
        )}
      </div>
    </>

  )
}

export default ExtendMovieRow
