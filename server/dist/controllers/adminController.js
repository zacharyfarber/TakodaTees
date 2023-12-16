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
exports.deleteProduct = exports.updateProductDrop = exports.updateProductData = exports.getProducts = exports.getProduct = exports.deleteDrop = exports.updateDrop = exports.getDrops = exports.getDrop = exports.createDrop = void 0;
const adminServices = __importStar(require("../services/adminServices"));
const createDrop = async (req, res) => {
    try {
        const drop = await adminServices.createDrop(req.body.dropName);
        return res.status(200).json(drop);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.createDrop = createDrop;
const getDrop = async (req, res) => {
    try {
        const drop = await adminServices.getDrop(req.params.dropId);
        return res.status(200).json(drop);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.getDrop = getDrop;
const getDrops = async (_req, res) => {
    try {
        const drops = await adminServices.getDrops();
        return res.status(200).json(drops);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.getDrops = getDrops;
const updateDrop = async (req, res) => {
    try {
        const drop = await adminServices.updateDrop(req.params.dropId, req.body.dropName, req.body.dropAccess, req.body.productsToRemove);
        return res.status(200).json(drop);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.updateDrop = updateDrop;
const deleteDrop = async (req, res) => {
    try {
        await adminServices.deleteDrop(req.params.dropId);
        return res.status(200).json({ message: 'OK' });
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.deleteDrop = deleteDrop;
const getProduct = async (req, res) => {
    try {
        const product = await adminServices.getProduct(req.params.productId);
        return res.status(200).json(product);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.getProduct = getProduct;
const getProducts = async (_req, res) => {
    try {
        const products = await adminServices.getProducts();
        return res.status(200).json(products);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.getProducts = getProducts;
const updateProductData = async (req, res) => {
    try {
        const product = await adminServices.updateProductData(req.params.productId, req.body.productData);
        return res.status(200).json(product);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.updateProductData = updateProductData;
const updateProductDrop = async (req, res) => {
    try {
        const product = await adminServices.updateProductDrop(req.params.productId, req.body.dropName);
        return res.status(200).json(product);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.updateProductDrop = updateProductDrop;
const deleteProduct = async (req, res) => {
    try {
        await adminServices.deleteProduct(req.params.productId);
        return res.status(200).json({ message: 'OK' });
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
exports.deleteProduct = deleteProduct;
