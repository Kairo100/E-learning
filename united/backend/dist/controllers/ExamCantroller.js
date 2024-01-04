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
exports.updateexam = exports.deleteexam = exports.getoneexam = exports.getallexam = exports.Createexam = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Createexam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { courseId, oflinecourceId, CourceName, Total, studentPhone, Studentname, studentId } = req.body;
        if (!courseId || !studentId || !CourceName) {
            return res.json({
                Message: "Failed to create new exam please check your Data"
            });
        }
        const addtoexam = yield prisma.exam.create({
            data: {
                studentId,
                courseId,
                Total,
                CourceName,
                studentPhone,
                Studentname,
                oflinecourceId
            }
        });
        res.json({
            message: "Created successfully",
            addtoexam
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.Createexam = Createexam;
const getallexam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getnowallexam = yield prisma.exam.findMany();
        res.json({
            message: "Found successfully",
            result: [...getnowallexam]
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.getallexam = getallexam;
const getoneexam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentPhone } = req.params;
        const data = yield prisma.exam.findFirst({
            where: {
                studentPhone
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
exports.getoneexam = getoneexam;
const deleteexam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteexam = yield prisma.exam.delete({
            where: {
                id: +id
            }
        });
        res.json({
            message: "Deleted successfully",
            deleteexam
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteexam = deleteexam;
const updateexam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { courseId, Total, CourceName, Studentname, oflinecourceId, studentPhone, studentId } = req.body;
        const { id } = req.params;
        const getonejust = yield prisma.exam.findFirst({
            where: {
                id: +id
            }
        });
        if (!getonejust) {
            return res.json({
                message: "is not exist the exam you applied"
            });
        }
        const justupdateit = yield prisma.exam.update({
            where: {
                id: +id
            },
            data: {
                courseId,
                studentId,
                Total,
                oflinecourceId,
                CourceName,
                Studentname,
                studentPhone,
            }
        });
        res.json({
            message: "Updated successfully",
            justupdateit
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.updateexam = updateexam;
