import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";

import IssueCard from "../../../components/IssueCard";
import LoadingSpinner from "../../../components/LoadingSpinner";
import IssueApi from "../../../utils/api/apifetcher/issue";
import Tag from "../../../components/Tag";

import { CONST } from "../constants";
import { HIT_BOTTOM } from "../../../utils/configConst";
import * as actions from "../actions";
import "./style.scss";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TagTab = ({}) => {
  const dispatch = useDispatch();
  const { projectDetail, projectTagList, isFetchingProjectTag } = useSelector(
    state => state.ProjectDetailReducer
  );
  const [issueList, setIssueList] = useState(null);

  const tag = useQuery().get("tag");
  const { user, project } = useParams();

  useEffect(() => {
    actions.fetchProjectTag(projectDetail.id)(dispatch);
  }, []);

  useEffect(() => {
    if (tag === null) {
      setIssueList(null);
    } else {
      IssueApi.getIssueByProjectId({
        projectId: projectDetail.id,
        tag
      }).then(res => {
        setIssueList(res.data);
      });
    }
  }, [tag]);

  const renderTagIssueList = () => {
    return (
      <div>
        <div className="flex">
          <Link to={`/p/${user}/${project}?tab=tag`}>
            <div
              key={`TagTab_Tag_back`}
              className="Tags_container bg-green-200 cursor-pointer hover:bg-green-100"
            >
              {"<- Show all tag"}
            </div>
          </Link>
          <Link to={`/p/${user}/${project}?tab=tag&tag=${tag}`}>
            <Tag tag={tag} />
          </Link>
        </div>
        <div>
          {issueList == null ? (
            <LoadingSpinner />
          ) : (
            <>
              {issueList.map((e, i) => {
                return (
                  <div key={`projectDetailTag_issueList${i}${e.id}`}>
                    <IssueCard key={`pit${e.id}`} issue={e} />
                  </div>
                );
              })}
              {HIT_BOTTOM}
            </>
          )}
        </div>
      </div>
    );
  };

  const renderTagList = () => {
    return (
      <div>
        {projectTagList.map(e => (
          <Link
            to={`/p/${user}/${project}?tab=tag&tag=${e}`}
            key={`TagTab_Tag${e}`}
          >
            <Tag tag={e} />
          </Link>
        ))}
        {isFetchingProjectTag ? <LoadingSpinner /> : null}
      </div>
    );
  };

  return (
    <div className="TagTab_container w-full">
      <div className="TagTab_title text-20 font-semibold">
        {CONST.tagTab_title}
      </div>
      <div className="TagTab_Tags text-12 ">
        {tag ? renderTagIssueList() : renderTagList()}
      </div>
    </div>
  );
};

export default TagTab;
