"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProductDrop = exports.updateProductData = exports.getProducts = exports.getProduct = exports.deleteDrop = exports.updateDrop = exports.getDrops = exports.getDrop = exports.createDrop = void 0;
const DropModel_1 = __importDefault(require("../models/DropModel"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const createDrop = async (dropName) => {
    const drop = new DropModel_1.default({ name: dropName });
    await drop.save();
    return drop;
};
exports.createDrop = createDrop;
const getDrop = async (dropId) => {
    const drop = await DropModel_1.default.findById(dropId).populate('products');
    return drop;
};
exports.getDrop = getDrop;
const getDrops = async () => {
    const drops = await DropModel_1.default.find()
        .populate('products')
        .sort({ createdAt: -1 });
    return drops;
};
exports.getDrops = getDrops;
const updateDrop = async (dropId, dropName, dropAccess, productsToRemove) => {
    if (productsToRemove.length > 0) {
        await ProductModel_1.default.updateMany({ _id: { $in: productsToRemove } }, { $set: { drop: null } });
        await DropModel_1.default.findByIdAndUpdate(dropId, {
            $pull: { products: { $in: productsToRemove } }
        });
    }
    const drop = await DropModel_1.default.findByIdAndUpdate(dropId, { name: dropName, access: dropAccess }, { new: true });
    return drop;
};
exports.updateDrop = updateDrop;
const deleteDrop = async (dropId) => {
    await DropModel_1.default.findByIdAndDelete(dropId);
    await ProductModel_1.default.updateMany({ drop: dropId }, { $set: { drop: null } });
};
exports.deleteDrop = deleteDrop;
const getProduct = async (productId) => {
    const product = await ProductModel_1.default.findById(productId)
        .populate('variants')
        .populate('drop');
    return product;
};
exports.getProduct = getProduct;
const getProducts = async () => {
    const products = await ProductModel_1.default.find().sort({ createdAt: -1 });
    return products;
};
exports.getProducts = getProducts;
const updateProductData = async (productId, productData) => {
    const { name, price, colors, sizes, description, details, category, keywords } = productData;
    for (const key in colors) {
        if (colors[key] && colors[key].length)
            colors[key] = '#' + colors[key];
    }
    const keywordsArray = keywords.split(',');
    const update = {
        name,
        price,
        colors,
        sizes,
        description,
        details,
        category,
        keywords: keywordsArray
    };
    const product = await ProductModel_1.default.findByIdAndUpdate(productId, { $set: update }, {
        new: true
    });
    return product;
};
exports.updateProductData = updateProductData;
const updateProductDrop = async (productId, dropName) => {
    await DropModel_1.default.updateMany({ products: { $in: [productId] } }, { $pull: { products: productId } });
    const drop = await DropModel_1.default.findOneAndUpdate({ name: dropName }, { $push: { products: productId } }, { new: true });
    const product = await ProductModel_1.default.findByIdAndUpdate(productId, { drop: drop?._id }, { new: true });
    return product;
};
exports.updateProductDrop = updateProductDrop;
const deleteProduct = async (productId) => {
    await DropModel_1.default.updateMany({ products: { $in: [productId] } }, { $pull: { products: productId } });
    await ProductModel_1.default.findByIdAndDelete(productId);
};
exports.deleteProduct = deleteProduct;
