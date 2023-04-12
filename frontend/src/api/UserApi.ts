import axios from "axios";

import { resolve } from "../utils/resolve";
import { USERSURL } from "../api/Routes";

export interface UserAttrs {
  aboutMe?: string;
  linkedinId?: string;
  githubId?: string;
  twitterId?: string;
  facebookId?: string;
  instagramId?: string;
  website?: string;
  highestEducation?: string;
  currentWork?: string;
}

export const userUpdate = async (
  accessToken: string,
  attrs: UserAttrs
): Promise<any> => {
  const [error, response] = await resolve(
    axios.patch(`${USERSURL}/profile`, attrs, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
  );
  if (error) {
    throw error;
  }
  return response.data;
};

export const userUpdatePassword = async (
  accessToken: string,
  oldPassword: string,
  newPassword: string
): Promise<any> => {
  const [error, response] = await resolve(
    axios.post(
      `${USERSURL}/password`,
      { oldPassword, newPassword },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
  );
  if (error) {
    throw error;
  }
  return response.data;
};

export const userUpdateInterests = async (
  accessToken: string,
  interests: string[]
): Promise<any> => {
  const [error, response] = await resolve(
    axios.post(
      `${USERSURL}/interests`,
      { interests },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
  );
  if (error) {
    throw error;
  }
  return response.data;
};
