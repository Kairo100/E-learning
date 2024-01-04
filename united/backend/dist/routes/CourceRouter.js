"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CourceCantroller_1 = require("../controllers/CourceCantroller");
// import { uploadController } from '../controllers/CourceCantroller';
// import { uploadController } from './uploadController';
const express_1 = require("express");
const uploadRouter = (0, express_1.Router)();
uploadRouter.get('/get/all', CourceCantroller_1.cources);
// uploadRouter.delete('/delete/:id',deletecource)
exports.default = uploadRouter;
