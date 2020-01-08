import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_BOTTOM,
  ADD_NEW_PROJECT_SUCCESS,
  ADD_NEW_PROJECT_FAIL,
  ADD_NEW_PROJECT,
  TOGGLE_NEW_PROJECT_FORM
} from "./constants";

import { RESET_DATA_FLOW } from "../Auth/constants";

const initialState = {
  projectList: [],
  isFetchingProject: false,
  isProjectFetchBottom: false,
  projectTimestamp: null,

  showNewProjectForm: false,
  newProjectErrorMsg: null,
  isAddingProject: false
};

export default function reducer(state = initialState, actions) {
  const { type, payload } = actions;
  const { projectList } = state;
  switch (type) {
    case FETCH_PROJECTS:
      return { ...state, isFetchingProject: true };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projectList: state.projectTimestamp
          ? state.projectList.concat(payload)
          : payload,
        projectTimestamp: payload[payload.length - 1].create_time,
        isFetchingProject: false
      };
    case FETCH_PROJECTS_BOTTOM:
      return {
        ...state,
        isProjectFetchBottom: true,
        isFetchingProject: false,
        projectTimestamp: payload.length
          ? payload[payload.length - 1].create_time
          : null,
        projectList: state.projectTimestamp
          ? state.projectList.concat(payload)
          : payload
      };
    case TOGGLE_NEW_PROJECT_FORM:
      return {
        ...state,
        showNewProjectForm: !state.showNewProjectForm,
        newProjectErrorMsg: null
      };
    case ADD_NEW_PROJECT:
      return { ...state, isAddingProject: true };
    case ADD_NEW_PROJECT_SUCCESS:
      return {
        ...state,
        isAddingProject: false,
        showNewProjectForm: false,
        projectList: [payload].concat(projectList)
      };
    case ADD_NEW_PROJECT_FAIL:
      return { ...state, isAddingProject: false, newProjectErrorMsg: payload };
    case RESET_DATA_FLOW:
      return initialState;
    default:
      return state;
  }
}
