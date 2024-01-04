import { Router } from 'express';
import {
  createCategory,
  deletecategory,
  getAllCategories,
  getOneCategory,
  recycle,
  removeCategory,
  trash,
  updateCategory,
} from '../controllers/CatogoryCantroller';
import { decodeToken } from '../helpers/security/jwt';
const router = Router();

router.get('/all', getAllCategories);
router.get('/get/one/:catId', getOneCategory);
router.delete('/remove/:catId', decodeToken, removeCategory);
router.delete('/delete/:catId',deletecategory)
router.post('/create', createCategory);
router.put('/edit/:catId', updateCategory);
router.put('/trash/:id', trash);
router.put('/recycle/:id', recycle);

export default router;
