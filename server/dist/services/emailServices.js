"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const fs_1 = __importDefault(require("fs"));
const googleapis_1 = require("googleapis");
const handlebars_1 = __importDefault(require("handlebars"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("../helpers");
const OAuth2 = googleapis_1.google.auth.OAuth2;
const sendEmail = async (email, items, subtotal, shipping) => {
    async function createTransporter() {
        try {
            const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'https://developers.google.com/oauthplayground');
            oauth2Client.setCredentials({
                refresh_token: process.env.REFRESH_TOKEN
            });
            const accessToken = await new Promise((resolve, reject) => {
                oauth2Client.getAccessToken((err, token) => {
                    if (err) {
                        reject();
                    }
                    resolve(token);
                });
            });
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.USER_EMAIL,
                    accessToken,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN
                }
            });
            return transporter;
        }
        catch (err) {
            throw new Error('Error creating email transporter');
        }
    }
    const source = fs_1.default.readFileSync(path_1.default.join(__dirname, '../templates/order-summary.hbs'), 'utf8');
    const template = handlebars_1.default.compile(source);
    const replacements = {
        items: items.map((item) => ({
            name: item.item.product.name,
            size: item.item.size,
            quantity: item.count,
            price: (0, helpers_1.customToFixed)(item.item.product.price * item.count),
            image: item.item.product.images[Object.keys(item.item.product.images)[0]]
                .split(',')
                .filter((image) => {
                return image.includes('front');
            })[0]
        })),
        totalPrice: (0, helpers_1.customToFixed)(subtotal),
        shipping,
        tax: (0, helpers_1.customToFixed)(subtotal * 0.1),
        grandTotal: (0, helpers_1.customToFixed)(subtotal + shipping + subtotal * 0.1)
    };
    const htmlToSend = template(replacements);
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Takoda Tees Order Confirmation',
        html: htmlToSend
    };
    const emailTransporter = await createTransporter();
    await emailTransporter.sendMail(mailOptions);
};
exports.sendEmail = sendEmail;
