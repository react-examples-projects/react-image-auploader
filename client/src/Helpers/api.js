import {
  api,
  image,
  upload,
  login,
  token,
  userInfo,
  perfilPhoto,
  comments,
  deleteComment as _deleteComment,
  editComment as _editComment,
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

/**
 * Get all images
 * @returns {Array.<Object>} An array that contains the public images
 */
export async function getImages() {
  const res = await instance.get(image, config());
  return res?.data?.data || [];
}

/**
 * Login a user from backend
 * @param {Object} auth The authentication credentials to loggin
 * @returns {Object} The logged user information
 */
export async function setLogin(auth) {
  const res = await instance.post(login, auth);
  return res?.data;
}

/**
 * Upload a image to the backend
 * @param {Object} payload The image object information
 * @param {String} payload.title The image title
 * @param {Array.<String>} payload.tags The tags image
 * @param {Array.<File>} payload.images The binaries images files
 * @param {Number} payload.user The user id
 * @returns {Object} The uploaded image information
 */
export async function uploadImage(payload) {
  const res = await instance.post(upload, payload, config());
  return res?.data?.data;
}

/**
 * Delete an image from the backend
 * @param {id} Number The image id
 * @returns {Object} the image deleted
 */
export async function deleteImage(id) {
  const res = await instance.delete(`${image}/${id}`, config());
  return res?.data?.data;
}

/**
 * Set profile user image to the backend
 * @param {Object} payload The image information
 * @param {File} payload.perfil_photo The binary image file
 * @param {Number} payload.id The user id
 * @returns {Object} the profile image information
 */
export async function setPerfilPhoto(payload) {
  const res = await instance.post(perfilPhoto, payload, config());
  return res?.data?.data;
}

/**
 * Check token from backend
 * @returns {Boolean} if the token is valid
 */
export async function verifyToken() {
  const res = await instance.get(token, config());
  return Boolean(res?.data?.ok);
}

/**
 * Get user information from backend
 * @returns {Object} The user information
 */
export async function getUserInfo() {
  const res = await instance.get(userInfo, config());
  return res?.data?.data;
}

/**
 * Create a new comment in an image post
 * @param {Object} payload The image comment information
 * @param {String} payload.content The comment content
 * @param {Object} payload.image_id The image id to add the comment
 * @param {String} payload.name The author name
 * @param {Number} payload.user The user id
 * @returns {Object} The comment information
 */
export async function createComment(payload) {
  const res = await instance.post(comments, payload, config());
  return res?.data?.data;
}

/**
 * Delete a comment in an image post
 * @param {Number} id The id comment to delete
 * @returns {Object} The rows deleted from database
 */
export async function deleteComment(id) {
  const res = await instance.delete(_deleteComment(id), config());
  return res?.data?.data;
}

/**
 * Edit a comment in an image post
 * @param {Number} id The id comment to delete
 * @param {String} content The new content to modify in the comment
 * @returns {Object} The rows deleted from database
 */
export async function editComment(id, content) {
  const res = await instance.put(_editComment(id), { content }, config());
  return res?.data?.data;
}
