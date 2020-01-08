package com.its.itsapi.model.request.project_req;

import java.sql.Timestamp;

public class GetProjectReq {
    public Timestamp timestamp;
    public int user_id;
    public int limit;
    public Boolean isOwner;
}