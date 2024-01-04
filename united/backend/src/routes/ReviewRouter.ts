import { Router } from "express";
import { createreview, deletereview, getallreview, updateReview } from "../controllers/ReviewCantroller";
const ReviewRouter=Router();
ReviewRouter.post('/new',createreview)
ReviewRouter.get('/get/all',getallreview)
ReviewRouter.put('/update/:id',updateReview)
ReviewRouter.delete('/delete/:id',deletereview)

export default ReviewRouter