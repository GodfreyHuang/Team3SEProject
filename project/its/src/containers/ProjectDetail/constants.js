export const FETCH_PROJECT_DETAIL = "Project_DETAIL/FETCH_PROJECT_DETAIL";
export const FETCH_PROJECT_DETAIL_SUCCESS =
  "Project_DETAIL/FETCH_PROJECT_DETAIL_SUCCESS";
export const FETCH_PROJECT_DETAIL_FAIL =
  "Project_DETAIL/FETCH_PROJECT_DETAIL_FAIL";

export const TOGGLE_NEW_ISSUE_FORM = "Project_DETAIL/TOGGLE_NEW_ISSUE_FORM";
export const ADD_NEW_ISSUE = "Project_DETAIL/ADD_NEW_PROJECT";
export const ADD_NEW_ISSUE_SUCCESS = "Project_DETAIL/ADD_NEW_ISSUE_SUCCESS";
export const ADD_NEW_ISSUE_FAIL = "Project_DETAIL/ADD_NEW_ISSUE_FAIL";

export const FETCH_PROJECT_ISSUE = "Project_DETAIL/FETCH_PROJECT_ISSUE";
export const FETCH_PROJECT_ISSUE_SUCCESS =
  "Project_DETAIL/FETCH_PROJECT_ISSUE_SUCCESS";
export const FETCH_PROJECT_ISSUE_FAIL =
  "Project_DETAIL/FETCH_PROJECT_ISSUE_FAIL";
export const FETCH_PROJECT_ISSUE_BOTTOM =
  "Project_DETAIL/FETCH_PROJECT_ISSUE_BOTTOM";

export const FETCH_PROJECT_CLOSED_ISSUE =
  "Project_DETAIL/FETCH_PROJECT_CLOSED_ISSUE";
export const FETCH_PROJECT_CLOSED_ISSUE_SUCCESS =
  "Project_DETAIL/FETCH_PROJECT_CLOSED_ISSUE_SUCCESS";
export const FETCH_PROJECT_CLOSED_ISSUE_FAIL =
  "Project_DETAIL/FETCH_PROJECT_CLOSED_ISSUE_FAIL";
export const FETCH_PROJECT_CLOSED_ISSUE_BOTTOM =
  "Project_DETAIL/FETCH_PROJECT_CLOSED_ISSUE_BOTTOM";

export const FETCH_PROJECT_TAG = "Project_DETAIL/FETCH_PROJECT_TAG";
export const FETCH_PROJECT_TAG_SUCCESS =
  "Project_DETAIL/FETCH_PROJECT_TAG_SUCCESS";
export const FETCH_PROJECT_TAG_FAIL = "Project_DETAIL/FETCH_PROJECT_TAG_FAIL";

export const FETCH_PROJECT_MEMBER = "Project_DETAIL/FETCH_PROJECT_MEMBER";
export const FETCH_PROJECT_MEMBER_SUCCESS =
  "Project_DETAIL/FETCH_PROJECT_MEMBER_SUCCESS";
export const FETCH_PROJECT_MEMBER_FAIL =
  "Project_DETAIL/FETCH_PROJECT_MEMBER_FAIL";

export const ADD_PROJECT_MEMBER = "Project_DETAIL/ADD_PROJECT_MEMBER";
export const ADD_PROJECT_MEMBER_SUCCESS =
  "Project_DETAIL/ADD_PROJECT_MEMBER_SUCCESS";
export const ADD_PROJECT_MEMBER_FAIL = "Project_DETAIL/ADD_PROJECT_MEMBER_FAIL";
export const FETCH_PROJECT_MEMBER_BOTTOM =
  "Project_DETAIL/FETCH_PROJECT_MEMBER_BOTTOM";

export const UPDATE_PROJECT_DETAIL = "Project_DETAIL/UPDATE_PROJECT_DETAIL";
export const REMOVE_PROJECT_MEMBER = "Project_DETAIL/REMOVE_PROJECT_MEMBER";
export const UPDATE_PROJECT_MEMBER = "Project_DETAIL/UPDATE_PROJECT_MEMBER";

export const CONST = {
  projectName: " Project name : ",
  owner: "Project owner : ",
  description: "Description : ",
  createAT: " Create At : ",
  activeIssue: "Active Issue : ",
  closeIssue: "Closed Issue : ",
  memberCount: "Member : ",
  TagCount: "Tags : ",
  newIssue: "New Issue",
  issueTab_title: "Issue List",
  tagTab_title: "Tag List",
  memberTab_title: "Member List",
  addMember: "Add Member",
  searchMember: "searchMember",
  searchMember_placeholder: "Search by username/email",
  identity: "identity"
};

export const TAB = [
  { query: null, name: "Detail" },
  { query: "issue", name: "Issue" },
  { query: "tag", name: "Tag" },
  { query: "member", name: "Member" },
  { query: "report", name: "Report" }
];
