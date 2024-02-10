import endpoint from '@/services/apiEndpoint';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieRow from './MovieRow';
import { useRouter, useSearchParams } from 'next/navigation';
import FancyBtn from './FancyBtn';

interface NextPageProps {
    endpointName: string;
    pageNo: number;
    type:string
  }

const NextPageComp  = ({endpointName,pageNo,type}:NextPageProps) => {

  const [movies, setMovies] = useState<string | null>()
  
  const params = useSearchParams()
  const router = useRouter();

  const pageIncrementHandler =()=>{
    let currentStartValue = params.get('pageNo');
    let currentPage: number = currentStartValue ? Number(currentStartValue) :  1;
    let currentTypeValue = params.get('type');
    let currentType:string = currentTypeValue ? String(currentTypeValue) : '';
    let currentTitleValue = params.get('title');
    let currentTitle: string = currentTitleValue !== null ? String(currentTitleValue) : '';

    
    router.push(`/nextpage?endpointName=${endpointName}&pageNo=${++currentPage}&title=${currentTitle}`)
  }

  let a: string;
  type EndpointKey = keyof typeof endpoint;
  Object.keys(endpoint).forEach((thisEndpointName: string) => {
    if (endpointName === thisEndpointName) {
      a = endpoint[endpointName as EndpointKey];
    }
  });
  
  useEffect(()=>{
    axios.get(`${a}&page=${pageNo}`).then((e)=>{
      setMovies(e.data);      
    })
  },[params.get('endpointName'),params.get('pageNo')])


  return (
    <div className='min-h-screen'>
    {movies && 
      <div>
        <div >
          <MovieRow title="popular" type={type} endpointName={'popular'} data={movies}/>
        </div>
          <div className='my-4 flex items-center justify-center'>
            <div onClick={pageIncrementHandler}>
            <FancyBtn text='Next Page' hoverText='Confirm ?'/>
            </div>
          </div>
      </div>
    }
    
    </div>
  )
}

export default NextPageComp
