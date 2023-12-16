"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: String,
    price: Number,
    colors: {
        type: Map,
        of: String
    },
    sizes: {
        type: Array,
        of: String
    },
    images: {
        type: Map,
        of: mongoose_1.Schema.Types.Mixed
    },
    description: String,
    details: String,
    category: {
        type: String,
        enum: ['Tops', 'Bottoms', 'Accessories']
    },
    keywords: {
        type: Array,
        of: String
    },
    drop: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Drop'
    },
    variants: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Variant'
        }
    ]
}, { timestamps: true });
const ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = ProductModel;
