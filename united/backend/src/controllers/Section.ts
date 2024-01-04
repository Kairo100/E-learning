import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma =new PrismaClient();

export const newsection=async(req:Request,res:Response)=>{
    try {
        const {title,description,courseId}=req.body;
        const newing=await prisma.section.create({
            data:{
                title,
                courseId,
                description,

            }
        
        })
res.json({
    message:"Created successfully",
    newing
})
    } catch (error) {
        console.log(error)
    }
}
export const getonsesection=async(req:Request,res:Response)=>{
    try {
        const {secId}=req.params;
        const finding=await prisma.section.findFirst({
            where:{
                id:+secId
            }
        })
  res.json(finding)
    } catch (error) {
        console.log(error)
    }
}
export const deleteonesection=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const finding=await prisma.section.findFirst({
            where:{
                id:+id
            }
        })
        if(finding){
            const deletenow=await prisma.section.delete({
                where:{
                    id:+id
                }
            })
            res.json({
                message:"Deleted successfully",
                deletenow
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export const updating=async(req:Request,res:Response)=>{
    try {
        const {title,description,courseId}=req.body;
        const {id}=req.params;
        const finding=await prisma.section.findFirst({
            where:{
                id:+id
            }
        })
if(finding){
    const nowupdate=await prisma.section.update({
        where:{
            id:+id
        },
        data:{
          courseId,
          description,
          title,
          

        }
  
    })
    res.json({
        message:"Deleted successfully",
        nowupdate
    })
}
    } catch (error) {
        console.log(error)
    }
}
export const manysections =async(req:Request,res:Response)=>{
    try {
        const getall=await prisma.section.findMany()
        res.json({
            message:"Found successfully",
            result:[...getall]

        })
    } catch (error) {
        
    }
}
export const findisection=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const find=await prisma.section.findUnique({
            where:{
                id:+id
            }
        })
        res.json(find)
    } catch (error) {
        
    }
}