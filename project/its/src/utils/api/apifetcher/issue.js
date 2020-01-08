import api from "../api";
import { apihost } from "../../configConst";

const IssueAPI = {};

IssueAPI.addNewIssue = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/issue?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "POST",
    data: query
  });
};

IssueAPI.editIssue = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/issue?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "PUT",
    data: query
  });
};

IssueAPI.getIssueByProjectId = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/issue/project?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "POST",
    data: query
  });
};

IssueAPI.getIssueByUserId = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/issue/get?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "POST",
    data: query
  });
};

IssueAPI.getIssueByIssueId = issueId => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/issue/get?issueId=${issueId}&sessionId=${localStorage.getItem(
    "sessionId"
  )}`;
  return api.fire({
    url,
    method: "GET"
  });
};

IssueAPI.addIssueActivity = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/issue/activity?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "POST",
    data: query
  });
};

IssueAPI.editIssueActivity = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/issue/activity?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "PUT",
    data: query
  });
};

export default IssueAPI;
