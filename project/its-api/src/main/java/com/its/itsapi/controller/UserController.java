package com.its.itsapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

import com.its.itsapi.repository.UserRepository;
import com.its.itsapi.repository.UserSessionRepository;

import com.its.itsapi.service.UserService;

import com.its.itsapi.model.User;
import com.its.itsapi.model.UserSession;
import com.its.itsapi.model.request.user_req.RegisterReq;
import com.its.itsapi.model.request.user_req.LoginReq;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserSessionRepository userSessionRepository;

    private User user;
    private UserSession userSession;

    @Autowired
    UserService userService;

    @GetMapping("/")
    public String hello() {
        return "v0.1.6";
    }

    @PostMapping("/session")
    public ResponseEntity<Object> addUser(@RequestBody RegisterReq query, HttpSession session) {
        if (query.email == null || query.password == null || query.username == null)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        if (userRepository.findByEmail(query.email) != null)
            return new ResponseEntity<Object>(0, HttpStatus.CONFLICT);

        if (userRepository.findByUsername(query.username) != null)
            return new ResponseEntity<Object>(1, HttpStatus.CONFLICT);

        return new ResponseEntity<Object>(userService.addUser(query, session), HttpStatus.OK);
    }

    @PostMapping("session/login")
    public ResponseEntity<Object> Login(@RequestBody LoginReq query, HttpSession session) {
        if (query.email == null || query.password == null)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        user = userRepository.findByEmail(query.email);
        if (user == null)
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);

        if (!userRepository.authPassword(user, query.password))
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        return new ResponseEntity<Object>(userService.login(user, session), HttpStatus.OK);
    }

    @DeleteMapping("session/logout")
    public void Logout(@RequestParam String sessionId) {
        userSessionRepository.deleteBySessionId(sessionId);
    }

    @GetMapping("session/verify/email")
    public ResponseEntity<Object> checkUserByEmail(@RequestParam String email) {
        if (email == null || email.isEmpty())
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        if (userRepository.findByEmail(email) == null)
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<Object>(HttpStatus.OK);
    }

    @GetMapping("session/verify/username")
    public ResponseEntity<Object> checkUserByUsername(@RequestParam String username) {

        if (username == null || username.isEmpty())
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        if (userRepository.findByUsername(username) == null)
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<Object>(HttpStatus.OK);
    }

    @GetMapping("session/verify")
    public ResponseEntity<Object> verifyUser(@RequestParam String key, @RequestParam int id, HttpSession session) {
        user = userRepository.findById(id);
        if (user.getAuthKey().equals(key)) {
            user.setAuthKey(null);
            userRepository.save(user);
            return new ResponseEntity<Object>(userService.login(user, session), HttpStatus.OK);
        } else
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("send")
    public ResponseEntity<Object> verifyUser(@RequestParam String email, HttpSession session) {
        user = userRepository.findByEmail(email);
        if (user != null && user.getAuthKey() != null) {
            userService.sendEmail(user);
            return new ResponseEntity<Object>(HttpStatus.OK);
        } else
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
    }

}