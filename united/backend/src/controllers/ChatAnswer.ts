import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient()
import {Request,Response} from 'express'
import express from 'express'
export const CreateChatAnwer=async(req:Request,res:Response)=>{
    try {
        const {ConatactId,Text}=req.body;
        const resgister=await prisma.answerContact.create({
            data:{
                ConatactId,
                Text
            }
        })
        res.json(resgister)
    } catch (error) {
        
    }
}
export const getall=async(req:Request,res:Response)=>{
    try {
        const getallchat=await prisma.answerContact.findMany()
        res.json(getallchat)
    } catch (error) {
        
    }
}
export const deletechatanswer=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const deletanswer=await prisma.answerContact.delete({
            where:{
                id:+id
            }
        })
        res.json(deletanswer)
    } catch (error) {
        
    }
}