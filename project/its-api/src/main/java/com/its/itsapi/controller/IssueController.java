package com.its.itsapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.its.itsapi.model.UserSession;

import com.its.itsapi.repository.UserSessionRepository;

import com.its.itsapi.service.IssueService;

import com.its.itsapi.model.request.issue_req.NewIssueReq;
import com.its.itsapi.model.request.project_req.GetProjectReq;
import com.its.itsapi.model.request.issue_req.GetProjectIssueReq;
import com.its.itsapi.model.request.issue_req.NewActivityReq;
import com.its.itsapi.model.request.issue_req.EditActivityReq;
import com.its.itsapi.model.request.issue_req.EditIssueReq;

@CrossOrigin(origins = "*")
@RestController
public class IssueController {

    @Autowired
    private UserSessionRepository userSessionRepository;
    @Autowired
    private IssueService issueService;

    private UserSession userSession;

    @PostMapping("issue")
    public ResponseEntity<Object> addIssue(@RequestBody NewIssueReq query, @RequestParam String sessionId) {
        if (query.name == null || query.description == null)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int user_id = userSession.getUserId();

        return new ResponseEntity<Object>(issueService.addNewIssue(query, user_id), HttpStatus.OK);
    }

    @PutMapping("issue")
    public ResponseEntity<Object> editIssue(@RequestBody EditIssueReq query, @RequestParam String sessionId) {
        if (query.name == null || query.description == null)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int user_id = userSession.getUserId();

        return issueService.editNewIssue(query, user_id);
    }

    @PostMapping("issue/project")
    public ResponseEntity<Object> fetchIssueByProject(@RequestBody GetProjectIssueReq query,
            @RequestParam String sessionId) {
        if (query.limit < 1 && query.tag == null)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int user_id = userSession.getUserId();

        return new ResponseEntity<Object>(issueService.getProjectIssue(query, user_id), HttpStatus.OK);
    }

    @PostMapping("issue/get")
    public ResponseEntity<Object> fetchIssueByUserId(@RequestBody GetProjectReq query, @RequestParam String sessionId) {
        if (query.limit < 1)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int user_id = userSession.getUserId();

        return new ResponseEntity<Object>(issueService.getIssueByUserId(query, user_id), HttpStatus.OK);
    }

    @GetMapping("issue/get")
    public ResponseEntity<Object> fetchIssueByUserId(@RequestParam int issueId, @RequestParam String sessionId) {
        if (issueId < 0)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int user_id = userSession.getUserId();

        return issueService.getIssueById(issueId, user_id);
    }

    @PostMapping("issue/activity")
    public ResponseEntity<Object> newIssueActivity(@RequestBody NewActivityReq query, @RequestParam String sessionId) {
        if (query.issueId < 1)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int user_id = userSession.getUserId();

        return issueService.newIssueActivity(query, user_id);
    }

    @PutMapping("issue/activity")
    public ResponseEntity<Object> EditIssueActivity(@RequestBody EditActivityReq query,
            @RequestParam String sessionId) {
        if (query.issueId < 1)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int user_id = userSession.getUserId();

        return issueService.editIssueActivity(query, user_id);
    }
}