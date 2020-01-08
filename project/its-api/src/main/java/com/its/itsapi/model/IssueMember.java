package com.its.itsapi.model;

import java.sql.Timestamp;
import com.its.itsapi.model.IssueMemberId;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Entity
@IdClass(IssueMemberId.class)
public class IssueMember {
    @Id
    private int userId;
    private int issueId;
    private int identity;
    private Timestamp join_time;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getIssueId() {
        return issueId;
    }

    public void setIssueId(int issueId) {
        this.issueId = issueId;
    }

    public int getIdentity() {
        return identity;
    }

    public void setIdentity(int identity) {
        this.identity = identity;
    }

    public Timestamp getJoinTime() {
        return join_time;
    }

}