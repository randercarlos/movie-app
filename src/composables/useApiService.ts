import { createFetch } from "@vueuse/core";
import CONFIG from "@/config";

export function useApiService() {
  const apiService = createFetch({
    baseUrl: CONFIG.API_BASE_URL,
    options: {
      async beforeFetch({ options }) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${CONFIG.TMDB_TOKEN}`
        };

        return { options };
      },
    },
    fetchOptions: {
      mode: "cors",
    },
  });

  return {
    apiService
  };
}
