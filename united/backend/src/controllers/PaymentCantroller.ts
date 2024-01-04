
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export const createPayment = async (req: Request, res: Response) => {
  const { amount, token, enrollmentId, UserId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects the amount in cents
      currency: 'usd',
      payment_method_types: ['card'],
    });

    // Save the payment details to the database using Prisma
    const payment = await prisma.payment.create({
      data: {
        amount:+amount,
        status: 'succeeded',
        enrolmentId:+enrollmentId,
        token:token.id,
      },
    });

    await prisma.enrollment.update({
      where: {
        id:+enrollmentId,
      },
      data: {
        Isconfirm: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      payment,
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Payment creation failed' });
  }
};

export const getPayment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const payment = await prisma.payment.findUnique({
      where: { id: Number(id) }
     
    });

    if (payment) {
      res.json(payment);
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    console.error('Error retrieving payment:', error);
    // res.status(500).json({ error: 'Payment retrievalI apologize for the incomplete response. Please find the complete implementation of the payment API using Stripe, Node.js, Express, TypeScript, and Prisma below:})
  }}
  export const getallpayment=async(req:Request,res:Response)=>{
    try {
      const findingmanypayment=await prisma.payment.findMany()
      res.json(findingmanypayment)
    } catch (error) {
      
    }
  }
  export const gettotalpayment=async(req:Request,res:Response)=>{
    try {
      const totalResult = await prisma.payment.aggregate({
        _sum: {
          amount: true,
        },
      });
      const totalAmount = totalResult._sum.amount;
      res.json({ totalAmount });
    } catch (error) {
      
    }
  }
  export const deleteall=async(req:Request,res:Response)=>{
    try {
      const dl=await prisma.payment.deleteMany()
      res.json(dl)
    } catch (error) {
      
    }
  }
  export const trashpayment=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.payment.update({
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
  export const restorepayment=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.payment.update({
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
  export const deletePayment=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
     const deletepaymentnow=await prisma.payment.delete({
      where:{
        id:+id
      }
     })
     res.json(deletePayment)
    } catch (error) {
      
    }
  }