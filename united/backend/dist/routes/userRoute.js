"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const jwt_1 = require("../helpers/security/jwt");
const router = (0, express_1.Router)();
// create user endpoint
router.post('/register', userController_1.registerUser);
// login user
router.post('/login', userController_1.login);
router.post('/chart', userController_1.chatruser);
// make admin
router.put('/update/:id', jwt_1.decodeToken, userController_1.makeAdmin);
router.delete('/delete/:id', userController_1.deleteuser);
router.get('/get/all', userController_1.getAllUsers);
router.get('/get/one/:id', userController_1.findinguser);
exports.default = router;
