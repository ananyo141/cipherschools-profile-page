"use strict";
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
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        maxlength: [50, "Name cannot be more than 50 characters"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    aboutMe: {
        type: String,
        maxlength: [500, "About me cannot be more than 500 characters"],
        default: null,
    },
    followers: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    facebookId: { type: String, default: null },
    twitterId: { type: String, default: null },
    instagramId: { type: String, default: null },
    linkedinId: { type: String, default: null },
    githubId: { type: String, default: null },
    website: { type: String, default: null },
    highestEducation: {
        type: String,
        enum: ["none", "highschool", "bachelors", "masters", "phd"],
        default: "none",
    },
    currentWork: {
        type: String,
        enum: ["none", "schooling", "college", "teaching", "job", "freelancing"],
        default: "none",
    },
    interests: {
        type: [String],
        enum: [
            "none",
            "app",
            "web",
            "game",
            "dsa",
            "programming",
            "machine learning",
            "data science",
            "others",
        ],
        default: ["none"],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password"))
            return;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(user.password, salt);
        user.password = hash;
    });
});
userSchema.methods.comparePassword = function (candidatePassword, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(candidatePassword, this.password).catch(next);
    });
};
userSchema.plugin(mongoose_paginate_v2_1.default);
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
