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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInterests = exports.getFollowers = exports.unfollowUser = exports.followUser = exports.changePassword = exports.deleteUser = exports.patchUser = exports.getUserInfo = exports.getUsers = void 0;
const http_status_codes_1 = require("http-status-codes");
const CustomError = __importStar(require("../errors"));
const userModel_1 = __importDefault(require("../models/userModel"));
const utils_1 = require("../utils");
exports.getUsers = (0, utils_1.asyncWrapper)((_req, _res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(_req.user);
    if ((user === null || user === void 0 ? void 0 : user.role) !== "admin") {
        return _next(new CustomError.ForbiddenError("Only admins can access"));
    }
    const users = yield userModel_1.default.find();
    _res.status(http_status_codes_1.StatusCodes.OK).json(users);
}));
exports.getUserInfo = (0, utils_1.asyncWrapper)((_req, _res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(_req.user).select("-password -_id -__v");
    if (!user) {
        return _next(new CustomError.NotFoundError("User not found"));
    }
    _res.status(http_status_codes_1.StatusCodes.OK).json(user);
}));
exports.patchUser = (0, utils_1.asyncWrapper)((_req, _res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, aboutMe, facebookId, twitterId, instagramId, linkedinId, githubId, website, highestEducation, currentWork, } = _req.body;
    const user = yield userModel_1.default.findOneAndUpdate({ _id: _req.user }, {
        name,
        email,
        aboutMe,
        facebookId,
        twitterId,
        instagramId,
        linkedinId,
        githubId,
        website,
        highestEducation,
        currentWork,
    }, { new: true });
    if (!user) {
        return _next(new CustomError.NotFoundError("User not found"));
    }
    _res.status(http_status_codes_1.StatusCodes.OK).json(user);
}));
exports.deleteUser = (0, utils_1.asyncWrapper)((_req, _res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.deleteOne({ _id: _req.user });
    if (!user)
        _next(new CustomError.NotFoundError("User not found"));
    else
        _res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json(user);
}));
exports.changePassword = (0, utils_1.asyncWrapper)((_req, _res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = _req.body;
    const user = yield userModel_1.default.findById(_req.user);
    if (!user) {
        return _next(new CustomError.NotFoundError("User not found"));
    }
    const isMatch = yield user.comparePassword(oldPassword, _next);
    if (!isMatch) {
        return _next(new CustomError.UnauthorizedError("Incorrect password"));
    }
    user.password = newPassword;
    yield user.save();
    _res.status(http_status_codes_1.StatusCodes.OK).json(user);
}));
exports.followUser = (0, utils_1.asyncWrapper)((_req, _res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = _req.params;
    const user = yield userModel_1.default.findById(_req.user);
    const userToFollow = yield userModel_1.default.findOne({ name: username });
    if (!user || !userToFollow) {
        return _next(new CustomError.NotFoundError("User not found"));
    }
    if (userToFollow.followers.includes(user._id)) {
        return _next(new CustomError.BadRequestError("Already following user"));
    }
    userToFollow.followers.push(user._id);
    yield userToFollow.save();
    _res.status(http_status_codes_1.StatusCodes.OK).json(userToFollow);
}));
exports.unfollowUser = (0, utils_1.asyncWrapper)((_req, _res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = _req.params;
    const user = yield userModel_1.default.findById(_req.user);
    const userToUnfollow = yield userModel_1.default.findOne({ name: username });
    if (!user || !userToUnfollow) {
        return _next(new CustomError.NotFoundError("User not found"));
    }
    if (!userToUnfollow.followers.includes(user._id)) {
        return _next(new CustomError.BadRequestError("Not following user"));
    }
    userToUnfollow.followers.filter((id) => id !== user._id);
    yield userToUnfollow.save();
    _res.status(http_status_codes_1.StatusCodes.OK).json(userToUnfollow);
}));
exports.getFollowers = (0, utils_1.asyncWrapper)((_req, _res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(_req.user);
    if (!user) {
        return _next(new CustomError.NotFoundError("User not found"));
    }
    const { page = 1, limit = 10 } = _req.query;
    try {
        const paginatedFollowers = yield userModel_1.default.paginate({ _id: { $in: user.followers } }, {
            page: Number(page),
            limit: Number(limit),
        });
        _res.status(http_status_codes_1.StatusCodes.OK).json(paginatedFollowers);
    }
    catch (err) {
        _next(new CustomError.InternalServerError(err.message));
    }
}));
exports.addInterests = (0, utils_1.asyncWrapper)((_req, _res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { interests } = _req.body;
    const user = yield userModel_1.default.findById(_req.user).select("interests");
    if (!user) {
        return _next(new CustomError.NotFoundError("User not found"));
    }
    user.interests = interests;
    yield user.save();
    _res.status(http_status_codes_1.StatusCodes.OK).json(user);
}));
