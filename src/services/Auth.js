"use client";

import endpoints from "../api/endpoints";
import { axiosClient } from "../api/axiosClient";

const Login = (data) => {
  return axiosClient()
    .post(endpoints.auth.LOGIN, data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

const GetUsers = () => {
  return axiosClient()
    .get(endpoints.auth.USERS)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

const GetUser = (id) => {
  return axiosClient()
    .get(endpoints.auth.USERS+'/'+id)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};


// const SetupProfile = (data) => {
//   return axiosClient()
//     .post(endpoints.auth.SETUP_PROFILE, data)
//     .then((res) => res)
//     .catch((error) => Promise.reject(error));
// };

// const ForgotPassword = (data) => {
//   return axiosClient()
//     .post(endpoints.auth.FORGOT_PASSWORD, data)
//     .then((res) => res)
//     .catch((error) => Promise.reject(error));
// };

// const VerifyOTP = (data) => {
//   return axiosClient()
//     .post(endpoints.auth.VERIFY_OTP, data)
//     .then((res) => res)
//     .catch((error) => Promise.reject(error));
// };

// const ChangePassword = (data) => {
//   return axiosClient()
//     .post(endpoints.auth.CHANGE_PASSWORD, data)
//     .then((res) => res)
//     .catch((error) => Promise.reject(error));
// };


export default {
  Login, GetUsers, GetUser,
};
