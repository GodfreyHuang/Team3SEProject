import api from "../api";
import { apihost } from "../../configConst";

const AuthAPI = {};

AuthAPI.register = query => {
  const url = `${apihost[process.env.REACT_APP_ENV]}/session`;
  return api.fire({
    url,
    method: "POST",
    data: query
  });
};

AuthAPI.login = query => {
  const url = `${apihost[process.env.REACT_APP_ENV]}/session/login`;
  return api.fire({
    url,
    method: "POST",
    data: query
  });
};

AuthAPI.logout = () => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/session/logout?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "DELETE"
  });
};

AuthAPI.verifyEmail = email => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/session/verify/email?email=${email}`;
  return api.fire({
    url,
    method: "GET"
  });
};

AuthAPI.verifyUsername = username => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/session/verify/username?username=${username}`;
  return api.fire({
    url,
    method: "GET"
  });
};

AuthAPI.unlock = (key, id) => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/session/verify?key=${key}&id=${id}`;
  return api.fire({
    url,
    method: "GET"
  });
};
AuthAPI.send = email => {
  const url = `${apihost[process.env.REACT_APP_ENV]}/send?email=${email}`;
  return api.fire({
    url,
    method: "GET"
  });
};

export default AuthAPI;
