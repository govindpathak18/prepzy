import axiosInstance from "../lib/axios";

const authConfig = (token) => ({
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

export const sessionApi = {
  createSession: async (data, token) => {
    const response = await axiosInstance.post("/sessions", data, authConfig(token));
    return response.data;
  },

  getMyActiveSessions: async (token) => {
    const response = await axiosInstance.get("/sessions/my-active", authConfig(token));
    return response.data;
  },

  getMyRecentSessions: async (token) => {
    const response = await axiosInstance.get("/sessions/my-recent", authConfig(token));
    return response.data;
  },

  getSessionById: async (id, token) => {
    const response = await axiosInstance.get(`/sessions/${id}`, authConfig(token));
    return response.data;
  },

  joinSession: async (id, token) => {
    const response = await axiosInstance.post(`/sessions/${id}/join`, undefined, authConfig(token));
    return response.data;
  },

  joinByCode: async (code, token) => {
    const response = await axiosInstance.post(`/sessions/join-by-code`, { code }, authConfig(token));
    return response.data;
  },

  leaveSession: async (id, token) => {
    const response = await axiosInstance.post(`/sessions/${id}/leave`, undefined, authConfig(token));
    return response.data;
  },

  endSession: async (id, token) => {
    const response = await axiosInstance.post(`/sessions/${id}/end`, undefined, authConfig(token));
    return response.data;
  },

  getStreamToken: async (token) => {
    const response = await axiosInstance.get(`/chat/token`, authConfig(token));
    return response.data;
  },
};
