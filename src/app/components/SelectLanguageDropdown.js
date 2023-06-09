import { Button, Dropdown } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { setPreferredLanguage } from "../../redux/store";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
const SelectLanguageDropdown = ({ preferredLanguage }, style) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const flagLabels = {
    tr: (
      <span>
        <span className={"fi fi-tr"}></span>
        {" " + t("turkish")}
      </span>
    ),
    en: (
      <span>
        <span className={"fi fi-gb"}></span>
        {" " + t("english")}
      </span>
    ),
  };

  const handleLanguageClick = (e) => {
    dispatch(setPreferredLanguage(e.key));
  };
  const availableLanguages = [
    {
      key: "tr",
      label: flagLabels.tr,
      onClick: handleLanguageClick,
    },
    {
      key: "en",
      label: flagLabels.en,
      onClick: handleLanguageClick,
    },
  ];

  return (
    <div style={style}>
      <Dropdown menu={{ items: availableLanguages }} placement={"bottom"} arrow>
        <Button>{flagLabels[preferredLanguage]}</Button>
      </Dropdown>
    </div>
  );
};

SelectLanguageDropdown.prototype = {
  preferredLanguage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    preferredLanguage: state.layout.preferredLanguage,
  };
}
export default connect(mapStateToProps)(SelectLanguageDropdown);
