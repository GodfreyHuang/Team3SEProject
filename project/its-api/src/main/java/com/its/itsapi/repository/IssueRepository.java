package com.its.itsapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

import com.its.itsapi.model.Issue;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Integer> {
        String CountByProjectIdSQL = "select count(*) from ISSUE i " + "where i.project_Id =?1 and i.state < 3";

        @Query(value = CountByProjectIdSQL, nativeQuery = true)
        public int countByProjectId(int project_id);

        String countFinishByProjectIdSQL = "select count(*) from ISSUE i " + "where i.project_Id =?1 and i.state >= 3";

        @Query(value = countFinishByProjectIdSQL, nativeQuery = true)
        public int countFinishByProjectId(int project_id);

        String findByProjectIdSQL = "select * from ISSUE i " + "where i.project_Id = ?1 and i.state < 3 and "
                        + "(?3 is null or i.create_time < ?3) " + "order by i.create_time desc limit ?2";

        @Query(value = findByProjectIdSQL, nativeQuery = true)
        public List<Issue> findByProjectId(int project_Id, int limit, Timestamp timestamp);

        String findClosedByProjectIdSQL = "select * from ISSUE i " + "where i.project_Id = ?1 and i.state > 2 and "
                        + "(?3 is null or i.create_time < ?3) " + "order by i.create_time desc limit ?2";

        @Query(value = findClosedByProjectIdSQL, nativeQuery = true)
        public List<Issue> findClosedByProjectId(int project_Id, int limit, Timestamp timestamp);

        String findByProjectIdAndTagSQL = "select * from ISSUE i, issue_tag it "
                        + "where i.project_Id = ?1 and it.tag=?2 and it.issue_id = i.id "
                        + "order by i.create_time desc";

        @Query(value = findByProjectIdAndTagSQL, nativeQuery = true)
        public List<Issue> findByProjectIdAndTag(int project_Id, String tag);

        String findByUserIdSQL = "select * from issue i,ISSUE_MEMBER im , project p, PROJECT_MEMBER pm "
                        + "where i.id = im.issue_Id and i.state < 3 and im.user_Id = ?1 and i.project_Id = p.id and p.id = pm.project_Id and "
                        + "(p.is_private = false or ?1=?2 or exists(select user_Id from PROJECT_MEMBER ppm where ppm.project_Id = pm.project_Id and ppm.user_Id=?2)) and "
                        + "(?4 is null or i.create_time < ?4)" + " group by i.id order by i.create_time desc limit ?3";

        @Query(value = findByUserIdSQL, nativeQuery = true)
        public List<Issue> findByUserId(int userId, int myId, int limit, Timestamp timestamp);

        String findByAssignUserIdSQL = "select * from issue i,ISSUE_MEMBER im , project p, PROJECT_MEMBER pm "
                        + "where i.id = im.issue_Id and i.state < 3 and im.user_Id = ?1 and i.project_Id = p.id and p.id = pm.project_Id and (?4=-1 || im.identity<=?4) and "
                        + "(p.is_private = false or ?1=?2 or exists(select user_Id from PROJECT_MEMBER ppm where ppm.project_Id = pm.project_Id and ppm.user_Id=?2)) "
                        + "group by i.id order by i.priority desc limit ?3";

        @Query(value = findByAssignUserIdSQL, nativeQuery = true)
        public List<Issue> findByAssignUserId(int userId, int myId, int limit, int identity);

        public Issue findById(int issue_Id);
}