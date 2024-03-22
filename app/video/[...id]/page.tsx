import Player from "../../../components/Player";

export async function generateMetadata({ params }: { params: { id: [string,number] } }) {

  const key = process.env.NEXT_PUBLIC_TMDB_KEY;
  const id = params.id[1];
  const type = params.id[0];
  const currentMovie = `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}`;
  const data = await getData(currentMovie);

  return {
    title: `${data.title || data.name} - Nextflix`,
    description: "Nextflix clone built with Next.js and Tailwind CSS",
  };
}

export default async function Page({
  params,
}: {
  params: { id: [String, number] };
}) {
  const key = process.env.NEXT_PUBLIC_TMDB_KEY;
  const id = params.id[1];
  const type = params.id[0];
  const currentMovie = `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}`;
  const recommend = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${key}`;

  const data = await getData(currentMovie);
  const recommendation = await getData(recommend);

  
  const apiSrc = "https://vidsrc.to/embed/movie/";
  const twoEmbedApi = "https://www.2embed.cc/embed/";
  const superApi = "https://multiembed.mov/?video_id=";
  const smashystream = "https://embed.smashystream.com/playere.php?tmdb=";

  const url = apiSrc+id;
  return (
    <>
      <div>
        <Player
          data={data}
          mediaType={type}
          tmdbId={id}
          recommendation={recommendation.results}
        />
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

