import express from "express";

import {
  getUsers,
  getUserInfo,
  deleteUser,
  patchUser,
} from "../controllers/userControllers";
import { authenticateToken } from "../middleware/authenticateToken";

const userRouter = express.Router();

userRouter.use(authenticateToken);
userRouter.route("/").get(getUsers);
userRouter
  .route("/profile")
  .get(getUserInfo)
  .delete(deleteUser)
  .patch(patchUser);
userRouter.route("/password").post(changePassword);
userRouter.route("/interests").post(addInterests);
userRouter.route("/followers").get(getFollowers);

export default userRouter;
