"use client";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion"; // Import motion from Framer Motion
import {
  IoIosCloseCircle,
  IoIosCloseCircleOutline,
  IoIosWarning,
} from "react-icons/io";
import Link from "next/link";
import { createImageUrl } from "../services/apiEndpoint";
import { VscArrowSmallDown } from "react-icons/vsc";

export default function SearchInput() {
  const router = useRouter();
  const params = useSearchParams();
  const key = process.env.NEXT_PUBLIC_TMDB_KEY;

  const [searchQuery, setSearchQuery] = useState("");
  const [placeholderValue, setPlaceholderValue] = useState(params.get("query"));
  const [active, setActive] = useState(false);

  const [type, setType] = useState("movie");

  const [view, setView] = useState([]);

  const submitHandler = (event: any) => {
    event.preventDefault();
    if (searchQuery) {
      router.push(`/search/${type}/${searchQuery}`);
    } else {
      setActive(true);
    }
  };

  const api = `https://api.themoviedb.org/3/search/${type}?query=${searchQuery}&api_key=${key}`;

  useEffect(() => {
    axios.get(api).then((e: any) => {
      let data = e.data.results;
      if (data.length > 12) {
        data = e.data.results.splice(0, 12);
        setView(data);
      } else {
        setView(data);
      }
    });
  }, [searchQuery, type,api]);

  return (
    <div className={`relative`}>
      <form
        className="flex flex-row-reverse rounded-md overflow-hidden px-2 justify-center items-center w-full bg-gray-700"
        onSubmit={submitHandler}
      >
        <input
          className="h-12 w-full  bg-gray-700 text-white outline-none "
          type="text"
          placeholder={placeholderValue ? placeholderValue : "Search..."}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setActive(false);
          }}
        />
        <button className="p-2 rounded-full transition-all ">
          <IoSearch className=" text-[20px] transition-all duration-150 text-white opacity-50 hover:opacity-100" />
        </button>
      </form>
      <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: active ? 1 : 0,
          y: active ? 0 : -20,
        }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
        className={`transition-all absolute rounded-xl left-0 top-[60px] w-full h-[60px] bg-black opacity-90 gap-2 flex items-center justify-center ${
          active ? "z-20 " : "hidden"
        }`}
      >
        <IoIosWarning size={20} />
        <h1 className="capitalize text-md text-nowrap font-medium">
          Can&apos;t Do empty Searches
        </h1>
      </motion.div>
      </AnimatePresence>

<AnimatePresence>
      <motion.div
        className={`transition-all absolute lg:max-h-[80vh]  rounded-lg -left-[26vw] xl:left-0 sm:-left-24  lg:left-[0vw] top-16 lg:w-full w-[70vw]  sm:w-[400px]  ${
          view.length > 0
            ? "bg-gray-700 max-h-[80vh] z-50 overflow-y-scroll"
            : "hidden"
        } `}
      >
        <div className="p-3 relative">
          <div className="flex cursor-pointer lg:text-lg text-3xl items-center justify-center gap-[2px] bg-red-600 rounded-lg lg:w-fit w-full p-1 mb-4">
            <p className="lg:text-sm text-2xl">Close</p>
            <IoIosCloseCircleOutline onClick={() => setView([])} />
          </div>
          <h1 className="text-xl mb-2 ">
            Searching in {type == "tv" ? "TV Shows" : "Movies"}
          </h1>
          <select
            className="font-bold px-2 py-2 rounded-lg  bg-slate-900"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="movie">Movie</option>
            <option value="tv">TV Shows</option>
          </select>

          <AnimatePresence>
          {view.map((e: any) => (
            <motion.div
              className="my-4 bg-gray-900 p-2 rounded-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, power: 1 }}
              key={e.id}
            >
              <Link target="_blank" href={`/video/${type}/${e.id}`}>
                <motion.img
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, power: 1 }}
                  className=" w-full lg:h-[250px] h-[400px] object-cover rounded-lg mb-2"
                  src={createImageUrl(e.poster_path || e.backdrop_path, "w500")}
                  alt={e.title || e.name}
                />
                <p className=" opacity-70 text-sm">
                  {e.release_date || e.first_air_date}
                </p>
                <p className="w-full text-xl text-start mb-2 font-medium">
                  {e.title || e.name}
                </p>
              </Link>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>
        <div className="sticky w-full h-[80px] bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900 flex items-center justify-center">
          {view.length > 1 && (
            <motion.span
              initial={{ opacity: 0, y: -20 }} // Initial state: hidden and slightly up
              animate={{ opacity: 1, y: 0 }} // Animate to fully visible and in place
              exit={{ opacity: 0, y: -20 }} // Exit state: hidden and slightly up
              transition={{
                duration: 0.5,
                repeat: 5,
                repeatType: "reverse", 
                repeatDelay: 2, 
                }}
              className="bg-gray-900 rounded-full"
            >
              <VscArrowSmallDown size={40} />
            </motion.span>
          )}
        </div>
      </motion.div>
      </AnimatePresence>
    </div>
  );
}
