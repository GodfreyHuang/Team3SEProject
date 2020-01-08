package com.its.itsapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.its.itsapi.model.User;
import com.its.itsapi.model.UserSession;
import com.its.itsapi.repository.UserRepository;
import com.its.itsapi.repository.UserSessionRepository;

import com.its.itsapi.model.request.profile_req.UpdateUserReq;
import com.its.itsapi.model.response.profile_res.MyProfileRes;
import com.its.itsapi.model.response.profile_res.ProfileRes;

@CrossOrigin(origins = "*")
@RestController
public class ProfileController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserSessionRepository userSessionRepository;

    private User user;
    private UserSession userSession;

    @GetMapping("profile")
    public ResponseEntity<Object> getProfileById(@RequestParam int profileId, @RequestParam String sessionId) {
        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);
        user = userRepository.findById(profileId);
        if (user == null)
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
        ProfileRes res = new ProfileRes();
        res.username = user.getUsername();
        return new ResponseEntity<Object>(res, HttpStatus.OK);
    }

    @GetMapping("profile/me")
    public ResponseEntity<Object> getMyProfile(@RequestParam String sessionId, @RequestParam int profileId) {
        if (sessionId == null || sessionId.isEmpty())
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        if (userSession.getUserId() != profileId)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        user = userRepository.findById(userSession.getUserId());
        if (user == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        if (user.getAuthKey() != null) {
            return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
        }

        userSession.setActiveTime(null);
        userSessionRepository.save(userSession);

        MyProfileRes res = new MyProfileRes();
        res.username = user.getUsername();
        res.avatarUrl = user.getAvatarUrl();
        res.lineId = user.getLineId();
        res.isRevice = user.getisRevice();
        return new ResponseEntity<Object>(res, HttpStatus.OK);
    }

    @PutMapping("profile/update")
    public ResponseEntity<Object> updateUserInformation(@RequestBody UpdateUserReq query,
            @RequestParam String sessionId) {
        if (query.username == null)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int my_id = userSession.getUserId();

        user = userRepository.findById(my_id);

        if (!query.username.equals(user.getUsername()) && userRepository.findByUsername(query.username) != null)
            return new ResponseEntity<Object>(HttpStatus.CONFLICT);

        user.setUsername(query.username);
        user.setAvatarUrl(query.avatarUrl);
        user.setIsRevice(query.isRevice);
        user.setLineId(query.lineId);
        if (query.password != null && query.password.length() > 0)
            user.setPassword(query.password);
        userRepository.save(user);

        MyProfileRes res = new MyProfileRes();
        res.username = user.getUsername();
        res.avatarUrl = user.getAvatarUrl();
        res.lineId = user.getLineId();
        res.isRevice = user.getisRevice();

        return new ResponseEntity<Object>(res, HttpStatus.OK);
    }

    @PostMapping("profile/checkpassword")
    public ResponseEntity<Object> getProjectMember(@RequestBody String password, @RequestParam String sessionId) {

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int my_id = userSession.getUserId();

        if (userRepository.authPassword(userRepository.findById(my_id), password)) {
            return new ResponseEntity<Object>(HttpStatus.OK);
        }

        return new ResponseEntity<Object>(HttpStatus.NOT_ACCEPTABLE);
    }

    @GetMapping("profile/username")
    public ResponseEntity<Object> searchUsernameList(@RequestParam String username, @RequestParam String sessionId) {
        if (username == null)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        return new ResponseEntity<Object>(userRepository.searchUsernameLikeList(username), HttpStatus.OK);
    }

}