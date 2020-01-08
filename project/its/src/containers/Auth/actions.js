import { AUTH_SUCCESS, AUTH_LOGOUT } from "./constants";
import ProfileAPI from "../../utils/api/apifetcher/profile";

export const authSuccess = data => dispatch => {
  const payload = {
    ...data
  };
  if (data.sessionId) localStorage.setItem("sessionId", data.sessionId);
  if (data.profileId === 0 || data.profileId)
    localStorage.setItem("profileId", data.profileId);
  dispatch({ type: AUTH_SUCCESS, payload });
};

export const logout = () => dispatch => {
  localStorage.removeItem("sessionId");
  localStorage.removeItem("profileId");
  dispatch({ type: AUTH_LOGOUT });
};

export const updateProfile = (query, handleCancel) => dispatch => {
  ProfileAPI.updateUser(query).then(
    res => {
      dispatch({ type: AUTH_SUCCESS, payload: res.data });
      handleCancel();
    },
    rej => {}
  );
};
