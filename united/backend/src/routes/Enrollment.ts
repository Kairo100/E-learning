import { Router } from "express";
import { Registerenrollment,deleteall, deleteonlineEnrollment, getallonlineenrollment, getoneenrollment, updateonlinerollment } from "../controllers/OnlineInrollment";
const onlineEnrollment=Router()
onlineEnrollment.post('/new',Registerenrollment)
onlineEnrollment.get('/get/all',getallonlineenrollment)
onlineEnrollment.get('/get/one/:id',getoneenrollment)
onlineEnrollment.delete('/delete/:id',deleteonlineEnrollment)
onlineEnrollment.delete('/delete',deleteall)
onlineEnrollment.put('/update/:id',updateonlinerollment)
export default onlineEnrollment;