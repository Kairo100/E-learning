import { Router } from "express";

import { Createteacher } from "../controllers/TeacherCantroller";
import { createPayment, deletePayment, deleteall, getallpayment, gettotalpayment, restorepayment, trashpayment } from "../controllers/PaymentCantroller";
const paymentrouter=Router()
paymentrouter.post('/pay',createPayment)
paymentrouter.get('/get/all',getallpayment)
paymentrouter.get('/get/total',gettotalpayment)
paymentrouter.put('/trash/:id',trashpayment)
paymentrouter.put('/restore/:id',restorepayment)
paymentrouter.delete('/delete',deleteall)
paymentrouter.delete('/delete/:id',deletePayment)
export default paymentrouter
