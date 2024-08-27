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

const GetTnxById = (id) => {
  return axiosClient()
    .get(endpoints.auth.TNX_BY_ID+'/'+id)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

const GetTnxs = () => {
  return axiosClient()
    .get(endpoints.auth.TRANSACTIONS)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

const GetProfile = () => {
  return axiosClient()
    .get(endpoints.auth.PROFILE)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

const UpdateTnx = ({id, data}) => {
  return axiosClient()
    .patch(`${endpoints.auth.TRANSACTIONS}/${id}`,data)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};


const UpdateProfile = (payload) => {
  return axiosClient()
    .patch(`${endpoints.auth.PROFILE}`,payload)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};


const ChangePassword = (payload) => {
  return axiosClient()
    .post(`${endpoints.auth.CHANGE_PASSWORD}`,payload)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
};

const UpdateWallet = ({id, payload}) => {
  return axiosClient()
    .patch(`${endpoints.auth.WALLET}/${id}`,payload)
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
  Login, GetUsers, GetUser, GetTnxById, GetTnxs, GetProfile, UpdateTnx,
  ChangePassword, UpdateProfile, UpdateWallet
};
