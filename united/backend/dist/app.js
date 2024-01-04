"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const cors_1 = __importDefault(require("cors"));
const TeacherRouter_1 = __importDefault(require("./routes/TeacherRouter"));
const SalaryRouter_1 = __importDefault(require("./routes/SalaryRouter"));
const StudentRouter_1 = __importDefault(require("./routes/StudentRouter"));
const CourceRouter_1 = __importDefault(require("./routes/CourceRouter"));
const ContactRouter_1 = __importDefault(require("./routes/ContactRouter"));
const CatogoryRouter_1 = __importDefault(require("./routes/CatogoryRouter"));
// import img from './controllers/img';
const FeeRouter_1 = __importDefault(require("./routes/FeeRouter"));
const ExamRouter_1 = __importDefault(require("./routes/ExamRouter"));
// import newsRouter from './routes/NewsRouter';
// import CourceRouter from './routes/CourceRouter';
const CourceCantroller_1 = __importDefault(require("./controllers/CourceCantroller"));
const ReviewRouter_1 = __importDefault(require("./routes/ReviewRouter"));
// import News from './controllers/LatestNews';
const PaymentRoouter_1 = __importDefault(require("./routes/PaymentRoouter"));
const Oflineenrollmentrouter_1 = __importDefault(require("./routes/Oflineenrollmentrouter"));
const oflinecourcerouter_1 = __importDefault(require("./routes/oflinecourcerouter"));
const sectionrouter_1 = __importDefault(require("./routes/sectionrouter"));
const LessonCantroller_1 = __importDefault(require("./controllers/LessonCantroller"));
// import apo from './controllers/k';
// import S from './routes/upl';
// import uploading from './controllers/upload';
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
}));
app.use(express_1.default.json());
app.use('/api/section', sectionrouter_1.default);
app.use('/api/cor', CourceCantroller_1.default);
app.use('/api/oflinecource', oflinecourcerouter_1.default);
app.use('/api/ofllinenrollment', Oflineenrollmentrouter_1.default);
app.use('/api/review', ReviewRouter_1.default);
app.use('/api/Fee', FeeRouter_1.default);
app.use('/api/user', userRoute_1.default);
app.use('/api/Teacher', TeacherRouter_1.default);
app.use('/api/category', CatogoryRouter_1.default);
app.use('/api/Salary', SalaryRouter_1.default);
app.use('/api/student', StudentRouter_1.default);
app.use('/api/cource', CourceRouter_1.default);
app.use('/api/contact', ContactRouter_1.default);
// app.use('/api/news',newsRouter)
// app.use('/api/LatestNews',News)
app.use('/api/payment', PaymentRoouter_1.default);
// app.use('/api/img',img)
app.use('/api/exam', ExamRouter_1.default);
app.use('/api/lesson', LessonCantroller_1.default);
app.listen(5000, () => {
    console.log('Serving on port 5000');
});
