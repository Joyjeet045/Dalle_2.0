import React from 'react'
import {download} from "../assets"
import {downloadUtils} from "../utils"
const Card = ({_id,name,prompt,photo}) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img className="w-full h-auto object-contain rounded-xl" src={photo} alt={prompt}/>
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute left-0 right-0 bottom-0 bg-slate-900 p-4 rounded-md'>
        <p className='text-white text-sm overflow-y-auto'>{prompt}</p>
        <div className=' flex justify-between items-center gap-2'>
          <div className=' font-bold text-white flex justify-between items-center '>
            <h6 className='w-7 h-7 flex justify-center items-center rounded-full bg-green-900 object-cover mt-1'>
            {name[0]}</h6>
             <p className=' flex justify-center items-center mx-1  text-sm  text-white font-bold ml-4'>{name}</p>
          </div>
          
       
        <div className='flex '>
        <button type="button" onClick={
          ()=>{
            downloadUtils(_id,photo)
          }
        } className='outline-none bg-transparent border-none'>
          <img src={download} alt="Download" className='object-contain h-6 w-6 bg-white invert'/>
        </button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Card