import { toValue } from "vue";
import { createFetch } from "@vueuse/core";
import CONFIG from "@/config";
import { handleError } from "@/utils/handleError";
import { addQueryStringToURL, log } from "@/utils/helper";
import { I18nLanguages } from "@/typings/enums";
import i18n from "@/i18n";

export function useApiService() {
  const apiService = createFetch({
    baseUrl: CONFIG.API_BASE_URL,
    options: {
      async beforeFetch({ url, options }) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${CONFIG.TMDB_TOKEN}`
        };

        // Add language querystring to all requests
        if (toValue(i18n.global.locale) === I18nLanguages.ptBR) {
          url = addQueryStringToURL(url, "language", I18nLanguages.ptBR);
        }

        log(`
          METHOD: ${options.method}
          URL: ${url}
          HEADERS: ${(options.headers?.entries)}`);

        return { url, options };
      },
      onFetchError(ctx) {
        if (ctx.data?.success === false) {
          ctx.error = new Error(ctx.data?.status_message); // Modifies the error
        }

        handleError(`Error on Http Request: ${ctx?.data?.status_message}`,ctx.error);

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
