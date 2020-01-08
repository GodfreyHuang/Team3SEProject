package com.its.itsapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

import com.its.itsapi.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
        public Project findById(int Id);

        public Project findByLineId(String lineId);

        @Query(value = "select EXISTS(select 1 from project p, PROJECT_MEMBER pm where pm.identity = 0 and p.name=?1 and pm.user_Id = ?2 and p.id = pm.project_Id)", nativeQuery = true)
        public int findByUserIdAndName(String name, int userId);

        String findByUserIdSQL = "select * from project p, PROJECT_MEMBER pm "
                        + "where pm.user_Id=?1 and p.id= pm.project_Id and "
                        + "(p.is_private = false or ?1=?2 or exists(select user_Id from PROJECT_MEMBER ppm where ppm.project_Id = pm.project_Id and ppm.user_Id=?2)) and "
                        + "(?4 is null or p.create_time < ?4)" + " group by p.id order by p.create_time desc limit ?3";

        @Query(value = findByUserIdSQL, nativeQuery = true)
        public List<Project> findByUserId(int userId, int myId, int limit, Timestamp timestamp);

        String findOwnByUserIdSQL = "select * from project p, PROJECT_MEMBER pm "
                        + "where pm.user_Id=?1 and p.id= pm.project_Id and pm.identity = 0 and "
                        + "(p.is_private = false or ?1=?2 or exists(select user_Id from PROJECT_MEMBER ppm where ppm.project_Id = pm.project_Id and ppm.user_Id=?2)) and "
                        + "(?4 is null or p.create_time < ?4)" + " group by p.id order by p.create_time desc limit ?3";

        @Query(value = findOwnByUserIdSQL, nativeQuery = true)
        public List<Project> findOwnByUserId(int userId, int myId, int limit, Timestamp timestamp);

        String findByUserAndNameSQL = "select * from project p, PROJECT_MEMBER pm,user u "
                        + "where u.username=?1 and p.name = ?2 and pm.user_Id=u.id and p.id = pm.project_Id and pm.identity = 0";

        @Query(value = findByUserAndNameSQL, nativeQuery = true)
        public Project findByUserAndName(String user, String name);

        @Query(value = "SELECT count(i.create_time) FROM ISSUE i WHERE i.project_Id=?1 and i.create_time>CURRENT_DATE()-?2 and (?3 = -1 || i.priority = ?3) group by day(i.create_time)", nativeQuery = true)
        public List<Integer> CountByProjectCount(int projectId, int day, int priority);

        @Query(value = "select count(ia.create_time) FROM ISSUE i, issue_activity ia WHERE i.project_Id=?1 and ia.issue_id=i.id and i.state = ia.next_State and (?3 = -1 || priority = ?3) and state > 2 and ia.activity_type = 1 and ia.create_time > CURRENT_DATE()-?2 group by day(ia.create_time)", nativeQuery = true)
        public List<Integer> CountClosedByProjectCount(int projectId, int day, int priority);

        @Query(value = "SELECT day(i.create_time) as day FROM ISSUE i WHERE i.project_Id=?1 and i.create_time>CURRENT_DATE()-?2 and (?3 = -1 || i.priority = ?3) group by day(i.create_time)", nativeQuery = true)
        public List<Integer> CountDayByProjectCount(int projectId, int day, int priority);

        @Query(value = "select day(ia.create_time) FROM ISSUE i, issue_activity ia WHERE i.project_Id=?1 and ia.issue_id=i.id and i.state = ia.next_State and (?3 = -1 || priority = ?3) and state > 2 and ia.activity_type = 1 and ia.create_time > CURRENT_DATE()-?2 group by day(ia.create_time)", nativeQuery = true)
        public List<Integer> CountClosedDayByProjectCount(int projectId, int day, int priority);

}