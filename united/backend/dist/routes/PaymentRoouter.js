"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OnlinestudentController_1 = require("../controllers/OnlinestudentController");
const paymentrouter = (0, express_1.Router)();
paymentrouter.post('/pay', OnlinestudentController_1.createPayment);
exports.default = paymentrouter;
