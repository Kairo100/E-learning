"use strict";
// import { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// import Stripe from 'stripe';
// import dotenv from 'dotenv';
// dotenv.config();
// const prisma = new PrismaClient();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2023-08-16',
// });
// export const createPayment = async (req: Request, res: Response) => {
//   const { amount, CourseId, UserId } = req.body;
//   try {
//     // const paymentIntent = await stripe.paymentIntents.create({
//     //   amount: amount * 100, // Stripe expects the amount in cents
//     //   currency: 'usd',
//     //   payment_method_types: ['card'],
//     // });
//     const paymentIntent =await stripe.paymentIntents.create({
//       amount:amount *100,
//       currency:'usd',
//       payment_method_types:['card'],
//       capture_method:"automatic"
//     })
//     // Save the payment details to the database using Prisma
//     const payment = await prisma.payment.create({
//       data: {
//         amount,
//         status: 'succeeded',
//         CourseId,
//         UserId
//         // netsh wlan show profiles name="" key=clea
//       },
//       include:{
//         user:{
//           select:{
//             isPaid:true
//           }
//         }
//       },
//     });
//     res.json({
//       clientSecret: paymentIntent.client_secret,
//       payment,
//     });
//   } catch (error) {
//     console.error('Error creating payment:', error);
//     res.status(500).json({ error: 'Payment creation failed' });
//   }
// };
// export const getPayment = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   try {
//     const payment = await prisma.payment.findUnique({
//       where: { id: Number(id) },
//       include: { course: true, user: true },
//     });
//     if (payment) {
//       res.json(payment);
//     } else {
//       res.status(404).json({ error: 'Payment not found' });
//     }
//   } catch (error) {
//     console.error('Error retrieving payment:', error);
//     // res.status(500).json({ error: 'Payment retrievalI apologize for the incomplete response. Please find the complete implementation of the payment API using Stripe, Node.js, Express, TypeScript, and Prisma below:})
//   }}
