import { createI18n } from "vue-i18n";

// Import your translation messages
import enUS from "@/i18n/locales/en-US.json";
import ptBR from "@/i18n/locales/pt-BR.json";
import type { I18nMessage } from "@/typings/types";

export default createI18n<I18nMessage, "en-US" | "pt-BR">({
  legacy: false,
  globalInjection: true,
  locale: "en-US", // set locale
  fallbackLocale: "pt-BR", // set fallback locale
  messages: {
    "en-US": enUS,
    "pt-BR": ptBR
  }
});
