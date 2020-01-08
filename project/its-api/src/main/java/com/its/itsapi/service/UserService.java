package com.its.itsapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.its.itsapi.model.User;
import com.its.itsapi.model.UserSession;

import com.its.itsapi.repository.UserRepository;
import com.its.itsapi.repository.UserSessionRepository;

import com.its.itsapi.service.MailService;

import com.its.itsapi.model.response.user_res.AuthRes;

import com.its.itsapi.model.request.user_req.RegisterReq;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserSessionRepository userSessionRepository;
    @Autowired
    private MailService mailService;

    private User user;
    private UserSession userSession;

    public AuthRes addUser(RegisterReq query, HttpSession session) {
        String sessionId = session.getId();
        user = new User();
        user.setUsername(query.username);
        user.setEmail(query.email);
        user.setPassword(query.password);
        user.setAuthKey(session.getId());
        user = userRepository.save(user);

        userSession = new UserSession();
        userSession.setUserId(user.getId());
        userSession.setSessionId(session.getId());

        userSessionRepository.save(userSession);

        AuthRes res = new AuthRes();
        res.profileId = user.getId();
        res.username = user.getUsername();
        res.sessionId = sessionId;

        mailService.sendAuthMail(user);

        return res;

    }

    public void sendEmail(User emailUser) {
        mailService.sendAuthMail(emailUser);
    }

    public AuthRes login(User query, HttpSession session) {
        String sessionId = session.getId();
        userSession = new UserSession();
        userSession.setUserId(query.getId());
        userSession.setSessionId(sessionId);
        userSessionRepository.save(userSession);

        AuthRes res = new AuthRes();
        res.profileId = query.getId();
        res.username = query.getUsername();
        res.sessionId = sessionId;

        return res;
    }

}