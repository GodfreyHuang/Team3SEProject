import {
  FETCH_ISSUE,
  FETCH_ISSUE_SUCCESS,
  FETCH_ISSUE_BOTTOM,
} from "./constants";
import IssueApi from "../../utils/api/apifetcher/issue";
import { red_alert, FETCH_ISSUE_LIMIT } from "../../utils/configConst";

export const fetchIssue = issueTimestamp => dispatch => {
  dispatch({ type: FETCH_ISSUE });
  const query = {
    timestamp: issueTimestamp,
    user_id: localStorage.getItem("profileId"),
    limit: FETCH_ISSUE_LIMIT,
    isOwner: false
  };
  IssueApi.getIssueByUserId(query).then(
    res => {
      const { data } = res;
      if (data.length < FETCH_ISSUE_LIMIT)
        dispatch({ type: FETCH_ISSUE_BOTTOM, payload: data });
      else dispatch({ type: FETCH_ISSUE_SUCCESS, payload: data });
    },
    rej => {
      console.log(rej);
    }
  );
};
