import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, withRouter, Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

import AuthApi from "../../utils/api/apifetcher/auth";
import { RESET_DATA_FLOW } from "./constants";
import * as PATH from "../../utils/pathConst";
import * as actions from "./actions";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Auth = props => {
  const dispatch = useDispatch();
  const [authFail, setAuthFail] = useState(false);
  const [email, setEmail] = useState("");
  const key = useQuery().get("key");
  const id = useQuery().get("id");
  useEffect(() => {
    if (key && id) {
      AuthApi.unlock(key, id).then(
        res => {
          const { data } = res;
          actions.authSuccess(data)(dispatch);
          props.history.push("/dashboard");
        },
        rej => {
          setAuthFail(true);
        }
      );
    } else {
      setAuthFail(true);
    }
  }, []);

  const handleInput = e => {
    setEmail(e.target.value);
  };

  const handleSendEmail = () => {
    AuthApi.send(email);
    setEmail("");
  };

  const handleLogout = () => {
    AuthApi.logout();
    actions.logout()(dispatch);
    dispatch({ type: RESET_DATA_FLOW });
  };

  if (authFail)
    return (
      <div className="w-full h-screen flex justify-center items-center text-28 flex-col">
        Please verify your email !
        <input
          input="text"
          placeholder="Email"
          value={email}
          onChange={handleInput}
        />
        <div className="flex">
          <Link to={PATH.LOGIN}>
            <div className="main_btn btn-cancel mx-2" onClick={handleLogout}>
              Logout
            </div>
          </Link>
          <div className="main_btn btn-active mx-2" onClick={handleSendEmail}>
            Send again
          </div>
        </div>
      </div>
    );
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoadingSpinner />
    </div>
  );
};

export default withRouter(Auth);
