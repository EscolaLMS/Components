import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "CartCard.addDiscountButton": "Add discount code",
      "CartCard.buyButton": "I buy and pay",
      "CartCard.discountError": "The code provided is invalid",
      "CartCard.discountGranted": "**Discount code** applied",
      "CartCard.realizeButton": "Realize",
      "Course.Agenda": "Agenda",
      "Course.Finished": "Finished",
      "Course.Lesson": "Module",
      "Course.markAsFinished": "Mark as finished",
      "ratings.average.rate.label": "Average rate",
      "Welcome to Wellms": "Welcome to Wellms and react-i18next",
    },
  },
  fr: {
    translation: {
      "Welcome to Wellms": "Bienvenue à Wellms et react-i18next",
    },
  },
  pl: {
    translation: {
      "CartCard.addDiscountButton": "Dodaj kod rabatowy",
      "CartCard.buyButton": "Kupuję i płacę",
      "CartCard.discountError": "Podany kod jest nieprawidłowy",
      "CartCard.discountGranted": "**Kod rabatowy** zastosowany",
      "CartCard.realizeButton": "Realizuj",
      "ratings.average.rate.label": "Średnia ocena",
      "Welcome to Wellms": "Witaj w Wellms i react-i18next",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
