import React from "react";
import { useTranslation } from "react-i18next";

const Description = () => {
  const { t } = useTranslation();

  return (
    <div className="text-stone-700 font-thin text-xl text-center">
      <p>{t("description.head")}</p>
      <p className="mt-5">{t("description.content_1")}</p>
      <p className="mt-5">{t("description.content_2")}</p>
    </div>
  );
};

export default Description;
