'use server'

import AnimeRow from "@/components/AnimeRow";
import FancyBtn from "@/components/FancyBtn";
import Link from "next/link";

export default async function Page({ params }: { params: { pageNo: number } }) {
  let pageNo = params.pageNo

  const animeApi = `https://anime-api.xyz/page-${pageNo}`
    const data = await getData(animeApi)      
  return (
  <div>
    <AnimeRow  data={data}/>  
      <Link href={`/anime/${++pageNo}`}>
        <FancyBtn text="next page" hoverText="Next page" />
      </Link>
  </div>
  )
}

async function getData(endpoint:string) {
  const res = await fetch(endpoint)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
