package com.its.itsapi.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class IssueActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int issueId;
    private int activityType;
    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp create_time;
    private int prevState;
    private int nextState;
    private String content;
    private int userId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getType() {
        return activityType;
    }

    public void setType(int activityType) {
        this.activityType = activityType;
    }

    public int getIssueId() {
        return issueId;
    }

    public void setIssueId(int issueId) {
        this.issueId = issueId;
    }

    public Timestamp getCreateTime() {
        return create_time;
    }

    public void setCreateTime(Timestamp create_time) {
        this.create_time = create_time;
    }

    public int getPrevState() {
        return prevState;
    }

    public void setPrevState(int prevState) {
        this.prevState = prevState;
    }

    public int getNextState() {
        return nextState;
    }

    public void setNextState(int nextState) {
        this.nextState = nextState;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}