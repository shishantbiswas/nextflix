(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[797],{3785:function(e,t,s){Promise.resolve().then(s.bind(s,9876))},9876:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return u}});var a=s(7437),l=s(2173),n=s(4033),c=s(2265),r=s(6273),i=s(1546),o=e=>{let{movie:t}=e,s=(0,n.useRouter)(),{Title:l,title:c,imdbID:o,backdrop_path:d,poster_path:u,Poster:m,id:h,release_date:x}=t;return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:"relative min-h-[180px] min-w-[300] align-middle  lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2   transition-all",children:[(0,a.jsx)("img",{className:"sm:w-[300px] md:w-full lg:w-[370px]  h-[200px] object-cover object-top",src:m||(0,r.o)(null!=d?d:u,"w500"),alt:l||c}),(0,a.jsxs)("div",{className:"absolute h-full top-0 left-0 w-full transition-all bg-black/80 opacity-0 hover:opacity-100 px-3",children:[(0,a.jsxs)("p",{className:"whitespace-normal text-md md:text-sm flex justify-start pt-3 items-start h-full font-nsans-bold flex-col",children:[l||c,(0,a.jsx)("br",{}),(0,a.jsx)("span",{className:" font-nsans-light",children:x})]}),(0,a.jsxs)("button",{onClick:()=>{s.push("/video?id=".concat(h||o))},className:"absolute bottom-4 left-4 flex items-center justify-center",children:[(0,a.jsx)(i.sT9,{size:50}),(0,a.jsx)("h1",{className:"pl-2",children:"Play Now"})]})]})]})})},d=s(31),u=()=>{let e=(0,n.useSearchParams)(),[t,s]=(0,c.useState)([]),[r,i]=(0,c.useState)([]);return(0,c.useEffect)(()=>{l.Z.get("https://api.themoviedb.org/3/search/movie?query=".concat(e.get("query"),"&api_key=").concat("c3461f21e07062aa64bd4cbc049b2d98")).then(e=>{s(e.data.results)})},[e.get("query")]),(0,c.useEffect)(()=>{l.Z.get("".concat("http://www.omdbapi.com/?apikey=3301b064&","s=").concat(e.get("query"))).then(e=>{i(e.data.Search)})},[e.get("query")]),(0,a.jsxs)("div",{children:[(0,a.jsx)(d.default,{}),(0,a.jsxs)("div",{className:" pt-20",children:[(0,a.jsx)("h1",{className:"text-3xl pl-2 text-gray-300 mb-3 font-bold ",children:"Omdb Search Result"}),null==r?void 0:r.map(e=>(0,a.jsx)(o,{movie:e},e.id)),(0,a.jsx)("h1",{className:"text-3xl pl-2 text-gray-300 mb-3 font-bold mt-6",children:"Tmdb Search Result"}),null==t?void 0:t.map(e=>(0,a.jsx)(o,{movie:e},e.id))]})]})}},31:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return u}});var a=s(7437),l=s(2265),n=s(3402),c=s(4033),r=s(4932),i=()=>{let e=(0,c.useRouter)(),[t,s]=(0,l.useState)(""),[n,i]=(0,l.useState)(""),[o,d]=(0,l.useState)(!1);return(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsxs)("form",{className:"flex  justify-center items-center",onSubmit:s=>{if(s.preventDefault(),t){let s=encodeURIComponent(t.replace(/\s/g,"+"));e.push("/search?query=".concat(encodeURIComponent(s)))}else d(!0)},children:[(0,a.jsx)("input",{className:"h-10 rounded-full mr-2 bg-gray-700 text-white outline-none px-4",type:"text",placeholder:n||"Search...",onChange:e=>{s(e.target.value),d(!1)}}),(0,a.jsx)("button",{className:"border  p-2 rounded-full hover:bg-red-600 transition-all ",children:(0,a.jsx)(r.eaK,{size:20})})]}),(0,a.jsx)("div",{children:o&&(0,a.jsx)("div",{className:"transition-all  absolute top-12 rounded-full left-0 w-[280px] h-10 bg-red-600 flex items-center justify-center font-nsans-regular",children:(0,a.jsx)("h1",{className:"capitalize",children:"Please enter a search request !"})})})]})},o=s(1396),d=s.n(o),u=()=>(0,a.jsxs)("div",{className:"absolute w-full flex items-center justify-between sm:flex pt-3 px-4 z-30 bg-gradient-to-b from-black ",children:[(0,a.jsxs)(d(),{href:"/",children:[(0,a.jsx)("h1",{className:"text-red-600 hidden sm:block font-bold cursor-pointer text-5xl",children:"Nextflix"}),(0,a.jsx)("div",{className:"border-2 rounded-full p-2 sm:hidden",children:(0,a.jsx)(n.SHD,{size:20})})]}),(0,a.jsx)("div",{className:"flex justify-center items-center ",children:(0,a.jsx)(i,{})})]})},6273:function(e,t,s){"use strict";s.d(t,{o:function(){return n}});let a="c3461f21e07062aa64bd4cbc049b2d98",l="https://api.themoviedb.org/3";function n(e,t){return"https://image.tmdb.org/t/p/".concat(t,"/").concat(e)}"".concat(l,"/movie/popular?api_key=").concat(a),"".concat(l,"/movie/top_rated?api_key=").concat(a),"".concat(l,"/movie/popular?api_key=").concat(a,"&language=en-US&page=2"),"".concat(l,"/movie/upcoming?api_key=").concat(a)}},function(e){e.O(0,[51,706,259,75,971,938,744],function(){return e(e.s=3785)}),_N_E=e.O()}]);