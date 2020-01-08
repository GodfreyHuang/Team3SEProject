package com.its.itsapi.model.response.issue_res;

import java.sql.Timestamp;
import java.util.List;

public class IssueRes {
    public int id;
    public String name;
    public String description;
    public int projectId;
    public String projectName;
    public String projectOwner;
    public int state;
    public int severity;
    public int priority;
    public Boolean isReproducible;
    public Timestamp create_time;
    public String reportUser;
    public String reportUserAvatar;
    public List<String> tags;
    public List<String> assignList;
}