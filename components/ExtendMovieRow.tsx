"use client";

import React, { useRef, useState } from "react";
import MovieRow from "./MovieRow";

const ExtendMovieRow = ({ data }: { data: any }) => {
  const {
    netflix,
    hulu,
    disneyPlus,
    amazon,
    anime,
    appletv,
    paramountPlus,
    hbo,
    peacock,
    topRatedTvShows,
  } = data;
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className=" py-8 lg:pl-4">
        {!clicked && (
          <button className=" w-[79%]">
            <span
              className="text-2xl lg:text-5xl font-bold"
              onClick={() => setClicked(true)}
            >
              <button className="hover:bg-slate-500 px-5 py-2 rounded-full transform transition-all">
                Show More
              </button>
            </span>
          </button>
        )}
        {clicked && (
          <>
            <MovieRow
              title="Netflix"
              type="tv"
              endpointName={"netflix"}
              data={netflix}
            />
            <MovieRow
              title="Hulu"
              type="tv"
              endpointName={"hulu"}
              data={hulu}
            />
            <MovieRow
              title="Disney +"
              type="tv"
              endpointName={"disneyPlus"}
              data={disneyPlus}
            />
            <MovieRow
              title="Amazon"
              type="tv"
              endpointName={"amazon"}
              data={amazon}
            />
            <MovieRow
              title="Paramount +"
              type="tv"
              endpointName={"paramountPlus"}
              data={paramountPlus}
            />
            <MovieRow title="HBO" type="tv" endpointName={"hbo"} data={hbo} />
            <MovieRow
              title="Apple TV"
              type="tv"
              endpointName={"appleTv"}
              data={appletv}
            />
            <MovieRow
              title="Top Rated TV Shows"
              type="tv"
              endpointName={"topRatedTvShows"}
              data={topRatedTvShows}
            />
            <MovieRow
              title="Peacock"
              type="tv"
              endpointName={"peacock"}
              data={peacock}
            />
            <MovieRow
              title="anime series"
              type="tv"
              endpointName={"anime"}
              data={anime}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ExtendMovieRow;
