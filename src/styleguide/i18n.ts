import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  en: {
    translation: {
      Loading: "Loading",
      Prev: "Previous",
      Next: "Next",
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
      "CourseTopNav.addNote": "Add note",
      "CourseTopNav.addNoteMobile": "Note",
      "CourseTopNav.finished": "Finished",
      "CourseTopNav.finishLesson": "Finish lesson",
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
      "PdfPlayer.notFound": "Document not found",
      "PdfPlayer.of": "of",
      Required: "Required",
      "Wrong email": "Wrong email adress",
      "Wrong phone number": "Wrong phone number",
      "First name": "First name",
      "Last name": "Last name",
      "Diffrent passwords": "Passwords are not the same",
      Phone: "Phone",
      Password: "Password",
      "Repeat password": "Repeat password",
      "Password validation":
        "Password must contain 8 characters special character and number",
      MyProfileForm: {
        Heading: "My data",
        Subtitle: "Fill in information about yourself",
        Update: "Update",
      },
      Categories: {
        Filter: "Filter",
      },
      Certificate: {
        Title: "Certificates",
        Download: "Download or print as PDF file",
        Share: "Share as an online photo",
      },
      Notifications: {
        Notifications: "Notifications",
        ShowAll: "Show all",
        Empty: "No new notifications",
      },
      Login: {
        Header: "Log in to your Wellms account",
        Signin: "Log in",
        NotRemember: "I forgot my password",
        NoAccount: "No account?",
        Signup: "Register",
      },
      RegisterForm: {
        Header: "Log in to your Wellms account",
        Subtitle: "Many users have already trusted us",
      },
      AdditionalFields: {
        contact: "Contact details",
        country: "Country",
        address: "Address of residence",
        "Privacy Policy": "Privacy policy",
        "Terms of Service": "Terms of service",
        bio: "Bio",
        Newsletter: "Subscribe to newsletter",
      },
      ResetForm: {
        ResetPassword: "Reset password",
        Reset: "Reset",
        BackToLogin: "Return to signin",
      },
      Search: {
        Placeholder: "Search for courses",
      },
      VideoPlayer: {
        Error: "Error loading material. Please try again later.",
      },
    },
  },
  fr: {
    translation: {
      "I18n.welcomeToWellms": "Bienvenue à Wellms et react-i18next",
    },
  },
  pl: {
    translation: {
      Loading: "Ładowanie",
      Prev: "Poprzednia",
      Next: "Następna",
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
      "CourseTopNav.addNote": "Dodaj notatkę",
      "CourseTopNav.addNoteMobile": "Notatka",
      "CourseTopNav.finished": "Zakańczony",
      "CourseTopNav.finishLesson": "Zakończ lekcję",
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
      "PdfPlayer.notFound": "Dokument nie został znaleziony",
      "PdfPlayer.of": "z",
      Required: "Wymagane",
      "Wrong email": "Zły adres email",
      "Wrong phone number": "Zły numer telefonu",
      "First name": "Imię",
      "Last name": "Nazwisko",
      "Diffrent passwords": "Hasła nie są takie same",
      Phone: "Telefon",
      Password: "Hasło",
      "Repeat password": "Powtórz hasło",
      "Password validation":
        "Hasło musi zawierać 8 znaków znak specjalny i cyfre",
      MyProfileForm: {
        Heading: "Moje dane",
        Subtitle: "Uzupełnij informacje na swój temat",
        Update: "Zapisz zmiany",
      },
      Categories: {
        Filter: "Filtruj",
      },
      Certificate: {
        Title: "Certyfikaty",
        Download: "Pobierz lub wydrukuj jako plik PDF",
        Share: "Udostępnij jako zdjęcie online",
      },
      Notifications: {
        Notifications: "Powiadomienia",
        ShowAll: "Pokaż wszystkie",
        Empty: "Brak Nowych powiadomień",
      },
      Login: {
        Header: "Zaloguj się do swojego konta Wellms",
        Signin: "Zaloguj się",
        NotRemember: "Nie pamiętam hasła",
        NoAccount: "Nie posiadasz konta?",
        Signup: "Zarejestruj się",
      },
      RegisterForm: {
        Header: "Dołącz do Wellms, największej plaformy szkoleniowej!",
        Subtitle: "Zaufało nam już sporo użytkowników",
      },
      AdditionalFields: {
        contact: "Dane kontaktowe",
        country: "Kraj",
        address: "Adres zamieszkania",
        "Privacy Policy": "Politykę prywatności",
        "Terms of Service": "Regulamin serwisu",
        bio: "Biogram",
        Newsletter: "Zapisz się do newslettera",
      },
      ResetForm: {
        ResetPassword: "Zresetuj hasło",
        Reset: "Zresetuj",
        BackToLogin: "Wróć do logowania",
      },
      Search: {
        Placeholder: "Szukaj kursów",
      },
      VideoPlayer: {
        Error: "Błąd podczas ładowania materiału. Spróbuj ponownie później.",
      },
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
