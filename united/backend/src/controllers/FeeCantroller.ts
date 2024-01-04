import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient();
import { Request,Response } from "express";
import { customUserRequest } from "../helpers/security/jwt";

export const Createfee =async(req:customUserRequest,res:Response)=>{
    try {
        const { amountPaid, Balance, studentPhone, studentName, Amountneed, studentId, method } = req.body;
    
        // Calculate the balance
        const balance = Amountneed - amountPaid;
    
        const fee = await prisma.fee.create({
          data: {
            amountPaid,
            Balance: balance,
            studentPhone,
            studentName,
            Amountneed,
            studentId:+studentId,
            method,
          },
        });
    
        res.json(fee);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
}
export const getallfee =async(req:customUserRequest,res:Response)=>{
    try {
        const getnowallfee =await prisma.fee.findMany()
        res.json({
            message:"Found successfully",
            result:[...getnowallfee]
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })  
    }
}
export const getonefee =async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const data=await prisma.fee.findFirst({
            where:{
                id:+id
            }
        })
 return res.json(data)
    } catch (error) {
        return res.json({
            message:'something went wrong'
        })
    }
}
export const deletefee =async(req:customUserRequest,res:Response)=>{
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
           
        // });
        const {id}=req.params;
        const getonejust=await prisma.fee.findFirst({
            where:{
                id:+id
            }
        })
        if(!getonejust){
            return res.json({
                message:"is not exist the fee you applied"
            })
        }
        const justdeleteit =await prisma.fee.delete({
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
export const updatefee =async(req:customUserRequest,res:Response)=>{
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
           
        // });
        const {amountPaid,Balance,Amountneed,studentId}=req.body;
        const {id}=req.params;
 
        const justupdateit =await prisma.fee.update({
            where:{
                id:+id
            },
            data:{
               amountPaid,
               Balance,
               Amountneed,
               studentId,
               isDeleted:true
            }
        })
   
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })
    }
}
export const trashfee=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.fee.update({
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
  export const retorefee=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.fee.update({
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