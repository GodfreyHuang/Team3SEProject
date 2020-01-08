package com.its.itsapi.model.request.issue_req;

import java.util.List;

public class NewActivityReq {
    public int issueId;
    public int state;
    public int severity;
    public int priority;
    public Boolean isReproducible;
    public String content;
    public List<String> imgUrls;
    public List<String> fileUrls;
    public List<String> assignList;
    public List<String> mentionList;
}