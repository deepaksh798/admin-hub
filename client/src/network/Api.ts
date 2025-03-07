import { getRequest, postRequest } from "./ApiRequest";
import { ENDPOINTS } from "./EndPoints";

//  AUTH API's -------
export const loginApi = (payload: any) => {
  return postRequest(ENDPOINTS.AUTH_LOGIN, payload);
};

//channel api's
export const showChennels = () => {
  return getRequest(ENDPOINTS.GET_ALL_PROFILES, {});
};

export const deleteChannel = (payload: any) => {
  return postRequest(ENDPOINTS.MANAGE_CHANNEL, payload);
};

export const addChannel = (payload: any) => {
  return postRequest(ENDPOINTS.MANAGE_CHANNEL, payload);
};

//group api's
export const showGroups = () => {
  return getRequest(ENDPOINTS.MANAGE_GROUPS, {});
};

export const deleteGroup = (payload: any) => {
  return postRequest(ENDPOINTS.MANAGE_GROUPS, payload);
};

export const addGroup = (payload: any) => {
  return postRequest(ENDPOINTS.MANAGE_GROUPS, payload);
};

export const allGroupPosts = (payload: any) => {
  return getRequest(ENDPOINTS.GET_ALL_GROUP_POSTS, payload); /////// latest
};

// Post api's

export const postGroup = (payload: any) => {
  return postRequest(ENDPOINTS.GET_GROUP_POSTS, payload);
};

export const postChannel = (params: any) => {
  return getRequest(ENDPOINTS.GET_POSTS, params);
};
// export const postChannel = (payload: any) => {
//   return postRequest(ENDPOINTS.GET_POSTS, payload);
// };

// Group details api

export const groupDetail = (payload: any) => {
  return postRequest(ENDPOINTS.GET_GROUP_DETAIL, payload);
};

// update group

export const updateGroup = (payload: any) => {
  return postRequest(ENDPOINTS.MANAGE_GROUPS, payload);
};

export const updateChannel = (payload: any) => {
  return postRequest(ENDPOINTS.MANAGE_GROUP_CHANNELS, payload);
};

export const deleteChannelsFromGroup = (payload: any) => {
  return postRequest(ENDPOINTS.MANAGE_GROUP_CHANNELS, payload);
};

// fetch new posts

export const fetchUserPosts = (params: any) => {
  return getRequest(ENDPOINTS.FETCH_POSTS, params);
};

export const fetchGroupPosts = (payload: any) => {
  return postRequest(ENDPOINTS.FETCH_GROUP_POSTS, payload);
};
