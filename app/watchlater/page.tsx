"use client";
import { UserAuth } from "../../context/AuthContext";
import { createImageUrl } from "../../services/apiEndpoint";
import { db } from "../../services/firebase";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiBookmarkRemove } from "react-icons/ci";
import { FaPlay } from "react-icons/fa6";

export default function WatchLater() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) return setMovies(doc?.data()?.watchLater);
      });
    }
  }, [user?.email, user]);

  const handleUnlikeShows = async (movie: any) => {
    const userDoc = doc(db, "users", user?.email ?? "defaultEmail");
    await updateDoc(userDoc, {
      watchLater: arrayRemove(movie),
    });
  };


  return (
    <>
      <div className="w-full">
        <h1 className="md:text-2xl font-bold lg:text-4xl p-4 capitalize text-white">
          Favourite Movies and TV Shows
        </h1>
        <div className="relative  flex items-center">
          {movies.length == 0 && (

            <>
              <div>
                <h1 className="pl-4 text-3xl whitespace-normal w-[100%]">
                 You Don&apos;t have any Favourite Movies or TV Show
                </h1>
              </div>
            </>
          )}
          <div className="w-full grid grid-cols-4 h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
            {movies.map((movie: any) => (
              <div key={movie.id}>
                <div
                  className={`relative hover:shadow-[0px_0px_15px_rgb(95,95,95,1)] inline-block rounded-lg overflow-hidden  m-2 transition-all duration-200   ${
                    pathname == "/" &&
                    "w-[180px] lg:w-[200px] 2xl:w-[250px] 2xl:hover:w-[270px]  lg:h-[300px] xl:h-[400px]"
                  }`}
                >
                  <img
                    className={`lg:w-full object-cover object-center `}
                    src={createImageUrl(
                      movie.poster_path
                        ? movie.poster_path
                        : movie.backdrop_path,
                      "w500"
                    )}
                    alt={movie.title}
                  />
                  <div className="absolute h-full top-0 left-0 w-full transition-all bg-black/80 backdrop-blur-md opacity-0 hover:opacity-100 p-3  xl:pl-3 group">
                    <p
                      className={` whitespace-normal font-semibold mb-2 leading-[16px] transform duration-[300ms]  ${
                        pathname == "/nextpage"
                          ? " group-hover:leading-[28px] text-[20px] lg:text-[28px]"
                          : " group-hover:lg:leading-[36px] lg:text-[36px] leading-[20px] text-[20px]"
                      } `}
                    >
                      {movie.title ? movie.title : movie.name}
                    </p>
                    <p className="text-[13px] md:text-md opacity-10  duration-500 group-hover:opacity-70 ">
                      {movie.release_date
                        ? movie.release_date
                        : movie.first_air_date}
                    </p>
                    <p
                      className=" whitespace-normal line-clamp-4  duration-500 group-hover:opacity-70 
          text-[15px] pt-1 opacity-10"
                    >
                      {movie.overview ? movie.overview : movie.synopsis}
                    </p>

                    <button
                      onClick={() => handleUnlikeShows(movie)}
                      className="absolute bottom-4 left-4 flex items-center justify-center xl:opacity-0 group-hover:opacity-100 delay-600 transition-all transform duration-[500ms]"
                    >
                      <CiBookmarkRemove size={30} />
                      <h1 className="pl-2 text-xl font-medium">Watch Later</h1>
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/video/${movie.type}/${movie.id}`)
                      }
                      className="absolute bottom-16 left-4 flex items-center justify-center xl:opacity-0 group-hover:opacity-100 delay-600 transition-all transform duration-[500ms]"
                    >
                      <FaPlay size={30} />
                      <h1 className="pl-2 text-xl font-medium">Play Now</h1>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
