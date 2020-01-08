package com.its.itsapi.model.response.issue_res;

import com.its.itsapi.model.response.issue_res.AssignRes;

import java.sql.Timestamp;
import java.util.ArrayList;

public class IssueActivityRes {
    public int id;
    public int type;
    public int issueId;
    public int userId;
    public Timestamp create_time;
    public int prevState;
    public int nextState;
    public String username;
    public String content;
    public ArrayList<AssignRes> assignList;
    public String avatarUrl;
}