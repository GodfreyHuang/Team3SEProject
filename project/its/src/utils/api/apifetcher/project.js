import api from "../api";
import { apihost } from "../../configConst";

const ProjectApi = {};

ProjectApi.addNewProject = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/project?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "POST",
    data: query
  });
};

ProjectApi.editProject = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/project?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "PUT",
    data: query
  });
};

ProjectApi.getProject = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/project/get?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "POST",
    data: query
  });
};

ProjectApi.getProjectDetail = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/project/detail?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "POST",
    data: query
  });
};

ProjectApi.getProjectTags = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/project/tags?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "POST",
    data: query
  });
};

ProjectApi.addProjectMember = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/project/member?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "POST",
    data: query
  });
};

ProjectApi.removeProjectMember = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/project/member?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "DELETE",
    data: query
  });
};

ProjectApi.updateProjectMember = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/project/member?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "PUT",
    data: query
  });
};

ProjectApi.getProjectMember = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/project/getMember?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "POST",
    data: query
  });
};

ProjectApi.getProjectReport = query => {
  const url = `${apihost[process.env.REACT_APP_ENV]}/project/report?projectId=${
    query.projectId
  }&day=${query.day}&priority=${query.priority}&closed=${
    query.closed ? "true" : "false"
  }&sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "GET"
  });
};

export default ProjectApi;
