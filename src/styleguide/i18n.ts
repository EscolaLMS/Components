import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Course.Lesson": "Module",
      "Course.Finished": "Finished",
      "Course.Agenda": "Agenda",
      "Course.markAsFinished": "Mark as finished",
      "course.card.lessions": "lessions",
      "course.card.start.now": "Start now",
      "course.card.save.to.later": "Save for later",
      "progress.bar.default.label": "Progress",

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
      "course.card.lessions": "lekcji",
      "course.card.start.now": "Zacznij teraz",
      "course.card.save.to.later": "Zapisz na później",
      "progress.bar.default.label": "Postęp",
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
