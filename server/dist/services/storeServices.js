"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getRecentDrops = exports.getDrop = void 0;
const DropModel_1 = __importDefault(require("../models/DropModel"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const getDrop = async (dropId) => {
    const drop = await DropModel_1.default.findById(dropId).populate('products');
    return drop;
};
exports.getDrop = getDrop;
const getRecentDrops = async () => {
    const recentDrops = await DropModel_1.default.find({ access: 'public' })
        .sort({ createdAt: -1 })
        .limit(3)
        .populate('products');
    return recentDrops;
};
exports.getRecentDrops = getRecentDrops;
const getProduct = async (productId) => {
    const product = ProductModel_1.default.findById(productId)
        .populate('drop')
        .populate('variants');
    return product;
};
exports.getProduct = getProduct;
