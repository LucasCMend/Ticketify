"use client"
import { useQuery } from "@tanstack/react-query";
import { findEvent, findManyEvents } from "@/app/service/event";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await findManyEvents();
      return response.data;
    },
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      const response = await findEvent(id);
      return response.data;
    },
    enabled: !!id,
  });
}
