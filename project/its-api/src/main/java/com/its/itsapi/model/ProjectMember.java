package com.its.itsapi.model;

import java.sql.Timestamp;
import com.its.itsapi.model.ProjectMemberId;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@IdClass(ProjectMemberId.class)
public class ProjectMember {
    @Id
    private int userId;
    private int projectId;
    private int identity;
    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp join_time;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
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