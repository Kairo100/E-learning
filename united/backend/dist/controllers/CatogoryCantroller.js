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
exports.deletecategory = exports.removeCategory = exports.getOneCategory = exports.getAllCategories = exports.updateCategory = exports.createCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// endpoint -> POST /api/category/new
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { catName, catDescription } = req.body;
        const newCategory = yield prisma.category.create({
            data: {
                catName,
                catDescription,
            },
        });
        res.json({
            isSuccess: true,
            result: Object.assign({}, newCategory),
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            isSuccess: false,
            message: 'Failed to create new category',
        });
    }
});
exports.createCategory = createCategory;
// endpoint -> PUT /api/category/edit/:catId
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { catId } = req.params;
        const { catName, catDescription } = req.body;
        ;
        const updatingCategory = yield prisma.category.update({
            where: {
                catId: +catId,
            },
            data: {
                catName,
                catDescription
            }
        });
    }
    catch (error) {
        res.json({
            message: 'Failed to update the category ',
            isSuccess: false,
        });
    }
});
exports.updateCategory = updateCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.category.findMany();
        res.json({
            isSuccess: true,
            result: [...categories],
        });
    }
    catch (error) {
        res.json({
            isSuccess: false,
            message: 'Failed to fetch the categories data',
        });
    }
});
exports.getAllCategories = getAllCategories;
const getOneCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { catId } = req.params;
        const data = yield prisma.category.findFirst({
            where: {
                catId: +catId,
            },
            // include:{
            //   Cource:{
            //     select:{
            //       // Description:true,
            //     imageUrl:true,
            //       price:true,
            //       Shortdescription:true
            //     }
            //   }
            // }
        });
        res.json(data);
    }
    catch (error) { }
});
exports.getOneCategory = getOneCategory;
// endpoint -> DELETE /api/category/remove/:catId -> soft delete
const removeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.category.update({
            where: {
                catId: +req.params.catId,
            },
            data: {
                isDeleted: true,
            },
        });
        res.json({
            isSuccess: true,
            message: 'Category deleted successfully!',
        });
    }
    catch (error) {
        res.json({
            isSuccess: false,
            message: 'Failed to delete category with the id of ' + req.params.id,
        });
    }
});
exports.removeCategory = removeCategory;
// endpoint -> DELETE /api/category/deleteAll
const deletecategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { catId } = req.params;
        const findingfrist = yield prisma.category.findFirst({
            where: {
                catId: +catId
            }
        });
        if (!findingfrist) {
            return res.json({
                message: "the category you are attempting to delet is not exist"
            });
        }
        if (findingfrist) {
            const deleteData = yield prisma.category.delete({
                where: {
                    catId: +catId
                }
            });
            return res.json({
                message: "Deleted successfully",
                deleteData
            });
        }
    }
    catch (error) {
    }
});
exports.deletecategory = deletecategory;
