import { useQuery} from "@tanstack/react-query";
import { findManyEvents } from "@/app/service/event";

export function useEvents() {
    return useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const response = await findManyEvents();
            return response.data;
        }
    })
}