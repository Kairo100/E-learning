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
exports.getalloflinecources = exports.getoneoflinecource = exports.deleteoflinecource = exports.updateoflinecource = exports.Regiteroflinecource = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Regiteroflinecource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, CategoryId, teacherId, Description } = req.body;
        const newregiter = yield prisma.oflinecources.create({
            data: {
                Name,
                Description,
                teacherId,
                CategoryId: +CategoryId
            }
        });
        res.json({
            message: "creqated successfully",
            newregiter
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.Regiteroflinecource = Regiteroflinecource;
const updateoflinecource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { Name, teacherId, Description } = req.body;
        const finding = yield prisma.oflinecources.findFirst({
            where: {
                id: +id
            }
        });
        if (finding) {
            const updating = yield prisma.oflinecources.update({
                where: {
                    id: +id
                },
                data: {
                    Description,
                    Name,
                    teacherId
                }
            });
            res.json({
                message: "updated successfully",
                updating
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateoflinecource = updateoflinecource;
const deleteoflinecource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const finding = yield prisma.oflinecources.findFirst({
            where: {
                id: +id
            }
        });
        if (finding) {
            const deleteoflinecources = yield prisma.oflinecources.delete({
                where: {
                    id: +id
                }
            });
            res.json({
                message: "Deleted successfully",
                deleteoflinecources
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteoflinecource = deleteoflinecource;
const getoneoflinecource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Id } = req.params;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getoneoflinecource = getoneoflinecource;
const getalloflinecources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Hi');
});
exports.getalloflinecources = getalloflinecources;
