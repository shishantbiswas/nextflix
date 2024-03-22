"use client";

import React, { useState } from "react";
import MovieRow from "./MovieRow";

export default function ExtendMovieRow  ({ data }: { data: any })  {
  const {
    netflix,
    hulu,
    disneyPlus,
    amazon,
    anime,
    appletv,
    paramountPlus,
    peacock,
    topRatedTvShows,
  } = data;
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className=" py-8 lg:pl-4">
        {!clicked && (
              <button 
              onClick={() => setClicked(true)}
              className="hover:bg-slate-500 w-[79%] text-2xl lg:text-5xl font-bold px-5 py-2 rounded-full transform transition-all">
                Show More
              </button>
        )}
        {clicked && (
          <>
            <MovieRow
              title="Netflix"
              type="tv"
              data={netflix}
            />
            <MovieRow
              title="Hulu"
              type="tv"
              data={hulu}
            />
            <MovieRow
              title="Disney +"
              type="tv"
              data={disneyPlus}
            />
            <MovieRow
              title="Amazon"
              type="tv"
              data={amazon}
            />
            <MovieRow
              title="Paramount +"
              type="tv"
              data={paramountPlus}
            />
            <MovieRow
              title="Apple TV"
              type="tv"
              data={appletv}
            />
            <MovieRow
              title="Top Rated TV Shows"
              type="tv"
              data={topRatedTvShows}
            />
            <MovieRow
              title="Peacock"
              type="tv"
              data={peacock}
            />
            <MovieRow
              title="anime series"
              type="tv"
              data={anime}
            />
          </>
        )}
      </div>
    </>
  );
};

