export const hp5Object = {
  baseUrl: "domain",
  url: "https://api-stage.escolalms.com/h5p",
  postUserStatistics: false,
  ajax: {
    setFinished: "ajaxSetFinished",
    contentUserData: "contentUserData",
  },
  saveFreq: false,
  siteUrl: "domain",
  l10n: {
    H5P: {
      common: {
        "no-result": "No Result.",
        yes: "Yes",
        no: "No",
        na: "N/A",
      },
      content: {
        creator: "Creator",
        created_at: "Created At",
        title: "Title",
        content_type: "Content Type",
        create: "New Content",
        upload: "Upload",
        edit: "Edit",
        upload_disable_extension_check: "Disable file extension check",
        action: "Method",
        action_upload: "Upload",
        action_create: "create",
        loading_content: "Loading...",
        library: "Library",
        parameters: "Parameters",
        "search-result": "Total :count Contents",
        cancel: "Cancel",
        save: "Save",
        saving: "Saving...",
        display: "Display Options",
        display_toolbar: "Toolbar Below Content",
        display_embed_button: "Display Embed button",
        display_copyright_button: "Display Copyright button",
        display_download_button: "Display Download button",
        content: "Content",
        created: "Content created.",
        updated: "Content updated",
        destroied: "Content is removed",
        confirm_destroy: "Are you sure remove a content?",
        can_not_find_content: "Cannot find library with #:id",
        missing_h5p_identifier: "Missing H5P identifier.",
        can_not_created: "Can not create.",
        can_not_updated: "Can not update.",
        can_not_delete: "Can not delete.",
        search: "Search",
        keyword: "Keyword",
        destroy: "Remove",
      },
      library: {
        title: "Title",
        name: "Name",
        version: "Version",
        restricted: "Restricted",
        contents: "Contents",
        contents_using_it: "Contents using it",
        libraries_using_it: "Libraries using it",
        actions: "Actions",
        remove: "Remove",
        upload: "Upload",
        upload_libraries: "Upload Libraries",
        upload_disable_extension_check: "Disable file extension check",
        only_update_existing_libraries: "Only update existing libraries",
        content_type_cache: "Content Type Cache",
        "search-result": "Total :count",
        created: "Library is created.",
        updated: "Library is updated.",
        cleared: "Library is cleared",
        can_not_updated: "Can not update.",
        destoryed: "Removed.",
        clear: "Clear",
        can_not_destroy: "Can not remove.",
        used_library_can_not_destoroied:
          "This Library is used by content or other libraries and can therefore not be deleted. ",
        confirm_clear_type_cache: "Are you sure remove a content type cache?",
        confirm_destroy: "Are you sure remove a library?",
        noContent: "No content is using this library",
        contentHeader: "Content using this library",
        pageSizeSelectorLabel: "Elements per page",
        filterPlaceholder: "Filter content",
        pageXOfY: "Page $x of $y",
        viewLibrary: "View library details",
        deleteLibrary: "Delete library",
        upgradeLibrary: "Upgrade library content",
      },
      h5p: {
        fullscreen: "Fullscreen",
        disableFullscreen: "Disable fullscreen",
        download: "Download",
        copyrights: "Rights of use",
        embed: "Embed",
        size: "Size",
        showAdvanced: "Show advanced",
        hideAdvanced: "Hide advanced",
        advancedHelp:
          "Include this script on your website if you want dynamic sizing of the embedded content:",
        copyrightInformation: "Rights of use",
        close: "Close",
        title: "Title",
        author: "Author",
        year: "Year",
        source: "Source",
        license: "License",
        thumbnail: "Thumbnail",
        noCopyrights: "No copyright information available for this content.",
        downloadDescription: "Download this content as a H5P file.",
        copyrightsDescription: "View copyright information for this content.",
        embedDescription: "View the embed code for this content.",
        h5pDescription: "Visit H5P.org to check out more cool content.",
        contentChanged: "This content has changed since you last used it.",
        startingOver: "You'll be starting over.",
        confirmDialogHeader: "Confirm action",
        confirmDialogBody:
          "Please confirm that you wish to proceed. This action is not reversible.",
        cancelLabel: "Cancel",
        confirmLabel: "Confirm",
      },
    },
  },
  hubIsEnabled: false,
  crossorigin: "anonymous",
  loadedJs: [],
  loadedCss: [],
  core: {
    styles: [
      "https://api-stage.escolalms.com/h5p-core/styles/h5p.css",
      "https://api-stage.escolalms.com/h5p-core/styles/h5p-confirmation-dialog.css",
      "https://api-stage.escolalms.com/h5p-core/styles/h5p-core-button.css",
    ],
    scripts: [
      "https://api-stage.escolalms.com/h5p-editor/js/402e665f88b6b88af75fe15ec311c2b2.js",
    ],
  },
  contents: {
    "cid-23": {
      library: "H5P.FindTheWords 1.4",
      content: {
        id: 23,
        created_at: "2021-10-18T19:45:40.000000Z",
        updated_at: "2021-10-18T19:45:40.000000Z",
        user_id: null,
        title: "New Content (from file)",
        library_id: 31,
        parameters:
          '{"params":{"taskDescription":"Why should you join us?  Everything we do is guided by our values that lay at the heart of our company.  What are our values? Find them on the grid below. Click the first letter of the word and drag the line. Click again on the last letter of the word to","wordList":"Respect,Community,Ownership,Inspiration,Customers,Passion,Competence,Innovation","behaviour":{"orientations":{"horizontal":true,"horizontalBack":true,"vertical":true,"verticalUp":true,"diagonal":true,"diagonalBack":true,"diagonalUp":true,"diagonalUpBack":true},"fillPool":"abcdefghijklmnopqrstuvwxyz","preferOverlap":true,"showVocabulary":true,"enableShowSolution":true,"enableRetry":true},"l10n":{"check":"Check","tryAgain":"Retry","showSolution":"Show Solution","found":"@found of @totalWords found","timeSpent":"Time Spent","score":"You got @score of @total points","wordListHeader":"Values"}},"metadata":{"license":"U","authors":[],"changes":[],"extraTitle":"New Content (from file)","title":"New Content (from file)"}}',
        nonce: "460164f2",
        filtered:
          '{"taskDescription":"Why should you join us?  Everything we do is guided by our values that lay at the heart of our company.  What are our values? Find them on the grid below. Click the first letter of the word and drag the line. Click again on the last letter of the word to","wordList":"Respect,Community,Ownership,Inspiration,Customers,Passion,Competence,Innovation","behaviour":{"orientations":{"horizontal":true,"horizontalBack":true,"vertical":true,"verticalUp":true,"diagonal":true,"diagonalBack":true,"diagonalUp":true,"diagonalUpBack":true},"fillPool":"abcdefghijklmnopqrstuvwxyz","preferOverlap":true,"showVocabulary":true,"enableShowSolution":true,"enableRetry":true},"l10n":{"check":"Check","tryAgain":"Retry","showSolution":"Show Solution","found":"@found of @totalWords found","timeSpent":"Time Spent","score":"You got @score of @total points","wordListHeader":"Values"}}',
        slug: "slug",
        embed_type: null,
        disable: 0,
        params:
          '{"taskDescription":"Why should you join us?  Everything we do is guided by our values that lay at the heart of our company.  What are our values? Find them on the grid below. Click the first letter of the word and drag the line. Click again on the last letter of the word to","wordList":"Respect,Community,Ownership,Inspiration,Customers,Passion,Competence,Innovation","behaviour":{"orientations":{"horizontal":true,"horizontalBack":true,"vertical":true,"verticalUp":true,"diagonal":true,"diagonalBack":true,"diagonalUp":true,"diagonalUpBack":true},"fillPool":"abcdefghijklmnopqrstuvwxyz","preferOverlap":true,"showVocabulary":true,"enableShowSolution":true,"enableRetry":true},"l10n":{"check":"Check","tryAgain":"Retry","showSolution":"Show Solution","found":"@found of @totalWords found","timeSpent":"Time Spent","score":"You got @score of @total points","wordListHeader":"Values"}}',
        metadata: {
          license: "U",
          title: "New Content (from file)",
        },
        library: {
          id: 31,
          name: "H5P.FindTheWords",
          majorVersion: 1,
          minorVersion: 4,
          embedTypes: "iframe",
          fullscreen: 0,
        },
        contentId: 23,
        embedType: "iframe",
        libraryMajorVersion: 1,
        libraryMinorVersion: 4,
        dependencies: {
          "preloaded-H5P.FindTheWords": {
            library: {
              id: 31,
              created_at: "2021-10-14T20:00:07.000000Z",
              updated_at: "2021-10-14T20:00:07.000000Z",
              name: "H5P.FindTheWords",
              title: "Find The Words",
              runnable: 1,
              restricted: 0,
              fullscreen: 0,
              embed_types: "iframe",
              semantics: [
                {
                  label: "Task description",
                  name: "taskDescription",
                  type: "text",
                  description: "Description of the Game",
                  default: "Find the words from the grid",
                  importance: "high",
                },
                {
                  name: "wordList",
                  type: "text",
                  label: "Word list",
                  description:
                    "Comma Separated list of words. Special Characters, White Spaces and Numbers Not allowed",
                  default: "one,two,three",
                  regexp: {
                    pattern:
                      "^(?!(?:.*[\"!#$%&./:;<=>?@\\[\\]^_`\\{|}~'()\\-*+\\d]|^[,])).*$",
                  },
                  importance: "high",
                },
                {
                  name: "behaviour",
                  type: "group",
                  label: "Behavioural settings",
                  importance: "low",
                  description:
                    "These options will let you control how the game behaves.",
                  optional: true,
                  fields: [
                    {
                      name: "orientations",
                      type: "group",
                      label: "Orientations",
                      description:
                        "An array containing the names of the word directions that should be used when creating the puzzle",
                      fields: [
                        {
                          name: "horizontal",
                          type: "boolean",
                          label: "Horizontal- left to right",
                          default: true,
                          optional: true,
                        },
                        {
                          name: "horizontalBack",
                          type: "boolean",
                          label: "Horizontal- right to left",
                          default: true,
                          optional: true,
                        },
                        {
                          name: "vertical",
                          type: "boolean",
                          label: "Vertical downwards",
                          default: true,
                          optional: true,
                        },
                        {
                          name: "verticalUp",
                          type: "boolean",
                          label: "Vertical upwards",
                          default: true,
                          optional: true,
                        },
                        {
                          name: "diagonal",
                          type: "boolean",
                          label: "Diagonal downwards- left to right",
                          default: true,
                          optional: true,
                        },
                        {
                          name: "diagonalBack",
                          type: "boolean",
                          label: "Diagonal downwards- right to left",
                          default: true,
                          optional: true,
                        },
                        {
                          name: "diagonalUp",
                          type: "boolean",
                          label: "Diagonal upwards- left to right",
                          default: true,
                          optional: true,
                        },
                        {
                          name: "diagonalUpBack",
                          type: "boolean",
                          label: "Diagonal upwards- right to left",
                          default: true,
                          optional: true,
                        },
                      ],
                      optional: true,
                    },
                    {
                      name: "fillPool",
                      type: "text",
                      label: "Vertical downwards",
                      description:
                        "pool of letters from which the blanks to be filled",
                      default: "abcdefghijklmnopqrstuvwxyz",
                      regexp: {
                        pattern:
                          "^[^\t\n .<>?;:\"'`!@#$%^&*()\\[\\]{}_+=|\\-]*$",
                      },
                      optional: true,
                    },
                    {
                      name: "preferOverlap",
                      type: "boolean",
                      label: "Prefer overlap",
                      description:
                        "Determines how wordfind decides where to place a word within the puzzle.   When true, it randomly selects amongst the positions the highest number of letters that overlap creating a more compact puzzle.   When false, it randomly selects amongst all valid positions creating a less compact puzzle.",
                      default: true,
                      optional: true,
                    },
                    {
                      name: "showVocabulary",
                      type: "boolean",
                      label: "Show vocabulary",
                      description:
                        "Determines whether to show vocabularies to the player",
                      default: true,
                      optional: true,
                    },
                    {
                      name: "enableShowSolution",
                      type: "boolean",
                      label: "Enable show solution",
                      description: "Add a show solution button for the game",
                      default: true,
                      optional: true,
                    },
                    {
                      name: "enableRetry",
                      type: "boolean",
                      label: "Enable retry",
                      description: "Add a retry button for the game",
                      default: true,
                      optional: true,
                    },
                  ],
                },
                {
                  label: "Localization",
                  importance: "low",
                  name: "l10n",
                  type: "group",
                  common: true,
                  fields: [
                    {
                      label: 'Text for "Check" button',
                      importance: "low",
                      name: "check",
                      type: "text",
                      default: "Check",
                    },
                    {
                      label: 'Text for "Retry" button',
                      importance: "low",
                      name: "tryAgain",
                      type: "text",
                      default: "Retry",
                    },
                    {
                      label: 'Text for "Show Solution" button',
                      importance: "low",
                      name: "showSolution",
                      type: "text",
                      default: "Show Solution",
                    },
                    {
                      label: "Counter text",
                      importance: "low",
                      name: "found",
                      type: "text",
                      default: "@found of @totalWords found",
                      description:
                        "Feedback text, variables available: @found and @totalWords. Example: '@found of @totalWords found'",
                    },
                    {
                      label: "Time spent text",
                      importance: "low",
                      name: "timeSpent",
                      type: "text",
                      default: "Time Spent",
                      description:
                        "label for showing the time spent while playing the game",
                    },
                    {
                      label: "Feedback text",
                      importance: "low",
                      name: "score",
                      type: "text",
                      default: "You got @score of @total points",
                      description:
                        "Feedback text, variables available: @score and @total. Example: 'You got @score of @total possible points'",
                    },
                    {
                      label: "Word list header",
                      importance: "low",
                      name: "wordListHeader",
                      type: "text",
                      default: "Find the words",
                      maxLength: 20,
                    },
                  ],
                },
              ],
              machineName: "H5P.FindTheWords",
              uberName: "H5P.FindTheWords 1.4",
              majorVersion: 1,
              minorVersion: 4,
              patchVersion: 4,
              preloadedJs:
                "scripts/h5p-find-the-words.js, scripts/h5p-find-the-words-word-grid.js, scripts/h5p-find-the-words-vocabulary.js, scripts/h5p-find-the-words-timer.js, scripts/h5p-find-the-words-counter.js",
              preloadedCss: "styles/h5p-find-the-words.css",
              dropLibraryCss: "",
              tutorialUrl: "",
              hasIcon: "1",
              libraryId: 31,
              preloadedDependencies: [
                {
                  id: 32,
                  libraryId: 32,
                  machineName: "H5P.Timer",
                  majorVersion: 0,
                  minorVersion: 4,
                },
                {
                  id: 1,
                  libraryId: 1,
                  machineName: "FontAwesome",
                  majorVersion: 4,
                  minorVersion: 5,
                },
                {
                  id: 8,
                  libraryId: 8,
                  machineName: "H5P.JoubelUI",
                  majorVersion: 1,
                  minorVersion: 3,
                },
              ],
            },
            type: "preloaded",
            weight: 8,
          },
          "preloaded-H5P.Timer": {
            library: {
              id: 32,
              created_at: "2021-10-14T20:00:07.000000Z",
              updated_at: "2021-10-14T20:00:07.000000Z",
              name: "H5P.Timer",
              title: "Timer",
              runnable: 0,
              restricted: 0,
              fullscreen: 0,
              embed_types: "",
              semantics: null,
              machineName: "H5P.Timer",
              uberName: "H5P.Timer 0.4",
              majorVersion: 0,
              minorVersion: 4,
              patchVersion: 2,
              preloadedJs: "scripts/timer.js",
              preloadedCss: "",
              dropLibraryCss: "",
              tutorialUrl: "",
              hasIcon: "1",
              libraryId: 32,
            },
            type: "preloaded",
            weight: 1,
          },
          "preloaded-FontAwesome": {
            library: {
              id: 1,
              created_at: "2021-10-14T18:50:07.000000Z",
              updated_at: "2021-10-14T18:50:07.000000Z",
              name: "FontAwesome",
              title: "Font Awesome",
              runnable: 0,
              restricted: 0,
              fullscreen: 0,
              embed_types: "",
              semantics: null,
              machineName: "FontAwesome",
              uberName: "FontAwesome 4.5",
              majorVersion: 4,
              minorVersion: 5,
              patchVersion: 4,
              preloadedJs: "",
              preloadedCss: "h5p-font-awesome.min.css",
              dropLibraryCss: "",
              tutorialUrl: "",
              hasIcon: "1",
              libraryId: 1,
            },
            type: "preloaded",
            weight: 2,
          },
          "preloaded-H5P.JoubelUI": {
            library: {
              id: 8,
              created_at: "2021-10-14T18:52:19.000000Z",
              updated_at: "2021-10-14T18:52:19.000000Z",
              name: "H5P.JoubelUI",
              title: "Joubel UI",
              runnable: 0,
              restricted: 0,
              fullscreen: 0,
              embed_types: "",
              semantics: null,
              machineName: "H5P.JoubelUI",
              uberName: "H5P.JoubelUI 1.3",
              majorVersion: 1,
              minorVersion: 3,
              patchVersion: 10,
              preloadedJs:
                "js/joubel-help-dialog.js, js/joubel-message-dialog.js, js/joubel-progress-circle.js, js/joubel-simple-rounded-button.js, js/joubel-speech-bubble.js, js/joubel-throbber.js, js/joubel-tip.js, js/joubel-slider.js, js/joubel-score-bar.js, js/joubel-progressbar.js, js/joubel-ui.js",
              preloadedCss:
                "css/joubel-help-dialog.css, css/joubel-message-dialog.css, css/joubel-progress-circle.css, css/joubel-simple-rounded-button.css, css/joubel-speech-bubble.css, css/joubel-tip.css, css/joubel-slider.css, css/joubel-score-bar.css, css/joubel-progressbar.css, css/joubel-ui.css, css/joubel-icon.css",
              dropLibraryCss: "",
              tutorialUrl: "",
              hasIcon: "1",
              libraryId: 8,
              preloadedDependencies: [
                {
                  id: 1,
                  libraryId: 1,
                  machineName: "FontAwesome",
                  majorVersion: 4,
                  minorVersion: 5,
                },
                {
                  id: 10,
                  libraryId: 10,
                  machineName: "H5P.Transition",
                  majorVersion: 1,
                  minorVersion: 0,
                },
                {
                  id: 4,
                  libraryId: 4,
                  machineName: "Drop",
                  majorVersion: 1,
                  minorVersion: 0,
                },
                {
                  id: 6,
                  libraryId: 6,
                  machineName: "H5P.FontIcons",
                  majorVersion: 1,
                  minorVersion: 0,
                },
              ],
            },
            type: "preloaded",
            weight: 7,
          },
          "preloaded-H5P.Transition": {
            library: {
              id: 10,
              created_at: "2021-10-14T18:52:19.000000Z",
              updated_at: "2021-10-14T18:52:19.000000Z",
              name: "H5P.Transition",
              title: "Transition",
              runnable: 0,
              restricted: 0,
              fullscreen: 0,
              embed_types: "",
              semantics: null,
              machineName: "H5P.Transition",
              uberName: "H5P.Transition 1.0",
              majorVersion: 1,
              minorVersion: 0,
              patchVersion: 4,
              preloadedJs: "transition.js",
              preloadedCss: "",
              dropLibraryCss: "",
              tutorialUrl: "",
              hasIcon: "1",
              libraryId: 10,
            },
            type: "preloaded",
            weight: 3,
          },
          "preloaded-Drop": {
            library: {
              id: 4,
              created_at: "2021-10-14T18:52:19.000000Z",
              updated_at: "2021-10-14T18:52:19.000000Z",
              name: "Drop",
              title: "Drop",
              runnable: 0,
              restricted: 0,
              fullscreen: 0,
              embed_types: "",
              semantics: null,
              machineName: "Drop",
              uberName: "Drop 1.0",
              majorVersion: 1,
              minorVersion: 0,
              patchVersion: 2,
              preloadedJs: "js/drop.min.js",
              preloadedCss: "css/drop-theme-arrows-bounce.min.css",
              dropLibraryCss: "",
              tutorialUrl: "",
              hasIcon: "1",
              libraryId: 4,
              preloadedDependencies: [
                {
                  id: 13,
                  libraryId: 13,
                  machineName: "Tether",
                  majorVersion: 1,
                  minorVersion: 0,
                },
              ],
            },
            type: "preloaded",
            weight: 5,
          },
          "preloaded-Tether": {
            library: {
              id: 13,
              created_at: "2021-10-14T18:52:19.000000Z",
              updated_at: "2021-10-14T18:52:19.000000Z",
              name: "Tether",
              title: "Tether",
              runnable: 0,
              restricted: 0,
              fullscreen: 0,
              embed_types: "",
              semantics: null,
              machineName: "Tether",
              uberName: "Tether 1.0",
              majorVersion: 1,
              minorVersion: 0,
              patchVersion: 2,
              preloadedJs: "scripts/tether.min.js",
              preloadedCss: "styles/tether.min.css",
              dropLibraryCss: "",
              tutorialUrl: "",
              hasIcon: "1",
              libraryId: 13,
            },
            type: "preloaded",
            weight: 4,
          },
          "preloaded-H5P.FontIcons": {
            library: {
              id: 6,
              created_at: "2021-10-14T18:52:19.000000Z",
              updated_at: "2021-10-14T18:52:19.000000Z",
              name: "H5P.FontIcons",
              title: "H5P.FontIcons",
              runnable: 0,
              restricted: 0,
              fullscreen: 0,
              embed_types: "",
              semantics: null,
              machineName: "H5P.FontIcons",
              uberName: "H5P.FontIcons 1.0",
              majorVersion: 1,
              minorVersion: 0,
              patchVersion: 6,
              preloadedJs: "",
              preloadedCss: "styles/h5p-font-icons.css",
              dropLibraryCss: "",
              tutorialUrl: "",
              hasIcon: "1",
              libraryId: 6,
            },
            type: "preloaded",
            weight: 6,
          },
        },
      },
      jsonContent:
        '{"taskDescription":"Why should you join us?  Everything we do is guided by our values that lay at the heart of our company.  What are our values? Find them on the grid below. Click the first letter of the word and drag the line. Click again on the last letter of the word to","wordList":"Respect,Community,Ownership,Inspiration,Customers,Passion,Competence,Innovation","behaviour":{"orientations":{"horizontal":true,"horizontalBack":true,"vertical":true,"verticalUp":true,"diagonal":true,"diagonalBack":true,"diagonalUp":true,"diagonalUpBack":true},"fillPool":"abcdefghijklmnopqrstuvwxyz","preferOverlap":true,"showVocabulary":true,"enableShowSolution":true,"enableRetry":true},"l10n":{"check":"Check","tryAgain":"Retry","showSolution":"Show Solution","found":"@found of @totalWords found","timeSpent":"Time Spent","score":"You got @score of @total points","wordListHeader":"Values"}}',
      fullScreen: 0,
      exportUrl:
        "https://api-stage.escolalms.com/api/admin/hh5p/content/23/export",
      title: "New Content (from file)",
      displayOptions: {
        frame: false,
        export: true,
        embed: true,
        copyright: true,
        icon: false,
        copy: null,
      },
      contentUserData: [
        {
          state: "{}",
        },
      ],
      nonce: "460164f2",
      scripts: [
        "https://api-stage.escolalms.com/h5p/cachedassets/de78a1aafbb36c56cdfe731b1831a04267611de5.js",
      ],
      styles: [
        "https://api-stage.escolalms.com/h5p/cachedassets/de78a1aafbb36c56cdfe731b1831a04267611de5.css",
      ],
    },
  },
  nonce: "460164f2",
};
