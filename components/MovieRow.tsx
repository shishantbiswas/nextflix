"use client";

import React, { Suspense, useRef } from "react";
import MovieItem from "./MovieItem";
import { usePathname } from "next/navigation";
import { VscArrowCircleLeft, VscArrowCircleRight } from "react-icons/vsc";

const MovieRow = ({
  data,
  title,
  type,
}: {
  data: any;
  title: string;
  type: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isCategory = pathname.split('/').at(1)
  

  return (
    <>
      <div className=" lg:flex lg:flex-col justify-center">
        <div className="sm:flex items-start sm:items-center  justify-between lg:w-[70%] xl:w-[79%]">
          <h1 className="font-bold text-md sm:text-3xl lg:text-5xl p-4 capitalize">
            {title}
          </h1>
          {pathname == "/" && (
            <>
              <div className="flex items-center sm:gap-2 justify-between sm:justify-center pl-2 pr-6 ">
               
                <div className=" hidden lg:flex">
                  <VscArrowCircleLeft
                    className="rounded-full hover:text-gray-100 transition-all duration-150 left-2 opacity-80 text-gray-400 lg:text-[35px] text-3xl sm:w-[50px] cursor-pointer"
                    onClick={() =>
                      scrollRef.current?.scrollBy({
                        left: -300,
                        behavior: "smooth",
                      })
                    }
                  />
                  <VscArrowCircleRight
                    className="lg:text-[35px] text-3xl sm:w-[50px] rounded-full hover:text-gray-100 transition-all duration-150 right-2 opacity-80 text-gray-400   cursor-pointer"
                    onClick={() =>
                      scrollRef.current?.scrollBy({
                        left: 300,
                        behavior: "smooth",
                      })
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div
          ref={scrollRef}
          className={`h-fit lg:w-[98%] overflow-x-scroll scroll-smooth scrollbar-hide  ${
            pathname == "/" && " whitespace-nowrap"
          }`}
        >
          <div
            className={`${
              isCategory &&
              "grid px-2 lg:pr-0 grid-cols-2 md:grid-cols-4 lg:grid-cols-4  "
            }`}
          >
           {data.results?.map((movie: any) => (
              <MovieItem type={type} key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieRow;
