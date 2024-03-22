import MovieRow from "../../../components/MovieRow";
import endpoint from "../../../services/apiEndpoint";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const word = params.id[0];

  const capitaziledWord = word.charAt(0).toUpperCase() + word.slice(1);

  return {
    title: `${decodeURIComponent(capitaziledWord)} - Nextflix`,
    description: "Nextflix clone built with Next.js and Tailwind CSS",
  };
}

export default async function Page({ params }: { params: any }) {
  const encodedString = params.id[0];
  const decodedString = encodedString.replace(/%20/g, "");

  let movieEndpoint: string = "";
  type EndpointKey = keyof typeof endpoint;

  Object.keys(endpoint).forEach((thisEndpointName: string) => {
    if (decodedString === thisEndpointName) {
      movieEndpoint = endpoint[decodedString as EndpointKey];
    }
  });

  const newPage = movieEndpoint + `&page=${params.id[2]}`;
  const data = await getData(newPage);

  let currentPage = params.id[2];

  return (
    <>
      <div>
        <div>
          <MovieRow
            data={data}
            type={params.id[1]}
            title={decodeURIComponent(params.id[0])}
            />
        </div>
        <div className="my-4 flex items-center justify-center">
          <div className="flex gap-4 items-center justify-center text-2xl transition-all transform duration-200">
            {currentPage > 1 && (
              <Link
                href={`/categories/${encodedString}/${params.id[1]}/${--params.id[2]}`}
              >
                <FaArrowLeft className="hover:bg-white hover:text-black rounded-full p-1" />
              </Link>
            )}
            <h1 className="capitalize text-xl">
              {currentPage} ... {data?.total_pages}
            </h1>
            {currentPage < data?.total_pages && (
              <Link
                href={`/categories/${encodedString}/${
                  params.id[1]
                }/${++currentPage}`}
              >
                <FaArrowRight className="hover:bg-white hover:text-black rounded-full p-1" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

async function getData(endpoint: string) {
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
