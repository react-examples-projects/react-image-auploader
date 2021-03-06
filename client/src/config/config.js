export const host = "https://majuro-api.vercel.app/";
//export const host = "http://localhost:5000/";
export const api = host + "api/";
export const image = "/images";
export const favoriteImage = `${image}/favorite`;
export const login = "/auth/login";
export const signup = "/auth/signup";
export const upload = "/images/upload";
export const token = "/auth/verify-token";
export const userInfo = "/user/user";
export const changePassword = "/user/password";
export const perfilPhoto = "/user/perfil-photo";
export const comments = "/comment";

export const updateImage = (id) => `${image}/${id}`;
export const deleteComment = (id) => `${comments}/${id}`;
export const editComment = (id) => `${comments}/${id}`;

export const recaptchKey = "6Le_BFAUAAAAAIuL8CTLqHOsLC8bto8XS-l3MuTf";
