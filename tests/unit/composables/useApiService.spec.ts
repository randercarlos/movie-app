import { useApiService } from "@/composables/useApiService";
import { useFetch } from "@vueuse/core";
import { describe, expect, it, vi } from "vitest";
import { changeI18nGlobalLocale } from "../globalSetup.unit";
import { I18nGlobalLocales } from "@/typings/enums";
import nock from "nock";
import CONFIG from "@/config";
import { configurationTranslationsMock } from "#/mockData";
import * as handleErrorFile from "@/utils/handleError";
import * as helperFile from "@/utils/helper";

describe("useApiService.ts", () => {
  it("create apiService with the correct configuration", async() => {
    const { apiService } = useApiService();

    expect(apiService).toBeTypeOf(typeof useFetch);
  });

  it("add a querystring to URL to get response using pt-BR locale", async() => {
    nock(CONFIG.API_BASE_URL)
      .persist()
      .get("/configuration/primary_translations")
      .query({ language: "pt-BR"})
      .reply(200, configurationTranslationsMock);

    const logSpy = vi.spyOn(helperFile, "log");
    const addQueryStringToURLSpy = vi.spyOn(helperFile, "addQueryStringToURL");

    // change global locale before load component
    changeI18nGlobalLocale(I18nGlobalLocales.ptBR);
    const { apiService } = useApiService();
    const { data } = await apiService("/configuration/primary_translations")
      .get()
      .json();

    expect(data).not.toBeNull();
    expect(logSpy).toHaveBeenCalled();
    expect(addQueryStringToURLSpy).toHaveBeenCalled();
  });

  it("create a new error with status message and add in context if requests fails", async() => {
    nock(CONFIG.API_BASE_URL)
      .persist()
      .get("/url_does_not_exist")
      .reply(404, {
        "success": false,
        "status_code": 34,
        "status_message": "The resource you requested could not be found."
      });

    const ErrorSpy = vi.spyOn(global, "Error");
    const handleErrorSpy = vi.spyOn(handleErrorFile, "handleError");

    // change global locale before load component
    changeI18nGlobalLocale(I18nGlobalLocales.enUS);

    const { apiService } = useApiService();
    const { error } = await apiService("/url_does_not_exist")
      .get()
      .json();

    expect(error.value).not.toBeNull();
    expect(ErrorSpy).toHaveBeenCalled();
    expect(handleErrorSpy).toHaveBeenCalled();
  });
});
