import { Express, Router } from "express";
import { deleteonelesson, findmanylesson, getonelesson } from "../controllers/LessonCantroller";
const Lessonrouter=Router()
Lessonrouter.get('/get/:id',getonelesson)
Lessonrouter.delete('/delete/:id',deleteonelesson)
Lessonrouter.get('/get/all',findmanylesson)

export default Lessonrouter