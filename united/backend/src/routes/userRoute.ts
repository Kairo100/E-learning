import { Router } from 'express';
import {
  RegisterUser,
  chartday,
  chartinfouser,
  chatruser,
  deleteuser,
  findinguser,
  getAllUsers,
  getoneTeacherDashboardcource,
  login,
  makeAdmin,
  restoreuser,
  studentlesson,
  teacherdashboard,
  trashuser,
  yearchart,
} from '../controllers/userController';
import { decodeToken } from '../helpers/security/jwt';
const router = Router();

// create user endpoint
router.post('/register', RegisterUser);

// login user
router.post('/login', login);
router.post('/chart', chatruser);

// make admin
router.put('/update/:id', decodeToken,makeAdmin);
router.put('/trash/:id', trashuser);
router.put('/restore/:id', restoreuser);
router.delete('/delete/:id',deleteuser)

router.get('/get/all', getAllUsers);
router.get('/get/one/studentlesson/:id',studentlesson)
router.get('/get/one/:id',findinguser)
router.get('/get/teachercource/:id',getoneTeacherDashboardcource)
router.get('/api/charts/latest-registered',chartinfouser)
router.get('/get/year/:year',yearchart)
router.get('/get/chartbyday',chartday)
router.get('/dashboardteacher/:id',teacherdashboard)


export default router;
