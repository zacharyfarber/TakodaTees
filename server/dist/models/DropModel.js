"use strict";
// Notes: Make name unique
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DropSchema = new mongoose_1.Schema({
    name: String,
    access: {
        type: String,
        default: 'private',
        enum: ['public', 'private']
    },
    products: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
}, { timestamps: true });
const DropModel = (0, mongoose_1.model)('Drop', DropSchema);
exports.default = DropModel;
