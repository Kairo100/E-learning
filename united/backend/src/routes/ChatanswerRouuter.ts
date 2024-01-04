import { Router } from "express";
import { CreateChatAnwer,getall, deletechatanswer } from "../controllers/ChatAnswer";
const chatRouter=Router();
chatRouter.post('/answer',CreateChatAnwer)
chatRouter.get('/all',getall)
chatRouter.delete('/delete/:id',deletechatanswer)
export default chatRouter;