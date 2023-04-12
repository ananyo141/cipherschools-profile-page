import { createAsyncThunk } from "@reduxjs/toolkit";
import * as UserApi from "../../../api/UserApi";
import { resolve } from "../../../utils/resolve";

export const userUpdate = createAsyncThunk(
  "user/userUpdate",
  async (
    payload: { attrs: UserApi.UserAttrs; accessToken: string },
    thunkAPI
  ) => {
    const [error, response] = await resolve(
      UserApi.userUpdate(payload.accessToken, payload.attrs)
    );
    if (error) return thunkAPI.rejectWithValue(error.message);
    return response;
  }
);

interface UserUpdatePasswordPayload {
  accessToken: string;
  oldPassword: string;
  newPassword: string;
}

export const userUpdatePassword = createAsyncThunk(
  "user/userUpdatePassword",
  async (payload: UserUpdatePasswordPayload, thunkAPI) => {
    const [error, response] = await resolve(
      UserApi.userUpdatePassword(
        payload.accessToken,
        payload.oldPassword,
        payload.newPassword
      )
    );
    if (error) return thunkAPI.rejectWithValue(error.message);
    return response;
  }
);
