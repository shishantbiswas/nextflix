import React from 'react'

const FancyBtn = ({style,text,hoverText}:{style?:any,text:string,hoverText:string}) => {

    const styles = style

    return (
    <div>
      <button
      style={styles}
      className="border group relative w-[400px] text-4xl hover:w-[340px] h-[70px] hover:rounded-full overflow-hidden rounded-xl transition-all hover:border-none capitalize font-medium  
      hover:font-semibold
      hover:bg-gradient-to-r from-cyan-700 to-blue-800
      ">
        
        <span className="absolute  inset-0 transition-transform translate-y-3 duration-[350ms] ease-in-out group-hover:-translate-y-full ">
        {text}
        </span>

        <span className='absolute inset-0 transition-transform duration-[350ms] translate-y-full group-hover:translate-y-3 '>
        {hoverText}
        </span>
      </button>
    </div>
  )
}

export default FancyBtn
