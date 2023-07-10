import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connectDB from './mongodb/connect.js';
dotenv.config();

import dalleRoute from './mongodb/routes/dalleRoute.js'
import postRoute from './mongodb/routes/postRoute.js'
const app=express()
app.use(express.json({limit:'40mb'}))
app.use(cors(
  {
    origin:"*"
  }
))

app.use("/api/v1/dalle",dalleRoute)
app.use("/api/v1/post",postRoute)
app.get('/',(req,res)=>{
  res.send('Hello from dalle')
})
const server=async()=>{
  try{
    connectDB(process.env.MONGO_URI),
    app.listen(4000,()=>console.log('server has started'))
  }
  catch(err){
    console.log(err)
  }
  
}
server()