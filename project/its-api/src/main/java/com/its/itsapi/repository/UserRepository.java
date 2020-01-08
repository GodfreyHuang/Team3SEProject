package com.its.itsapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.its.itsapi.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    public User findByEmail(String email);

    public User findByUsername(String username);

    public User findById(int Id);

    public default Boolean authPassword(User user, String password) {
        return user.getPassword().equals(password);
    }

    @Query(value = "select * from project p, PROJECT_MEMBER pm,User u where pm.identity = 0 and p.id = pm.project_Id and u.id = pm.user_Id and p.id=?1", nativeQuery = true)
    public User findOwnerByProjectId(int id);

    @Query(value = "select * from PROJECT_MEMBER pm,User u where pm.project_Id =?1 and u.id = pm.user_Id and u.line_Id is not null and u.is_revice=true and u.id != ?2", nativeQuery = true)
    public List<User> findLineUserByProjectId(int projectId, int reporter);

    @Query(value = "select u.username from User u where u.username LIKE ?1% Limit 5", nativeQuery = true)
    public List<String> searchUsernameLikeList(String username);

    @Query(value = "select * from User u, ISSUE_MEMBER im where im.issue_Id = ?1 and user_Id=u.id", nativeQuery = true)
    public List<User> findIssueMemberByIssueId(int issueId);

}