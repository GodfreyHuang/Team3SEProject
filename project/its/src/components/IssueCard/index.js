import React from "react";
import { Link } from "react-router-dom";
import { toLocalTime } from "../../utils/generalUtils";
import { ISSUE_DETAIL_LINK } from "../../utils/pathConst";
import Tag from "../Tag";
import OPEN_ICON from "../../utils/image/exclamation-mark.svg";
import IN_PROGRESS_ICON from "../../utils/image/in_progress.svg";
import READY_TO_TEST_ICON from "../../utils/image/ready_to_test.svg";
import RESOLVED_ICON from "../../utils/image/resolved.svg";
import WONT_FIX_ICON from "../../utils/image/wont_fix.svg";
import ABANDONED_ICON from "../../utils/image/abandon.svg";
import "./style.scss";
import {
  STATE_OPTION,
  SEVERITY_OPTION,
  PRIORITY_OPTION
} from "../../utils/configConst";

const IssueCard = ({ issue }) => {
  const {
    id,
    reportUser,
    create_time,
    description,
    isReproducible,
    name,
    priority,
    projectId,
    severity,
    state,
    tags,
    projectName,
    projectOwner
  } = issue;

  return (
    <Link to={ISSUE_DETAIL_LINK(id)}>
      <div className="IssueCard w-full">
        <div className="IssueCard_title text-20 flex justify-between mb-3">
          <div className="font-semibold text-20 flex justify-start items-center">
            <img
              className="projectCard_icon"
              src={(function() {
                switch (STATE_OPTION[state]) {
                  case "Open":
                    return OPEN_ICON;
                  case "In Progress":
                    return IN_PROGRESS_ICON;
                  case "Ready To Test":
                    return READY_TO_TEST_ICON;
                  case "Resolved":
                    return RESOLVED_ICON;
                  case "Won't fix":
                    return WONT_FIX_ICON;
                  case "Abandoned":
                    return ABANDONED_ICON;
                  default:
                    return null;
                }
              })()}
            />

            {name}
          </div>
          <div className="text-14 flex justify-end text-gray-800">
            {toLocalTime(create_time)}
          </div>
        </div>
        <div className="flex  ">
          <div
            className={`flex IssueCard_Tags_container bg-green-200 text-14 font-hairline ${
              STATE_OPTION[state] === "Open"
                ? "blue"
                : STATE_OPTION[state] === "In Progress"
                ? "yellow"
                : STATE_OPTION[state] === "Ready To Test"
                ? "green"
                : STATE_OPTION[state] === "Resolved"
                ? "red"
                : STATE_OPTION[state] === "Won't fix"
                ? "purple"
                : STATE_OPTION[state] === "Abandoned"
                ? "gray"
                : null
            }`}
          >
            {STATE_OPTION[state]}
          </div>
          <div
            className={`flex IssueCard_Tags_container bg-green-200 text-14 font-hairline ${
              SEVERITY_OPTION[priority] === "Wish List"
                ? "purple"
                : SEVERITY_OPTION[state] === "Low"
                ? "green"
                : SEVERITY_OPTION[state] === "Medium"
                ? "yellow"
                : SEVERITY_OPTION[state] === "High"
                ? "blue"
                : SEVERITY_OPTION[state] === "Unbreak Now"
                ? "red"
                : null
            }`}
          >
            {PRIORITY_OPTION[priority]}
          </div>
          <div
            className={`flex IssueCard_Tags_container bg-green-200 text-14 font-hairline ${
              PRIORITY_OPTION[severity] === "Critical"
                ? "red"
                : PRIORITY_OPTION[state] === "Major"
                ? "purple"
                : PRIORITY_OPTION[state] === "Moderate"
                ? "blue"
                : PRIORITY_OPTION[state] === "Minor"
                ? "green"
                : PRIORITY_OPTION[state] === "Low"
                ? "yellow"
                : null
            }`}
          >
            {SEVERITY_OPTION[severity]}
          </div>
        </div>
        <div>
          {tags.map(e => (
            <Link
              key={`issueCardtag${e}${id}`}
              to={`/p/${projectOwner}/${projectName}?tab=tag&tag=${e}`}
            >
              <Tag tag={e} />
            </Link>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default IssueCard;
