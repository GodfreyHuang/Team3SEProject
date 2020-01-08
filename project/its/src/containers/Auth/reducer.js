import { AUTH_SUCCESS, AUTH_LOGOUT } from "./constants";

const initialState = {
  username: "",
  avatarUrl: null,
  lineId: null,
  isRevice: null
};

export default function reducer(state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...payload
      };
    case AUTH_LOGOUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
}
