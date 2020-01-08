package com.its.itsapi.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private int reportUser;
    private int projectId;
    private int state;
    private int severity;
    private int priority;
    private boolean isReproducible;
    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp create_time;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getReportUser() {
        return reportUser;
    }

    public void setReportUser(int userId) {
        this.reportUser = userId;
    }

    public int getProjectId() {
        return projectId;
    }

    public void setProjectId(int projectId) {
        this.projectId = projectId;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public int getSeverity() {
        return severity;
    }

    public void setSeverity(int severity) {
        this.severity = severity;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public Boolean getIsReproducible() {
        return isReproducible;
    }

    public void setIsReproducible(Boolean isReproducible) {
        this.isReproducible = isReproducible;
    }

    public Timestamp getCreateTime() {
        return create_time;
    }

    public void setCreateTime(Timestamp create_time) {
        this.create_time = create_time;
    }
}