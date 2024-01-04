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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteonelesson = exports.findmanylesson = exports.getonelesson = exports.RegisterLesson = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const cloudinary_1 = __importDefault(require("cloudinary"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
dotenv_1.default.config();
const lesson = (0, express_1.default)();
cloudinary_1.default.v2.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
});
const storage = multer_1.default.diskStorage({});
const upload = (0, multer_1.default)({ storage });
// const storage = multer.diskStorage({});
// const upload = multer({ storage });
lesson.post('/create', upload.single('videoUrl'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, sectionId } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const result = yield cloudinary_1.default.v2.uploader.upload(file.path, {
            resource_type: "video"
        });
        const registering = yield prisma.lesson.create({
            data: {
                title,
                content,
                sectionId: +sectionId,
                videoUrl: result.secure_url
            }
        });
        res.json({
            message: "Created successfully",
            registering
        });
    }
    catch (error) {
        console.log(error);
    }
}));
const RegisterLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const 
    }
    catch (error) {
    }
});
exports.RegisterLesson = RegisterLesson;
const getonelesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const finding = yield prisma.lesson.findFirst({
            where: {
                id: +id
            }
        });
        res.json({
            message: "Found successfully",
            finding
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getonelesson = getonelesson;
const findmanylesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const finding = yield prisma.lesson.findMany();
        res.json({
            message: "Found successfully",
            finding
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.findmanylesson = findmanylesson;
const deleteonelesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const finding = yield prisma.lesson.findFirst({
            where: {
                id: +id
            }
        });
        if (finding) {
            const deleteone = yield prisma.lesson.delete({
                where: {
                    id: +id
                }
            });
            res.json({
                message: 'deleted successfully',
                deleteone
            });
        }
    }
    catch (error) {
        res.json({
            message: "something went wrong"
        });
    }
});
exports.deleteonelesson = deleteonelesson;
exports.default = lesson;
// import express, { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// import cloudinary from 'cloudinary';
// import multer from 'multer';
// const prisma = new PrismaClient();
// const upload = multer({ dest: 'uploads/' });
// cloudinary.v2.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// const Lessoncreate = express();
// Lessoncreate.use(express.json());
// // Create a lesson
// Lessoncreate.post('/lessons', upload.single('video'), async (req: Request, res: Response) => {
//   try {
//     const { title, content, sectionId } = req.body;
//     const file = req.file;
//     if (!file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }
//     const result = await cloudinary.v2.uploader.upload(file.path);
//     const lesson = await prisma.lesson.create({
//       data: {
//         title,
//         content,
//         videoUrl:result.secure_url,
//         // : result.secure_url,
//         sectionId,
//       },
//     });
//     res.json({ lesson });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });
// export default Lessoncreate;
