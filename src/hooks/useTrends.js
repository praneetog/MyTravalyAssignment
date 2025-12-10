import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://mt-task.onrender.com";

export function useTrends(months = 6) {
  const query = useQuery({
    queryKey: ["trends", { months }],

    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/trends?months=${months}`);
      if (!res.ok) {
        throw new Error("Failed to load trends");
      }

      const json = await res.json();

      return {
        data: Array.isArray(json.data) ? json.data : [],
        period: json.period ?? `Last ${months} months`,
      };
    },

    keepPreviousData: true,
  });

  const trends = query.data?.data ?? [];
  const period = query.data?.period ?? `Last ${months} months`;

  return {
    data: trends,              
    period,                    
    loading: query.isLoading,  
    error: query.error,
  };
}
