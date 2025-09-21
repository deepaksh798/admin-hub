export const ENDPOINTS = {
  // Authentication Endpoints
  LOGIN: "v1/auth/signin",
  SIGNUP: "v1/auth/signup",
  // Dashboard Endpoints
  GET_DASHBOARD_DATA: "v1/dashboard",
  // User Endpoints
  ME: "v1/auth/me",
  // community Endpoints
  GET_MY_OWNED_COMMUNITIES: "v1/community/me/owner",
  GET_ALL_COMMUNITIES: "v1/community",
  CREATE_COMMUNITY: "v1/community",
  DELETE_COMMUNITY: "V1/community/delete",
  // User Endpoints
  GET_ALL_USERS: "v1/auth/users",
  // ROLE Endpoints
  GET_ROLES: "v1/role",
  CREATE_ROLE: "v1/role",
  DELETE_ROLE: "v1/role/delete",
  // Member Endpoints
  CREATE_COMMUNITY_MEMBERS: "v1/member",
};
