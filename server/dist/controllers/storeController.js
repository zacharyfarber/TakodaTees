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
exports.getProduct = exports.getRecentDrops = exports.getDrop = void 0;
const storeServices = __importStar(require("../services/storeServices"));
const getDrop = async (req, res) => {
    try {
        const { dropId } = req.params;
        const drop = await storeServices.getDrop(dropId);
        return res.status(200).json(drop);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.getDrop = getDrop;
const getRecentDrops = async (_req, res) => {
    try {
        const recentDrops = await storeServices.getRecentDrops();
        return res.status(200).json(recentDrops);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.getRecentDrops = getRecentDrops;
const getProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await storeServices.getProduct(productId);
        return res.status(200).json(product);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.getProduct = getProduct;
