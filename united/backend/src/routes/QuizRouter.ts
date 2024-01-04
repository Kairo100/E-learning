import express from 'express';
import multer from 'multer';
import { PuplishCource, cources, deletecource, getoncource,CreateCourceOnline, courceONLINE, restorecource, trashcource } from '../controllers/CourceCantroller';


// import { uploadController } from '../controllers/CourceCantroller';
// import { uploadController } from './uploadController';
import { Router } from 'express';
const QuizRouter=Router()
QuizRouter.get('/get/all',cources);
QuizRouter.put('/puplish/:courceId',PuplishCource)
QuizRouter.put('/trash/:id',trashcource)
QuizRouter.put('/restore/:id',restorecource)
QuizRouter.delete('/delete/:id',deletecource)
QuizRouter.get('/get/one/:Courceid',getoncource)
QuizRouter.get('/get/:id',courceONLINE)
import  Multer from 'multer';
import { createOption, createQuestion, createQuiz } from '../controllers/QuizController';


// Configure multer for file uplo

// Upload endpoint
QuizRouter.post('/new', createQuiz);
QuizRouter.post('/new/quesion', createQuestion);
QuizRouter.post('/new/option', createOption);

export default QuizRouter