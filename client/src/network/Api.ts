import { getRequest, postRequest } from "./ApiRequest";
import { ENDPOINTS } from "./EndPoints";

//  AUTH API's -------
export const loginApi = (payload: any) => {
  return postRequest(ENDPOINTS.LOGIN, payload);
};

export const signupApi = (payload: any) => {
  return postRequest(ENDPOINTS.SIGNUP, payload);
};

export const meApi = () => {
  return getRequest(ENDPOINTS.ME);
};

// Community API's
export const getAllCommunities = () => {
  return getRequest(ENDPOINTS.GET_ALL_COMMUNITIES);
};

export const createCommunity = (payload: any) => {
  return postRequest(ENDPOINTS.CREATE_COMMUNITY, payload);
};

// User API's
export const getAllUsers = () => {
  return getRequest(ENDPOINTS.GET_ALL_USERS);
};

// Role API's
export const getRoles = () => {
  return getRequest(ENDPOINTS.GET_ROLES);
};

export const createRole = (payload: any) => {
  return postRequest(ENDPOINTS.CREATE_ROLE, payload);
};

// Member API's
export const createCommunityMembers = (payload: any) => {
  return postRequest(ENDPOINTS.CREATE_COMMUNITY_MEMBERS, payload);
};
