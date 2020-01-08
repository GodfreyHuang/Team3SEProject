package com.its.itsapi.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import com.its.itsapi.model.IssueTagId;

@Entity
@IdClass(IssueTagId.class)
public class IssueTag {
    @Id
    private String tag;
    private int issueId;

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public int getIssueId() {
        return issueId;
    }

    public void setIssueId(int issueId) {
        this.issueId = issueId;
    }

}