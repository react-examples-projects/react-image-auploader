import {
  api,
  image,
  upload,
  login,
  token,
  userInfo,
  perfilPhoto,
  comments
} from "../config/config";
import { getToken } from "./token";
import axios from "axios";

const instance = axios.create({
  baseURL: api,
});

const config = () => ({
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});

export async function getImages() {
  const res = await instance.get(image, config());
  return res?.data?.data || [];
}

export async function setLogin(auth) {
  const res = await instance.post(login, auth);
  return res?.data;
}

export async function uploadImage(payload) {
  const res = await instance.post(upload, payload, config());
  return res?.data?.data;
}

export async function setPerfilPhoto(payload) {
  const res = await instance.post(perfilPhoto, payload, config());
  return res?.data?.data;
}

export async function verifyToken() {
  const res = await instance.get(token, config());
  return Boolean(res?.data?.ok);
}

export async function getUserInfo() {
  const res = await instance.get(userInfo, config());
  return res?.data?.data;
}


export async function createComment(payload){
  const res = await instance.post(comments, payload, config());
  return res?.data?.data;
}