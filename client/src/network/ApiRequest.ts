import { axiosClient } from "./ApiClient";

export const getRequest = (url: string, params?: any, signal?: AbortSignal) => {
  // console.log("params--->", params);
  // console.log("url--->", url);

  return axiosClient.get(url, { params: params, signal });
};

export const postRequest = (url: string, payload?: any | null) => {
  return axiosClient.post(url, payload);
};

export const putRequest = (url: string, payload: any | null) => {
  return axiosClient.put(url, payload);
};

export const deleteRequest = (url: string, payload: any | null) => {
  return axiosClient.delete(url, payload);
};

export const patchRequest = (url: string, payload: any | null) => {
  return axiosClient.patch(url, payload);
};
