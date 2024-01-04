import { Router } from "express"

import { Createcontact, deletecontact, getallcontact, getonecontact, restorecontact, trashcontact, updatecontact } from "../controllers/CantactCantroller";
import { decodeToken } from "../helpers/security/jwt";


const ContactRouter =Router();
ContactRouter.post('/new',Createcontact)
ContactRouter.get('/get/all',getallcontact)
ContactRouter.get('/get/one/:id',decodeToken,getonecontact)
ContactRouter.put('/update/:id',decodeToken,updatecontact)
ContactRouter.put('/trash/:id',trashcontact)
ContactRouter.put('/restore/:id',restorecontact)
ContactRouter.delete('/delete/:id',deletecontact)
export default ContactRouter