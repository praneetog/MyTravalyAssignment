import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://mt-task.onrender.com";

export function useMetrics(days = 30) {
  const query = useQuery({
    queryKey: ["metrics", { days }],

    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/metrics?days=${days}`);
      if (!res.ok) {
        throw new Error("Failed to load metrics");
      }

      const json = await res.json();

      return json.data ?? [];
    },

    // Keep previous metrics visible
    keepPreviousData: true,
  });

  
  return {
    data: query.data ?? [],              
    loading: query.isLoading,           
    error: query.error ? query.error.message : null,
  };
}
