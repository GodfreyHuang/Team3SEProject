import React, { useState } from "react";

import {
  DELETE,
  ENTER,
  TAB,
  SPACEBAR,
  TAG_CHAR_LIMITS,
  TAG_NUMBER_LIMITS,
  TAG_TITLE
} from "./constants";

import "./style.scss";

const ProjectForm = ({ tags, handleAddTag, handleRemove }) => {
  const [tagValue, setTagValue] = useState("");

  const renderTag = () => {
    return tags.map((e, i) => {
      return (
        <span
          className="tagInput_tag flex items-center "
          key={`tag_input_${e}`}
        >
          <div className="tagInput_tag_name flex">
            #{e}
            <div
              data-index={i}
              className="tagInput_close"
              onClick={handleRemove}
            />
          </div>
        </span>
      );
    });
  };

  const handleInput = e => {
    const { value } = e.target;
    if (value !== " " && value !== "#") setTagValue(value);
  };

  const handleKeyDown = e => {
    const key = e.keyCode;
    switch (key) {
      case ENTER:
      case TAB:
      case SPACEBAR:
        if (tagValue.length) {
          handleAddTag(tagValue);
        }
        setTagValue("");
        break;
      case DELETE:
        if (!tagValue.length) handleRemove();
        break;
      default:
    }
  };

  return (
    <div className="tagInput">
      <div>{TAG_TITLE}</div>
      {renderTag()}#
      <input
        type="text"
        className="tagInput_input text-14 flex-grow"
        onKeyDown={handleKeyDown}
        onChange={handleInput}
        placeholder="hashtags"
        value={tagValue}
      />
    </div>
  );
};

export default ProjectForm;
