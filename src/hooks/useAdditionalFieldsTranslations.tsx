import { API } from "@escolalms/sdk/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next"; // assuming you are using react-i18next for translations

const useAdditionalField = () => {
  const { i18n } = useTranslation();

  const additionalFieldTranslations = useCallback(
    (fieldMeta: API.Metadata) => {
      //@ts-ignore
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
      return (
        Array.isArray(fieldMeta.extra) &&
        fieldMeta.extra.filter(
          (item: Record<string, string | number | boolean> | null) => {
            return item && item[keyName];
          }
        )
      );
    },
    []
  );

  return {
    getFieldTranslations: additionalFieldTranslations,
    filterByKey: filter,
  };
};

export default useAdditionalField;
