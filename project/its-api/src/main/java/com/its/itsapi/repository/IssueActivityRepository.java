package com.its.itsapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.its.itsapi.model.IssueActivity;

@Repository
public interface IssueActivityRepository extends JpaRepository<IssueActivity, Integer> {
    public List<IssueActivity> findByIssueId(int issueId);

    public IssueActivity findById(int id);
}