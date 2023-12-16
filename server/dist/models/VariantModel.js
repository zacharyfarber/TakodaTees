"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VariantSchema = new mongoose_1.Schema({
    printfulId: Number,
    name: String,
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product'
    }
});
const VariantModel = (0, mongoose_1.model)('Variant', VariantSchema);
exports.default = VariantModel;
