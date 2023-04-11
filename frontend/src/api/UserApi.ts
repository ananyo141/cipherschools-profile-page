import axios from "axios";

import { resolve } from "../utils/resolve";
import { USERSURL } from "../api/Routes";

interface UserAttrs {
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

export const userUpdate = async (attrs: UserAttrs): Promise<any> => {
  const [error, response] = await resolve(
    axios.patch(`${USERSURL}/profile`, attrs)
  );
  if (error) {
    throw error;
  }
  return response.data;
};
