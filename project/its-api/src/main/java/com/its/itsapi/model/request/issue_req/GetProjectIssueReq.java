package com.its.itsapi.model.request.issue_req;

import java.sql.Timestamp;

public class GetProjectIssueReq {
    public int projectId;
    public Timestamp timestamp;
    public int limit;
    public Boolean closed;
    public String tag;
}