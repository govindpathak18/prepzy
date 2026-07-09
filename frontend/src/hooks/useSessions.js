import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";

export const useCreateSession = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => sessionApi.createSession(data, await getToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
      toast.success("Session created successfully!");
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to create session"),
  });
};

export const useActiveSessions = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["activeSessions"],
    // fetch only the sessions created by the logged in user
    queryFn: async () => sessionApi.getMyActiveSessions(await getToken()),
    refetchInterval: 10000, // refresh every 10s to show new sessions
  });
};

export const useJoinByCode = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (code) => sessionApi.joinByCode(code, await getToken()),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      if (data?.session?._id) {
        queryClient.invalidateQueries({ queryKey: ["session", data.session._id] });
      }
      toast.success("Joined session successfully!");
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to join session"),
  });
};

export const useMyRecentSessions = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: async () => sessionApi.getMyRecentSessions(await getToken()),
  });
};

export const useSessionById = (id) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["session", id],
    queryFn: async () => sessionApi.getSessionById(id, await getToken()),
    enabled: !!id,
    refetchInterval: (query) =>
      query.state.data?.session?.status === "completed" ? false : 5000, // stop polling when session ends
  });
};

export const useJoinSession = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => sessionApi.joinSession(id, await getToken()),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      if (data?.session?._id) {
        queryClient.invalidateQueries({ queryKey: ["session", data.session._id] });
      }
      toast.success("Joined session successfully!");
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to join session"),
  });
};

export const useEndSession = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => sessionApi.endSession(id, await getToken()),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
      if (data?.session?._id) {
        queryClient.invalidateQueries({ queryKey: ["session", data.session._id] });
      }
      toast.success("Session ended successfully!");
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to end session"),
  });
};

export const useLeaveSession = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => sessionApi.leaveSession(id, await getToken()),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      if (data?.session?._id) {
        queryClient.invalidateQueries({ queryKey: ["session", data.session._id] });
      }
      toast.success(data?.message || "Left session");
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to leave session"),
  });
};
