import { AxiosRequestConfig } from "axios";
import axios from "../axios";
import store from "../app/store";
import { IPost } from "../slices/postSlice";

axios.interceptors.request.use((req: AxiosRequestConfig) => {
  const token = store.getState().user.user?.idToken;
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

const errorResponse = (error: any) => ({
  error: true,
  message: error.response.data,
  data: null,
});

const successResponse = (response: any) => ({
  error: false,
  message: response.data.message,
  data: response.data.data,
});

const createPost = async (post: IPost) => {
  const response = await axios
    .post("/posts/create", post)
    .then((response) => successResponse(response))
    .catch((err) => errorResponse(err));
  return response;
};

const likePost = async (id: string | undefined) => {
  const respose = await axios
    .patch(`/posts/${id}/like`)
    .then((response) => successResponse(response))
    .catch((err) => errorResponse(err));
  return respose;
};

const deletePost = async (id: string | undefined) => {
  const reponse = await axios
    .delete(`/posts/${id}/delete`)
    .then((response) => successResponse(response))
    .catch((err) => errorResponse(err));
  return reponse;
};

const updatePost = async (post: IPost) => {
  const response = await axios
    .patch(`/posts/${post.id}/update`, post)
    .then((response) => successResponse(response))
    .catch((err) => errorResponse(err));
  return response;
};

export { createPost, likePost, deletePost, updatePost };
