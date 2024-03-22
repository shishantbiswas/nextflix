import Result from "../../../components/Result";

export async function generateMetadata({ params }: { params: { query: [string,string] } }) {

  const type  = params.query[0]
const searchTerm = params.query[1]

  return {
    title: `'${searchTerm}' in ${type=="movie"?"Movie":"TV Shows"} - Nextflix`,
    description: "Nextflix clone built with Next.js and Tailwind CSS",
  };
}
export default async function Query({params}:{params:any}){

  const key = process.env.NEXT_PUBLIC_TMDB_KEY;
  const type  = params.query[0]
const searchTerm = params.query[1]
const pageNo = params.query[2]

  const api = `https://api.themoviedb.org/3/search/${type}?query=${searchTerm}&api_key=${key}${pageNo ? `&page=${pageNo}` : ``}`
    const data = await getData(api)
        
    return(
        <>
         <Result type={type} data={data} page={pageNo} search={searchTerm} />
        </>
    )
}
async function getData(endpoint: string) {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }