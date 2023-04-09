import express from "express";

import {
  getUsers,
  getUserInfo,
  deleteUser,
  patchUser,
  changePassword,
  addInterests,
  getFollowers,
  followUser,
  unfollowUser,
} from "../controllers/userControllers";
import { authenticateToken } from "../middleware/authenticateToken";

const userRouter = express.Router();

// only logged-in/authenticated users can access these routes
userRouter.use(authenticateToken);

userRouter
  .route("/profile")
  .get(getUserInfo)
  .delete(deleteUser)
  .patch(patchUser);
userRouter.route("/").get(getUsers);
userRouter.route("/password").post(changePassword);
userRouter.route("/interests").post(addInterests);
userRouter.route("/followers").get(getFollowers);
userRouter.route("/followers/:username").get(followUser).delete(unfollowUser);

export default userRouter;
