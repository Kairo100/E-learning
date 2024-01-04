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
exports.updatefee = exports.deletefee = exports.getonefee = exports.getallfee = exports.Createfee = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Createfee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { amountPaid, studentName, studentPhone, Balance, Total, studentId } = req.body;
        if (!amountPaid || !Balance || !Total || !studentId) {
            return res.json({
                Message: "Failed to create new fee please check your Data"
            });
        }
        const addtofee = yield prisma.fee.create({
            data: {
                studentId,
                amountPaid,
                Balance,
                Total,
                studentName,
                studentPhone,
            }
        });
        if (amountPaid === Total) {
            yield prisma.fee.update({
                where: {},
                data: {
                    Balance
                }
            });
        }
        res.json({
            message: "Created successfully",
            addtofee
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.Createfee = Createfee;
const getallfee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getnowallfee = yield prisma.fee.findMany();
        res.json({
            message: "Found successfully",
            result: [...getnowallfee]
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.getallfee = getallfee;
const getonefee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma.fee.findFirst({
            where: {
                id: +id
            }
        });
        return res.json(data);
    }
    catch (error) {
        return res.json({
            message: 'something went wrong'
        });
    }
});
exports.getonefee = getonefee;
const deletefee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { id } = req.params;
        const getonejust = yield prisma.fee.findFirst({
            where: {
                id: +id
            }
        });
        if (!getonejust) {
            return res.json({
                message: "is not exist the fee you applied"
            });
        }
        const justdeleteit = yield prisma.fee.delete({
            where: {
                id: +id
            }
        });
        res.json({
            message: "Deleted successfully",
            justdeleteit
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.deletefee = deletefee;
const updatefee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { amountPaid, Balance, Total, studentId } = req.body;
        const { id } = req.params;
        const justupdateit = yield prisma.fee.update({
            where: {
                id: +id
            },
            data: {
                amountPaid,
                Balance,
                Total,
                studentId,
                isDeleted: true
            }
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.updatefee = updatefee;
