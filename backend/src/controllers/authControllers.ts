import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { genAccessToken, genRefreshToken } from "../utils/jwt";

import User from "../models/userModel";
import * as CustomErrors from "../errors";
import asyncWrapper from "../utils/asyncWrapper";

export const loginController = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const { email, password } = _req.body;
    if (!email || !password)
      return _next(
        new CustomErrors.BadRequestError("Please provide email and password")
      );

    const user = await User.findOne({ email: email });
    if (!user)
      return _next(
        new CustomErrors.NotFoundError("Invalid email or user does not exist")
      );

    // passwords match, return access token and refresh token
    if (await user.comparePassword(password, _next)) {
      const accessToken = genAccessToken(user);
      const refreshToken = genRefreshToken(user);
      _res
        .status(StatusCodes.OK)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      // passwords do not match
      return _next(new CustomErrors.UnauthorizedError("Invalid password"));
    }
  }
);

export const registerController = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    if (!_req.body.name || !_req.body.email || !_req.body.password)
      return _next(
        new CustomErrors.BadRequestError("Please provide all required fields")
      );

    if (
      (await User.findOne({ email: _req.body.email })) ||
      (await User.findOne({ name: _req.body.name }))
    )
      return _next(new CustomErrors.BadRequestError("User already exists"));
    else {
      const user = await User.create(_req.body);
      const accessToken = genAccessToken(user);
      const refreshToken = genRefreshToken(user);
      _res.status(StatusCodes.CREATED).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        userData: user,
      });
    }
  }
);
