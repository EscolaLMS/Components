import { API } from "@escolalms/sdk/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next"; // assuming you are using react-i18next for translations

const useAdditionalFieldTranslations = () => {
  const { i18n } = useTranslation();

  const additionalFieldTranslations = useCallback(
    (fieldMeta: API.Metadata) => {
      const translations = fieldMeta[0].translations;
      if (translations) {
        return translations[i18n.language];
      } else {
        return false;
      }
    },
    [i18n.language]
  );

  return additionalFieldTranslations;
};

export default useAdditionalFieldTranslations;
