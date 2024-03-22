"use server";
import React from "react";
import endpoint from "../services/apiEndpoint";
import MovieRow from "../components/MovieRow";
import Hero from "../components/Hero";
import ExtendMovieRow from "../components/ExtendMovieRow";

const Explore = async () => {
  const popularMovies = await getData(endpoint.popularMovies);
  const topRatedMovies = await getData(endpoint.topRatedMovies);
  const trendingMovies = await getData(endpoint.trendingMovies);
  const upcomingMovies = await getData(endpoint.upcomingMovies);
  const netflix = await getData(endpoint.netflix);
  const hulu = await getData(endpoint.hulu);
  const disneyPlus = await getData(endpoint.disneyPlus);
  const amazon = await getData(endpoint.amazon);
  const appletv = await getData(endpoint.appleTv);
  const paramountPlus = await getData(endpoint.paramountPlus);
  const hbo = await getData(endpoint.hbo);
  const peacock = await getData(endpoint.peacock);
  const topRatedTvShows = await getData(endpoint.topRatedTvShows);

  const nowPlayingMovies = await getData(endpoint.nowPlayingMovies);
  const anime = await getData(endpoint.anime);
  const animeMovie = await getData(endpoint.animeMovies);

  const data = {
    animeMovie,
    netflix,
    hulu,
    disneyPlus,
    amazon,
    appletv,
    paramountPlus,
    hbo,
    peacock,
    topRatedTvShows,
    anime,
  };

  let randomPopularMovie = null;
  if (trendingMovies && trendingMovies.results) {
    randomPopularMovie =
      trendingMovies.results[
        Math.floor(Math.random() * trendingMovies.results.length)
      ];
  }

  return (
    <div className="w-screen ">
      <div>
        <div className="">
          <Hero data={randomPopularMovie} />
          <MovieRow
            title="popular movies"
            type="movie"
            data={popularMovies}
          />
          <MovieRow
            title="Trending movies"
            type="movie"
            data={trendingMovies}
          />
          <MovieRow
            title="Upcoming movies"
            type="movie"
            data={upcomingMovies}
          />
          <MovieRow
            title="Top Rated Movies"
            type="movie"
            data={topRatedMovies}
          />
          <MovieRow
            title="now playing movies"
            type="movie"
            data={nowPlayingMovies}
          />
          <MovieRow
            title="anime movies"
            type="movie"
            data={animeMovie}
          />
          <ExtendMovieRow data={data} />
        </div>
      </div>
    </div>
  );
};

async function getData(endpoint: string) {
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default Explore;
