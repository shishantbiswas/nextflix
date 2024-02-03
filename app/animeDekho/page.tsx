'use client'
import Hero from '@/components/Hero'
import ScrapeHero from '@/components/ScrapeHero'
import axios from 'axios'
import  {load}  from 'cheerio'
import React, { useEffect, useState } from 'react'

interface MovieData {
  data:{
    
    id: number;
    title: string;
    category: string[];
    image: string;
    url: string;
    type: string;
    provider:string
    
  }
}

const AnimeDekho = () => {
    const [moviesData, setMoviesData] = useState<MovieData[]>([]);
    
    
    useEffect(() => {
      axios.get('https://animedekho.com/').then((e:any)=>{
          const $ = load(e.data)
          const heroMovies = $('#home-slider  .swiper-slide');
          let dataArray:any = []; 
          
          
          heroMovies.each((index, slideElement) => {
            
            let catArry:any = []

            const titleSpan = $(slideElement).find('.entry-title').text();
            // console.log($(slideElement).html());
            

            const image = $(slideElement).find('.bg')
            const attrImg  = image.attr('style')
            const regex = /background-image:\s*url\(['"]?(.*?)['"]?\)/;
            const match = attrImg && attrImg.match(regex);
            const imageUrl = match && match[1];

            const url = $(slideElement).find('.rw');
            const urlLink = url.find('a').attr('href')  

            const categ = $(slideElement).find(".categories");
            categ.each((i,e)=>{
              const a = $(e).find('a').map((_, link) => $(link).text()).get(); 
              catArry.push(a)
            })
                                 
            const categoriesString = [catArry.join(', ')];

            dataArray.push(
                {
                 data:{
                  id:index,
                  title:titleSpan,
                  category:categoriesString,
                  image:imageUrl,
                  url:urlLink,
                  provider:'animeDekho',
                  //to do release day data
                 }
                }
                )
              });
            setMoviesData(dataArray)   
      })

      axios.get('https://vidsrc.to/embed/movie/787699').then((e:any)=>{
        const $ =load(e.data)
        console.log($('body').html());
        
      })
      
    }, [])
    // console.log('from page',moviesData);
    
   const randomMovie:MovieData = moviesData[0];
    
  return (
    <div>
    {randomMovie && <ScrapeHero data={randomMovie.data} key={randomMovie.data.id} />}
    {}
    </div>
  )
}

export default AnimeDekho
