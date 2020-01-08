import React, { useState } from "react";

import FormInput from "../FormInput";
import FormFooterBtn from "../FormFooterBtn";
import TagInput from "../TagInput";

import { ISSUE_FORM_CONST } from "./constant";
import { inputType } from "../../utils/configConst";

import "./style.scss";

const EditIssueForm = ({
  handleCancel,
  handleSubmit,
  errorMsg,
  issueDetail
}) => {
  const [name, setName] = useState(issueDetail.name);
  const [description, setDescription] = useState(issueDetail.description);
  const [tags, setTag] = useState(issueDetail.tags);
  const [mentionList, setMentionList] = useState([]);

  const handleSubmitForm = () => {
    handleSubmit({
      issueId: issueDetail.id,
      name,
      description,
      tags,
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

  const handleInput = e => {
    const { name } = e.target;
    const { value } = e.target;

    switch (name) {
      case ISSUE_FORM_CONST.name:
        setName(value);
        break;
      default:
        break;
    }
  };
  const getMentionList = value => {
    const doc = document.createElement("div");
    doc.innerHTML = value;
    const mentionDomList = doc.getElementsByClassName("mention");
    return Array.from(mentionDomList).map(e => {
      return e.dataset.value;
    });
  };
  const handleEditorInput = value => {
    setDescription(value === "<p><br></p>" ? "" : value);
    const oldMentionList = getMentionList(issueDetail.description);
    const newMentionList = getMentionList(value);

    setMentionList(
      newMentionList.filter(
        (item, pos) =>
          newMentionList.indexOf(item) === pos &&
          oldMentionList.indexOf(item) === -1
      )
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

export default EditIssueForm;
