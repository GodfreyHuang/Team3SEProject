import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout";
import AddButton from "../../components/AddButton";
import LoadingSpinner from "../../components/LoadingSpinner";
import IssueForm from "../../components/IssueForm";
import PopUp from "../../components/PopUp";
import CardLayout from "../../components/CardLayout";

import DetailTab from "./DetailTab";
import IssueTab from "./IssueTab";
import TagTab from "./TagTab";
import MemberTab from "./MemberTab";
import ReportTab from "./ReportTab";

import PRIVATE_ICON from "../../utils/image/locked_project.svg";
import PUBLIC_ICON from "../../utils/image/project.svg";
import PROFILE_IMAGE from "../../utils/image/user_icon.svg";

import { PROJECT_DETIAL_LINK } from "../../utils/pathConst";
import { toLocalTime } from "../../utils/generalUtils";
import { CONST, TAB } from "./constants";

import * as actions from "./actions";

import "./style.scss";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProjectDetail = () => {
  const { user, project } = useParams();
  const tab = useQuery().get("tab");
  const dispatch = useDispatch();
  const {
    isFetchingProjectDetail,
    projectDetail,
    showNewIssueForm,
    newIssueErrorMsg,
    isAddingIssue,
    fetchProjectDetailError
  } = useSelector(state => state.ProjectDetailReducer);
  let loadedProfile = projectDetail !== null;
  useEffect(() => {
    if (
      projectDetail &&
      user === projectDetail.owner &&
      project === projectDetail.name
    ) {
      loadedProfile = false;
      return;
    }
    actions.fetchProjectDetail(user, project)(dispatch);
  }, [user, project]);

  const toggleNewIssueForm = () => {
    actions.toogleNewIssueForm()(dispatch);
  };

  const handleSubmit = query => {
    query.projectId = projectDetail.id;
    actions.addNewIssue(query)(dispatch);
  };

  const renderProjectHeader = () => {
    return (
      <div className="max-w-sm w-full max-w-full flex">
        <div className="w-full border-r border-b border-l border-gray-400 border-t border-gray-400 bg-white rounded rounded-b-none rounded-lg border-solid border-gray-100 p-8 flex flex-col justify-between leading-normal">
          <div className="mb-4">
            <div className="projectDetail_header flex justify-between flex-row items-center">
              <div className="projectDetail_title text-20 font-semibold flex">
                {CONST.projectName}
                {project}
              </div>
              <AddButton action={toggleNewIssueForm} wording={CONST.newIssue} />
            </div>
            {projectDetail ? (
              <div className="flex items-center">
                <div className="text-lg ">
                  <div className="projectDetail_icon flex items-center text-18 ">
                    <img src={projectDetail.ownerAvatarUrl || PROFILE_IMAGE} />
                    <p className="text-gray-900 leading-none">
                      {projectDetail.owner}
                    </p>
                  </div>
                  <p className="text-gray-600">
                    {toLocalTime(projectDetail.create_time)}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  const getTabCount = name => {
    switch (name) {
      case TAB[1].name:
        return `(${projectDetail.issue_count})`;
      case TAB[2].name:
        return `(${projectDetail.tag_count})`;
      case TAB[3].name:
        return `(${projectDetail.member_count})`;
      default:
        return "";
    }
  };
  const renderProjectTab = () => {
    return (
      <div className="projectDetail_tab_container flex justify-between flex-row items-center text-18 text-center">
        {TAB.map((e, i) => {
          if (i == 4 && projectDetail.identity >= 2) return null;
          return (
            <Link
              to={`/p/${user}/${project}${e.query ? `?tab=${e.query}` : ""}`}
              className={`projectDetail_tab flex-grow${
                tab === e.query ? " bg-main text-white" : ""
              }`}
              key={`pd_tab${e.name}`}
            >
              <div>
                {e.name}
                {projectDetail ? getTabCount(e.name) : ""}
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  const renderMainContent = () => {
    switch (tab) {
      case TAB[1].query:
        return <IssueTab />;
      case TAB[2].query:
        return <TagTab />;
      case TAB[3].query:
        return <MemberTab />;
      case TAB[4].query:
        if (projectDetail.identity < 2)
          return <ReportTab projectDetail={projectDetail} />;
      default:
        return <DetailTab projectDetail={projectDetail} />;
    }
  };
  return (
    <>
      <div className="projectDetail w-full bg-gray-200">
        {fetchProjectDetailError ? (
          fetchProjectDetailError
        ) : (
          <>
            {renderProjectHeader()}

            {isFetchingProjectDetail || !loadedProfile ? (
              <LoadingSpinner />
            ) : (
              <>
                {renderProjectTab()}
                <CardLayout>{renderMainContent()}</CardLayout>
              </>
            )}
          </>
        )}
      </div>
      {showNewIssueForm ? (
        <PopUp>
          <IssueForm
            handleCancel={isAddingIssue ? null : toggleNewIssueForm}
            handleSubmit={handleSubmit}
            errorMsg={newIssueErrorMsg}
          />
        </PopUp>
      ) : null}
    </>
  );
};

export default ProjectDetail;
