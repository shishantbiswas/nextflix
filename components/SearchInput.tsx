import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'

const SearchInput = () => {
  const router = useRouter()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [value, setValue] = useState('')
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
    <div className='relative'>
    <form
    className='flex  justify-center items-center w-[250px] mr-4'
    onSubmit={submitHandler}>
      <input 
      className='h-10 w-full rounded-full mr-2 bg-gray-700 text-white outline-none px-4'
      type="text" 
      placeholder={value? value :'Search...'}
      onChange={(e) => {setSearchQuery(e.target.value);setActive(false)}}     
      />
       <button 
      className='border  p-2 rounded-full hover:bg-red-600 transition-all '
      ><IoSearch size={20}  />
      </button>
    </form>
    <div>
      {active && (
        <div className='transition-all  absolute top-12 rounded-full left-0 w-[240px] h-10 bg-red-600 flex items-center justify-center font-nsans-regular'>
          <h1 className='capitalize'>Please enter a search request !</h1>
        </div>
      )}
     </div>
    </div>
  )
}

export default SearchInput
