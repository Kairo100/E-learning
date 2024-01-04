import { Router } from "express"
import { decodeToken } from "../helpers/security/jwt";
import { Createfee, deletefee, getallfee, getonefee, retorefee, trashfee, updatefee } from "../controllers/FeeCantroller";
const FeeRouter =Router();
FeeRouter.post('/create',Createfee)
FeeRouter.get('/get/all',getallfee)
FeeRouter.get('/get/one/:id',getonefee)
FeeRouter.put('/update/:id',updatefee)
FeeRouter.put('/trash/:id',trashfee)
FeeRouter.put('/restore/:id',retorefee)
FeeRouter.delete('/delete/:id',deletefee)
export default FeeRouter