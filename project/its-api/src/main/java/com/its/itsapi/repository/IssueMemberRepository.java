package com.its.itsapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.its.itsapi.model.IssueMember;

@Repository
public interface IssueMemberRepository extends JpaRepository<IssueMember, Integer> {
    public IssueMember findByUserIdAndIssueId(int userId, int issueId);

    @Query(value = "select u.username from User u, issue_member im where im.user_id=u.id and im.identity=0 and im.issue_Id=?1", nativeQuery = true)
    public List<String> findAssignByIssueId(int issueId);

    @Query(value = "select u.username from User u, issue_member im where im.user_id=u.id and im.identity != 0 and im.issue_Id=?1", nativeQuery = true)
    public List<String> findMentionByIssueId(int issueId);

}