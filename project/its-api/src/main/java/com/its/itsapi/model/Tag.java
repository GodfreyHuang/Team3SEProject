package com.its.itsapi.model;

import javax.persistence.Entity;

import javax.persistence.Id;

@Entity
public class Tag {
    @Id
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}