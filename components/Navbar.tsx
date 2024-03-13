"use client";
import React, { useState } from "react";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { VscArrowCircleRight } from "react-icons/vsc";
import { SiAppletv, SiNetflix, SiPrimevideo } from "react-icons/si";
import {
  TbBrandDisney,
  TbLogin,
  TbLogin2,
  TbLogout2,
  TbMenuDeep,
} from "react-icons/tb";
import { IoHome, IoHomeOutline, IoMenu } from "react-icons/io5";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LuPencilLine } from "react-icons/lu";
import { MdOutlineWatchLater } from "react-icons/md";
import { GrMenu, GrPowerShutdown } from "react-icons/gr";
import { FaRegUser, FaUser, FaUserEdit } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import { CgMenuRound } from "react-icons/cg";
import { ImMenu } from "react-icons/im";

const Navbar = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const { user, logOut } = UserAuth();

  const isAnime = pathname.split("/")[1];

  const isAcitveNextPage = pathname + "/" + params.get("endpointName");
  const [openNav, setOpenNav] = useState(false);

  const isProfilePath = pathname == "/profile";
  return (
    <div
      className={`
      ${openNav == false ? "flex" : "flex flex-col-reverse"}
      justify-between items-center lg:items-start lg:flex-col lg:py-3 lg:px-4 px-8 bg-gray-900 
       rounded-br-[16px]  py-3 overflow-hidden  lg:h-screen w-screen lg:min-w-[300px] lg:w-[300px] 
        z-50 sticky top-0 border-4 border-l-0 border-t-0 border-gray-800  
        ${
          ["/video", "/signup", "/login"].includes(pathname)
            ? "hidden"
            : "block"
        }
      `}
    >
      <div
        className={`flex ${
          openNav == true ? "flex-col" : "flex-row lg:flex-col"
        } justify-between items-center lg:items-start w-full`}
      >
        <div className="flex items-center justify-between w-full ">
          <Link href={"/"}>
            <h1 className="text-red-600 font-semibold  transition-all duration-200 mb-2 lg:mb-4  cursor-pointer text-5xl ">
              <span className="hidden md:block ">Nextflix</span>
              <span className="md:hidden">N</span>
            </h1>
          </Link>
          <div className="flex items-center justify-center">
            <div
              title="Menu"
              className={`transition-all duration-200 px-1 py-1 rounded-full lg:hidden `}
            >
              <IoMenu
                size={45}
                className="p-0.5 hover:bg-white/30 rounded-full"
                onClick={
                  openNav == false
                    ? () => setOpenNav(true)
                    : () => setOpenNav(false)
                }
              />
            </div>
            <img
              className="w-[45px] h-[45px] object-cover rounded-full lg:hidden"
              src={
                user?.photoURL ||
                "https://images.unsplash.com/photo-1708844897353-649da595a3f2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={user?.displayName || "User"}
            />
          </div>
        </div>
        <div
          className={`lg:flex z-50 lg:flex-col w-full h-screen lg:h-fit mt-4 ${
            openNav == false && "hidden"
          }`}
        >
          <Link
            href={"/"}
            className={`text-2xl flex items-center justify-between   py-2 rounded-lg mb-2  font-normal  transition-all duration-200 group overflow-hidden 
        ${
          pathname == "/"
            ? "bg-gradient-to-r from-cyan-500 pl-6 to-blue-500 font-semibold opacity-100"
            : "hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100"
        }`}
          >
            Home
            <span
              className={` block ${
                pathname == "/"
                  ? "-translate-x-6 "
                  : "group-hover:-translate-x-6 hidden group-hover:block translate-x-12 "
              }`}
            >
              <IoHome />
            </span>
          </Link>

          <Link
            href={
              "/nextpage?endpointName=popularMovies&pageNo=1&title=Popular+Movies&type=movie"
            }
            className={`text-2xl flex items-center justify-between   hover:pl-6 py-2 rounded-lg mb-2 font-normal hover:font-semibold
        transition-all duration-200 group overflow-hidden
        ${
          isAcitveNextPage == "/nextpage/popularMovies"
            ? "bg-gradient-to-r from-green-700 pl-6 to-emerald-600  font-semibold opacity-100"
            : "hover:bg-gradient-to-r from-green-700 to-emerald-600 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100"
        }
        `}
          >
            Popular Movies
            <span
              className={` block ${
                isAcitveNextPage == "/nextpage/popularMovies"
                  ? "-translate-x-6 "
                  : "group-hover:-translate-x-6 hidden group-hover:block translate-x-12 "
              }`}
            >
              <VscArrowCircleRight />
            </span>
          </Link>

          <Link
            href={
              "/nextpage?endpointName=animeMovie&pageNo=1&title=Anime+Movies&type=movie"
            }
            className={`text-2xl flex items-center justify-between   hover:pl-6 py-2 rounded-lg mb-2  font-normal hover:font-semibold
        
        transition-all duration-200 group overflow-hidden 
        ${
          isAcitveNextPage == "/nextpage/animeMovie"
            ? "bg-gradient-to-r from-red-700 to-orange-500 pl-6  font-semibold  hover:opacity-100"
            : "hover:bg-gradient-to-r from-red-700 to-orange-500 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100"
        }
        `}
          >
            Anime Movies
            <span
              className={` block ${
                isAcitveNextPage == "/nextpage/animeMovie"
                  ? "-translate-x-6 "
                  : "group-hover:-translate-x-6 hidden group-hover:block translate-x-12 "
              }`}
            >
              <VscArrowCircleRight />
            </span>
          </Link>

          <h1 className="mt-2 text-md opacity-55">Streaming Services</h1>
          <Link
            href={
              "/nextpage?endpointName=netflix&pageNo=1&title=Netflix&type=tv"
            }
            className={`text-2xl pl-2 border-l-[3px]  flex items-center justify-between   hover:pl-6 py-2 rounded-r-md   mb-2 font-normal hover:font-semibold
        
        transition-all duration-200 group overflow-hidden
        ${
          isAcitveNextPage == "/nextpage/netflix"
            ? "bg-gradient-to-r from-red-700 to-red-500 font-semibold opacity-100  pl-6"
            : "hover:bg-gradient-to-r from-red-700 to-red-500 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100"
        }
        
        `}
          >
            Netflix
            <span
              className={` block ${
                isAcitveNextPage == "/nextpage/netflix"
                  ? "-translate-x-6 "
                  : "group-hover:-translate-x-6 hidden group-hover:block translate-x-12 "
              }`}
            >
              <SiNetflix />
            </span>
          </Link>

          <Link
            href={"/nextpage?endpointName=amazon&pageNo=1&title=Amazon&type=tv"}
            className={`text-2xl pl-2 border-l-[3px]  flex items-center justify-between   hover:pl-6 py-2 rounded-r-md   mb-2 font-normal hover:font-semibold
        transition-all duration-200 group overflow-hidde
        ${
          isAcitveNextPage == "/nextpage/amazon"
            ? "bg-gradient-to-r from-blue-700 to-blue-400 pl-6 font-semibold opacity-100"
            : "hover:bg-gradient-to-r from-blue-700 to-blue-400 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100"
        }
        `}
          >
            Amazon
            <span
              className={` block ${
                isAcitveNextPage == "/nextpage/amazon"
                  ? "-translate-x-6 "
                  : "group-hover:-translate-x-6 hidden group-hover:block translate-x-12 "
              }`}
            >
              <SiPrimevideo fontSize={30} />
            </span>
          </Link>

          <Link
            href={
              "/nextpage?endpointName=disneyPlus&pageNo=1&title=Disney+Hotstar&type=tv"
            }
            className={`text-2xl pl-2 border-l-[3px]  flex items-center justify-between   hover:pl-6 py-2 rounded-r-md   mb-2  font-normal hover:font-semibold
        transition-all duration-200 group overflow-hidden
        ${
          isAcitveNextPage == "/nextpage/disneyPlus"
            ? "bg-gradient-to-r from-blue-600 to-blue-800 pl-6 font-semibold opacity-100"
            : " hover:bg-gradient-to-r from-blue-600 to-blue-800 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100"
        }
        `}
          >
            Disney Hotstar
            <span
              className={` block ${
                isAcitveNextPage == "/nextpage/disneyPlus"
                  ? "-translate-x-6 "
                  : "group-hover:-translate-x-6 hidden group-hover:block translate-x-12 "
              }`}
            >
              <TbBrandDisney />
            </span>
          </Link>

          <Link
            href={
              "/nextpage?endpointName=appleTv&pageNo=1&title=Apple+TV&type=tv"
            }
            className={`text-2xl pl-2 border-l-[3px]  flex items-center justify-between   hover:pl-6 py-2 rounded-r-md   mb-2  font-normal hover:font-semibold
        transition-all duration-200 group overflow-hidden
        ${
          isAcitveNextPage == "/nextpage/appleTv"
            ? "bg-gradient-to-r  from-gray-700 to-gray-400  pl-6 font-semibold opacity-100"
            : "hover:bg-gradient-to-r  from-gray-700 to-gray-400 hover:font-semibold  hover:pl-6 opacity-70 hover:opacity-100"
        }
        `}
          >
            Apple TV
            <span
              className={` block ${
                isAcitveNextPage == "/nextpage/appleTv"
                  ? "-translate-x-6 "
                  : "group-hover:-translate-x-6 hidden group-hover:block translate-x-12 "
              }`}
            >
              <SiAppletv />
            </span>
          </Link>

          <div className={`${openNav == true ? "block w-full" : "hidden"}`}>
           {user ? (
            <>
             <button
              onClick={() => router.push("watchlater")}
              className={`text-2xl pl-2  flex items-center justify-between   hover:pl-6 py-2 rounded-md opacity-70  mb-2  font-normal hover:font-semibold transition-all duration-200 group overflow-hidden hover:bg-violet-500 w-full `}
            >
              Watch Later
              <span
                className={` block ${"group-hover:-translate-x-6 hidden group-hover:block translate-x-12 "}`}
              >
                <MdOutlineWatchLater />
              </span>
            </button>

            <button
              className={`text-2xl pl-2  flex items-center justify-between   hover:pl-6 py-2 rounded-md opacity-70  mb-2  font-normal hover:font-semibold transition-all duration-200 group overflow-hidden hover:bg-teal-500 w-full `}
              onClick={() => router.push("/profile")}
            >
              Edit Profile
              <span
                className={` block ${"group-hover:-translate-x-6 hidden group-hover:block translate-x-12 "}`}
              >
                <FaUserEdit />
              </span>
            </button>
            <button
              onClick={logOut}
              className={`text-2xl pl-2  flex items-center justify-between   hover:pl-6 py-2 rounded-md opacity-70  mb-2  font-normal hover:font-semibold transition-all duration-200 group overflow-hidden hover:bg-rose-500 w-full `}
            >
              Log Out
              <span
                className={` block ${"group-hover:-translate-x-6 hidden group-hover:block translate-x-12 "}`}
              >
                <TbLogout2 />
              </span>
            </button>
            </>
           ):
           (
            <>
              <button
              onClick={()=>router.push('/login')}
              className={`text-2xl pl-2  flex items-center justify-between   hover:pl-6 py-2 rounded-md opacity-70  mb-2  font-normal hover:font-semibold transition-all duration-200 group overflow-hidden hover:bg-lime-500 w-full `}
            >
              Log In
              <span
                className={` block ${"group-hover:-translate-x-6 hidden group-hover:block translate-x-12 "}`}
              >
                <TbLogin />
              </span>
            </button> <button
              onClick={()=>router.push('/sighup')}
              className={`text-2xl pl-2  flex items-center justify-between   hover:pl-6 py-2 rounded-md opacity-70  mb-2  font-normal hover:font-semibold transition-all duration-200 group overflow-hidden hover:bg-blue-500 w-full `}
            >
              Sign Up
              <span
                className={` block ${"group-hover:-translate-x-6 hidden group-hover:block translate-x-12 "}`}
              >
                <FaRegUser />
              </span>
            </button> 
            </>
           )
           }
          </div>
        </div>
      </div>

      <div
        className={`hidden lg:flex flex-col   bg-gray-800/40 rounded-xl h-[160px] w-full  p-1.5
     ${openNav == true && "w-full items-center "}
     items-center justify-between `}
      >
        <div className="w-full flex items-center  ">
          <div className=" flex items-center ml-2 rounded-full">
            <img
              className="w-[70px] h-[70px] object-cover rounded-full"
              src={
                user?.photoURL ||
                "https://images.unsplash.com/photo-1708844897353-649da595a3f2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={user?.displayName || "User"}
            />
            <div className="pl-4 w-full flex flex-col gap-[.2px]">
              <h1 className="font-regular px-1 leading-6 text-lg">
                {!user || user.displayName == null
                  ? "hi there"
                  : user.displayName}
              </h1>
              <div className={`opacity-50`}>
                {user ? (
                  <>
                    {!isProfilePath ? (
                      <button
                        onClick={() => router.push("/profile")}
                        className="hover:bg-gray-700 cursor-pointer px-1 transition-all duration-200 rounded-[3px] flex  text-md  items-center gap-2 "
                      >
                        <FaUserEdit />
                        <p>Edit Profile</p>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => router.push("/")}
                          className="hover:bg-gray-700 cursor-pointer px-1 transition-all duration-200 rounded-[3px] min-w-[100px] my-[1px] flex  text-md  items-center gap-2 "
                        >
                          <IoHomeOutline />
                          <p>Go Home</p>
                        </button>
                      </>
                    )}
                    <button
                      className="flex hover:bg-gray-700 px-1 items-center rounded-[3px] min-w-[100px] my-[1px] gap-2"
                      onClick={() => router.push("watchlater")}
                    >
                      <MdOutlineWatchLater /> Watch Later
                    </button>
                    <button
                      onClick={logOut}
                      className="flex hover:bg-red-900/70 items-center px-1 gap-2 rounded-[3px] min-w-[100px] my-[1px] text-md"
                    >
                      <TbLogout2 />
                      <p>Logout</p>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => router.push("/login")}
                      className="flex hover:bg-gray-700 px-1 items-center gap-2 rounded-[3px] min-w-[100px] my-[1px] text-md"
                    >
                      <TbLogin />
                      <p>Log In</p>
                    </button>
                    <button
                      onClick={() => router.push("/signup")}
                      className="flex hover:bg-gray-700 px-1 items-center gap-2 rounded-[3px] min-w-[100px] my-[1px] text-md"
                    >
                      <FaRegUser />
                      <p>Sign Up</p>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <SearchInput />
      </div>
    </div>
  );
};

export default Navbar;
