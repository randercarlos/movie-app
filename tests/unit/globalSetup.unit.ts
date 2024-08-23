import { I18nGlobalLocales } from "@/typings/enums";
import i18n from "@/i18n";
import { afterAll, beforeAll } from "vitest";
import {
} from "vue-router-mock";
import nock from "nock";
import { config } from "@vue/test-utils";
import type { Ref } from "vue";

// disable real HTTP request for non mocked requests
beforeAll(() => {
  nock.disableNetConnect();

  // Set the userAgent inside the navigator
  Object.defineProperty(navigator, "userAgent", {
    value: "VITEST",
    writable: true,
  });
});

// enable real HTTP requests and clear the mocked requests
afterAll(() => {
  nock.enableNetConnect();
});

// config vue-i18n as plugin to all unit tests
config.global.plugins = [
  i18n
];

export function changeI18nGlobalLocale(i18nGlobalLocale: I18nGlobalLocales): void {
  (i18n.global.locale as unknown as Ref<string>).value = i18nGlobalLocale;
}

export function getI18nGlobalLocale(): string {
  return (i18n.global.locale as unknown as Ref<string>).value;
}
