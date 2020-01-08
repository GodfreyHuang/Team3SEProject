package com.its.itsapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.its.itsapi.model.IssueTag;

@Repository
public interface IssueTagRepository extends JpaRepository<IssueTag, Integer> {
    public IssueTag findByTagAndIssueId(String tag, int issueId);

    @Query(value = "select tag from ISSUE_TAG IT where IT.issue_id = ?1 ", nativeQuery = true)
    public List<String> findTagByIssueId(int issueId);

    @Query(value = "select count(distinct it.tag) from project p,issue i , issue_tag it where it.issue_id = i.id and i.project_id = p.id and p.id = ?1 ", nativeQuery = true)
    public int countTagByProjectID(int projectId);

    @Query(value = "select distinct it.tag from project p,issue i , issue_tag it where it.issue_id = i.id and i.project_id = p.id and p.id = ?1 ", nativeQuery = true)
    public List<String> fingTagByProjectID(int projectId);

    @Transactional
    public void deleteByTagAndIssueId(String tag, int issueId);
}