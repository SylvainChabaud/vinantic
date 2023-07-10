import React from "react";
import { useTranslation } from "react-i18next";

const Title = () => {
  const { t } = useTranslation();
  return <div className="text-stone-700 font-tangerine font-thin text-9xl text-center">{t('title')}</div>;
};

export default Title;
