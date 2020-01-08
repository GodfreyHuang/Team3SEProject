import React from "react";

import { CANCEL } from "./constants";

import "./styles.scss";

const FormFooterBtn = ({
  handleLeftOption,
  handleRightOption,
  leftOption,
  rightOption,
  isActive
}) => {
  return (
    <div className="form_footer_btn w-full flex justify-between">
      <span className="main_btn btn-cancel" onClick={handleLeftOption}>
        {leftOption || CANCEL}
      </span>
      <span
        className={`main_btn btn-active${isActive ? "" : " disable"}`}
        onClick={handleRightOption}
      >
        {rightOption}
      </span>
    </div>
  );
};

export default FormFooterBtn;
