import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as CustomError from "../errors";
import UserModel from "../models/userModel";
import { asyncWrapper } from "../utils";

export const getUsers = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const user = await UserModel.findById(_req.user);
    if (user?.role !== "admin") {
      return _next(new CustomError.ForbiddenError("Only admins can access"));
    }
    const users = await UserModel.find();
    _res.status(StatusCodes.OK).json(users);
  }
);

export const getUserInfo = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const user = await UserModel.findById(_req.user).select(
      "-password -_id -__v"
    );
    if (!user) {
      return _next(new CustomError.NotFoundError("User not found"));
    }
    _res.status(StatusCodes.OK).json(user);
  }
);

export const patchUser = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const {
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
    } = _req.body;

    const user = await UserModel.findOneAndUpdate(
      { _id: _req.user },
      {
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
      },
      { new: true }
    );
    if (!user) {
      return _next(new CustomError.NotFoundError("User not found"));
    }
    _res.status(StatusCodes.OK).json(user);
  }
);

export const deleteUser = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const user = await UserModel.deleteOne({ _id: _req.user });
    if (!user) _next(new CustomError.NotFoundError("User not found"));
    else _res.status(StatusCodes.NO_CONTENT).json(user);
  }
);

export const changePassword = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const { oldPassword, newPassword } = _req.body;
    const user = await UserModel.findById(_req.user);
    if (!user) {
      return _next(new CustomError.NotFoundError("User not found"));
    }
    const isMatch = await user.comparePassword(oldPassword, _next);
    if (!isMatch) {
      return _next(new CustomError.UnauthorizedError("Incorrect password"));
    }
    user.password = newPassword;
    await user.save();
    _res.status(StatusCodes.OK).json(user);
  }
);

export const followUser = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const { username } = _req.params;
    const user = await UserModel.findById(_req.user);
    const userToFollow = await UserModel.findOne({ name: username });
    if (!user || !userToFollow) {
      return _next(new CustomError.NotFoundError("User not found"));
    }
    if (userToFollow.followers.includes(user._id)) {
      return _next(new CustomError.BadRequestError("Already following user"));
    }
    userToFollow.followers.push(user._id);
    await userToFollow.save();
    _res.status(StatusCodes.OK).json(userToFollow);
  }
);

export const unfollowUser = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const { username } = _req.params;
    const user = await UserModel.findById(_req.user);
    const userToUnfollow = await UserModel.findOne({ name: username });
    if (!user || !userToUnfollow) {
      return _next(new CustomError.NotFoundError("User not found"));
    }
    if (!userToUnfollow.followers.includes(user._id)) {
      return _next(new CustomError.BadRequestError("Not following user"));
    }
    userToUnfollow.followers.filter((id) => id !== user._id);
    await userToUnfollow.save();
    _res.status(StatusCodes.OK).json(userToUnfollow);
  }
);

export const getFollowers = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const user = await UserModel.findById(_req.user);
    if (!user) {
      return _next(new CustomError.NotFoundError("User not found"));
    }
    const { page = 1, limit = 10 } = _req.query;
    try {
      const paginatedFollowers = await UserModel.paginate(
        { _id: { $in: user.followers } },
        {
          page: Number(page),
          limit: Number(limit),
        }
      );
      _res.status(StatusCodes.OK).json(paginatedFollowers);
    } catch (err: any) {
      _next(new CustomError.InternalServerError(err.message));
    }
  }
);

export const addInterests = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const { interests } = _req.body;
    const user = await UserModel.findById(_req.user).select("interests");
    if (!user) {
      return _next(new CustomError.NotFoundError("User not found"));
    }
    user.interests = interests;
    await user.save();
    _res.status(StatusCodes.OK).json(user);
  }
);
