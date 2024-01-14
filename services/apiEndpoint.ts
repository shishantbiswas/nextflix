const key = process.env.NEXT_PUBLIC_TMDB_KEY

const baseUrl = "https://api.themoviedb.org/3"

const endpoint = {
    popular:`${baseUrl}/movie/popular?api_key=${key}`,
    topRated:`${baseUrl}/movie/top_rated?api_key=${key}`,
    trending:`${baseUrl}/movie/popular?api_key=${key}&language=en-US&page=2`,
    upcoming:`${baseUrl}/movie/upcoming?api_key=${key}`,
    vidsrc:'https://vidsrc.to/embed/movie/'
}

export function createImageUrl(filename : string ,size : any){
    return`https://image.tmdb.org/t/p/${size}/${filename}`
}

export default endpoint;