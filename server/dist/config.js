"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOrigins = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.corsOrigins = process.env.NODE === 'production'
    ? 'https://takoda-tees-client-git-dev-zacharyfarber.vercel.app'
    : 'http://localhost:3000';
