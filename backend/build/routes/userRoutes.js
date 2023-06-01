"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const authenticateToken_1 = require("../middleware/authenticateToken");
const userRouter = express_1.default.Router();
userRouter.use(authenticateToken_1.authenticateToken);
userRouter
    .route("/profile")
    .get(userControllers_1.getUserInfo)
    .delete(userControllers_1.deleteUser)
    .patch(userControllers_1.patchUser);
userRouter.route("/").get(userControllers_1.getUsers);
userRouter.route("/password").post(userControllers_1.changePassword);
userRouter.route("/interests").post(userControllers_1.addInterests);
userRouter.route("/followers").get(userControllers_1.getFollowers);
userRouter.route("/followers/:username").get(userControllers_1.followUser).delete(userControllers_1.unfollowUser);
exports.default = userRouter;
