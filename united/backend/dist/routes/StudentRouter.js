"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StudentCantroller_1 = require("../controllers/StudentCantroller");
const StudentRouter = (0, express_1.Router)();
StudentRouter.post('/create', StudentCantroller_1.Createstudent);
StudentRouter.get('/get/all', StudentCantroller_1.getallstudent);
StudentRouter.get('/get/one/:id', StudentCantroller_1.getonestudent);
StudentRouter.put('/update/:id', StudentCantroller_1.updatestudent);
StudentRouter.delete('/delete/:id', StudentCantroller_1.deletestudentdata);
exports.default = StudentRouter;
