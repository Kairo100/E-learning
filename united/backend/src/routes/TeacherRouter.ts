import { Router } from "express"
import { Createteacher, deleteteacher, getallteacher, getoneteacher, restoreteacher, trashteacher, updateteacher } from "../controllers/TeacherCantroller";
import { decodeToken } from "../helpers/security/jwt";
const TeacherRouter =Router();
TeacherRouter.post('/create',Createteacher)
TeacherRouter.get('/get/all',getallteacher)
TeacherRouter.get('/get/one/:id',getoneteacher)
TeacherRouter.put('/update/:id',updateteacher)
TeacherRouter.put('/restore/:id',restoreteacher)
TeacherRouter.put('/trash/:id',trashteacher)
TeacherRouter.delete('/delete/:id',deleteteacher)
export default TeacherRouter