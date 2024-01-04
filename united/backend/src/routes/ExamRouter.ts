import { Router } from "express";
import { Createexam, deleteexam, getallexam, getoneexam, restoreexam, trashexam, updateexam } from "../controllers/ExamCantroller";

const ExamRouter =Router()
ExamRouter.post('/create',Createexam)
ExamRouter.get('/get/all',getallexam)
ExamRouter.get('/get/one/:id',getoneexam)
ExamRouter.delete('/delete/:id',deleteexam)
ExamRouter.put('/update/:id',updateexam)
ExamRouter.put('/trash/:id',trashexam)
ExamRouter.put('/restore/:id',restoreexam)
export default ExamRouter