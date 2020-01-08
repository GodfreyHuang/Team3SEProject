import ProjectApi from "../../utils/api/apifetcher/project";
import IssueApi from "../../utils/api/apifetcher/issue";

import {
  FETCH_PROJECT_DETAIL,
  FETCH_PROJECT_DETAIL_SUCCESS,
  FETCH_PROJECT_DETAIL_FAIL,
  TOGGLE_NEW_ISSUE_FORM,
  ADD_NEW_ISSUE,
  ADD_NEW_ISSUE_SUCCESS,
  ADD_NEW_ISSUE_FAIL,
  FETCH_PROJECT_ISSUE,
  FETCH_PROJECT_ISSUE_SUCCESS,
  FETCH_PROJECT_ISSUE_FAIL,
  FETCH_PROJECT_ISSUE_BOTTOM,
  FETCH_PROJECT_TAG,
  FETCH_PROJECT_TAG_SUCCESS,
  FETCH_PROJECT_TAG_FAIL,
  ADD_PROJECT_MEMBER,
  ADD_PROJECT_MEMBER_SUCCESS,
  ADD_PROJECT_MEMBER_FAIL,
  FETCH_PROJECT_MEMBER,
  FETCH_PROJECT_MEMBER_SUCCESS,
  FETCH_PROJECT_MEMBER_FAIL,
  FETCH_PROJECT_MEMBER_BOTTOM,
  UPDATE_PROJECT_DETAIL,
  REMOVE_PROJECT_MEMBER,
  UPDATE_PROJECT_MEMBER,
  FETCH_PROJECT_CLOSED_ISSUE,
  FETCH_PROJECT_CLOSED_ISSUE_SUCCESS,
  FETCH_PROJECT_CLOSED_ISSUE_FAIL,
  FETCH_PROJECT_CLOSED_ISSUE_BOTTOM
} from "./constants";

import { RESET_DATA_FLOW } from "../Auth/constants";

import {
  red_alert,
  FETCH_ISSUE_LIMIT,
  FETCH_MEMBER_LIMIT
} from "../../utils/configConst";

export const fetchProjectDetail = (user, project) => dispatch => {
  dispatch({ type: FETCH_PROJECT_DETAIL });
  ProjectApi.getProjectDetail({ user, project }).then(
    res => {
      dispatch({ type: FETCH_PROJECT_DETAIL_SUCCESS, payload: res.data });
      console.log("Here is the project detail", res.data);
    },
    rej => {
      const { response } = rej;
      const { status } = response;
      const errMsg =
        status === 404 ? red_alert.NOT_FOUND : red_alert.TRY_AGAIN_LATHER;
      dispatch({ type: FETCH_PROJECT_DETAIL_FAIL, payload: errMsg });
    }
  );
};

export const toogleNewIssueForm = () => dispatch => {
  dispatch({ type: TOGGLE_NEW_ISSUE_FORM });
};

export const addNewIssue = query => dispatch => {
  dispatch({ type: ADD_NEW_ISSUE });
  IssueApi.addNewIssue(query).then(
    res => {
      dispatch({ type: ADD_NEW_ISSUE_SUCCESS, payload: res.data });
      fetchProjectTag(query.projectId)(dispatch);
    },
    rej => {
      dispatch({
        type: ADD_NEW_ISSUE_FAIL,
        payload: red_alert.TRY_AGAIN_LATER
      });
    }
  );
};

export const fetchProjectIssue = (
  projectId,
  timeStamp,
  closed = false
) => dispatch => {
  dispatch({ type: closed ? FETCH_PROJECT_CLOSED_ISSUE : FETCH_PROJECT_ISSUE });
  const query = {
    timestamp: timeStamp,
    projectId: projectId,
    limit: FETCH_ISSUE_LIMIT,
    closed
  };
  IssueApi.getIssueByProjectId(query).then(
    res => {
      if (res.data.length < FETCH_ISSUE_LIMIT)
        dispatch({
          type: closed
            ? FETCH_PROJECT_CLOSED_ISSUE_BOTTOM
            : FETCH_PROJECT_ISSUE_BOTTOM,
          payload: res.data
        });
      else
        dispatch({
          type: closed
            ? FETCH_PROJECT_CLOSED_ISSUE_SUCCESS
            : FETCH_PROJECT_ISSUE_SUCCESS,
          payload: res.data
        });
    },
    () => {
      dispatch({
        type: closed
          ? FETCH_PROJECT_CLOSED_ISSUE_FAIL
          : FETCH_PROJECT_ISSUE_FAIL,
        payload: red_alert.TRY_AGAIN_LATER
      });
    }
  );
};

export const fetchProjectTag = projectId => dispatch => {
  dispatch({ type: FETCH_PROJECT_TAG });
  const query = {
    projectId
  };
  ProjectApi.getProjectTags(query).then(
    res => {
      dispatch({
        type: FETCH_PROJECT_TAG_SUCCESS,
        payload: res.data
      });
    },
    rej => {
      dispatch({
        type: FETCH_PROJECT_TAG_FAIL,
        payload: red_alert.TRY_AGAIN_LATER
      });
    }
  );
};

export const addProjectMember = (
  projectId,
  username,
  identity,
  setInput
) => dispatch => {
  dispatch({ type: ADD_PROJECT_MEMBER });
  const query = {
    projectId,
    username,
    identity
  };
  ProjectApi.addProjectMember(query).then(
    res => {
      dispatch({
        type: ADD_PROJECT_MEMBER_SUCCESS,
        payload: res.data
      });
      setInput("");
    },
    rej => {
      const { response } = rej;
      const { status } = response;
      let errMsg = red_alert.TRY_AGAIN_LATER;
      if (status === 403) {
        errMsg = red_alert.PERMISSION_DEIED;
      } else if (status === 404) errMsg = red_alert.USER_NOT_FOUND;
      else if (status === 409) errMsg = red_alert.USER_ALREADY_JOIN;
      dispatch({ type: ADD_PROJECT_MEMBER_FAIL, payload: errMsg });
    }
  );
};

export const fetchProjectMember = (projectId, timeStamp) => dispatch => {
  dispatch({ type: FETCH_PROJECT_MEMBER });
  const query = {
    timestamp: timeStamp,
    projectId: projectId,
    limit: FETCH_MEMBER_LIMIT
  };
  ProjectApi.getProjectMember(query).then(
    res => {
      console.log("here is the project member", res.data);
      if (res.data.length < FETCH_MEMBER_LIMIT)
        dispatch({
          type: FETCH_PROJECT_MEMBER_BOTTOM,
          payload: res.data
        });
      else
        dispatch({
          type: FETCH_PROJECT_MEMBER_SUCCESS,
          payload: res.data
        });
    },
    rej => {
      dispatch({
        type: FETCH_PROJECT_MEMBER_FAIL,
        payload: red_alert.TRY_AGAIN_LATER
      });
    }
  );
};

export const updateProjectDetail = projectDetail => dispatch => {
  dispatch({
    type: UPDATE_PROJECT_DETAIL,
    payload: projectDetail
  });
};

export const removeProjecctMember = userId => dispatch => {
  dispatch({
    type: REMOVE_PROJECT_MEMBER,
    payload: userId
  });
};

export const updateProjectMember = (userId, identity) => dispatch => {
  dispatch({
    type: UPDATE_PROJECT_MEMBER,
    payload: { userId, identity }
  });
};

export const reset = () => dispatch => {
  dispatch({ type: RESET_DATA_FLOW });
};
