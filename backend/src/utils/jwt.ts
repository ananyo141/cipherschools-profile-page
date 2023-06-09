import jwt from "jsonwebtoken";

import { UserDocument } from "../models/userModel";

export interface SerializedUser {
  userId: string;
  userEmail: string;
}

export const serializeUser = (user: UserDocument): SerializedUser => {
  return { userId: user._id, userEmail: user.email };
};

export const genAccessToken = (user: UserDocument | SerializedUser) => {
  const userToken = !user.hasOwnProperty("userId")
    ? serializeUser(user as UserDocument)
    : {
        userId: (user as SerializedUser).userId,
        userEmail: (user as SerializedUser).userEmail,
      };
  return jwt.sign(userToken, process.env.JWT_ACCESS_SECRET!);
};

export const genRefreshToken = (user: UserDocument | SerializedUser) => {
  const userToken = !user.hasOwnProperty("userId")
    ? serializeUser(user as UserDocument)
    : {
        userId: (user as SerializedUser).userId,
        userEmail: (user as SerializedUser).userEmail,
      };
  return jwt.sign(userToken, process.env.JWT_REFRESH_SECRET!);
};

export const verifyAccessToken = (token: string): SerializedUser => {
  const deserializedUser = jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET!
  ) as SerializedUser;
  return deserializedUser;
};
