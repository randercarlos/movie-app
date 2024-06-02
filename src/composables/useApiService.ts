import { createFetch } from "@vueuse/core";
import CONFIG from "@/config";
import { handleError } from "@/utils/handleError";

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
      onFetchError(ctx) {
        if (ctx.data?.success === false) {
          ctx.error = new Error(ctx.data.status_message); // Modifies the error
        }

        handleError(`Error on Http Request: ${ctx.data.status_message}`,ctx.error);

        return ctx;
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
