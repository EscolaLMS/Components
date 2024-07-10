import { API } from "@escolalms/sdk/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next"; // assuming you are using react-i18next for translations

const useAdditionalField = () => {
  const { i18n } = useTranslation();

  const additionalFieldTranslations = useCallback(
    (fieldMeta: API.Metadata) => {
      const translations = fieldMeta?.extra?.[0]?.translations;
      if (translations && typeof translations === "object") {
        return translations[i18n.language];
      } else {
        return false;
      }
    },
    [i18n.language]
  );

  const filter = useCallback(
    (fieldMeta: API.Metadata, keyName = "register") => {
      if (Array.isArray(fieldMeta.extra)) {
        return fieldMeta.extra.some(
          (item) =>
            item && (item[keyName] === undefined || item[keyName] === true)
        );
      }
      return false;
    },
    []
  );

  return {
    getFieldTranslations: additionalFieldTranslations,
    filterByKey: filter,
  };
};

export default useAdditionalField;
