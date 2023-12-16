"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const VariantModel_1 = __importDefault(require("../models/VariantModel"));
dotenv_1.default.config();
const getProduct = async (productId) => {
    const { data: { result: { sync_product, sync_variants } } } = await axios_1.default.get(`https://api.printful.com/store/products/${productId}`, {
        headers: {
            Authorization: `Bearer ${process.env.PRINTFUL_TOKEN}`,
            'X-PF-Store-Id': process.env.PRINTFUL_STORE_ID
        }
    });
    return { sync_product, sync_variants };
};
const createProduct = async (productData) => {
    const { sync_product, sync_variants } = await getProduct(productData.data.sync_product.id);
    const newProduct = new ProductModel_1.default({
        name: sync_product.name
    });
    const savedProduct = await newProduct.save();
    const newVariants = sync_variants.map((variant) => {
        return new VariantModel_1.default({
            printfulId: variant.id,
            name: variant.name,
            product: savedProduct._id
        });
    });
    const savedVariants = await VariantModel_1.default.insertMany(newVariants);
    savedProduct.variants = savedVariants.map((variant) => variant._id);
    await savedProduct.save();
    return savedProduct;
};
exports.createProduct = createProduct;
