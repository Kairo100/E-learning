import { PrismaClient } from "@prisma/client";
import {Request, Response } from "express";
const prisma =new PrismaClient()

export const Registersubcource =async(req:Request,res:Response)=>{
    try {
        const {Title,oflinecourceId,Description}=req.body;
        const newregiter=await prisma.subcource.create({
            data:{
             Description,
             Title,
            oflinecourceId:+oflinecourceId

            }
        })
        res.json({
            message:"created successfully",
            newregiter
        })
    } catch (error) {
        console.log(error)
    }
}

export const updatesubcource=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
                const {Title,oflinecourceId,Description}=req.body;
                const finding=await prisma.subcource.findFirst({
                    where:{
                        subcourceId:+id
                    }
                })
                if(finding){
                    const updating=await prisma.subcource.update({
                        where:{
                            subcourceId:+id
                        },
                        data:{
                            Description,
                        
                            oflinecourceId,
                        Title
                        }
                    })
                    res.json({
                        message:"updated successfully",
                        updating
                    })
                }
         
    } catch (error) {
        console.log(error)
    }
};
export const deletesubcource=async(req:Request,res:Response)=>{
try {
    const {id}=req.params;
              
    const findingdeletinId=await prisma.subcource.findFirst({
        where:{
            subcourceId:+id
        }
    })
    if(findingdeletinId){
        const deleteonesubcource=await prisma.subcource.delete({
            where:{
                subcourceId:+id
            }
        })
        res.json({
            message:"Deleted successfully",
            deleteonesubcource
        })
    }
} catch (error) {
    console.log(error)
    
}
}

export const getallsubcource = async (req: Request, res: Response) => {
    try {
      const subcources = await prisma.subcource.findMany();
      res.json({
        isSuccess: true,
        result: [...subcources],
      });
    } catch (error) {
      res.json({
        isSuccess: false,
        message: 'Failed to fetch the categories data',
      });
    }
  };
  export const getonesubcource=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
              
        const searchingoneoflinecource=await prisma.subcource.findFirst({
            where:{
                subcourceId:+id
            }
        })
        if(!searchingoneoflinecource){
            return res.json({
                message:"The oflinecource your are searching doesn't exist"
            })
        }
        if(searchingoneoflinecource){
            return res.json(searchingoneoflinecource)
        }
    } catch (error) {
        return res.json({
            message:"Something went Wrong"
        })
    }
  }
  export const trashsubcource=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.subcource.update({
        where:{
          subcourceId:+id
        },
        data:{
          isDeleted:true
        }
        
      })
    } catch (error) {
      
    }
  }
  export const restorsubcource=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.subcource.update({
        where:{
          subcourceId:+id
        },
        data:{
          isDeleted:false
        }
        
      })
    } catch (error) {
      
    }
  }