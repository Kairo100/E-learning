import { Router } from "express";
import { deleteonesection, findisection, getonsesection, manysections, newsection, updating } from "../controllers/Section";
const SectionRouter=Router()
SectionRouter.get('/get/one/:secId',getonsesection)
SectionRouter.get('/get/one/lesson/:id',findisection)
SectionRouter.get('/get/all',manysections)
SectionRouter.delete('/delete/:id',deleteonesection)
SectionRouter.put('/update/:id',updating)
SectionRouter.post('/Register',newsection)
export default SectionRouter;