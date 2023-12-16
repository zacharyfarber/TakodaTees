"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentIntent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const createPaymentIntent = async (amount) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd'
    });
    return paymentIntent;
};
exports.createPaymentIntent = createPaymentIntent;
