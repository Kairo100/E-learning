import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient()

export const Registerenrollment=async(req:Request,res:Response)=>{
    const {userId,StudentName,courseId}=req.body;
    try {
       
        const newonlineenrrollment=await prisma.enrollment.create({
            data:{
              userId:+userId,
              StudentName,
              courseId:+courseId
              
            }
            
        })
        res.json(newonlineenrrollment)
    } catch (error) {
        console.log(error)
    }
}
export const getoneenrollment =async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const getone =await prisma.oflineenrollment.findFirst({
            where:{
               id:+id
            }
        })
        res.json(getone)
    } catch (error) {
        console.log(error)
    }
}

export const getallonlineenrollment=async(req:Request,res:Response)=>{
    try {
        const findmany =await prisma.enrollment.findMany()
        res.json({
            message:"Successfully found",
            result:[...findmany]
        })
    } catch (error) {
        console.log(error)
    }
}
export const deleteonlineEnrollment=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const getone =await prisma.enrollment.findFirst({
            where:{
                id:+id
            }
        })
        if(!getone){
            return res.json({
                message:"The oflineenrollment you are trying to get deos not exist"
            })
            
        }
        else if(getone){
            const deleteone=await prisma.enrollment.delete({
                where:{
                    id:+id
                }
            })
            res.json({
                message:"deleted successfully",
                deleteone
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const updateonlinerollment=async(req:Request,res:Response)=>{
    try {
        const {userId,StudentName,courseId}=req.body;
        const {id}=req.params;
        const getone =await prisma.enrollment.findFirst({
            where:{
                id:+id
            }
        })
        if(!getone){
            return res.json({
                message:"it deosnot exist"
            })

        }
        if(getone){
            const updating=await prisma.enrollment.update({
                where:{
                    id:+id
                },
                data:{
                    courseId,
                    userId,
                    StudentName
                }
            
            })
            res.json({
                message:"Deleted successfully",
                updating
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export const deleteall=async(req:Request,res:Response)=>{
    try {
        const delet=await prisma.enrollment.deleteMany()
        res.json(delet)
    } catch (error) {
        
    }
}