import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useParams, Link } from "react-router-dom";

import Tag from "../Tag";
import CardLayout from "../CardLayout";
import IssueAPI from "../../utils/api/apifetcher/issue";

import LoadingSpinner from "../LoadingSpinner";
import IssueActivity from "../IssueActivity";
import IssueActivityForm from "../IssueActivityForm";
import EditIssueForm from "../EditIssueForm";
import PopUp from "../PopUp";

import { red_alert } from "../../utils/configConst";
import "./style.scss";

import EDIT from "../../utils/image/pencil-edit-button.svg";
import OPEN_ICON from "../../utils/image/exclamation-mark.svg";
import IN_PROGRESS_ICON from "../../utils/image/in_progress.svg";
import READY_TO_TEST_ICON from "../../utils/image/ready_to_test.svg";
import RESOLVED_ICON from "../../utils/image/resolved.svg";
import WONT_FIX_ICON from "../../utils/image/wont_fix.svg";
import ABANDONED_ICON from "../../utils/image/abandon.svg";
import * as projectAction from "../../containers/ProjectDetail/actions";

import {
  STATE_OPTION,
  SEVERITY_OPTION,
  PRIORITY_OPTION,
  REPRODUCIBLE_OPTION
} from "../../utils/configConst";

const IssueDetail = ({ issue }) => {
  const dispatch = useDispatch();
  const { issueId } = useParams();
  const [issueDetail, setIssueDetail] = useState(null);
  const [fetchingError, setFetchingError] = useState(null);

  const [showEditIssue, setEditIssue] = useState(false);
  const [editErrorMsg, setErrorMsg] = useState(null);

  const { username } = useSelector(state => state.AuthReducer);
  const { projectDetail } = useSelector(state => state.ProjectDetailReducer);

  useEffect(() => {
    if (issueDetail != null) setIssueDetail(null);
    IssueAPI.getIssueByIssueId(issueId).then(
      res => {
        setIssueDetail(res.data);
        console.log("Here is the issue detail", res.data);
      },
      rej => {
        const { status } = rej.response;
        if (status === 404) setFetchingError(red_alert.NOT_FOUND);
        else setFetchingError(red_alert.TRY_AGAIN_LATER);
      }
    );
  }, [issueId]);

  const handleAddIssueActivity = query => {
    IssueAPI.addIssueActivity(query).then(
      res => {
        setIssueDetail(res.data);
        console.log("Here is the issue detail", res.data);
        if (projectDetail && projectDetail.id === issueDetail.projectId)
          projectAction.reset()(dispatch);
      },
      rej => {
        const { status } = rej.response;
        if (status === 404) setFetchingError(red_alert.NOT_FOUND);
        else setFetchingError(red_alert.TRY_AGAIN_LATER);
      }
    );
  };

  const handleEditSubmit = query => {
    IssueAPI.editIssue(query).then(
      res => {
        setIssueDetail(res.data);
        setEditIssue(false);
        setErrorMsg(null);
        console.log("Here is the issue detail", res.data);
      },
      rej => {
        setErrorMsg(red_alert.TRY_AGAIN_LATER);
      }
    );
  };

  const handleEditComment = (query, handleCancel) => {
    query.name = issueDetail.name;
    IssueAPI.editIssueActivity(query).then(
      res => {
        setIssueDetail(res.data);
        console.log("Here is the issue detail", res.data);
        handleCancel();
      },
      rej => {
        setFetchingError(red_alert.TRY_AGAIN_LATER);
      }
    );
  };

  const renderIssueDetail = () => {
    return (
      <CardLayout>
        <div className="issueDetail">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                className="projectCard_icon"
                src={(function() {
                  switch (STATE_OPTION[issueDetail.state]) {
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
              <div className="flex text-24 font-bold">{issueDetail.name}</div>
              <div className="ml-4">
                {issueDetail.tags.map(e => (
                  <Link
                    key={`issueCardtag${e}${issueDetail.id}`}
                    to={`/p/${issueDetail.projectOwner}/${issueDetail.projectName}?tab=tag&tag=${e}`}
                  >
                    <Tag tag={e} />
                  </Link>
                ))}
              </div>
            </div>
            {issueDetail.reportUser === username ? (
              <div
                className="main_btn btn-active flex"
                onClick={() => {
                  setEditIssue(!showEditIssue);
                }}
              >
                Edit Issue&nbsp;
                <img src={EDIT} className="invert flex" />
              </div>
            ) : null}
          </div>
          <div className=" ">
            <Link
              to={`/p/${issueDetail.projectOwner}/${issueDetail.projectName}`}
            >
              Project:{issueDetail.projectOwner}/{issueDetail.projectName}
            </Link>
          </div>
          <div className=" ">Reporter: {issueDetail.reportUser}</div>
          <div className=" ">
            {issueDetail.assignList.length === 0 ? (
              <p>Assign To: None</p>
            ) : (
              <p>
                Assign To:
                {issueDetail.assignList.map((e, i) => {
                  return `${e}${
                    i != issueDetail.assignList.length - 1 ? "," : ""
                  } `;
                })}
              </p>
            )}
          </div>
          <div className=" ">
            {issueDetail.mentionList.length === 0 ? (
              <p>Subscriber: None</p>
            ) : (
              <p>
                Subscriber:
                {issueDetail.mentionList.map((e, i) => {
                  return `${e}${
                    i != issueDetail.mentionList.length - 1 ? "," : ""
                  } `;
                })}
              </p>
            )}
          </div>

          <div className="hl" />
          <div>
            <div className="font-bold">Description</div>
            <br />
            <div
              dangerouslySetInnerHTML={{
                __html: issueDetail.description
              }}
            />
          </div>
          <div className="hl" />
          <div className="issueDetail_state">
            <div>
              Issue state: <b>{STATE_OPTION[issueDetail.state]}</b>
            </div>
            <div>
              Issue severity: <b>{SEVERITY_OPTION[issueDetail.severity]}</b>
            </div>
            <div>
              Issue priority: <b>{PRIORITY_OPTION[issueDetail.priority]}</b>
            </div>
            <div>
              Is reproducible:{" "}
              <b>{REPRODUCIBLE_OPTION[issueDetail.projectId]}</b>
            </div>
          </div>
        </div>
      </CardLayout>
    );
  };

  const renderIssueActivity = () => {
    const { activity } = issueDetail;
    return (
      <div className="issueDetail_activity ">
        {activity.map((activity, i) => (
          <IssueActivity
            key={`issue_activity${i}${activity.id}`}
            activity={activity}
            handleEditComment={handleEditComment}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="issueDetail_container w-full bg-gray-200">
      {fetchingError ? (
        fetchingError
      ) : issueDetail ? (
        <React.Fragment>
          {renderIssueDetail()}
          {renderIssueActivity()}
          <CardLayout>
            <IssueActivityForm
              issueDetail={issueDetail}
              handleSubmit={handleAddIssueActivity}
            />
          </CardLayout>
        </React.Fragment>
      ) : (
        <LoadingSpinner />
      )}
      {showEditIssue ? (
        <PopUp>
          <EditIssueForm
            issueDetail={issueDetail}
            errorMsg={editErrorMsg}
            handleSubmit={handleEditSubmit}
            handleCancel={() => {
              setErrorMsg(null);
              setEditIssue(false);
            }}
          />
        </PopUp>
      ) : null}
    </div>
  );
};

export default IssueDetail;
