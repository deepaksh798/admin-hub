import { getToken } from "@/_utils/cookies";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = getToken();
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
};

export const apiService = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/auth/users`, config);
      console.log("user data ---->", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  getAllCommunities: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/community`, config);
      console.log("communitie data ---->", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching communities:", error);
      throw error;
    }
  },

  getRoles: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/role`, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  },

  // Add more APIs here
};
