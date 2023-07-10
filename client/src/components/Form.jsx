import React from 'react'

const Form = ({LabelName,type,value,placeholder,name,
handlechange,isSurpriseMe,handleSurpriseMe}) => {
  return (
    <div>

    <div className='flex flex-col xs:flex-row  justify-start items-center gap-2 mb-2 '>
      
      <label 
        htmlFor={name}
        >
        {LabelName}
      </label>
      {isSurpriseMe && (
        <button onClick={handleSurpriseMe}
        type="button" 
        className='rounded-md py-2 bg-slate-200 border-solid px-2 mx-2 md:mx-4'>Surprise Me</button>
      )}
    </div>
    <input type={type} value={value} placeholder={placeholder} id={name} name={name} onChange={handlechange}
    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] truncate outline-none block w-full p-3'></input>
   
    </div>
    
  )
}

export default Form