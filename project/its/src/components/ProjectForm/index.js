import React, { useState } from "react";

import FormInput from "../FormInput";
import FormFooterBtn from "../FormFooterBtn";

import { PROJECT_FORM_CONST } from "./constant";
import { inputType } from "../../utils/configConst";

import "./style.scss";

const ProjectForm = ({
  handleCancel,
  handleSubmit,
  errorMsg,
  projectDetail
}) => {
  const [name, setName] = useState(projectDetail ? projectDetail.name : "");
  const [lineId, setLineId] = useState(
    projectDetail ? projectDetail.lineId || "" : ""
  );
  const [description, setDescription] = useState(
    projectDetail ? projectDetail.description || "" : ""
  );
  const [isPrivate, setIsPrivate] = useState(
    projectDetail ? (projectDetail.isPrivate ? 1 : 0) : 0
  );

  const handleSubmitForm = () => {
    handleSubmit({
      name,
      description,
      lineId: lineId && lineId.length ? lineId : null,
      isPrivate: parseInt(isPrivate) === 1
    });
  };

  const handleInput = e => {
    const { name } = e.target;
    const { value } = e.target;
    switch (name) {
      case PROJECT_FORM_CONST.name:
        setName(value);
        break;
      case PROJECT_FORM_CONST.isPrivate:
        setIsPrivate(value);
        break;
      case PROJECT_FORM_CONST.lineId:
        setLineId(value);
      default:
        break;
    }
  };

  const handleEditorInput = value => {
    setDescription(value === "<p><br></p>" ? "" : value);
  };
  const inputList = [
    {
      name: PROJECT_FORM_CONST.name,
      type: "text",
      value: name,
      placeholder: PROJECT_FORM_CONST.name_placeholder,
      title: PROJECT_FORM_CONST.name_placeholder,
      inputType: inputType.text
    },
    {
      name: PROJECT_FORM_CONST.description,
      title: PROJECT_FORM_CONST.description_placeholder,
      value: description,
      placeholder: PROJECT_FORM_CONST.description_placeholder,
      handleInput: handleEditorInput,
      inputType: inputType.editor
    },
    {
      name: PROJECT_FORM_CONST.isPrivate,
      title: PROJECT_FORM_CONST.isPrivate_title,
      value: isPrivate,
      option: [PROJECT_FORM_CONST.public, PROJECT_FORM_CONST.private],
      inputType: inputType.radio
    },
    {
      name: PROJECT_FORM_CONST.lineId,
      type: "text",
      value: lineId,
      placeholder: PROJECT_FORM_CONST.line_placeholder,
      title: PROJECT_FORM_CONST.line_placeholder,
      inputType: inputType.text
    }
  ];

  return (
    <div className="projectForm_container bg-white rounded-4 max-h-full w-full overflow-y-auto text-18">
      <div className="projectForm_title text-20 font-bold">
        {projectDetail
          ? PROJECT_FORM_CONST.editTitle
          : PROJECT_FORM_CONST.newTitle}
      </div>
      <FormInput inputList={inputList} handleInput={handleInput} />
      <FormFooterBtn
        handleLeftOption={handleCancel}
        handleRightOption={handleSubmitForm}
        rightOption={
          projectDetail
            ? PROJECT_FORM_CONST.editSubmit
            : PROJECT_FORM_CONST.newSubmit
        }
        isActive={name.length > 0}
      />
      <div className="text-red-600">{errorMsg}</div>
    </div>
  );
};

export default ProjectForm;
