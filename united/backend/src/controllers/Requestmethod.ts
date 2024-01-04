import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma=new PrismaClient();
export const createRequestPayment=async(req:Request,res:Response)=>{
    const {AccountNumber,
        Amount,
        chanel,
        id ,
        courceId,
        Description,
        Method}=req.body;
    try {

        const newrequest=await prisma.requestPayment.create({
            data:{
                AccountNumber,
                Amount:+Amount,
                chanel,
                courceId:+courceId,
                id,
                Description,
                Method

            }
        })
        res.json(newrequest)
    } catch (error) {
        console.log(error)
    }
}
export const getallRequestpayment=async(req:Request,res:Response)=>{
    try {
        const getallpayments=await prisma.requestPayment.findMany()
        res.json(getallpayments)
    } catch (error) {
        
    }
}
export const deleterequest=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const deleting=await prisma.requestPayment.delete({
            where:{
                Requstpaymentid:+id
            }
        })
        res.json(deleting)
    } catch (error) {
        
    }
}
export const trashrequest=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const deleting=await prisma.requestPayment.update({
            where:{
                Requstpaymentid:+id
            },
            data:{
                isDeleted:true
            }
        })
        res.json(deleting)
    } catch (error) {
        
    }
}
export const restoreRequest=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const deleting=await prisma.requestPayment.update({
            where:{
                Requstpaymentid:+id
            },
            data:{
                isDeleted:false
            }
        })
        res.json(deleting)
    } catch (error) {
        
    }
}

export const Requestconfirm = async (req: Request, res: Response) => {
    try {
      const { Requstpaymentid } = req.params;
      const { isAccepted } = req.body;
  
      // Convert courceId to a number
      // const courceId = parseInt(courceId, 10);
  
      // Find the cource by ID
      const cource = await prisma.requestPayment.findFirst({
        where: {
          Requstpaymentid:+Requstpaymentid
        },
      });
  
      if (!cource) {
        return res.status(404).json({
          message: 'Cource not found',
        });
      }
  
      // Update the isPublished field
      const updaterequest = await prisma.requestPayment.update({
        where: {
            Requstpaymentid:+Requstpaymentid
        },
        data: {
            isAccepted:true,
        },
      });
  
      return res.json({
        message: 'Cource isPublished updated successfully',
        cource: updaterequest,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'An error occurred while updating the cource',
      });
    }
  };
export const RequestUnconfirm = async (req: Request, res: Response) => {
    try {
      const { Requstpaymentid } = req.params;
      const { isAccepted } = req.body;
  
      // Convert courceId to a number
      // const courceId = parseInt(courceId, 10);
  
      // Find the cource by ID
      const cource = await prisma.requestPayment.findFirst({
        where: {
          Requstpaymentid:+Requstpaymentid
        },
      });
  
      if (!cource) {
        return res.status(404).json({
          message: 'Cource not found',
        });
      }
  
      // Update the isPublished field
      const updaterequest = await prisma.requestPayment.update({
        where: {
            Requstpaymentid:+Requstpaymentid
        },
        data: {
            isAccepted:false,
        },
      });
  
      return res.json({
        message: 'Cource isPublished updated successfully',
        cource: updaterequest,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'An error occurred while updating the cource',
      });
    }
  };