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
const express_1 = require("express");
const adminController = __importStar(require("../controllers/adminController"));
const router = (0, express_1.Router)();
router.post('/drops/new', adminController.createDrop);
router.get('/drops/:dropId', adminController.getDrop);
router.get('/drops', adminController.getDrops);
router.put('/drops/:dropId', adminController.updateDrop);
router.delete('/drops/:dropId', adminController.deleteDrop);
router.get('/products/:productId', adminController.getProduct);
router.get('/products', adminController.getProducts);
router.put('/products/:productId/data', adminController.updateProductData);
router.put('/products/:productId/drop', adminController.updateProductDrop);
router.delete('/products/:productId', adminController.deleteProduct);
exports.default = router;
