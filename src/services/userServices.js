import httpServices from "./httpServices";
import { jwtDecode } from "jwt-decode";
import { ref } from "joi";

const TOKEN_KEY = "token";
refreshToken();

async function logIn(values) {
  const response = await httpServices.post("/users/login", values);
  setToken(response.data);
}

async function register(values) {
  const request = {
    name: {
      first: values.firstName,
      middle: values.middleName,
      last: values.lastName,
    },
    phone: values.phone,
    email: values.email,
    password: values.password,
    address: {
      street: values.street,
      city: values.city,
      country: values.country,
      zip: values.zip,
    },
    passport: {
      passportNumber: values.passportNumber,
      passportDate: values.passportDate,
      passportCountry: values.passportCountry,
    },
  };

  const response = await httpServices.post("/users/", request);
  return response;
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  refreshToken();
}

function logOut() {
  setToken(null);
}

function refreshToken() {
  httpServices.setDefaultCommonHeaders("x-auth-token", getJWT());
}

function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

async function getUserData(userId) {
  const response = await httpServices.get(`/users/${userId}`);
  return response.data;
}

function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch {
    return null;
  }
}

async function updateUserData(userId, values) {
  const request = {
    name: {
      first: values.firstName,
      middle: values.middleName,
      last: values.lastName,
    },
    phone: values.phone,
    email: values.email,

    address: {
      street: values.street,
      state: values.state,
      city: values.city,
      country: values.country,
      houseNumber: values.houseNumber,
      zip: values.zip,
    },
    passport: {
      passportNumber: values.passportNumber,
      passportDate: values.passportDate,
      passportCountry: values.passportCountry,
    },
  };
  const response = await httpServices.put(`/users/${userId}`, request);
  return response.data;
}

async function changeUserStatus(userId, values) {
  const request = {
    isAgent: values.isAgent,
    isAdmin: values.isAgent,
  };
  const response = await httpServices.put(`/users/${userId}/status`, request);
  return response.data;
}

const userService = {
  logIn,
  register,
  setToken,
  refreshToken,
  getJWT,
  logOut,
  getUser,
  getUserData,
  updateUserData,
  changeUserStatus,
};

export default userService;
