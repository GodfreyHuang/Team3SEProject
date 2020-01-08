import React, { useState, useEffect } from "react";

import FormInput from "../FormInput";
import NameSelector from "../NameSelector";

import { ISSUE_FORM_CONST } from "./contents";
import {
  inputType,
  STATE_OPTION,
  SEVERITY_OPTION,
  PRIORITY_OPTION
} from "../../utils/configConst";

import UPLOAD_ICON from "../../utils/image/upload.svg";
import "./style.scss";

const IssueActivityForm = ({ issueDetail, handleSubmit }) => {
  const [comment, setComment] = useState("");
  const [isReproducible, setIsReproducible] = useState(
    issueDetail.isReproducible ? 0 : 1
  );
  const [state, setState] = useState(issueDetail.state);
  const [severity, setSeverity] = useState(issueDetail.severity);
  const [priority, setPriority] = useState(issueDetail.priority);
  const [assignList, setAssignList] = useState(issueDetail.assignList);
  const [mentionList, setMentionList] = useState([]);

  const [isShowReproducible, setShowReproducible] = useState(false);
  const [isShowState, setShowState] = useState(false);
  const [isShowSeverity, setShowSeverity] = useState(false);
  const [isShowPriority, setShowPriority] = useState(false);
  const [isShowAssign, setShowAssign] = useState(false);
  const handleInput = e => {
    const { name } = e.target;
    const { value } = e.target;

    switch (name) {
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

  const handleEditorInput = value => {
    setComment(value === "<p><br></p>" ? "" : value);
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
      name: ISSUE_FORM_CONST.comment,
      value: comment,
      placeholder: ISSUE_FORM_CONST.comment_placeholder,
      title: ISSUE_FORM_CONST.comment_placeholder,
      handleInput: handleEditorInput,
      inputType: inputType.editor
    }
  ];

  useEffect(() => {
    setComment("");
    setIsReproducible(issueDetail.isReproducible ? 0 : 1);
    setState(issueDetail.state);
    setSeverity(issueDetail.severity);
    setPriority(issueDetail.priority);
    setAssignList(issueDetail.assignList);
    setMentionList([]);
    setShowReproducible(false);
    setShowState(false);
    setShowSeverity(false);
    setShowPriority(false);
    setShowAssign(false);
  }, [issueDetail]);

  if (isShowReproducible)
    inputList.unshift({
      name: ISSUE_FORM_CONST.isReproducible,
      title: ISSUE_FORM_CONST.isReproducible_title,
      value: isReproducible,
      option: [ISSUE_FORM_CONST.yes, ISSUE_FORM_CONST.no],
      inputType: inputType.radio
    });
  if (isShowSeverity)
    inputList.unshift({
      name: ISSUE_FORM_CONST.severity,
      title: ISSUE_FORM_CONST.severity_title,
      value: severity,
      option: SEVERITY_OPTION,
      inputType: inputType.select
    });
  if (isShowPriority)
    inputList.unshift({
      name: ISSUE_FORM_CONST.priority,
      title: ISSUE_FORM_CONST.priority_title,
      value: priority,
      option: PRIORITY_OPTION,
      inputType: inputType.select
    });
  if (isShowState)
    inputList.unshift({
      name: ISSUE_FORM_CONST.state,
      title: ISSUE_FORM_CONST.state_title,
      value: state,
      option:
        issueDetail.projectIdentity < 3
          ? STATE_OPTION
          : STATE_OPTION.slice(0, 3),
      inputType: inputType.select
    });

  const renderCheckBox = (
    isChecked,
    setFunction,
    name,
    setInitValue,
    initValue
  ) => {
    return (
      <div className="issueActivityForm_checkBox">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => {
            setInitValue(initValue);
            setFunction(!isChecked);
          }}
        />
        {name}
      </div>
    );
  };

  const renderCheckList = () => {
    return (
      <div className="issueActivityForm_checkList flex">
        {renderCheckBox(
          isShowState,
          setShowState,
          ISSUE_FORM_CONST.state_title,
          setState,
          issueDetail.state
        )}
        &nbsp;
        {renderCheckBox(
          isShowPriority,
          setShowPriority,
          ISSUE_FORM_CONST.priority_title,
          setPriority,
          issueDetail.priority
        )}
        &nbsp;
        {renderCheckBox(
          isShowSeverity,
          setShowSeverity,
          ISSUE_FORM_CONST.severity_title,
          setSeverity,
          issueDetail.severity
        )}
        &nbsp;
        {renderCheckBox(
          isShowReproducible,
          setShowReproducible,
          ISSUE_FORM_CONST.isReproducible_title,
          setIsReproducible,
          issueDetail.isReproducible ? 0 : 1
        )}
        &nbsp;
        {renderCheckBox(
          isShowAssign,
          setShowAssign,
          ISSUE_FORM_CONST.assignList_title,
          setAssignList,
          issueDetail.assignList
        )}
      </div>
    );
  };

  const handleFormSubmit = () => {
    if (
      isShowPriority ||
      isReproducible ||
      isShowState ||
      isShowSeverity ||
      comment.length > 0 ||
      isShowAssign
    ) {
      const query = {
        issueId: issueDetail.id,
        state,
        severity,
        priority,
        isReproducible: parseInt(isReproducible) === 0,
        content: comment,
        assignList,
        mentionList,
        imgUrls: [],
        fileUrls: []
      };
      handleSubmit(query);
    }
  };
  console.log(isReproducible);
  return (
    <div className="issueActivityForm">
      <FormInput inputList={inputList} handleInput={handleInput} />
      {isShowAssign ? (
        <NameSelector
          nameList={assignList}
          handleAdd={handleAddAssign}
          handleRemove={handleRemoveAssign}
        />
      ) : null}
      <div className="flex justify-between">
        {renderCheckList()}

        <div className="main_btn btn-active btn-sm" onClick={handleFormSubmit}>
          <div className="flex justify-end">
            <img src={UPLOAD_ICON} className="upload_img mr-3" />
            Submit{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueActivityForm;
