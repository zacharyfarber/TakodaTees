"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
const printfulRoutes_1 = __importDefault(require("./routes/printfulRoutes"));
const storeRoutes_1 = __importDefault(require("./routes/storeRoutes"));
const stripeRoutes_1 = __importDefault(require("./routes/stripeRoutes"));
dotenv_1.default.config();
if (!process.env.MONGO_URI) {
    throw new Error('Cannot connect to MongoDB: MONGO_URI is not defined');
}
mongoose_1.default.connect(process.env.MONGO_URI);
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: config_1.corsOrigins
}));
app.use('/admin', adminRoutes_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/email', emailRoutes_1.default);
app.use('/printful', printfulRoutes_1.default);
app.use('/store', storeRoutes_1.default);
app.use('/stripe', stripeRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
