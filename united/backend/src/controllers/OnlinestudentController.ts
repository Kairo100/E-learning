import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
const prisma =new PrismaClient()
import { Request,Response } from 'express';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
});

export const createPayment= async (req:Request, res:Response) => {


  try {
    const {amount, method,courseId, userId}=req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: 'usd',
    });

    // const payment = await prisma.payment.create({
    //   data: {
    //     amount: amount,
    //     UserId:userId,
    //     // balance: 0,
    //     // Total: amount,
    //     status: 'Completed',
       
    //     CourseId: courseId,
    //     // userId,
    //   },
    // });

    // res.status(200).json({ clientSecret: paymentIntent.client_secret, payment });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }}

