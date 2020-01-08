package com.its.itsapi.model.request.issue_req;

import java.util.ArrayList;

public class EditActivityReq {
    public String comment;
    public ArrayList<String> mentionList;
    public int activityId;
    public int issueId;
    public String name;
}