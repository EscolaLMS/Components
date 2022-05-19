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
      "rate.header": "How do you rate this course",
      "rate.select": "Select rate",
      "rate.select.5": "Sensational, I recommend it heartily",
      "rate.select.4": "Good, as expected",
      "rate.select.3": "Without a revelation, it could be better",
      "rate.select.2": "Weak, below expectations",
      "rate.select.1": "Fatal, disappointments",
      "rate.submit.button": "Rate the course",
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
      "ratings.average.rate.label": "Średnia ocena",
      "Welcome to Wellms": "Witaj w Wellms i react-i18next",
      "rate.header": "Jak oceniasz ten kurs",
      "rate.select": "Wybierz ocene",
      "rate.select.5": "Rewelacyjny, polecam serdecznie",
      "rate.select.4": "Dobry, zgodny z oczekiwaniami",
      "rate.select.3": "Bez, rewelacji, mógłby być lepszy",
      "rate.select.2": "Słaby, poniżej oczewikań",
      "rate.select.1": "Fatalny, rozczarowujący",
      "rate.submit.button": "Oceń kurs",
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
