"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.attemptLogin = void 0;
const authServices = __importStar(require("../services/authServices"));
const attemptLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await authServices.attemptLogin(username, password);
        if (token) {
            return res.status(200).json({ token });
        }
        return res.status(401).json({ message: 'Invalid username or password.' });
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.attemptLogin = attemptLogin;
const validateToken = async (req, res) => {
    try {
        const isValidated = await authServices.validateToken(req.body.token);
        if (isValidated) {
            return res.status(200).json({ isValidated: true });
        }
        return res.status(401).json({ message: 'Invalid token' });
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.validateToken = validateToken;
