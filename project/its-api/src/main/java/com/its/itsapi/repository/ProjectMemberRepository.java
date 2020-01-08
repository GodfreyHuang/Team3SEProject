package com.its.itsapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

import javax.transaction.Transactional;

import com.its.itsapi.model.ProjectMember;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Integer> {
    public ProjectMember findByUserIdAndProjectId(int user_Id, int project_Id);

    String countByProjectIdSQL = "select count(*) from PROJECT_MEMBER pm " + "where pm.project_Id =?1";

    @Query(value = countByProjectIdSQL, nativeQuery = true)
    public int countByProjectId(int project_Id);

    @Query(value = "select * from PROJECT_MEMBER pm where pm.project_Id = ?1 and (?2 is null or pm.join_time < ?2) order by pm.join_time desc limit ?3", nativeQuery = true)
    public List<ProjectMember> findByProjectIdAndTime(int project_Id, Timestamp timestamp, int limit);

    @Transactional
    public void deleteByUserIdAndProjectId(int user_Id, int project_Id);
}