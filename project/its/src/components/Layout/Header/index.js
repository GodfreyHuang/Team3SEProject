import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AuthAPI from "../../../utils/api/apifetcher/auth";

import * as action from "../../../containers/Auth/actions";
import { RESET_DATA_FLOW } from "../../../containers/Auth/constants";
import * as PATH from "../../../utils/pathConst";
import logo from "../../../cover.png";

import USERICON from "../../../utils/image/user_icon.svg";

import "./header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { username, avatarUrl } = useSelector(state => state.AuthReducer);

  const handleLogout = () => {
    AuthAPI.logout();
    action.logout()(dispatch);
    dispatch({ type: RESET_DATA_FLOW });
  };

  return (
    <div className="header flex justify-between items-center border_custom sticky top-0 bg-white">
      <div className="w-1/5">
        <Link to={PATH.DASHBOARD}>
          <img src={logo} width="45%" />
        </Link>
      </div>
      <div className="header_link_container flex text-16 justify-end">
        <div className="header_link_user flex justify-center items-center bg-white hover:bg-gray-100 text-gray-800">
          <img
            src={avatarUrl || USERICON}
            className="w-1/12 header_user_icon"
          />
          <p className="header_link text-center ">{`${username}`}</p>
        </div>
        <div className="vl"></div>
        <div className="bg-white flex justify-center items-center hover:bg-gray-100 text-gray-800 py-2 px-4 border-l border-gray-400">
          <Link to={PATH.SETTING}>Setting</Link>
        </div>
        <Link to={PATH.LOGIN}>
          <div className="main_btn btn-active" onClick={handleLogout}>
            Logout
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
