import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tr from "./translations/tr.json";
import en from "./translations/en.json";

const resources = {
  en: {
    translation: en,
  },
  tr: {
    translation: tr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "tr",
  interpolation: { escapeValue: false },
});

export default i18n;
