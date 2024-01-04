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
exports.chatruser = exports.findinguser = exports.deleteuser = exports.getAllUsers = exports.makeAdmin = exports.login = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../helpers/security/jwt");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, givenName, username } = req.body;
        if (!email || !password || !givenName) {
            let error = {
                message: 'Please provide valid data',
            };
            return res.status(400).json(error);
        }
        // check user
        const checkEmail = yield prisma.user.findFirst({
            where: {
                email,
            },
        });
        const checkgivenName = yield prisma.user.findFirst({
            where: {
                givenName,
            },
        });
        if (checkEmail) {
            return res.status(400).json({
                isSuccess: false,
                message: 'Email is already exist.',
            });
        }
        if (checkgivenName) {
            return res.status(400).json({
                isSuccess: false,
                message: 'fullname is already exist.',
            });
        }
        // register user
        const hash = bcryptjs_1.default.hashSync(password);
        const newUser = yield prisma.user.create({
            data: {
                email,
                password: hash,
                givenName,
                username,
                isAdmin: email === 'mahamdabdihassan008@gmail.com' || email === 'Cadnaanismaacillmuse8800@gmail.com',
            },
        });
        return res.json(newUser);
    }
    catch (error) {
        res.status(400).json({
            message: "something went wrong"
        });
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({
            isSuccess: false,
            message: 'Please provide login credentials',
        });
    // check user
    const user = yield prisma.user.findFirst({
        where: {
            email: email
        },
    });
    if (!user)
        return res.status(401).json({
            isSuccess: false,
            message: 'Invalid credentials.',
        });
    const checkPassword = bcryptjs_1.default.compareSync(password, user.password);
    if (!checkPassword) {
        return res.json({
            message: "Invalid credentials"
        });
    }
    const result = {
        givenName: user.givenName,
        id: user.id,
        isPaid: user.isPaid,
        username: user.username,
        isAdmin: user.isAdmin,
        joinedAt: user.joinedAt,
        token: (0, jwt_1.generateToken)({
            username: user.username,
            givenName: user.givenName,
            isAdmin: user.isAdmin,
            userId: user.id
        }),
    };
    res.json({
        message: "Login successfully",
        result,
    });
});
exports.login = login;
const makeAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!req.user?.isAdmin)
    //   return res.json({
    //     message: 'unauthorized'.toUpperCase(),
    //   });
    const { email, password, givenName, username } = req.body;
    const user = yield prisma.user.findFirst({
        where: {
            id: +req.params.id,
        },
    });
    if (!user)
        return res.json({
            isSuccess: false,
            message: 'User not found',
        });
    yield prisma.user.update({
        where: {
            id: +req.params.id,
        },
        data: {
            email,
            givenName,
            isAdmin: !user.isAdmin,
            password,
            username
        },
    });
    res.json({
        isSuccess: true,
        message: 'User updated successfully!!!',
    });
});
exports.makeAdmin = makeAdmin;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)
            return res.json({
                message: 'unauthorized'.toUpperCase(),
            });
        const allUsers = yield prisma.user.findMany();
        res.json({
            message: "Found Successfully",
            result: [...allUsers],
        });
    }
    catch (error) {
        res.json({
            message: "something went wrong"
        });
    }
});
exports.getAllUsers = getAllUsers;
const deleteuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletenow = yield prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteuser = deleteuser;
const findinguser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma.user.findFirst({
            where: {
                id: +id
            }
        });
        res.json(data);
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.findinguser = findinguser;
const chatruser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        const chartData = users.map((user) => ({
            givenName: user.givenName,
            // count: user.id.k,
            registerDate: user.joinedAt,
        }));
        res.json(chartData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.chatruser = chatruser;
