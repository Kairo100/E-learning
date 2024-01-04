import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient();
import { Request,Response } from "express";

export const Createteacher =async(req:Request,res:Response)=>{
    try {
        const {Name,method,phone,Amount,courceId}=req.body;
         if(!Name ||!phone ||!Amount){
            return res.json({
                message:"Failed to create new ther"
            })
         }
        const addtoteacher =await prisma.teacher.create({
            data:{
           Name,
           phone,
           Amount,
           method
        //    courceId
            }
        })
        res.json({
            message:"Created successfully",
            addtoteacher
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })
    }
}
// export const getallteacher =async(req:Request,res:Response)=>{
//     try {
//         const getnowallteacher =await prisma.teacher.findMany()
//         res.json({
//             message:"Found successfully",
//             getnowallteacher
//         })
//     } catch (error) {
//         return res.json({
//             message:"something went wrong"
//         })  
//     }
// }
export const getallteacher = async (req: Request, res: Response) => {
    try {
      const Teachers = await prisma.teacher.findMany();
      res.json({
        isSuccess: true,
        result: [...Teachers],
      });
    } catch (error) {
      res.json({
        isSuccess: false,
        message: 'Failed to fetch the Teachers data',
      });
    }
  };
export const getoneteacher =async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const data = await prisma.teacher.findFirst({
          where: {
            Id: +id,
          },
        });
    
        res.json(data);
      } catch (error) {}
}
export const deleteteacher =async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const getonejust=await prisma.teacher.findFirst({
            where:{
                Id:+id
            }
        })
        if(!getonejust){
            return res.json({
                message:"is not exist the teacher you applied"
            })
        }
        const justdeleteit =await prisma.teacher.delete({
            where:{
                Id:+id
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
export const updateteacher =async(req:Request,res:Response)=>{
    try {
        const {Name,phone,Amount,courceId}=req.body;
        const {id}=req.params;
        const getonejust=await prisma.teacher.findFirst({
            where:{
                Id:+id
            }
        })
        if(!getonejust){
            return res.json({
                message:"is not exist the teacher you applied"
            })
        }
        const justupdateit =await prisma.teacher.update({
            where:{
                Id:+id
            },
            data:{
                Name,
                phone,Amount
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
export const trashteacher=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.teacher.update({
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
  export const restoreteacher=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.teacher.update({
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