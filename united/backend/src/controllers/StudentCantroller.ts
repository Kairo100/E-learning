import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient();
import { Request,Response } from "express";

export const Createstudent=async(req:Request,res:Response)=>{
    try {
    const {Name,method,email,phone,Amount}=req.body;
    if(!Name ||!email ||!phone ||!Amount ){
        return res.json({
            message:"please provide valid data"
        })
    }
    const justdoing =await prisma.student.create({
        data:{
          Amount,
          email,
          Name,
          phone,
          method
        
            
        }
    })
    res.json({
        message:"Created successfully",
        justdoing
    })
    } catch (error) {
        
    }
}
export const getallstudent =async(req:Request,res:Response)=>{
    try {
        const getnowallstudent =await prisma.student.findMany()
        res.json({
            message:"Found successfully",
            result:[...getnowallstudent]
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })  
    }
}
export const getonlyonestudent=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const finding=await prisma.student.findFirst({
            where:{
                Id:+id
            }
        })
        res.json(finding)
    } catch (error) {
        
    }
}
export const getonestudent =async(req:Request,res:Response)=>{
    try {
        const {phone}=req.params;
        const data=await prisma.student.findFirst({
            where:{
                phone:phone
            },
            include:{
                Exam:{
                    select:{
                        CourceName:true,
                        Total:true,
                        Studentname:true,
                        SubcourceId:true,
                        studentPhone:true,

                    }
                }
            }
        })
      res.json(data)
     
    } catch (error) {
        return res.json({
            message:'something went wrong'
        })
    }
}
export const student=async(req:Request,res:Response)=>{
    try {
        const {phone}=req.params;
        const finding=await prisma.student.findFirst({
            where:{
                phone:phone
            }
        })
        res.json(finding)
    } catch (error) {
        
    }
}

export const deletestudentdata =async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;

        const justdeleteit = await prisma.student.delete({
          where: {
            Id: parseInt(id), // Convert Id to an integer
          },
        });
        res.json(justdeleteit)
    } catch (error) {
        return res.json({
            message:"something went wrong",
         
        })
    }
}
export const updatestudent =async(req:Request,res:Response)=>{
    try {
        const {  email, 
            Name,
             phone,
             method,
             Amount}=req.body;
        const {id}=req.params;
        const getonejust=await prisma.student.findFirst({
            where:{
                Id:+id
            }
        })
 
        const justupdateit =await prisma.student.update({
            where:{
                Id:+id
            },
            data:{
             Name,
             phone,
             method,
             email,
             Amount,
             
             
            }
        })
 res.json(justupdateit)
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })
    }
}
export const trashstudent=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.student.update({
        where:{
          Id:+id
        },
        data:{
          isDeleted:true
        }
        
      })
    } catch (error) {
      
    }
  }
  export const restorestudent=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.student.update({
        where:{
          Id:+id
        },
        data:{
          isDeleted:false
        }
        
      })
    } catch (error) {
      
    }
  }