import express from 'express';
import multer from 'multer';
import { PuplishCource, cources, deletecource, getoncource,CreateCourceOnline, courceONLINE, restorecource, trashcource, Latestcources } from '../controllers/CourceCantroller';


// import { uploadController } from '../controllers/CourceCantroller';
// import { uploadController } from './uploadController';
import { Router } from 'express';
const uploadRouter=Router()
uploadRouter.get('/get/all',cources);
uploadRouter.get('/get/letest',Latestcources);
uploadRouter.put('/puplish/:courceId',PuplishCource)
uploadRouter.put('/trash/:id',trashcource)
uploadRouter.put('/restore/:id',restorecource)
uploadRouter.delete('/delete/:id',deletecource)
uploadRouter.get('/get/one/:Courceid',getoncource)
uploadRouter.get('/get/:id',courceONLINE)
import  Multer from 'multer';


// Configure multer for file uploads
const storage = multer.diskStorage({});
const upload = Multer({ storage });

// Upload endpoint
uploadRouter.post('/upload', upload.fields([{ name: 'videoUrl' }, { name: 'imageUrl' }]), CreateCourceOnline);

export default uploadRouter