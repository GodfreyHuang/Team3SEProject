package com.its.itsapi.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private String lineId;
    private boolean isPrivate;
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

    public void setLineId(String lineId) {
        this.lineId = lineId;
    }

    public String getLineId() {
        return lineId;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean getIsPrivate() {
        return isPrivate;
    }

    public void setIsPrivate(boolean isPrivate) {
        this.isPrivate = isPrivate;
    }

    public Timestamp getCreateTime() {
        return create_time;
    }

    public void setCreateTime(Timestamp create_time) {
        this.create_time = create_time;
    }
}