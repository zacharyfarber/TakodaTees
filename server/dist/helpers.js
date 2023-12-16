"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customToFixed = void 0;
function customToFixed(num) {
    const decimalPart = num.toString().split('.')[1];
    if (decimalPart) {
        return num.toFixed(2);
    }
    return num.toString();
}
exports.customToFixed = customToFixed;
