package com.its.itsapi.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class IssueFile {
    @Id
    private String fileUrl;
    private int issueId;
    private int commentId;

    public String getFileUrl()
    {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl)
    {
        this.fileUrl = fileUrl;
    }

    public int getIssueId()
    {
        return issueId;
    }

    public void setIssueId(int issueId)
    {
        this.issueId = issueId;
    }

    public int getCommentId()
    {
        return commentId;
    }

    public void setCommentId(int commentId)
    {
        this.commentId = commentId;
    }
}