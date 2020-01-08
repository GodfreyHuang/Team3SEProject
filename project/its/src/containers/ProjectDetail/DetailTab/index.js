import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CONST } from "../constants";
import { toLocalTime } from "../../../utils/generalUtils";
import ProjectForm from "../../../components/ProjectForm";
import PopUp from "../../../components/PopUp";
import { red_alert } from "../../../utils/configConst";
import ProjectApi from "../../../utils/api/apifetcher/project";

import * as actions from "../actions";

const DetailTab = ({ projectDetail }) => {
  const dispatch = useDispatch();
  const {
    create_time,
    description,
    finish_issue_count,
    isPrivate,
    issue_count,
    member_count,
    name,
    owner,
    tag_count
  } = projectDetail;
  const [isShowEdit, setShowEdit] = useState(false);
  const [submitErrorMsg, setErrorMsg] = useState(null);

  const handleSubmit = query => {
    query.id = projectDetail.id;
    ProjectApi.editProject(query).then(
      res => {
        setShowEdit(false);
        setErrorMsg("");
        actions.updateProjectDetail(res.data)(dispatch);
      },
      () => {
        setErrorMsg(red_alert.TRY_AGAIN_LATER);
      }
    );
  };
  return (
    <>
      <div className="projectDetail_title flex justify-between text-20 font-semibold">
        <div>Project Detail</div>
        {projectDetail.identity <= 1 ? (
          <div>
            <div
              className="main_btn btn-active"
              onClick={() => {
                setShowEdit(!isShowEdit);
              }}
            >
              Edit project
            </div>
          </div>
        ) : null}
      </div>
      <div className="projectDetail_subtitle text-18 font-semibold">
        {CONST.description}
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="projectDetail_subtitle text-18 font-semibold flex">
        {CONST.activeIssue}
        {issue_count}
      </div>
      <div className="projectDetail_subtitle text-18 font-semibold flex">
        {CONST.closeIssue}
        {finish_issue_count}
      </div>
      {isShowEdit ? (
        <PopUp>
          <ProjectForm
            handleCancel={() => {
              setShowEdit(false);
              setErrorMsg("");
            }}
            handleSubmit={handleSubmit}
            errorMsg={submitErrorMsg}
            projectDetail={projectDetail}
          />
        </PopUp>
      ) : null}
    </>
  );
};

export default DetailTab;
