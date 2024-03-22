'use client'
import { UserAuth } from "../context/AuthContext";
import { createImageUrl } from "../services/apiEndpoint";
import { db } from "../services/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";


export default function Player({data,mediaType,tmdbId,recommendation}:{data:any,mediaType:any,tmdbId:number,recommendation:any}){

  const {user} = UserAuth()
  const router = useRouter();

  const apiSrc = "https://vidsrc.to/embed/movie/";
  const twoEmbedApi = "https://www.2embed.cc/embed/";
  const superApi = "https://multiembed.mov/?video_id=";
  const smashystream = "https://embed.smashystream.com/playere.php?tmdb=";

  //tv embedding api
  const twoEmbedtvApi = "https://www.2embed.cc/embedtvfull/";
  const vidsrcTvapi = "https://vidsrc.to/embed/tv/";

    const [movieData, setMovieData] = useState({});
    const [modal, setModal] = useState(false);
    const [like, setLike] = useState(false); 
    const [selectedOption, setSelectedOption] = useState("Vidsrc");
    const [embed, setEmbed] = useState( mediaType == "movie"
    ? apiSrc + tmdbId
    : vidsrcTvapi + tmdbId)

  

    const markWatchLater = async(data:any)=>{
        const userEmail = user?.email;
        if (userEmail) {
          const userDoc = doc(db,'users',userEmail)
          setLike(!like)
          await updateDoc(userDoc,{
            watchLater:arrayUnion({...data}),
          })
        }else(alert("Login to save Movies and Shows to Watch Later"))
      }

      

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        const apiMap: { [key: string]: { [key: string]: string } } = {
          movie: {
            Vidsrc: apiSrc,
            "2Embed": twoEmbedApi,
            SuperEmbed: superApi,
            SmashyStream: smashystream,
          },
          tv: {
            VidsrcTV: vidsrcTvapi,
            "2EmbedTv": twoEmbedtvApi,
          },
        };
    
        let selectedApi = null;
        if (mediaType !== null && selectedOption !== null) {
          selectedApi = apiMap[mediaType]?.[selectedOption];
        }
        if (selectedApi) {
          setEmbed(selectedApi + tmdbId);
        }
      };
      const recommendedMovie = (e: any) => {
        router.push(`/video/${mediaType}/${e.id}/`);
      };

    const {title,overview,type,genres,homepage,name} = data
    return(
        <>
          <div >
          <header className="w-full h-[260px] sm:h-[300px] md:h-[400px] lg:h-[600px] outline-none">
            <iframe
              allowFullScreen={true}
              className="w-full h-full bg-black overflow-hidden"
              src={embed}
            ></iframe>
          </header>
        <div className="w-[100%] p-4 lg:pr-8 outline-none">

          <section className="lg:flex mt-8 rounded-md justify-between p-4 bg-gray-900 ">
            <div className="lg:w-[40%]  lg:pr-4  ">
              <div className=" sticky top-5 p-4 bg-black/20 rounded-xl">
                <div>
                  <div>
                    <div>
                      <p className="text-xl mb-3 font-semibold">
                        Currently Viewing
                      </p>
                      <h1 className="text-5xl font-semibold lg:mb-4">
                        {title ? title : name}
                      </h1>
                      <p className="text-lg ">Overview : </p>
                      <h1 className="text-md leading-tight opacity-70">
                        {overview}
                      </h1>
                      {type && <h1 className="text-sm opacity-75">{type}</h1>}
                      <div className="text-md mt-2">
                        <h1>Categories :</h1>
                        <h1 className="flex gap-2 opacity-60">
                          {genres?.map((e: { name: string; id: number }) => (
                            <p key={e.id}>{e.name}</p>
                          ))}
                        </h1>
                        {homepage && (
                          <>
                            <div className="mt-2 lg:block hidden">
                              <a href={homepage}>
                                Official website : <br />
                                <span className="underline opacity-60">
                                  {homepage}
                                </span>
                              </a>
                            </div>
                          </>
                        )}
                      </div>
                      

                      <div className="w-full h-full mt-4 ">
                        <form
                          className=" w-full transition-all hover:opacity-100 "
                          onSubmit={handleSubmit}
                        >
                          <label className="text-2xl mb-4 ">
                            <span className="flex gap-1">
                              Choose Provider
                              <FaCircleInfo
                                onClick={() => setModal(true)}
                                size={15}
                              />
                            </span>
                            <select
                              className="text-xl my-1 p-2 bg-black/50 border rounded-lg  hover:text-black hover:bg-white w-full text-center outline-none"
                              value={selectedOption}
                              onChange={(e) =>
                                setSelectedOption(e.target.value)
                              }
                            >
                              {mediaType == "tv" ? (
                                <>
                                  <option value="VidsrcTV">TV Vidsrc</option>
                                  <option value="2EmbedTv">2Embed TV</option>
                                </>
                              ) : (
                                <>
                                  <option value="Vidsrc">Vidsrc</option>
                                  <option value="2Embed">2Embed</option>
                                  <option value="SuperEmbed">
                                    Super Embed
                                  </option>
                                  <option value="SmashyStream">
                                    Smashy Stream
                                  </option>
                                </>
                              )}
                            </select>
                          </label>
                          <br />
                          <button
                            type="submit"
                            className="my-2 text-xl p-2 w-full rounded-lg bg-white text-black overflow-hidden"
                          >
                            Confirm
                          </button>
                        </form>
                      </div>
                      <div className="my-5 gap-2 flex flex-col sm:flex-row font-bold">
                      <Link
                          href="/"
                          className="text-md sm:text-lg flex items-center gap-2 p-2 text-center px-3 border  hover:bg-white hover:text-black transition-all rounded-lg"
                        >
                          <IoHome/>
                          Back To Home
                        </Link>
                        <button
                          onClick={()=>markWatchLater(data)}
                          className="text-md sm:text-lg border flex items-center gap-2 p-2 px-3 hover:bg-white hover:text-black transition-all rounded-lg"
                        >
                      <MdOutlineWatchLater />
                       Watch Later
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-[60%]">
              <div className=" sm:p-3 ">
                <h1 className=" text-lg sm:text-3xl font-semibold mb-8">
                  {mediaType == "movie"
                    ? "Recommended Movies"
                    : "Recommended TV Shows"}
                </h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 md:gap-4 ">
                  {recommendation?.map((e: any) => (
                    <div key={e.id} className=" w-full mb-12">
                      <img
                        className="object-cover rounded-md w-full "
                        src={createImageUrl(e.poster_path, "w500")}
                        alt={e.name || e.title}
                      />
                      <div className="flex flex-col justify-between  min-h-[calc(500px+100px)]">
                        <div>
                          <h1 className="text-3xl font-semibold mt-4">
                            {e.title || e.name}
                          </h1>
                          <p className="leading-tight opacity-60 mt-2">
                            {e.overview}
                          </p>
                          <p className="opacity-60  mt-4">
                            Released In {e.release_date || e.first_air_date}
                          </p>
                          <p className="opacity-60 my-0.5">
                            Average Voting {e.vote_average}
                          </p>
                        </div>
                        <div className="w-full mt-4 flex flex-col gap-2">
                        <button
                          className="bg-white flex items-center justify-center gap-2 text-black hover:text-white hover:bg-black transition-all duration-50 text-sm sm:text-xl capitalize font-semibold rounded-xl sm:px-4 py-2 w-full text-center"
                          onClick={() => recommendedMovie(e)}
                        ><FaPlay />
                            Play This {mediaType=='movie' ? mediaType : "TV Show"}
                        </button>
                        <button
                          className="border text-white flex items-center justify-center gap-2 transition-all duration-50 text-sm sm:text-xl capitalize font-semibold rounded-xl sm:px-4 py-2 w-full text-center"
                          onClick={() => markWatchLater(e)}
                        ><MdOutlineWatchLater/>
                          Watch Later
                        </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
        </>
    )
}