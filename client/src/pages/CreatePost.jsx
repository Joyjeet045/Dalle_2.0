import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import {Form,Loader} from '../components'
const CreatePost = () => {
  const navigate=useNavigate();
  //to nav. back to ur home back on post
  const [form,setForm]=useState({
    name:'',
    prompt:'',
    photo:''
  })
  const url='http://localhost:4000/'
  const [generatingImg,setgeneratingImg]=useState(false)
  const [loading,setLoading]=useState(false)
  const generateImage=async()=>{
      if(form.prompt){
        try{
          //starts generating
          setgeneratingImg(true)
          const response=await axios.post(url+'api/v1/dalle',
            JSON.stringify({prompt:form.prompt})
          ,
            {headers:{
              'Content-type':'application/json',
            }, 
          })
          const data=await response.data
          setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})
          //to convert into base64 url encoded
          // data:[<mediatype>][;base64],<data>
        }
        catch(err){
          alert(err)
        }
        finally{
          setgeneratingImg(false)
        }
      }
      else{
        alert('Please enter a prompt')
      }
  }
  const handlesubmit=async(e)=>{
    e.preventDefault()
    if(form.prompt && form.photo){
      setLoading(true)
      try {
        const response = await fetch(url+'api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });
        await response.json()
        alert('Success')
        navigate('/')
      }
      catch(err){
        alert(err.message)
      }
      finally{
        setLoading(false)
      }
    }
    else{
      alert("Please enter a prompt")
    }
    
  }
  const handlechange=(e)=>{
    //updating some specific props
    //e.target is the focussed object
    //.name gives that field(see where we had made the form)
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSurpriseMe=()=>{
    const randomPrompt=getRandomPrompt(form.prompt)
    setForm({...form,prompt:randomPrompt})
  }
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
      <h1 className='text-3xl font-normal hover:font-bold'>
            Create
        </h1>
        <p className='mt-2 text-[#34333369] max-w-[500px]'>
         Create unreal and oddly satisfying images with Dalle and share 
         with the community <span className='text-[#9d2fbf] text-2xl'>Dalle's power</span>
        </p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handlesubmit}>
        <div className='flex flex-col gap-5'>
          <Form LabelName="Your name" type="text" value={form.name} name="name" placeholder="Type here"
          handlechange={handlechange}/>
          <Form LabelName="Your prompt" type="text" value={form.prompt} name="prompt" placeholder="3D render of a cute tropical fish in an aquarium on a dark blue background, digital art"
          handlechange={handlechange} isSurpriseMe handleSurpriseMe={handleSurpriseMe}/>
        </div>
        <div className='relative border border-gray-300 w-64 p-3 my-4 flex justify-center items-center bg-gray-50 focus:ring-blue-500 focus:border-blue-500'>
            {form.photo?(
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain'/>
            ):<img src={preview} className='w-7/12 h-7/12 object-contain opacity-40'/>}
            {generatingImg && (
              <div className='absolute inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader/>
              </div>
            )}
        </div>
        <div className='mt-5 flex gap-5'>
          <button type="button" onClick={generateImage} className='text-white bg-green-700 font-medium rounded-md text-sm w-full p-3 text-center
          sm:w-auto sm:px-5 sm:py-2.4'>
              {generatingImg?'Generating...':'Generate'}
          </button>
        </div>
      <div className='mt-10'>
        <p className='text-[14px] text-[#666e75]'>Once you have create an image,you can share it with others in the community</p> 
        <button
          type="submit" className='mt-3 w-full flex justify-center items-center bg-[#7965e0] py-2 rounded-md text-white sm:w-auto sm:px-5 sm:py-2.4'> 
            {loading?'Loading...':'Share with communtiy'}
          </button>
      </div>
      </form>
    </section>
  )
}

export default CreatePost