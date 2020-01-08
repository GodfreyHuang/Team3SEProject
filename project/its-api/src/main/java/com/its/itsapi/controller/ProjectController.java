package com.its.itsapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.its.itsapi.model.User;
import com.its.itsapi.model.UserSession;
import com.its.itsapi.model.ProjectMember;

import java.util.List;

import com.its.itsapi.repository.ProjectRepository;
import com.its.itsapi.repository.UserSessionRepository;
import com.its.itsapi.repository.UserRepository;

import com.its.itsapi.service.ProjectService;

import com.its.itsapi.model.request.project_req.NewProjectReq;
import com.its.itsapi.model.request.project_req.DeleteProjectMemberReq;
import com.its.itsapi.model.request.project_req.EditProjectReq;
import com.its.itsapi.model.request.project_req.GetProjectReq;
import com.its.itsapi.model.request.project_req.ProjectDetailReq;
import com.its.itsapi.model.request.project_req.ProjectTagsReq;
import com.its.itsapi.model.request.project_req.UpdateProjectMemberReq;
import com.its.itsapi.model.request.project_req.ProjectMemberReq;
import com.its.itsapi.model.request.project_req.GetProjectMemberReq;

import com.its.itsapi.model.response.project_res.ProjectDetailRes;

@CrossOrigin(origins = "*")
@RestController
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserSessionRepository userSessionRepository;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private UserRepository userRepository;

    private UserSession userSession;
    private User user;

    @PostMapping("project")
    public ResponseEntity<Object> addProject(@RequestBody NewProjectReq query, @RequestParam String sessionId) {
        if (query.name == null || query.isPrivate == null)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int user_id = userSession.getUserId();

        if (projectRepository.findByUserIdAndName(query.name, user_id) == 1)
            return new ResponseEntity<Object>(HttpStatus.CONFLICT);

        return new ResponseEntity<Object>(projectService.addNewProject(query, user_id), HttpStatus.OK);
    }

    @PutMapping("project")
    public ResponseEntity<Object> editProject(@RequestBody EditProjectReq query, @RequestParam String sessionId) {
        if (query.name == null || query.isPrivate == null)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int user_id = userSession.getUserId();

        return new ResponseEntity<Object>(projectService.editProject(query, user_id), HttpStatus.OK);
    }

    @PostMapping("project/get")
    public ResponseEntity<Object> getProject(@RequestBody GetProjectReq query, @RequestParam String sessionId) {
        if (query.limit <= 0 || query.isOwner == null)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int my_id = userSession.getUserId();

        return new ResponseEntity<Object>(projectService.getProject(query, my_id), HttpStatus.OK);
    }

    @PostMapping("project/detail")
    public ResponseEntity<Object> getProjectDetail(@RequestBody ProjectDetailReq query,
            @RequestParam String sessionId) {
        if (query.user == null || query.project == null)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int my_id = userSession.getUserId();

        ProjectDetailRes res = projectService.getProjectDetail(query, my_id);
        if (res == null)
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<Object>(res, HttpStatus.OK);
    }

    @PostMapping("project/tags")
    public ResponseEntity<Object> getTagsByProjectId(@RequestBody ProjectTagsReq query,
            @RequestParam String sessionId) {
        if (query.projectId == 0)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int my_id = userSession.getUserId();

        List<String> res = projectService.getTagsByProjectId(query.projectId, my_id);
        if (res == null)
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<Object>(res, HttpStatus.OK);
    }

    @PostMapping("project/member")
    public ResponseEntity<Object> addProjectMember(@RequestBody ProjectMemberReq query,
            @RequestParam String sessionId) {
        if (query.projectId == 0 || query.username.length() == 0 || query.identity == 0)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int my_id = userSession.getUserId();

        return projectService.addProjectMember(query, my_id);
    }

    @DeleteMapping("project/member")
    public ResponseEntity<Object> deleteProjectMember(@RequestBody DeleteProjectMemberReq query,
            @RequestParam String sessionId) {
        if (query.projectId == 0 || query.userId == 0)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int my_id = userSession.getUserId();

        return projectService.deleteProjectMember(query, my_id);
    }

    @PutMapping("project/member")
    public ResponseEntity<Object> updateProjectMember(@RequestBody UpdateProjectMemberReq query,
            @RequestParam String sessionId) {
        if (query.projectId == 0 || query.userId == 0)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int my_id = userSession.getUserId();

        return projectService.updateProjectMember(query, my_id);
    }

    @PostMapping("project/getMember")
    public ResponseEntity<Object> getProjectMember(@RequestBody GetProjectMemberReq query,
            @RequestParam String sessionId) {
        if (query.projectId == 0 || query.limit == 0)
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int my_id = userSession.getUserId();

        return projectService.getProjectMember(query, my_id);
    }

    @GetMapping("project/report")
    public ResponseEntity<Object> getProjectReport(@RequestParam int projectId, @RequestParam int day,
            @RequestParam int priority, @RequestParam Boolean closed, @RequestParam String sessionId) {

        userSession = userSessionRepository.findBySessionId(sessionId);
        if (userSession == null)
            return new ResponseEntity<Object>(HttpStatus.UNAUTHORIZED);

        int my_id = userSession.getUserId();

        return projectService.getProjectReport(projectId, day, priority, closed, my_id);
    }

}