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

export const userUpdatePassword = createAsyncThunk(
  "user/userUpdatePassword",
  async (payload: { password: string; accessToken: string }, thunkAPI) => {
    const [error, response] = await resolve(
      UserApi.userUpdatePassword(payload.accessToken, payload.password)
    );
    if (error) return thunkAPI.rejectWithValue(error.message);
    return response;
  }
);
