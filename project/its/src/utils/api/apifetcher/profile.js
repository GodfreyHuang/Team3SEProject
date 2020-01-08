import api from "../api";
import { apihost } from "../../configConst";

const ProfileAPI = {};

ProfileAPI.getMyProfile = () => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/profile/me?sessionId=${localStorage.getItem(
    "sessionId"
  )}&profileId=${localStorage.getItem("profileId")}`;
  return api.fire({
    url,
    method: "GET"
  });
};

ProfileAPI.getProfileById = profileId => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/profile?profileId=${profileId}`;
  return api.fire({
    url,
    method: "GET"
  });
};

ProfileAPI.updateUser = query => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/profile/update?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "PUT",
    data: query
  });
};

ProfileAPI.checkOldPassword = password => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/profile/checkpassword?sessionId=${localStorage.getItem("sessionId")}`;
  return api.fire({
    url,
    method: "POST",
    data: password
  });
};

ProfileAPI.searchLikeUsername = username => {
  const url = `${
    apihost[process.env.REACT_APP_ENV]
  }/profile/username?username=${username}&sessionId=${localStorage.getItem(
    "sessionId"
  )}`;
  return api.fire({
    url,
    method: "GET"
  });
};

export default ProfileAPI;
