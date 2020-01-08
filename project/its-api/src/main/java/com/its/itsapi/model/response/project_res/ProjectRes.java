package com.its.itsapi.model.response.project_res;

import java.sql.Timestamp;

public class ProjectRes {
    public int id;
    public String name;
    public String description;
    public boolean isPrivate;
    public Timestamp create_time;

    public String owner;
}