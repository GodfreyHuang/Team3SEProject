import React from "react";
import TAG_ICON from "../../utils/image/tag.svg";
import "./style.scss";
const Tag = ({ tag }) => (
  <div className="Tags_container bg-green-200 cursor-pointer hover:bg-green-100 items-center justify-center">
    <img src={TAG_ICON} /> <div className="inline">{tag}</div>
  </div>
);
export default Tag;
