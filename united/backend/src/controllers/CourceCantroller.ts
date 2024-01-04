import express, { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

dotenv.config();

const H = express();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for file uploads
const storage = multer.diskStorage({});
const upload = multer({ storage });

export const CreateCourceOnline = async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (!files || !files['videoUrl'] || !files['imageUrl']) {
    return res.status(400).json({ message: 'Both video and image files are required' });
  }

  try {
    const videoFiles = files['videoUrl'];
    const imageFiles = files['imageUrl'];

    const videoFile = videoFiles?.[0];
    const imageFile = imageFiles?.[0];

    if (!videoFile || !imageFile) {
      return res.status(400).json({ message: 'Video or image file not found' });
    }

    const timestamp = Math.floor(Date.now() / 1000); // Set the timestamp to the current time

    const videoUploadPromise = cloudinary.v2.uploader.upload(videoFile.path, {
      resource_type: 'video',
      format:"mp4",
      timestamp,
    });

    const imageUploadPromise = cloudinary.v2.uploader.upload(imageFile.path, {
      resource_type: 'image',
      timestamp,
    });

    const [videoUploadResult, imageUploadResult] = await Promise.all([videoUploadPromise, imageUploadPromise]);

    const { secure_url: videoUrlsecure } = videoUploadResult;
    const { secure_url: imageUrl } = imageUploadResult;

    // Save the video URL, image URL, and other fields to the database or perform any other necessary action
    // Example: Save it using Prisma
    const { content,Shortdescription, title, price,id, CategoryId } = req.body;

    const createdCourse = await prisma.cource.create({
      data: {
        videoUrl: videoUrlsecure,
        imageUrl,
        Shortdescription,
        content,
      
        id:+id,
        title,
        price,
        CategoryId: +CategoryId,
      },
    });

    res.json(createdCourse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to upload video or image' });
  }
};

export const cources = async (req: Request, res: Response) => {
  try {
    const getNowAllCources = await prisma.cource.findMany({
      include:{
        Section:{
          select:{
             title:true,
             courseId:true,
            lessons:{
               
              select:{
                title:true,
                videoUrl:true,

              }
            }
          }
        }
      }
    });
    res.json({
      message: 'Found successfully',
      result: [...getNowAllCources],
    });
  } catch (error) {
    return res.json({
      message: 'Something went wrong',
      
    });
    console.log(error)
  }
};
export const Latestcources=async (req: Request, res: Response) => {
  try {
    const latestCourses = await prisma.cource.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3, // Get the latest three courses
    });

    res.json(latestCourses);
  } catch (error) {
    console.error('Error fetching latest courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
export const courceONLINE=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const findcource=await prisma.cource.findFirst({
      where:{
        courceId:+id
      }
    })
    res.json(findcource)
  } catch (error) {
    
  }
}
export const getoncource=async(req:Request,res:Response)=>{
try {
  const {Courceid}=req.params;
  const finding=await prisma.cource.findFirst({
    where:{
      courceId:+Courceid
    },
    include:{
      Section:{
        select:{
           title:true,
           courseId:true,
          lessons:{
             
            select:{
              title:true,
              videoUrl:true,

            },
            
          }
        }
      },
      Enrollment:true,
      review:{ 
        select:{
          Comment:true,
          review:true,
          
         } },
         quiz:{
          include:{
            questions:{
              include:{
                options:true
              }
            }
          }
         }
      }
  }
  )
  if(!finding){
    return res.json({
      message:"this cource doesn't exist"
    })
  }
  res.json(finding)
} catch (error) {
  
}
}

// H.put('/update/:id', async (req: Request, res: Response)

export const PuplishCource = async (req: Request, res: Response) => {
  try {
    const { courceId } = req.params;
    const { isPublished } = req.body;

    // Convert courceId to a number
    // const courceId = parseInt(courceId, 10);

    // Find the cource by ID
    const cource = await prisma.cource.findFirst({
      where: {
        courceId:+courceId,
      },
    });

    if (!cource) {
      return res.status(404).json({
        message: 'Cource not found',
      });
    }

    // Update the isPublished field
    const updatedCource = await prisma.cource.update({
      where: {
        courceId:+courceId,
      },
      data: {
        isPublished:!isPublished,
      },
    });

    return res.json({
      message: 'Cource isPublished updated successfully',
      cource: updatedCource,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'An error occurred while updating the cource',
    });
  }
};
export const deletecource=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const findingcource=await prisma.cource.findFirst({
      where:{
        courceId:+id
      }
    })
    if(findingcource){
  const deletecourse=await prisma.cource.delete({
    where:{
      courceId:+id
    }
  })
  res.json(deletecource)
    }
  } catch (error) {
                                                                                                                                                                                                                                                         
  }
}
    
H.get('/search', async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const courses = await prisma.cource.findMany({
      where: {
        title: { contains: searchTerm as string },
      },
      include: {
        Section: true,
        review: true,
        Enrollment: true,
        User: true,
        Category: true,
      },
    });

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
H.get("/cource/chart", async (req:Request, res:Response) => {
  try {
    const courses = await prisma.cource.findMany({
      include: {
        Enrollment: true,
      },
    });

    res.json(courses);
  } catch (error) {
    console.error("Error retrieving courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export const trashcource=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const upd=await prisma.cource.update({
      where:{
        courceId:+id
      },
      data:{
        isDeleted:true
      }
      
    })
  } catch (error) {
    
  }
}
export const restorecource=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const upd=await prisma.cource.update({
      where:{
        courceId:+id
      },
      data:{
        isDeleted:false
      }
      
    })
  } catch (error) {
    
  }
}
export default H