package com.its.itsapi.model.response.project_res;

import java.sql.Timestamp;
import java.util.List;

public class ProjectDetailRes {
    public int id;
    public String name;
    public String description;
    public String lineId;
    public boolean isPrivate;
    public Timestamp create_time;
    public String owner;
    public String ownerAvatarUrl;
    public int identity;

    public int issue_count;
    public int finish_issue_count;
    public int member_count;
    public int tag_count;
    public List<String> tags;
}