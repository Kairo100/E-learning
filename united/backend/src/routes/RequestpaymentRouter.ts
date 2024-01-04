// import {Router} from 'express';
// import paymentrouter from './PaymentRoouter';
import { RequestUnconfirm, Requestconfirm, createRequestPayment, deleterequest, getallRequestpayment, restoreRequest, trashrequest } from '../controllers/Requestmethod';
// const   RequestpaymentRouter=Router()
// paymentrouter.post('/new',createRequestPayment)
// paymentrouter.get('/get/all',getallRequestpayment)
// export default RequestpaymentRouter;

import { Router } from "express";
// import { deleteonesection, findisection, getonsesection, manysections, newsection, updating } from "../controllers/Section";
const RequestpaymentRouter=Router()
// RequestpaymentRouter.get('/get/one/:secId',getonsesection)
// RequestpaymentRouter.get('/get/one/lesson/:id',findisection)
RequestpaymentRouter.get('/get/all',getallRequestpayment)
// RequestpaymentRouter.delete('/delete/:id',deleteonesection)
// RequestpaymentRouter.put('/update/:id',updating)
RequestpaymentRouter.post('/new',createRequestPayment)
RequestpaymentRouter.put('/trash/:id',trashrequest)
// RequestpaymentRouter.put('/restore',restoreRequest)
RequestpaymentRouter.put('/restore/:id',restoreRequest)
RequestpaymentRouter.put('/confirm/:Requstpaymentid',Requestconfirm)
RequestpaymentRouter.put('/unconfirm/:Requstpaymentid',RequestUnconfirm)
RequestpaymentRouter.delete('/delete/:id',deleterequest)
export default RequestpaymentRouter;