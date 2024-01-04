import { Router } from "express"
import { Createstudent, deletestudentdata, getallstudent, getonestudent, getonlyonestudent, restorestudent, student, trashstudent, updatestudent } from "../controllers/StudentCantroller";
import { decodeToken } from "../helpers/security/jwt";
const StudentRouter =Router();
StudentRouter.post('/create',Createstudent)
StudentRouter.get('/get/all',getallstudent)
StudentRouter.get('/get/studentexam/:phone',getonestudent)
StudentRouter.get('/get/:phone',student)
StudentRouter.get('/get/one/:id',getonlyonestudent)
StudentRouter.put('/update/:id',updatestudent)
StudentRouter.put('/restore/:id',restorestudent)
StudentRouter.put('/trash/:id',trashstudent)
StudentRouter.delete('/delete/:id',deletestudentdata)
export default StudentRouter