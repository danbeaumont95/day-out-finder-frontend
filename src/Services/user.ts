import axios from "axios";
import { url } from "./url";


const login = async (username: string, password: string) => {
  const res = await axios.post(`${url}/map-app/login/`, {
    username,
    password
  })
  return res;
}

const register = async (first_name: string, last_name: string, email: string, password: string) => {
  const res = await axios.post(`${url}/map-app/user/`, {
    first_name,
    last_name,
    email,
    password
  })
  return res;
}

const getMyAddresses = async (token: string) => {
  const res = await axios.get(`${url}/map-app/get_my_addresses`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
}

const getMe = async (token: string) => {
  const res = await axios.get(`${url}/map-app/get_me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
}

const getMySavedAddresses = async (token: string) => {
  const res = await axios.get(`${url}/map-app/get_my_saved_addresses`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
  return res
}

const UserService = {
  login,
  register,
  getMyAddresses,
  getMe,
  getMySavedAddresses
};

export default UserService;
