package com.its.itsapi.model.request.issue_req;

import java.util.ArrayList;

public class NewIssueReq {
    public String name;
    public String description;
    public int projectId;
    public int state;
    public int severity;
    public int priority;
    public Boolean isReproducible;
    public ArrayList<String> tags;
    public ArrayList<String> assignList;
    public ArrayList<String> mentionList;
}