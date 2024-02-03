const key = process.env.NEXT_PUBLIC_TMDB_KEY

const baseUrl = "https://api.themoviedb.org/3"

const endpoint = {
    //odd 
    popular:`${baseUrl}/movie/popular?api_key=${key}`,
    trending:`${baseUrl}/trending/all/day?api_key=${key}&region=US`,
    upcoming:`${baseUrl}/movie/upcoming?api_key=${key}`,
    
    vidsrc:'https://vidsrc.to/embed/movie/',
    //new
    topRatedMovies:`${baseUrl}/movie/top_rated?api_key=${key}`,
    popularTvShows:`${baseUrl}/tv/popular?api_key=${key}&region=US&with_original_language=en`,
    airingTodayTvShows:`${baseUrl}/tv/airing_today?api_key=${key}&region=US&with_original_language=en`,
    netflix:`${baseUrl}/discover/tv?api_key=${key}&with_networks=213`,
    amazon:`${baseUrl}/discover/tv?api_key=${key}&with_networks=1024`,
    disneyPlus:`${baseUrl}/discover/tv?api_key=${key}&with_networks=2739`,
    hulu:`${baseUrl}/discover/tv?api_key=${key}&with_networks=453`,
    appletv:`${baseUrl}/discover/tv?api_key=${key}&with_networks=2552`,
    hbo:`${baseUrl}/discover/tv?api_key=${key}&with_networks=49`,
    paramountPlus:`${baseUrl}/discover/tv?api_key=${key}&with_networks=4330`,
    peacock:`${baseUrl}/discover/tv?api_key=${key}&with_networks=3353`,
    topRatedTvShows:`${baseUrl}/tv/top_rated?api_key=${key}&region=US`,
    anime:`${baseUrl}/discover/tv?api_key=${key}&with_keywords=210024|222243`,
    animeMovie:`${baseUrl}/discover/movie?api_key=${key}&with_keywords=210024|222243`,

    jikan_popular:'https://api.jikan.moe/v4/anime?status=upcoming&sfw=true&order_by=popularity&type=movie&limit=20',
     
    //'https://api.themoviedb.org/3?language=en-US&page=1
}

export function createImageUrl(filename : string ,size : any){
    return`https://image.tmdb.org/t/p/${size}/${filename}`
}

export default endpoint;