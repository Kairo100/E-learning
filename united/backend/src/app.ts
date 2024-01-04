// import express
import express from'express';
import userRouter from './routes/userRoute';
import cors from 'cors';
import TeacherRouter from './routes/TeacherRouter';
import SalaryRouter from './routes/SalaryRouter';
import StudentRouter from './routes/StudentRouter';
import CourceRouter from './routes/CourceRouter';
import ContactRouter from './routes/ContactRouter';
import router from './routes/CatogoryRouter';
// import img from './controllers/img';
import FeeRouter from './routes/FeeRouter';
import ExamRouter from './routes/ExamRouter';
// import newsRouter from './routes/NewsRouter';
// import CourceRouter from './routes/CourceRouter';
import H from './controllers/CourceCantroller';
import ReviewRouter from './routes/ReviewRouter';
// import News from './controllers/LatestNews';
import paymentrouter from './routes/PaymentRoouter';
import oflineenrollmentrouter from './routes/Oflineenrollmentrouter';
import oflinecourcesrouter from './routes/oflinecourcerouter';
import SectionRouter from './routes/sectionrouter';
import lesson from './controllers/LessonCantroller';
import SubcourceRouter from './routes/Subcourceroter';
import Lessonrouter from './routes/LessonRouter';
import onlineEnrollment from './routes/Enrollment';
import oflineCategoryRouter from './routes/OflineCategory';
// import routerQuiz from './controllers/QuizController';
import Quiz from './controllers/QuizController';
import RequestpaymentRouter from './routes/RequestpaymentRouter';
import QuizRouter from './routes/QuizRouter';
import chatRouter from './routes/ChatanswerRouuter';
// import RegisterUser from './controllers/userController';
// import SubcategoryRouter from './routes/SubcateoryRouter';
// import apo from './controllers/k';

// import S from './routes/upl';
// import uploading from './controllers/upload';
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5175',
    
  })
);
app.use(express.json());
app.use('/api/section',SectionRouter)
app.use('/api/quiz',Quiz)
app.use('/api/quiz',QuizRouter)
app.use('/api/Request',RequestpaymentRouter)
app.use('/api/OflineCategory',oflineCategoryRouter)
app.use('/api/subcource',SubcourceRouter)
app.use('/api/cor',H)
// app.use('/api/user',RegisterUser)
app.use('/api/oflinecource',oflinecourcesrouter)
app.use('/api/ofllinenrollment',oflineenrollmentrouter)
app.use('/api/review',ReviewRouter)
app.use('/api/Fee',FeeRouter)
app.use('/api/user', userRouter);
app.use('/api/Teacher',TeacherRouter)
app.use('/api/category',router)
app.use('/api/Salary',SalaryRouter)
app.use('/api/student',StudentRouter)
app.use('/api/cource',CourceRouter)
app.use('/api/contact',ContactRouter)
app.use('/api/onlineEnrollment',onlineEnrollment)

// app.use('/api/LatestNews',News)
app.use('/api/payment',paymentrouter)
// app.use('/api/img',img)
app.use('/api/exam',ExamRouter)
app.use('/api/lesson',lesson)
app.use('/api/chats',chatRouter)
app.use('/api/lesson',Lessonrouter)
// app.use('/api/Subcategory',SubcategoryRouter)
app.listen(2000, () => {
  console.log('Serving on port 2000');
});
