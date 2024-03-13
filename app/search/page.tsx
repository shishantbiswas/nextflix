"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import MovieItem from "@/components/MovieItem";
import SearchInput from "@/components/SearchInput";
import FancyBtn from "@/components/FancyBtn";
import { useRouter } from "next/navigation";

interface Movie {
  id: string;
}
type CompleteDataType = {
  total_pages: number;
  total_results: number;
};

const Search = () => {
  const key = process.env.NEXT_PUBLIC_TMDB_KEY;

  const router = useRouter();
  const params = useSearchParams();

  const [data, setdata] = useState<Movie[]>([]);
  const [completeData, setCompleteData] = useState<CompleteDataType | null>();
  const [searchType, setSearchType] = useState("movie");

  let currentStartValue = params.get("pageNo");
  let currentPage: number = currentStartValue ? Number(currentStartValue) : 2;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/${searchType}?query=${params.get(
          "query"
        )}&api_key=${key}${currentStartValue ? `&page=${currentPage}` : ``}`
      )
      .then((response) => {
        const fullResult = response.data.results;
        setdata(fullResult);
        setCompleteData(response.data);
      });
  }, [params.get("query"), params.get("pageNo"), searchType]);

  const handleNextPage = () => {
    if (!params.get("pageNo")) {
      router.push(`/search?query=${params.get("query")}&pageNo=2`);
    } else {
      router.push(
        `/search?query=${params.get("query")}&pageNo=${++currentPage}`
      );
    }
  };

  return (
    <div>
      <div className=" flex flex-col gap-4 w-screen">
        <div className="pl-2 flex flex-col gap-4">
          <h1 className="text-3xl text-gray-300 capitalize font-bold mt-6">
            Search Results In {searchType} 
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
          {data?.map((elem) => (
            <MovieItem key={elem.id} movie={elem} type={`${searchType}`} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-6 w-[79%]">
        <div className="flex flex-col">
          <h1>Total Pages : {completeData?.total_pages}</h1>
          <h1>Indivisual Results : {completeData?.total_results}</h1>
        </div>
        <div
          onClick={handleNextPage}
          className={`${
            currentPage >= (completeData?.total_pages ?? 0) ? "hidden" : ""
          }`}
        >
          <FancyBtn text="Next Page" hoverText={`Let's Go`} />
        </div>
      </div>
    </div>
  );
};

export default Search;
