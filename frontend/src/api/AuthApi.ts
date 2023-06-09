import axios from "axios";

import { resolve } from "../utils/resolve";
import { AUTHURL, USERSURL } from "../api/Routes";

export const login = async (email: string, password: string): Promise<any> => {
  const [error, response] = await resolve(
    axios.post(`${AUTHURL}/login`, { email, password })
  );
  if (error) {
    throw error;
  }
  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<any> => {
  const [error, response] = await resolve(
    axios.post(`${AUTHURL}/register`, { name, email, password })
  );
  if (error) {
    throw error;
  }
  return response.data;
};

export const logout = async (): Promise<any> => {
  const [error, response] = await resolve(axios.post(`${AUTHURL}/logout`));
  if (error) {
    throw error;
  }
  return response.data;
};

export const getUserInfo = async (accessToken: string): Promise<any> => {
  const [error, response] = await resolve(
    axios.get(`${USERSURL}/profile`, {
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
