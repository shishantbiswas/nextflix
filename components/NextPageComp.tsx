import endpoint from '@/services/apiEndpoint';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieRow from './MovieRow';
import { useRouter, useSearchParams } from 'next/navigation';
import FancyBtn from './FancyBtn';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

interface NextPageProps {
    endpointName: string;
    pageNo: number;
    type:string;
  }
  interface MoviesData {
    results: {}[]; 
    total_pages: number;
  }

const NextPageComp  = ({endpointName,pageNo,type}:NextPageProps) => {

  const [movies, setMovies] = useState<MoviesData>()
  
  const params = useSearchParams()
  const router = useRouter();

  let currentStartValue = params.get('pageNo');
  let currentPage: number = currentStartValue ? Number(currentStartValue) :  1;
  let currentTypeValue = params.get('type');
  let currentType:string = currentTypeValue ? String(currentTypeValue) : '';
  let currentTitleValue = params.get('title');
  let currentTitle: string = currentTitleValue !== null ? String(currentTitleValue) : '';

  const pageIncrementHandler =()=>{
    router.push(`/nextpage?endpointName=${endpointName}&pageNo=${++currentPage}&title=${currentTitle}&type=${currentType}`)
  } 
  const pageDecrementHandler =()=>{
    router.push(`/nextpage?endpointName=${endpointName}&pageNo=${--currentPage}&title=${currentTitle}&type=${currentType}`)
  }

  let movieEndpoint: string;
  type EndpointKey = keyof typeof endpoint;
  Object.keys(endpoint).forEach((thisEndpointName: string) => {
    if (endpointName === thisEndpointName) {
       movieEndpoint = endpoint[endpointName as EndpointKey];
    }
  });
  
  useEffect(()=>{
    axios.get(`${ movieEndpoint}&page=${pageNo}`).then((e)=>{
      setMovies(e.data);      
    })
  },[params.get('endpointName'),params.get('pageNo')])

 

  return (
    <div className='min-h-screen'>
    {movies && 
      <div>
        <div >
          <MovieRow title="popular" type={type || currentType} endpointName={'popular'} data={movies}/>
        </div>
          <div className='my-4 w-[100%] flex items-center justify-center'>
            <div className='flex gap-4 items-center justify-center text-2xl transition-all transform duration-200'>
              <button onClick={pageDecrementHandler}>
                <FaArrowLeft className='hover:bg-white hover:text-black rounded-full p-1'/>
              </button>
              <h1 className='capitalize text-xl'>
                {currentPage} ... {movies.total_pages}
                </h1>
              <button onClick={pageIncrementHandler}>
                <FaArrowRight className='hover:bg-white hover:text-black rounded-full p-1'/>
                </button>
            </div>
          </div>
      </div>
    }
    
    </div>
  )
}

export default NextPageComp
