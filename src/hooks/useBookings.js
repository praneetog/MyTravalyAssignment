import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://mt-task.onrender.com";

export function useBookings({ days = 7, status = "confirmed", order = "asc" }) {
  return useQuery({
    queryKey: ["bookings", { days, status, order }],

    queryFn: async () => {
      const paramsObj = {
        days: String(days),
        order,
      };

      if (status && status !== "all") {
        paramsObj.status = status;
      }
      
      const params = new URLSearchParams({ days, status, order }).toString();
      const res = await fetch(`${BASE_URL}/api/bookings?${params}`);

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const json = await res.json();

      return {
        bookings: Array.isArray(json.data) ? json.data : [],
        filters: json.filters ?? null,
      };
    },

    keepPreviousData: true,
  });
}
