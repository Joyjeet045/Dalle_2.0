import express from "express";
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'

import Post from '../models/post.js'
dotenv.config()
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const router=express.Router()
//GET ALL POSTS
router.route('/').get(async(req,res)=>{
  try{
    const posts=await Post.find()
    res.status(200).json({success:true,data:posts})
  }
  catch{
    res.status(500).json({success:false,message:error})
  }
})
//CREATE A POST
router.route('/').post(async(req,res)=>{
  try{

    const {name,prompt,photo}=req.body
    const photoUrl=await cloudinary.uploader.upload(photo)
    //has an id and url
    const newPost=await Post.create({
      name,
      prompt,
      photo:photoUrl.url
    })
    await newPost.save()
    res.status(201).json({success:true,data:newPost})
  }
  catch(error){
    res.status(500).json({success:false,message:error})
  }
})
export default router