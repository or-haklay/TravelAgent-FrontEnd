import { useEffect } from "react";
import httpServices from "./httpServices";
import ordersService from "./ordersServices";
import { jwtDecode } from "jwt-decode";

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

async function changeUserRole(userId, values) {
  let request = {};

  try {
    if (values === "customer") {
      request = {
        isAgent: false,
        isAdmin: false,
      };
    } else if (values === "agent") {
      request = {
        isAgent: true,
        isAdmin: false,
      };
    } else if (values === "admin") {
      request = {
        isAgent: true,
        isAdmin: true,
      };
    } else {
      request = {
        isAgent: values.isAgent,
        isAdmin: values.isAdmin,
      };
    }
  } catch (error) {
    console.error("Failed to change user role:", error);
  }

  const response = await httpServices.patch(`/users/${userId}`, request);
  return response.data;
}

async function getUserDetails(id) {
  const response = await httpServices.get(`/users/${id}`);
  return response.data;
}

async function getAllAgents() {
  const response = await httpServices.get("/users");
  const allUsers = response.data;
  const agents = allUsers.filter((user) => user.isAgent === true);
  return agents;
}

async function getAllUsers() {
  const response = await httpServices.get("/users");
  const allUsers = response.data;
  const users = allUsers.filter(
    (user) => user.isAdmin === false && user.isAgent === false
  );
  return users;
}

async function getAllAdmins() {
  const response = await httpServices.get("/users");
  const allUsers = response.data;
  const admins = allUsers.filter((user) => user.isAdmin === true);
  return admins;
}

async function deleteUser(userId) {
  try {
    try {
      const response = await httpServices.get(`/users/${userId}`);
      const userDetails = response.data;

      const allOrders = await ordersService.getAllOrders();
      if (!userDetails.isAgent) {
        const userOrders = allOrders.filter(
          (order) => order.customer && order.customer.number === userId
        );
        console.log("User Orders:", userOrders);
        await Promise.all(
          userOrders.map((order) => ordersService.deleteOrder(order._id))
        );
        console.log("All user orders deleted successfully.");
      } else {
        const userOrders = allOrders.filter(
          (order) => order.agent && order.agent.number == userId
        );
        console.log("User Orders:", userOrders);
        await Promise.all(
          userOrders.map((order) => ordersService.setAgent(order._id, null))
        );
        console.log("All user orders unassigned successfully.");
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      throw new Error(
        `Failed to completely delete user ${userId} and their associated data.`
      );
    }
    const response = await httpServices.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
}

async function updatePassword(userId, newPassword) {
  try {
    const request = {
      password: newPassword,
    };
    const response = await httpServices.put(
      `/users/${userId}/password`,
      request
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update password:", error);
    throw error;
  }
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
  changeUserRole,
  getUserDetails,
  getAllAgents,
  getAllUsers,
  getAllAdmins,
  deleteUser,
  updatePassword,
};

export default userService;
