import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_BOTTOM,
  ADD_NEW_PROJECT,
  ADD_NEW_PROJECT_SUCCESS,
  ADD_NEW_PROJECT_FAIL,
  TOGGLE_NEW_PROJECT_FORM
} from "./constants";

import ProjectApi from "../../utils/api/apifetcher/project";
import { red_alert, FETCH_PROJECT_LIMIT } from "../../utils/configConst";

export const addNewProject = query => dispatch => {
  dispatch({ type: ADD_NEW_PROJECT });
  ProjectApi.addNewProject(query).then(
    res => {
      dispatch({ type: ADD_NEW_PROJECT_SUCCESS, payload: res.data });
    },
    rej => {
      const { response } = rej;
      const { status } = response;
      const errMsg =
        status === 409
          ? red_alert.PROJECT_NAME_REPEATED
          : red_alert.TRY_AGAIN_LATER;

      dispatch({ type: ADD_NEW_PROJECT_FAIL, payload: errMsg });
    }
  );
};

export const fetchProjects = projectTimestamp => dispatch => {
  dispatch({ type: FETCH_PROJECTS });
  const query = {
    timestamp: projectTimestamp,
    user_id: localStorage.getItem("profileId"),
    limit: FETCH_PROJECT_LIMIT,
    isOwner: false
  };
  ProjectApi.getProject(query).then(
    res => {
      const { data } = res;
      if (data.length < FETCH_PROJECT_LIMIT)
        dispatch({ type: FETCH_PROJECTS_BOTTOM, payload: data });
      else dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: data });
    },
    rej => {
      console.log(rej);
    }
  );
};

export const toggleNewProjectForm = () => dispatch => {
  dispatch({ type: TOGGLE_NEW_PROJECT_FORM });
};
