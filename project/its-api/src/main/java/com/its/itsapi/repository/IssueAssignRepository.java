package com.its.itsapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.its.itsapi.model.IssueAssign;

@Repository
public interface IssueAssignRepository extends JpaRepository<IssueAssign, Integer> {
    public List<IssueAssign> findByActivityId(int activityId);
}