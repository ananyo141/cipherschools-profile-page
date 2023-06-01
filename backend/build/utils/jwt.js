"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.genRefreshToken = exports.genAccessToken = exports.serializeUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const serializeUser = (user) => {
    return { userId: user._id, userEmail: user.email };
};
exports.serializeUser = serializeUser;
const genAccessToken = (user) => {
    const userToken = !user.hasOwnProperty("userId")
        ? (0, exports.serializeUser)(user)
        : {
            userId: user.userId,
            userEmail: user.userEmail,
        };
    return jsonwebtoken_1.default.sign(userToken, process.env.JWT_ACCESS_SECRET);
};
exports.genAccessToken = genAccessToken;
const genRefreshToken = (user) => {
    const userToken = !user.hasOwnProperty("userId")
        ? (0, exports.serializeUser)(user)
        : {
            userId: user.userId,
            userEmail: user.userEmail,
        };
    return jsonwebtoken_1.default.sign(userToken, process.env.JWT_REFRESH_SECRET);
};
exports.genRefreshToken = genRefreshToken;
const verifyAccessToken = (token) => {
    const deserializedUser = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
    return deserializedUser;
};
exports.verifyAccessToken = verifyAccessToken;
