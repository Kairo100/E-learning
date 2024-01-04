import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient();
import { Request,Response } from "express";
import { customUserRequest } from "../helpers/security/jwt";

export const Createcontact =async(req:Request,res:Response)=>{
    try {
        const {Name,email,message}=req.body;

        const addtocontact =await prisma.contact.create({
            data:{
              
              Name,
              email,
              message
            }
        })
        res.json({
            messages:"Created successfully",
            addtocontact
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })
    }
}
export const getallcontact =async(req:customUserRequest,res:Response)=>{
    try {
 
        const getnowallcontact =await prisma.contact.findMany()
        res.json({
            isSuccess: true,
            result: [...getnowallcontact],
        })

    } catch (error) {
        return res.json({
            message:"something went wrong"
        })  
    }
}
export const getonecontact =async(req:customUserRequest,res:Response)=>{
    try {
 
        const {id}=req.params;
        const getonejust=await prisma.contact.findFirst({
            where:{
                id:+id
            }
        })
        if(!getonejust){
            return res.json({
                message:"is not exist the contact you applied"
            })
        }
        if(getonejust){
            res.json({
                message:"found Successfully",
                getonecontact
            })
        }
    } catch (error) {
        return res.json({
            message:'something went wrong'
        })
    }
}
export const deletecontact =async(req:customUserRequest,res:Response)=>{
    try {
 
        const {id}=req.params;
        const getonejust=await prisma.contact.findFirst({
            where:{
                id:+id
            }
        })
        if(!getonejust){
            return res.json({
                message:"is not exist the contact you applied"
            })
        }
        const justdeleteit =await prisma.contact.delete({
            where:{
                id:+id
            }
        })
        res.json({
            message:"Deleted successfully",
            justdeleteit
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })
    }
}
export const updatecontact =async(req:customUserRequest,res:Response)=>{
    try {
 
        const {  email,
            
           Name,
           message }=req.body;
        const {id}=req.params;
        const getonejust=await prisma.contact.findFirst({
            where:{
                id:+id
            }
        })
        if(!getonejust){
            return res.json({
                message:"is not exist the contact you applied"
            })
        }
        const justupdateit =await prisma.contact.update({
            where:{
                id:+id
            },
            data:{
              email,
              
             Name,
             message 
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
export const trashcontact=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.contact.update({
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
  export const restorecontact=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.contact.update({
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