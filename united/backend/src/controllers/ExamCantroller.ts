import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient();
import { Request,Response } from "express";
import { customUserRequest } from "../helpers/security/jwt";

export const Createexam =async(req:customUserRequest,res:Response)=>{
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
           
        // });
        const {SubcourceId,CourceName,Total, studentPhone,
            Studentname,studentId}=req.body;
  
        const addtoexam =await prisma.exam.create({
            data:{
              studentId:+studentId,
              
              Total:+Total,
              CourceName,

              studentPhone,
              Studentname,
              SubcourceId:+SubcourceId
            }
        })
        res.json({
            message:"Created successfully",
            addtoexam
        })
    } catch (error) {
        // return res.json({
        //     message:"something went wrong"
        // })
        console.log(error)
    }
}
export const getallexam =async(req:customUserRequest,res:Response)=>{
    try {
        const getnowallexam =await prisma.exam.findMany()
        res.json({
            message:"Found successfully",
            result:[...getnowallexam]
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })  
    }
}
export const getoneexam =async(req:customUserRequest,res:Response)=>{
    try {
        const {studentPhone}=req.params;
        const data=await prisma.exam.findFirst({
            where:{
                studentPhone
            }
        })
    res.json(data)
    } catch (error) {
        return res.json({
            message:'something went wrong'
        })
    }
}
 export const deleteexam=async(req:customUserRequest,res:Response)=>{
    try {
        const{id}=req.params;
    
const deleteexam =await prisma.exam.delete({
    where:{
        id:+id
    }
})
res.json({
    message:"Deleted successfully",
    deleteexam
})
    } catch (error) {
        console.log(error)
    }
 }

export const updateexam =async(req:customUserRequest,res:Response)=>{
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
           
        // });
        const {courseId,Total,  CourceName,
            Studentname,SubcourceId,studentPhone,studentId}=req.body;
        const {id}=req.params;
        const getonejust=await prisma.exam.findFirst({
            where:{
                id:+id
            }
        })
        if(!getonejust){
            return res.json({
                message:"is not exist the exam you applied"
            })
        }
        const justupdateit =await prisma.exam.update({
            where:{
                id:+id
            },
            data:{
            
             studentId,
             Total,
             CourceName,
             Studentname,
             studentPhone,
             SubcourceId:+SubcourceId

             
            }
        })
        res.json({
            message:"Updated successfully",
            justupdateit
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })
    }
}
export const trashexam=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.exam.update({
        where:{
          id:+id
        },
        data:{
          isDeleted:true
        }
        
      })
    } catch (error) {
      
    }
  }
  export const restoreexam=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.exam.update({
        where:{
          id:+id
        },
        data:{
          isDeleted:false
        }
        
      })
    } catch (error) {
      
    }
  }