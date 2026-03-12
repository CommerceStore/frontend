import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/client";
import { useAuthStore } from "../store/useAuthStore";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../types";

export function useLoginMutation() {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      const res = await api.post<{ data: AuthResponse }>("/auth/login", {
        body: payload,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
}

export function useRegisterMutation() {
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (payload: RegisterRequest) => {
      const res = await api.post<{ data: AuthResponse }>("/auth/register", {
        body: payload,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: () => api.post("/auth/logout"),
    onSettled: () => {
      logout();
      queryClient.clear();
    },
  });
}
