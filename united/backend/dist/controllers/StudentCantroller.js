"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatestudent = exports.deletestudentdata = exports.getonestudent = exports.getallstudent = exports.Createstudent = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Createstudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, email, phone, Amount } = req.body;
        if (!Name || !email || !phone || !Amount) {
            return res.json({
                message: "please provide valid data"
            });
        }
        const justdoing = yield prisma.student.create({
            data: {
                Amount,
                email,
                Name,
                phone
            }
        });
        res.json({
            message: "Created successfully",
            justdoing
        });
    }
    catch (error) {
    }
});
exports.Createstudent = Createstudent;
const getallstudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getnowallstudent = yield prisma.student.findMany();
        res.json({
            message: "Found successfully",
            result: [...getnowallstudent]
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.getallstudent = getallstudent;
const getonestudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma.student.findFirst({
            where: {
                Id: +id
            }
        });
        res.json(data);
    }
    catch (error) {
        return res.json({
            message: 'something went wrong'
        });
    }
});
exports.getonestudent = getonestudent;
const deletestudentdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const justdeleteit = yield prisma.student.delete({
            where: {
                Id: parseInt(id), // Convert Id to an integer
            },
        });
        res.json(justdeleteit);
    }
    catch (error) {
        return res.json({
            message: "something went wrong",
        });
    }
});
exports.deletestudentdata = deletestudentdata;
const updatestudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, Name, phone, Amount } = req.body;
        const { id } = req.params;
        const getonejust = yield prisma.student.findFirst({
            where: {
                Id: +id
            }
        });
        const justupdateit = yield prisma.student.update({
            where: {
                Id: +id
            },
            data: {
                Name,
                phone,
                email,
                Amount,
            }
        });
        res.json(justupdateit);
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.updatestudent = updatestudent;
