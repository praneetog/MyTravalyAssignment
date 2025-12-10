import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://mt-task.onrender.com";

export function useMetrics(days = 30) {
  const query = useQuery({
    queryKey: ["metrics", { days }],

    // How to fetch metrics
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/metrics?days=${days}`);
      if (!res.ok) {
        throw new Error("Failed to load metrics");
      }

      const json = await res.json();

      // Previously you used json.data, so we return that
      return json.data ?? [];
    },

    // Keep previous metrics visible if you ever change `days`
    keepPreviousData: true,
  });

  // 2️⃣ Expose a similar API to what Dashboard already uses
  return {
    data: query.data ?? [],              // same `data` name, array by default
    loading: query.isLoading,           // same idea as your old `loading`
    error: query.error ? query.error.message : null,
  };
}
