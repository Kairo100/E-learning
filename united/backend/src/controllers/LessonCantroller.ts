import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient()
import {Request,Response} from 'express'
import express from 'express'
import cloudinary from 'cloudinary'

import dotenv from 'dotenv';
import multer from 'multer';


dotenv.config()
const lesson=express()
cloudinary.v2.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME
})
const storage=multer.diskStorage({})
const upload =multer({storage})

// const storage = multer.diskStorage({});
// const upload = multer({ storage });
lesson.post('/create',upload.single('videoUrl'),async(req:Request,res:Response)=>{
    try {
      const { title, content, sectionId } = req.body;
      const file = req.file;
      const {id}=req.params;
  
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const result = await cloudinary.v2.uploader.upload(file.path,{
        resource_type:"video"
      });
      const updating=await prisma.lesson.create({
    
        data:{
          title,
          content,
          sectionId:+sectionId,
          videoUrl:result.secure_url
        }
      })
      res.json({
        message:"Created successfully",
        updating
      })
    } catch (error) {
        console.log(error)
    }
})


export const RegisterLesson=async(req:Request,res:Response)=>{
try {
    // const 
} catch (error) {
    
}
}
export const getonelesson=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const finding=await prisma.lesson.findFirst({
            where:{
                 id:+id
            }
        
        })
        res.json(finding)
    } catch (error) {
        console.log(error)
    }
}

export const findmanylesson=async(req:Request,res:Response)=>{
    try {
        const finding=await prisma.lesson.findMany()
        res.json({
            message:"Found successfully",
            result:[...finding]
        })
    } catch (error) {
        console.log(error)
    }
}
export const deleteonelesson=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const finding=await prisma.lesson.findFirst({
            where:{
                 id:+id
            }
        
        })
        if(finding){
            const deleteone=await prisma.lesson.delete({
                where:{
                    id:+id
                }
            })
            res.json({
                message:'deleted successfully',
                deleteone
            })
        }
    } catch (error) {
  res.json({
    message:"something went wrong"
  })
    }
}
lesson.put('/update/:id', upload.single('videoUrl'), async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, content, sectionId } = req.body;
      const file = req.file;
  
      const lessonToUpdate = await prisma.lesson.findUnique({
        where: {
          id: +id,
        },
      });
  
      if (!lessonToUpdate) {
        return res.status(404).json({ error: 'Lesson not found' });
      }
  
      let videoUrl = lessonToUpdate.videoUrl;
  
      if (file) {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          resource_type: 'video',
        });
        videoUrl = result.secure_url;
      }
  
      const updatedLesson = await prisma.lesson.update({
        where: {
          id: +id,
        },
        data: {
          title,
          content,
         sectionId:+sectionId,
          videoUrl,
        },
      });
  
      res.json({
        message: 'Updated successfully',
        updatedLesson,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
export default lesson
