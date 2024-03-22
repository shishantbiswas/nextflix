'use client'
import { useEffect, useState } from "react";
import MovieItem from "./MovieItem";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Result({data,type,page,search}:{data:any,type:string,page:number,search:string}){
  const [searchType, setSearchType] = useState(type);
  const {results}=data
  const router = useRouter()

  let currentPage:number = page
  useEffect(() => {
    router.push(`/search/${searchType}/${search}`)
  }, [searchType,router,search])
  

    return(
         <div>
              <div>
      <div className=" flex flex-col gap-4 w-screen">
        <div className="pl-2 flex flex-col gap-4">
          <h1 className="text-3xl text-gray-300 capitalize font-bold mt-6">
            Search Results In {type=="movie"?"Movie":"TV Shows"} 
          </h1>
          <div className="flex">
            <select
              className="font-bold px-2 py-2 rounded-lg w-24 bg-slate-800"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="movie">Movie</option>
              <option value="tv">TV</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 lg:w-[79%]">
          {results?.map((elem:any) => (
            <MovieItem key={elem.id} movie={elem} type={`${type}`} />
          ))}
        </div>
      </div>
        
        <div className="my-4 flex items-center justify-center lg:w-[79%]">
          <div className="flex gap-4 items-center justify-center text-2xl transition-all transform duration-200">
            <Link href={`/search/${type}/${search}/${--page}`}>
              <FaArrowLeft className="hover:bg-white hover:text-black rounded-full p-1" />
            </Link>
            <h1 className="capitalize text-xl">
              {currentPage} ... {data?.total_pages}
            </h1>
            {
                currentPage==data.total_pages || currentPage==500  ? "" : (
                    <Link href={`/search/${type}/${search}/${++currentPage}`}>
              <FaArrowRight className="hover:bg-white hover:text-black rounded-full p-1" />
            </Link>
                )
            }
          </div>
        </div>
      </div>
    </div>
    )
}