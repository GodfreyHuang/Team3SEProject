package com.its.itsapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

import com.its.itsapi.model.UserSession;

@Repository
public interface UserSessionRepository extends JpaRepository<UserSession, Integer> {
    public UserSession findByUserId(int user_id);

    public UserSession findBySessionId(String session_id);

    @Transactional
    @Modifying
    public void deleteBySessionId(String session_id);

    @Transactional
    @Modifying
    public void deleteByActiveTimeBefore(Date currentTime);
}