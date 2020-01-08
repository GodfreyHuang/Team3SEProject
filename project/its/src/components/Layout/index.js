import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import ProfileAPI from "../../utils/api/apifetcher/profile";
import * as PATH from "../../utils/pathConst";
import * as actions from "../../containers/Auth/actions";

import Header from "./Header";
import NavSideBar from "./NavSideBar";

const Layout = ({ history, children, location }) => {
  const { pathname } = location;
  const dispatch = useDispatch();

  const isLogined =
    pathname !== PATH.LOGIN &&
    pathname !== PATH.REGISTER &&
    pathname !== PATH.AUTH &&
    pathname !== "" &&
    pathname !== "/";
  console.log(pathname, isLogined);
  useEffect(() => {
    if (isLogined) {
      if (!localStorage.getItem("sessionId")) {
        actions.logout()(dispatch);
        history.push("/login");
        return;
      }
      ProfileAPI.getMyProfile().then(
        res => {
          actions.authSuccess(res.data)(dispatch);
        },
        rej => {
          if (rej.response) {
            if (rej.response.status === 403) {
              history.push("/auth");
              return;
            }
          }
          actions.logout()(dispatch);
          history.push("/login");
          return;
        }
      );
    } else {
      if (localStorage.getItem("sessionId") && pathname !== PATH.AUTH) {
        history.push("/dashboard");
        return;
      }
    }
  }, [pathname]);
  return (
    <div className="layout min-h-screen flex flex-col">
      {isLogined ? (
        <React.Fragment>
          <Header />
          <div className="flex flex-grow">
            <NavSideBar />
            {children}
          </div>
        </React.Fragment>
      ) : (
        children
      )}
    </div>
  );
};

export default withRouter(Layout);
