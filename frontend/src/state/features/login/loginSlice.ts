import { createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  loadLoginInfo,
  ACCESS_TOKEN,
} from "./authThunks";

interface LoginState {
  isLoggedIn: boolean;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;

  // user info
  name: string | null;
  email: string | null;
  aboutMe: string | null;
  followers: [string] | null;
  facebookId: string | null;
  twitterId: string | null;
  instagramId: string | null;
  linkedinId: string | null;
  githubId: string | null;
  website: string | null;
  highestEducation: string | null;
  currentWork: string | null;
  interests: string[] | null;
}

const initialState: LoginState = {
  isLoggedIn: false,
  accessToken: null,
  isLoading: false,
  error: null,
  name: null,
  email: null,
  aboutMe: null,
  followers: null,
  facebookId: null,
  twitterId: null,
  instagramId: null,
  linkedinId: null,
  githubId: null,
  website: null,
  highestEducation: null,
  currentWork: null,
  interests: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (_) => {
      sessionStorage.removeItem(ACCESS_TOKEN);
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Something went wrong";
      });

    // Register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.name = action.payload.userData.name;
        state.email = action.payload.userData.email;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Something went wrong";
      });

    // Load login state after refresh
    builder
      .addCase(loadLoginInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(loadLoginInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.accessToken = action.payload.accessToken;
        state.aboutMe = action.payload.aboutMe;
        state.followers = action.payload.followers;
        state.facebookId = action.payload.facebookId;
        state.twitterId = action.payload.twitterId;
        state.instagramId = action.payload.instagramId;
        state.linkedinId = action.payload.linkedinId;
        state.githubId = action.payload.githubId;
        state.website = action.payload.website;
        state.highestEducation = action.payload.highestEducation;
        state.currentWork = action.payload.currentWork;
        state.interests = action.payload.interests;
      })
      .addCase(loadLoginInfo.rejected, (_) => {
        return initialState;
      });
  },
});

export const { logout } = loginSlice.actions;
export { loginUser, registerUser, loadLoginInfo };
export default loginSlice.reducer;
