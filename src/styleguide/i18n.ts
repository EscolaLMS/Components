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
      "CartCard.addDiscountButton": "Discount code",
      "CartCard.buyButton": "Confirm and pay",
      "CartCard.discountError": "The code provided is invalid",
      "CartCard.discountGranted": "**Discount code** applied",
      "CartCard.realizeButton": "Realize",
      "CartCard.remove": "Remove discount code",
      "Course.Agenda": "Agenda",
      "Course.topicPreview": "Preview",
      "Course.Finished": "Finished",
      "Course.SubLesson": "Submodule",
      "Course.Lesson": "Module",
      "Course.markAsFinished": "Mark as finished",
      "Course.nextTopic": "Switch to next topic",
      "Course.finishCourse": "Finish course",
      "CourseCard.lesson_one": "{{count}} lesson",
      "CourseCard.lesson_other": "{{count}} lessons",
      "CourseCard.startNow": "Start now",
      "CourseTopNav.addNote": "Note",
      "CourseTopNav.addBookmark": "Bookmark",
      "CourseTopNav.deleteBookmark": "Delete bookmark",
      "CourseTopNav.deleteBookmarkMobile": "Bookmark",
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
      "Rate.Header": "Rate on a scale of 1-5",
      "Rate.Select": "Select rate",
      "Rate.Select1": "Fatal, disappointments",
      "Rate.Select2": "Weak, below expectations",
      "Rate.Select3": "Without a revelation, it could be better",
      "Rate.Select4": "Good, as expected",
      "Rate.Select5": "Sensational, I recommend it heartily",
      "Rate.submitButton": "Send",
      "Rate.cancelButton": "Cancel",
      "Ratings.averageRateLabel": "Average rate",
      "PdfPlayer.notFound": "Document not found",
      "PdfPlayer.of": "of",
      Required: "Required",
      DateAfterToday: "The date must be later than today",
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
        Avatar: "Yours Avatar",
      },
      Categories: {
        Filter: "Filter",
      },
      Tags: {
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
        Header: "Log in",
        Signin: "Log in",
        NotRemember: "I forgot my password",
        NoAccount: "No account?",
        Signup: "Register",
        RememberMe: "Remember me",
      },
      Orders: {
        Status: "Status",
        Title: "Title",
        Date: "Date",
        Price: "Price",
        Actions: "Invoice",
        NoRecords: "No records",
      },
      RegisterForm: {
        Header: "Sign up ",
        Subtitle: "Many users have already trusted us",
        "Already have an account": "Already have an account?",
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
        NoResults: "No results",
        Search: "Search",
      },
      VideoPlayer: {
        PlayNow: "Play now",
        Next: "Next in",
        Cancel: "Cancel",
        Seconds: "Seconds",
        Second: "Second",
        Error: "Error loading material. Please try again later.",
        SeekBackward: "Seek backward",
        SeekForward: "Seek forward",
        Play: "Play",
        Pause: "Pause",
        Mute: "Mute",
        Unmute: "Unmute",
        Fullscreen: "Fullscreen",
        Progress: "Progress of media",
      },
      Upload: {
        button: "Choose a file",
      },
      Actions: {
        Show: "Show",
        Hide: "Hide",
        ShowPrevious: "Show previous",
        ShowNext: "Show next",
        Remove: "Remove",
      },
      Navigation: {
        ShowHideMenu: "Show/hide menu",
      },
      CourseAgenda: {
        FinishRequiredTopicsBefore:
          "Finish required topic(s) before You get to this lesson.",
        FirstFinishRequiredTopics: "First finish required topic(s).",
        YouHaveToCompleteTopic: "You have to complete topic",
        TopicIsLocked: "Topic is locked.",
        TopicToComplete: "Topic to complete",
        ToAccessTheFollowing: "to access the following",
        ActiveFrom: "Active from",
      },
      Quiz: {
        Start: "Start quiz",
        YourScore: "Your score",
        Questions: "Questions",
        Retry: "Retry",
        Submit: "Submit",
        YouHaveMade: "You have made",
        Attempts: "Attempts",
        TypeAnswer: "Type your answer",
        TypeNumber: "Type some number",
      },
      ProjectPlayer: {
        ProjectFile: "Project file",
      },
      Tasks: {
        TasksHeader: "Tasks",
        AddTask: "Add task",
        AllTasks: "All tasks",
        TodayTasks: "Today tasks",
        UpcomingTasks: "Upcoming tasks",
        OverdueTasks: "Overdue tasks",
        CreateBy: "Create by",
        Sort: "Sort",
        Personal: "Personal",
        Incoming: "Incoming",
        NoTasks: "There are no tasks on this list...",
        ShowDone: "Show done tasks",
        AddNewTask: "Add new task",
        Title: "Title",
        Description: "Description",
        RelatesTo: "Relates to",
        NoContent: "No content",
        Cancel: "Cancel",
        Submit: "Submit",
        Save: "Save",
        Delete: "Delete",
        Undo: "Undo",
        Edit: "Edit",
        DeleteTask: "Delete this task",
        DeleteTaskDescription:
          "Are you sure you want to delete this task? This action is irreversible",
        EditTask: "Edit task",
        DetailTask: "Task details",
        ThereIsNoDescription: "There is no description provided for this task",
        Notes: "Notes",
        NoNotes: "There is no notes",
        DueDate: "Due date",
        AddNote: "Add note",
        EditNote: "Edit note",
        Note: "Note",
        Today: "Today",
        Tomorrow: "Tomorrow",
        Overdue: "Overdue",
        Upcoming: "Upcoming",
        Ascending: "Ascending",
        Descending: "Descending",
      },
      Bookmarks: {
        Title: "Bookmarks and notes",
        Bookmarks: "Bookmarks",
        Notes: "Notes",
        NoBookmarks: "There is nothing on this list...",
        Delete: "Delete",
        Cancel: "Cancel",
        Update: "Update",
        Add: "Add",
        Prev: "Prev",
        Next: "Next",
        Page: "Page",
        YourNote: "Your note",
        WriteNote: "Write a note...",
        All: "All",
      },
      ModalCourseAccess: {
        Title: "Fill the enquiry and enrol",
        PhoneNumber: "Phone number",
        ContactDetails: "Contact details",
        Cancel: "Cancel",
        Submit: "Submit",
      },
      LostAccess: {
        Title: "You lost access",
        Description: "Buy the course or subscription",
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
      "CartCard.addDiscountButton": "Kod rabatowy",
      "CartCard.buyButton": "Potwierdzam i płacę",
      "CartCard.discountError": "Podany kod jest nieprawidłowy",
      "CartCard.discountGranted": "**Kod rabatowy** zastosowany",
      "CartCard.realizeButton": "Realizuj",
      "CartCard.remove": "Usuń kod rabatowy",
      "Course.Agenda": "Plan kursu",
      "Course.topicPreview": "Podgląd",
      "Course.Finished": "Ukończono",
      "Course.SubLesson": "Podmoduł",
      "Course.Lesson": "Moduł",
      "Course.markAsFinished": "Oznacz jako ukończone",
      "Course.nextTopic": "Następne zadanie",
      "Course.finishCourse": "Zakończ kurs",
      "CourseCard.lesson_few": "{{count}} lekcje",
      "CourseCard.lesson_many": "{{count}} lekcji",
      "CourseCard.lesson_one": "{{count}} lekcja",
      "CourseTopNav.addNote": "Notatka",
      "CourseTopNav.addBookmark": "Zakładka",
      "CourseTopNav.deleteBookmark": "Usuń zakładkę",
      "CourseTopNav.deleteBookmarkMobile": "zakładka",
      "CourseTopNav.finished": "Zakańczony",
      "CourseTopNav.finishLesson": "Zakończ lekcję",
      "CourseTopNav.next": "Dalej",
      "CourseTopNav.prev": "Cofnij",
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
      "Rate.Header": "Oceń w skali 1 - 5",
      "Rate.Select": "Wybierz ocene",
      "Rate.Select1": "Fatalny, rozczarowujący",
      "Rate.Select2": "Słaby, poniżej oczewikań",
      "Rate.Select3": "Bez, rewelacji, mógłby być lepszy",
      "Rate.Select4": "Dobry, zgodny z oczekiwaniami",
      "Rate.Select5": "Rewelacyjny, polecam serdecznie",
      "Rate.submitButton": "Wyślij",
      "Rate.cancelButton": "Anuluj",
      "Ratings.averageRateLabel": "Średnia ocena",
      "PdfPlayer.notFound": "Dokument nie został znaleziony",
      "PdfPlayer.of": "z",
      Required: "Wymagane",
      DateAfterToday: "Data musi być późniejsza niź dzisiaj",
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
        Avatar: "Twój Awatar",
      },
      Categories: {
        Filter: "Filtruj",
      },
      Tags: {
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
        Header: "Zaloguj się ",
        Signin: "Zaloguj się",
        NotRemember: "Nie pamiętam hasła",
        NoAccount: "Nie posiadasz konta?",
        Signup: "Zarejestruj się",
        RememberMe: "Zapamiętaj mnie",
      },
      Orders: {
        Status: "Status",
        Title: "Tytuł",
        Date: "Data",
        Price: "Cena",
        Actions: "Faktury",
        NoRecords: "Brak zamówień",
      },
      RegisterForm: {
        Header: "Zarejestruj się",
        Subtitle: "Zaufało nam już sporo użytkowników",
        "Already have an account": "Masz już konto?",
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
        NoResults: "Brak wyników",
        Search: "Szukaj",
      },
      VideoPlayer: {
        PlayNow: "Odtwórz teraz",
        Next: "Następna za",
        Cancel: "Anuluj",
        Seconds: "Sekundy",
        Second: "Sekundę",
        Error: "Błąd podczas ładowania materiału. Spróbuj ponownie później.",
        SeekBackward: "Przewiń do tyłu",
        SeekForward: "Przewiń do przodu",
        Play: "Włącz",
        Pause: "Pauzuj",
        Mute: "Wycisz",
        Unmute: "Wyłącz wyciszenie",
        Fullscreen: "Tryb pełnego ekranu",
        Progress: "Progres medium",
      },
      Upload: {
        button: "Wybierz plik",
      },
      Actions: {
        Show: "Pokaż",
        Hide: "Ukryj",
        ShowPrevious: "Pokaż poprzedni",
        ShowNext: "Pokaż następny",
        Remove: "Usuń",
      },
      Navigation: {
        ShowHideMenu: "Pokaż/ukryj menu",
      },
      CourseAgenda: {
        FinishRequiredTopicsBefore:
          "Ukończ wymagane tematy aby przejść do tej lekcji",
        FirstFinishRequiredTopics: "Najpierw ukończ wymagane tematy",
        YouHaveToCompleteTopic: "Ukończ temat",
        TopicIsLocked: "Temat jest zablokowany.",
        TopicToComplete: "Temat do ukończenia",
        ToAccessTheFollowing: "aby przejść tutaj",
        ActiveFrom: "Dostępny od",
      },
      Quiz: {
        Start: "Start quiz",
        YourScore: "Twój wynik",
        Questions: "Pytania",
        Retry: "Powtórz",
        Submit: "Wyślij",
        YouHaveMade: "Wykonałeś",
        Attempts: "próby",
        TypeAnswer: "Wpisz swoją odpowiedź",
        TypeNumber: "Wpisz jakąś liczbę",
      },
      Tasks: {
        TasksHeader: "Zadania",
        AddTask: "Dodaj zadanie",
        AllTasks: "Wszystkie zadania",
        TodayTasks: "Dzisiejsze zadania",
        UpcomingTasks: "Nadchodzące zadania",
        OverdueTasks: "Zaległe zadania",
        CreateBy: "Stworzone przez",
        Sort: "Sortowanie",
        Personal: "Osobiste",
        Incoming: "Zewnętrzne",
        NoTasks: "Brak zadań...",
        ShowDone: "Pokaż ukończone zadania",
        AddNewTask: "Dodaj nowe zadanie",
        Title: "Tytuł",
        Description: "Opis",
        RelatesTo: "Odnosi się do",
        NoContent: "Brak zawartości",
        Cancel: "Anuluj",
        Submit: "Wyślij",
        Save: "Zapisz",
        Delete: "Usuń",
        Undo: "Cofnij",
        Edit: "Edytuj",
        DeleteTask: "Usuń te zadanie",
        DeleteTaskDescription:
          "Czy na pewno chcesz usunąć to zadanie? Ta czynność jest nieodwracalna",
        EditTask: "Edytuj zadanie",
        DetailTask: "Szczegóły zadania",
        ThereIsNoDescription: "Nie ma opisu tego zadania",
        Notes: "Notatki",
        NoNotes: "Brak notatek",
        DueDate: "Termin",
        AddNote: "Dodaj notatkę",
        EditNote: "Edutuj notatkę",
        Note: "Notatka",
        Today: "Dzisiaj",
        Tomorrow: "Jutro",
        Overdue: "Przekroczone",
        Upcoming: "Nadchodzące",
        Ascending: "Rosnąco",
        Descending: "Malejąco",
      },
      Bookmarks: {
        Title: "Zakładki i notatki",
        Bookmarks: "Zakładki",
        Notes: "Notatki",
        NoBookmarks: "Lista jest pusta...",
        Delete: "Usuń",
        Cancel: "Anuluj",
        Update: "Aktualizuj",
        Add: "Dodaj",
        Prev: "Poprzednia",
        Next: "Następna",
        Page: "Strona",
        YourNote: "Twoja notatka",
        WriteNote: "Napisz notatkę",
        All: "Wszystko",
      },
      ModalCourseAccess: {
        Title: "Wypełnij zapytanie i zapisz się",
        PhoneNumber: "Numer telefonu",
        ContactDetails: "Szczegóły kontaktu",
        Cancel: "Anuluj",
        Submit: "Wyślij",
      },
      LostAccess: {
        Title: "Straciłeś dostęp",
        Description: "Wykup kurs lub subskrypcję",
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
