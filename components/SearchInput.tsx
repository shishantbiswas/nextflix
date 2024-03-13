import {  usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'

const SearchInput = () => {
  const router = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()
  
  
  const [searchQuery, setSearchQuery] = useState('')
  const [placeholderValue, setPlaceholderValue] = useState(params.get('query'))
  const [active, setActive] = useState(false)

  const submitHandler =(event:any)=>{
    event.preventDefault();
    if(searchQuery){
      const encodedQuery = encodeURIComponent(searchQuery.replace(/\s/g, '+'));
    router.push(`/search?query=${encodeURIComponent(encodedQuery)}`)
    }else {
      setActive(true)
    }
  }

  return (
    <div className={`relative`}>
    <form
    className='flex  justify-center items-center w-[250px]'
    onSubmit={submitHandler}>
      <input 
      className='h-10 w-full rounded-full mr-2 bg-gray-700 text-white outline-none px-4'
      type="text" 
      placeholder={placeholderValue? placeholderValue :'Search...'}
      onChange={(e) => {setSearchQuery(e.target.value);setActive(false)}}     
      />
       <button 
      className='border  p-2 rounded-full hover:bg-red-600 transition-all '
      ><IoSearch size={20}  />
      </button>
    </form>
    <div>
      {active && (
        <div className={`transition-all absolute  rounded-full left-0 w-[250px] h-10 bg-red-600 flex items-center justify-center font-nsans-regular ${pathname=='/' ? '-top-12':'top-12'}`}>
          <h1 className='capitalize'>Can&apos;t Do empty Searches !</h1>
        </div>
      )}
     </div>
    </div>
  )
}

export default SearchInput
