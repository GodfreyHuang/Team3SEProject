import React, { useState } from "react";

import FormInput from "../FormInput";
import CardLayout from "../CardLayout";
import { toLocalTime } from "../../utils/generalUtils";
import PROFILE_IMAGE from "../../utils/image/user_icon.svg";
import LIGHT from "../../utils/image/light_bulb.svg";
import ADD_MEMBER from "../../utils/image/add_member.svg";
import EDIT from "../../utils/image/pencil-edit-button.svg";
import COMMENT from "../../utils/image/comment.svg";
import MARK from "../../utils/image/mark.svg";
import {
  STATE_OPTION,
  SEVERITY_OPTION,
  PRIORITY_OPTION,
  inputType
} from "../../utils/configConst";
import "./style.scss";
import FormFooterBtn from "../FormFooterBtn";

const IssueActivity = ({ activity, handleEditComment }) => {
  const [showEditComment, setEditComment] = useState(false);
  const [mentionList, setMentionList] = useState([]);
  const [comment, setComment] = useState(activity.content);
  const type = ["state", "severity", "priority", "Reproducible"];
  const typeValue = [
    STATE_OPTION,
    SEVERITY_OPTION,
    PRIORITY_OPTION,
    ["Yes", "No"]
  ];

  if (activity.type === 0) {
    const getMentionList = value => {
      const doc = document.createElement("div");
      doc.innerHTML = value;
      const mentionDomList = doc.getElementsByClassName("mention");
      return Array.from(mentionDomList).map(e => {
        return e.dataset.value;
      });
    };
    const handleCancel = () => {
      setComment(activity.content);
      setMentionList([]);
      setEditComment(false);
    };
    const handleSubmit = () => {
      handleEditComment(
        {
          comment,
          mentionList,
          activityId: activity.id,
          issueId: activity.issueId
        },
        handleCancel
      );
    };
    const handleEditorInput = value => {
      setComment(value === "<p><br></p>" ? "" : value);
      const oldMentionList = getMentionList(activity.content);
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
        value: comment,
        handleInput: handleEditorInput,
        inputType: inputType.editor
      }
    ];
    console.log(activity.content);
    return (
      <>
        <div className="issueActivity text-16 pl-3 flex items-center">
          <div className="issueActivity_profileIcon flex  ">
            <img src={activity.avatarUrl || PROFILE_IMAGE} className="" />
          </div>
          <div className="hll"></div>
          <CardLayout>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="issueActivity_statusIcon ">
                  <img src={COMMENT} className="front comment_icon flex" />
                </div>
                <span className="font-bold">{activity.username}</span>
                &nbsp;added a comment&nbsp;
                <div className="text-14 text-gray-800">
                  ({`${toLocalTime(activity.create_time)}`})
                </div>
              </div>
              {!showEditComment &&
              activity.userId ===
                parseInt(localStorage.getItem("profileId")) ? (
                <div
                  className="main_btn btn-active flex justify-end items-center"
                  onClick={() => {
                    setEditComment(true);
                  }}
                >
                  Edit&nbsp;
                  <img src={EDIT} className="flex w-4 invert items-center" />
                </div>
              ) : null}
            </div>
            <div className="issueActivity_hl"></div>
            {showEditComment ? (
              <>
                <FormInput inputList={inputList} />
                <FormFooterBtn
                  handleLeftOption={handleCancel}
                  handleRightOption={handleSubmit}
                  rightOption={comment ? "Save" : "Delete"}
                  isActive={true}
                />
              </>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: activity.content
                }}
              />
            )}
          </CardLayout>
        </div>
        <div className="mb-1"></div>
      </>
    );
  }
  if (activity.type === 5) {
    return (
      <div className="issueActivity text-16 pl-10 flex items-center">
        <div className="issueActivity_profileIcon flex  ">
          <img src={activity.avatarUrl || PROFILE_IMAGE} className="" />
        </div>
        <div className="hll"></div>
        <div className="vll"></div>
        <div className="issueActivity_statusIcon flex  ">
          <img src={ADD_MEMBER} className="front add_member_icon" />
        </div>
        <div className="flex pl-5 ">
          <div className="flex justify-end">
            <span className="font-bold">{activity.username}</span>
            &nbsp;assigned:&nbsp;
            {activity.assignList.map((e, i) => {
              return e.isAdd ? (
                <div key={`issueActivity_assign${e}_${i}`}>
                  <span className="flex ">
                    <span className="font-bold mr-2">{e.username}</span>
                    <div className="text-14 text-gray-800">
                      ({`${toLocalTime(activity.create_time)}`})
                    </div>
                  </span>
                </div>
              ) : (
                <div key={`issueActivity_assign${e}_${i}`} className="flex">
                  <span className="font-bold mr-2 line-through">
                    {e.username}
                  </span>
                  <div className="text-14 text-gray-800">
                    ({`${toLocalTime(activity.create_time)}`})
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  console.log(activity);
  if (activity.prevState === -1) {
    return (
      <div className="issueActivity text-16 pl-10 flex items-center">
        <div className="issueActivity_profileIcon flex  ">
          <img src={activity.avatarUrl || PROFILE_IMAGE} className="" />
        </div>
        <div className="hll"></div>
        <div className="vll"></div>
        <div className="issueActivity_statusIcon flex ">
          <img src={LIGHT} className="front open_icon" />
        </div>
        <div className="flex pl-5 justify-between ">
          <div className="flex justify-start">
            <span className="font-bold">{activity.username}&nbsp;</span>
            created this issue with {type[activity.type - 1]}&nbsp;
            <b>{typeValue[activity.type - 1][activity.nextState]} </b>
          </div>
          &nbsp;
          <div className="text-14 text-gray-800">
            ({`${toLocalTime(activity.create_time)}`})
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="issueActivity text-16 pl-10 flex items-center">
      <div className="issueActivity_profileIcon flex  ">
        <img src={activity.avatarUrl || PROFILE_IMAGE} className="" />
      </div>
      <div className="hll"></div>
      <div className="vll"></div>
      <div className="issueActivity_statusIcon flex  ">
        <img src={MARK} className="front mark_icon" />
      </div>
      <div className="flex pl-5 ">
        <span className="font-bold">{activity.username}</span>
        &nbsp;changed {type[activity.type - 1]} from&nbsp;
        <b>{typeValue[activity.type - 1][activity.prevState]}</b> &nbsp;to&nbsp;
        <b>{typeValue[activity.type - 1][activity.nextState]}</b>
        &nbsp;
        <div className="text-14 text-gray-800">
          ({`${toLocalTime(activity.create_time)}`})
        </div>
      </div>
    </div>
  );
};

export default IssueActivity;
