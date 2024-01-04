"use strict";
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// import { Request, Response } from 'express';
// import { customUserRequest } from '../helpers/security/jwt';
// // POST -> creates new cart for the login user
// // /api/cart/new
// export const newCart = async (req: customUserRequest, res: Response) => {
//   try {
//     const cart = await prisma.cart.create({
//       data: {
//         userId: req.user?.userId!,
//       },
//     });
//     res.json({
//       isSuccess: true,
//       result: { ...cart },
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       message: 'Failed to create new cart',
//       isSuccess: false,
//     });
//   }
// };
// // get all carts
// export const getAllCarts = async (req: Request, res: Response) => {
//   try {
//     const carts = await prisma.cart.findMany({
//       include: {
//         User: {
//           select: {
//             username: true,
//             email: true,
//           },
//         },
//         cartItem: {
//           select: {
//             cartId: true,
//             courseId: true,
//             Product: {
//               select: {
//                 productName: true,
//                 productDescription: true,
//                 productPrice: true,
//               },
//             },
//           },
//         },
//       },
//     });
//     res.json({
//       isSuccess: true,
//       result: [...carts],
//     });
//   } catch (error) {
//     res.json({
//       message: 'ERROR',
//       isSuccess: false,
//     });
//   }
// };
// export const AddToCart = async (req: customUserRequest, res: Response) => {
//   try {
//     let userCart = await prisma.cart.findFirst({
//       where: {
//         userId: req.user?.userId,
//       },
//     });
//     if (!userCart) {
//       userCart = await prisma.cart.create({
//         data: {
//           userId: req.user?.userId!,
//         },
//       });
//     }
//     const addToCart = await prisma.cartItem.create({
//       data: {
//         cartId: userCart.id,
//         courseId: req.body.courseId,
//       },
//     });
//     res.json({
//       isSuccess: true,
//       result: { ...addToCart },
//     });
//   } catch (error) {
//     res.json({
//       isSuccess: false,
//       message: 'Failed to add new item to your cart.',
//     });
//   }
// };
