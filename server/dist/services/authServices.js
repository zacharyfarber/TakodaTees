"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.attemptLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET;
const attemptLogin = async (username, password) => {
    const loginUser = {
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD
    };
    if (username === loginUser.username && loginUser.password && jwtSecret) {
        const validPassword = await bcryptjs_1.default.compare(password, loginUser.password);
        if (validPassword) {
            const header = {
                alg: 'HS256',
                typ: 'JWT'
            };
            const token = jsonwebtoken_1.default.sign({ username }, jwtSecret, { header });
            return token;
        }
    }
    return null;
};
exports.attemptLogin = attemptLogin;
const validateToken = async (token) => {
    if (token && jwtSecret && jsonwebtoken_1.default.verify(token, jwtSecret)) {
        return true;
    }
    return false;
};
exports.validateToken = validateToken;
