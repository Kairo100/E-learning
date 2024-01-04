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
exports.cources = void 0;
const express_1 = __importDefault(require("express"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const H = (0, express_1.default)();
// Configure Cloudinary
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Configure multer for file uploads
const storage = multer_1.default.diskStorage({});
const upload = (0, multer_1.default)({ storage });
// Upload endpoint
H.post('/upload', upload.fields([{ name: 'videoUrl' }, { name: 'imageUrl' }]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    if (!files || !files['videoUrl'] || !files['imageUrl']) {
        return res.status(400).json({ message: 'Both video and image files are required' });
    }
    try {
        const videoFiles = files['videoUrl'];
        const imageFiles = files['imageUrl'];
        const videoFile = videoFiles === null || videoFiles === void 0 ? void 0 : videoFiles[0];
        const imageFile = imageFiles === null || imageFiles === void 0 ? void 0 : imageFiles[0];
        if (!videoFile || !imageFile) {
            return res.status(400).json({ message: 'Video or image file not found' });
        }
        const timestamp = Math.floor(Date.now() / 1000); // Set the timestamp to the current time
        const videoUploadResult = yield cloudinary_1.default.v2.uploader.upload(videoFile.path, {
            resource_type: 'video',
            timestamp,
        });
        const imageUploadResult = yield cloudinary_1.default.v2.uploader.upload(imageFile.path, {
            resource_type: 'image',
            timestamp,
        });
        const videoUrlsecure = videoUploadResult.secure_url;
        const imageUrls = imageUploadResult.secure_url;
        // Save the video URL, image URL, and other fields to the database or perform any other necessary action
        // Example: Save it using Prisma
        const { content, Name, title, price, CategoryId, id } = req.body;
        const createdcource = yield prisma.cource.create({
            data: {
                videoUrl: videoUrlsecure,
                imageUrl: imageUrls,
                content,
                Name,
                title,
                price,
                id: +id,
                CategoryId: +CategoryId
            },
        });
        res.json(createdcource);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to upload video or image' });
    }
}));
const cources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getNowAllCources = yield prisma.cource.findMany();
        // res.json({
        //   message: 'Found successfully',
        //   result: [...getNowAllCources],
        // });
    }
    catch (error) {
        return res.json({
            message: 'Something went wrong',
        });
    }
});
exports.cources = cources;
// H.put('/update/:id', async (req: Request, res: Response)
exports.default = H;
