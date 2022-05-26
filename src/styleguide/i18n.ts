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
      "CourseCard.lesson_one": "{{count}} lesson",
      "CourseCard.lesson_other": "{{count}} lessons",
      "CourseCard.startNow": "Start now",
      "CourseTopNav.add.note": "Add note",
      "CourseTopNav.add.note.mobile": "Note",
      "CourseTopNav.finish.lesson": "Finish lesson",
      "CourseTopNav.next": "Next",
      "CourseTopNav.prev": "Previous",
      "I18n.welcomeToWellms": "Welcome to Wellms and react-i18next",
      "NoteEditor.descInputLabel": "Text",
      "NoteEditor.descInputPlaceholder": "enter note's text",
      "NoteEditor.Discard": "Discard",
      "NoteEditor.MarkColor": "Mark with color",
      "NoteEditor.Save": "Save",
      "NoteEditor.Title": "Make a note",
      "NoteEditor.titleInputLabel": "Title",
      "NoteEditor.titleInputPlaceholder": "enter note's title",
      "Notes.addNew": "Add new note",
      "Notes.title": "Notes",
      "ProgressBar.defaultLabel": "Progress",
      "Rate.Header": "How do you rate this course",
      "Rate.Select": "Select rate",
      "Rate.Select1": "Fatal, disappointments",
      "Rate.Select2": "Weak, below expectations",
      "Rate.Select3": "Without a revelation, it could be better",
      "Rate.Select4": "Good, as expected",
      "Rate.Select5": "Sensational, I recommend it heartily",
      "Rate.submitButton": "Rate the course",
      "Ratings.averageRateLabel": "Average rate",
    },
  },
  fr: {
    translation: {
      "I18n.welcomeToWellms": "Bienvenue à Wellms et react-i18next",
    },
  },
  pl: {
    translation: {
      "CartCard.addDiscountButton": "Dodaj kod rabatowy",
      "CartCard.buyButton": "Kupuję i płacę",
      "CartCard.discountError": "Podany kod jest nieprawidłowy",
      "CartCard.discountGranted": "**Kod rabatowy** zastosowany",
      "CartCard.realizeButton": "Realizuj",
      "Course.Agenda": "Plan kursu",
      "Course.Finished": "Ukończono",
      "Course.Lesson": "Moduł",
      "Course.markAsFinished": "Oznacz jako ukończone",
      "CourseCard.lesson_few": "{{count}} lekcje",
      "CourseCard.lesson_many": "{{count}} lekcji",
      "CourseCard.lesson_one": "{{count}} lekcja",
      "CourseTopNav.add.note": "Dodaj notatkę",
      "CourseTopNav.add.note.mobile": "Notatka",
      "CourseTopNav.finish.lesson": "Zakończ lekcję",
      "CourseTopNav.next": "Następna",
      "CourseTopNav.prev": "Poprzednia",
      "I18n.welcomeToWellms": "Witaj w Wellms i react-i18next",
      "NoteEditor.descInputLabel": "Treść",
      "NoteEditor.descInputPlaceholder": "wpisz treść notatki",
      "NoteEditor.Discard": "Odrzuć",
      "NoteEditor.MarkColor": "Oznacz kolorem",
      "NoteEditor.Save": "Zapisz",
      "NoteEditor.Title": "Stwórz nową notatkę",
      "NoteEditor.titleInputLabel": "Tytuł",
      "NoteEditor.titleInputPlaceholder": "wpisz tytuł notatki",
      "Notes.addNew": "Dodaj nową notatkę",
      "Notes.title": "Notatki",
      "ProgressBar.defaultLabel": "Postęp",
      "Rate.Header": "Jak oceniasz ten kurs",
      "Rate.Select": "Wybierz ocene",
      "Rate.Select1": "Fatalny, rozczarowujący",
      "Rate.Select2": "Słaby, poniżej oczewikań",
      "Rate.Select3": "Bez, rewelacji, mógłby być lepszy",
      "Rate.Select4": "Dobry, zgodny z oczekiwaniami",
      "Rate.Select5": "Rewelacyjny, polecam serdecznie",
      "Rate.submitButton": "Oceń kurs",
      "Ratings.averageRateLabel": "Średnia ocena",
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
