package com.its.itsapi.model.request.project_req;

import java.sql.Timestamp;

public class GetProjectMemberReq {
    public Timestamp timestamp;
    public int projectId;
    public int limit;
}