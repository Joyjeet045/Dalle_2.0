import React,{useState,useEffect} from 'react'
import { Loader,Form,Card } from '../components'
const RenderCards=({data,title})=>{
  //note this technique of applying . after ?
  if(data?.length>0){
    return (data.map((post)=><Card key={post._id} {...post}/>))
  }
  
  return <h2 className='mt-10 text-purple-600 shadow-md text-center'>{title}</h2>
  
}
const Home = () => {
  const [loading,setLoading] = useState(false)
  const [posts,setPosts]=useState(null)
  const [searchText,setSearchText]=useState('')
  const [results,setResults]=useState(null)
  const [searchtime,setSearchTime]=useState(null)
  const url='http://localhost:4000/'

  const fetchPosts=async()=>{
  setLoading(true);
  try{
    const response=await fetch(url+'api/v1/post',{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(response.ok){
      const result=await response.json()
      //our response object has a success and a data field
      setPosts(result.data.reverse())
    }
  }
  catch(err){
    alert(err)
  }
  finally{
    setLoading(false)
  }
}
useEffect(()=>{
  fetchPosts()},[])

const handlesearch=(e)=>{
  //to clear when we type again
  clearTimeout(searchtime)
  setSearchText(e.target.value)
  setSearchTime(
    
      setTimeout(() => {
        const searchResult = posts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setResults(searchResult);
      }, 500),
  )
}
    
  return (
    <section className='container w-full mx-auto'>
      <div>
        <h1 className='text-3xl font-normal hover:font-bold cursor-pointer'>
            The Community Showcase
        </h1>
        <p className='mt-2 text-[#34333369] max-w-[500px]'>
          Browse through an imaginative collection of visually stunning images generated
          by  <span className='text-[#9d2fbf] text-2xl'>Dalle's power</span>
        </p>
        
        <div className='mt-16'>
          <Form name="text" type="text" handlechange={handlesearch}
          placeholder="Search Posts" value={searchText} LabelName="Search posts"/>
        </div>
        <div className='mt-10'>
        {/* if loading display the loader */}
          {loading?(
             <div cl6assName='flex justify-center items-center'>
                <Loader/>
             </div>
          ):(<>
          {/* here display the showing results if search is set else just display the existing all cards  */}
            {
              searchText && (
                <h2 className='mb-3 text-2xl font-semibold'>Showing results for <span>{searchText}</span></h2>
              )
            }
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2
            grid-cols-1 gap-3'>
              {searchText?<RenderCards data={results} title='No results found'/>:(
                <RenderCards data={posts} title="no posts found"/>
              )}
            </div>
          </>)
         
          }
        </div>
      </div>
    </section>
  )
}

export default Home