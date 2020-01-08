import React, { useState } from "react";

import FormInput from "../FormInput";
import FormFooterBtn from "../FormFooterBtn";
import TagInput from "../TagInput";
import NameSelector from "../NameSelector";

import { ISSUE_FORM_CONST } from "./constant";
import {
  inputType,
  STATE_OPTION,
  SEVERITY_OPTION,
  PRIORITY_OPTION
} from "../../utils/configConst";

import "./style.scss";

const IssueForm = ({ handleCancel, handleSubmit, errorMsg }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState(0);
  const [severity, setSeverity] = useState(0);
  const [priority, setPriority] = useState(0);
  const [isReproducible, setIsReproducible] = useState(0);
  const [tags, setTag] = useState([]);
  const [assignList, setAssignList] = useState([]);
  const [mentionList, setMentionList] = useState([]);

  const handleSubmitForm = () => {
    handleSubmit({
      name,
      description,
      state,
      severity,
      priority,
      isReproducible: isReproducible === 0,
      tags,
      assignList,
      mentionList
    });
  };

  const handleAddTag = newTag => {
    const newTagList = [...tags, newTag];
    const uniqueTagList = newTagList.filter(
      (item, pos) => newTagList.indexOf(item) === pos
    );
    setTag(uniqueTagList);
  };

  const handleRemoveTag = e => {
    let index;
    if (!e) {
      index = tags.length - 1;
    } else {
      index = e.currentTarget.dataset.index;
    }
    const newTagList = [...tags];
    newTagList.splice(index, 1);
    setTag(newTagList);
  };

  const handleAddAssign = newAssign => {
    const newAssignList = [...assignList, newAssign];
    const uniqueList = newAssignList.filter(
      (item, pos) => newAssignList.indexOf(item) === pos
    );
    setAssignList(uniqueList);
  };

  const handleRemoveAssign = e => {
    let index;
    if (!e) {
      index = assignList.length - 1;
    } else {
      index = e.currentTarget.dataset.index;
    }
    const newAssignList = [...assignList];
    newAssignList.splice(index, 1);
    setAssignList(newAssignList);
  };

  const handleInput = e => {
    const { name } = e.target;
    const { value } = e.target;

    switch (name) {
      case ISSUE_FORM_CONST.name:
        setName(value);
        break;
      case ISSUE_FORM_CONST.state:
        setState(value);
        break;
      case ISSUE_FORM_CONST.severity:
        setSeverity(value);
        break;
      case ISSUE_FORM_CONST.priority:
        setPriority(value);
        break;
      case ISSUE_FORM_CONST.isReproducible:
        setIsReproducible(value);
        break;
      default:
        break;
    }
  };

  const handleEditorInput = value => {
    setDescription(value === "<p><br></p>" ? "" : value);
    const doc = document.createElement("div");
    doc.innerHTML = value;
    const mentionDomList = doc.getElementsByClassName("mention");
    const newMentionList = Array.from(mentionDomList).map(e => {
      return e.dataset.value;
    });

    setMentionList(
      newMentionList.filter((item, pos) => newMentionList.indexOf(item) === pos)
    );
  };

  const inputList = [
    {
      name: ISSUE_FORM_CONST.name,
      type: "text",
      value: name,
      placeholder: ISSUE_FORM_CONST.name_placeholder,
      title: ISSUE_FORM_CONST.name_placeholder,
      inputType: inputType.text
    },
    {
      name: ISSUE_FORM_CONST.description,
      title: ISSUE_FORM_CONST.description_placeholder,
      value: description,
      placeholder: ISSUE_FORM_CONST.description_placeholder,
      handleInput: handleEditorInput,
      inputType: inputType.editor
    },
    {
      name: ISSUE_FORM_CONST.state,
      title: ISSUE_FORM_CONST.state_title,
      value: state,
      option: STATE_OPTION,
      inputType: inputType.select
    },
    {
      name: ISSUE_FORM_CONST.severity,
      title: ISSUE_FORM_CONST.severity_title,
      value: severity,
      option: SEVERITY_OPTION,
      inputType: inputType.select
    },
    {
      name: ISSUE_FORM_CONST.priority,
      title: ISSUE_FORM_CONST.priority_title,
      value: priority,
      option: PRIORITY_OPTION,
      inputType: inputType.select
    },
    {
      name: ISSUE_FORM_CONST.isReproducible,
      title: ISSUE_FORM_CONST.isReproducible_title,
      value: isReproducible,
      option: [ISSUE_FORM_CONST.yes, ISSUE_FORM_CONST.no],
      inputType: inputType.radio
    }
  ];

  const isActive = name.length > 0 && description.length > 0;

  return (
    <div className="issueForm_container bg-white rounded-4 max-h-full w-full overflow-y-auto text-18">
      <div className="issueForm_title text-20 font-bold">
        {ISSUE_FORM_CONST.newTitle}
      </div>
      <FormInput inputList={inputList} handleInput={handleInput} />
      <TagInput
        tags={tags}
        handleAddTag={handleAddTag}
        handleRemove={handleRemoveTag}
      />
      <NameSelector
        nameList={assignList}
        handleAdd={handleAddAssign}
        handleRemove={handleRemoveAssign}
      />
      <FormFooterBtn
        handleLeftOption={handleCancel}
        handleRightOption={handleSubmitForm}
        rightOption={ISSUE_FORM_CONST.newSubmit}
        isActive={isActive}
      />
      <div className="text-red-600">{errorMsg}</div>
    </div>
  );
};

export default IssueForm;
