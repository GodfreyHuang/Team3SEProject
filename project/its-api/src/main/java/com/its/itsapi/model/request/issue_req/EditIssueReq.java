package com.its.itsapi.model.request.issue_req;

import java.util.ArrayList;

public class EditIssueReq {
    public String name;
    public String description;
    public ArrayList<String> tags;
    public ArrayList<String> mentionList;
    public int issueId;
}