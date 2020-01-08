package com.its.itsapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.its.itsapi.repository.UserRepository;
import com.its.itsapi.repository.ProjectRepository;
import com.its.itsapi.repository.IssueRepository;
import com.its.itsapi.repository.ProjectMemberRepository;
import com.its.itsapi.repository.IssueTagRepository;

import java.util.ArrayList;
import java.util.List;

import com.its.itsapi.model.Project;
import com.its.itsapi.model.User;
import com.its.itsapi.model.ProjectMember;

import com.its.itsapi.model.request.project_req.NewProjectReq;
import com.its.itsapi.model.request.project_req.DeleteProjectMemberReq;
import com.its.itsapi.model.request.project_req.EditProjectReq;
import com.its.itsapi.model.request.project_req.GetProjectReq;
import com.its.itsapi.model.request.project_req.ProjectDetailReq;
import com.its.itsapi.model.request.project_req.ProjectMemberReq;
import com.its.itsapi.model.request.project_req.UpdateProjectMemberReq;
import com.its.itsapi.model.request.project_req.GetProjectMemberReq;

import com.its.itsapi.model.response.project_res.ProjectRes;
import com.its.itsapi.model.response.project_res.ProjectDetailRes;
import com.its.itsapi.model.response.project_res.ProjectMemberRes;
import com.its.itsapi.model.response.project_res.ProjectReportRes;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectMemberRepository projectMemberRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private IssueTagRepository issueTagRepository;
    @Autowired
    private LineService lineService;
    @Value("${frontend}")
    private String frontend;

    private Project project;
    private ProjectMember projectMember;
    private ProjectDetailRes projectDetailRes;
    private ProjectMemberRes projectMemberRes;
    private User user;

    private ProjectRes projectRes;

    public ProjectRes addNewProject(NewProjectReq query, int user_id) {
        project = new Project();
        project.setName(query.name);
        project.setIsPrivate(query.isPrivate);
        if (query.description != null)
            project.setDescription(query.description);
        project.setLineId(query.lineId);
        projectRepository.save(project);

        projectMember = new ProjectMember();
        projectMember.setUserId(user_id);
        projectMember.setProjectId(project.getId());
        projectMember.setIdentity(0);
        projectMemberRepository.save(projectMember);

        projectRes = new ProjectRes();
        projectRes.id = project.getId();
        projectRes.name = project.getName();
        projectRes.description = project.getDescription();
        projectRes.isPrivate = project.getIsPrivate();
        projectRes.create_time = project.getCreateTime();
        projectRes.owner = userRepository.findById(user_id).getUsername();
        if (query.lineId != null) {
            lineService.pushMessage("Project " + query.name + " subscribed", query.lineId);
        }

        return projectRes;
    }

    public ProjectDetailRes editProject(EditProjectReq query, int my_id) {
        project = projectRepository.findById(query.id);
        project.setName(query.name);
        project.setDescription(query.description);
        project.setIsPrivate(query.isPrivate);
        if (project.getLineId() != null) {
            if (!project.getLineId().equals(query.lineId))
                lineService.pushMessage("Project " + project.getName() + " unsubscribe success", project.getLineId());
        }
        if (query.lineId != null) {
            if (project.getLineId() == null || !project.getLineId().equals(query.lineId))
                lineService.pushMessage("Project " + query.name + " subscribed", query.lineId);
        }
        project.setLineId(query.lineId);
        projectRepository.save(project);

        return projectToProjectDetailRes(project);
    }

    public List<ProjectRes> getProject(GetProjectReq query, int my_id) {
        ArrayList<ProjectRes> res = new ArrayList<ProjectRes>();
        List<Project> temp;
        if (query.isOwner)
            temp = projectRepository.findOwnByUserId(query.user_id, my_id, query.limit, query.timestamp);
        else
            temp = projectRepository.findByUserId(query.user_id, my_id, query.limit, query.timestamp);
        for (Project project : temp) {
            res.add(projectToProjectRes(project));
        }
        return res;

    }

    public ProjectDetailRes getProjectDetail(ProjectDetailReq query, int my_id) {
        project = projectRepository.findByUserAndName(query.user, query.project);
        if (project == null)
            return null;
        projectMember = projectMemberRepository.findByUserIdAndProjectId(my_id, project.getId());
        if (projectMember == null && project.getIsPrivate())
            return null;

        return projectToProjectDetailRes(project);
    }

    public List<String> getTagsByProjectId(int projectId, int my_id) {
        project = projectRepository.findById(projectId);
        projectMember = projectMemberRepository.findByUserIdAndProjectId(my_id, project.getId());
        if (projectMember == null && project.getIsPrivate())
            return null;
        return issueTagRepository.fingTagByProjectID(projectId);
    }

    public ResponseEntity<Object> addProjectMember(ProjectMemberReq query, int my_id) {
        projectMember = projectMemberRepository.findByUserIdAndProjectId(my_id, query.projectId);
        if (projectMember == null || projectMember.getIdentity() > 1)
            return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

        user = userRepository.findByUsername(query.username);
        if (user == null)
            user = userRepository.findByEmail(query.username);
        if (user == null)
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);

        projectMember = null;
        projectMember = projectMemberRepository.findByUserIdAndProjectId(user.getId(), query.projectId);
        if (projectMember != null)
            return new ResponseEntity<Object>(HttpStatus.CONFLICT);

        projectMember = new ProjectMember();
        projectMember.setIdentity(query.identity);
        projectMember.setProjectId(query.projectId);
        projectMember.setUserId(user.getId());
        projectMember = projectMemberRepository.save(projectMember);
        project = projectRepository.findById(query.projectId);
        User owner = userRepository.findOwnerByProjectId(query.projectId);

        if (user.getLineId() != null && user.getisRevice()) {
            String message = "You are added into project <" + owner.getUsername() + "/" + project.getName() + ">\n"
                    + frontend + "#/p/" + owner.getUsername() + "/" + project.getName();
            lineService.pushMessage(message, user.getLineId());

        }

        return new ResponseEntity<Object>(UserProjectMemberToProjectMemberRes(user, projectMember), HttpStatus.OK);
    }

    public ResponseEntity<Object> deleteProjectMember(DeleteProjectMemberReq query, int my_id) {
        projectMember = projectMemberRepository.findByUserIdAndProjectId(my_id, query.projectId);
        if (projectMember == null)
            return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

        ProjectMember deleteMember = projectMemberRepository.findByUserIdAndProjectId(query.userId, query.projectId);

        if (deleteMember == null)
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);

        if (projectMember.getIdentity() > 1 || projectMember.getIdentity() >= deleteMember.getIdentity())
            return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

        projectMemberRepository.deleteByUserIdAndProjectId(query.userId, query.projectId);
        return new ResponseEntity<Object>(HttpStatus.OK);

    }

    public ResponseEntity<Object> updateProjectMember(UpdateProjectMemberReq query, int my_id) {
        projectMember = projectMemberRepository.findByUserIdAndProjectId(my_id, query.projectId);
        if (projectMember == null)
            return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

        ProjectMember updateMember = projectMemberRepository.findByUserIdAndProjectId(query.userId, query.projectId);

        if (updateMember == null)
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);

        if (projectMember.getIdentity() > 1 || projectMember.getIdentity() >= updateMember.getIdentity())
            return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

        updateMember.setIdentity(query.identity);
        if (query.identity == 0) {
            projectMember.setIdentity(1);
        }
        projectMemberRepository.save(projectMember);
        projectMemberRepository.save(updateMember);

        return new ResponseEntity<Object>(HttpStatus.OK);

    }

    public ResponseEntity<Object> getProjectMember(GetProjectMemberReq query, int my_id) {
        project = projectRepository.findById(query.projectId);
        projectMember = projectMemberRepository.findByUserIdAndProjectId(my_id, query.projectId);
        if (project.getIsPrivate() && projectMember == null)
            return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);

        List<ProjectMember> tempProjectMemberList = projectMemberRepository.findByProjectIdAndTime(query.projectId,
                query.timestamp, query.limit);
        ArrayList<ProjectMemberRes> res = new ArrayList<ProjectMemberRes>();
        for (ProjectMember tempProjectMember : tempProjectMemberList) {
            user = userRepository.findById(tempProjectMember.getUserId());
            res.add(UserProjectMemberToProjectMemberRes(user, tempProjectMember));
        }

        return new ResponseEntity<Object>(res, HttpStatus.OK);
    }

    public ResponseEntity<Object> getProjectReport(int projectId, int day, int priority, Boolean closed, int my_id) {
        project = projectRepository.findById(projectId);
        projectMember = projectMemberRepository.findByUserIdAndProjectId(my_id, projectId);
        if (projectMember == null || projectMember.getIdentity() > 1)
            return new ResponseEntity<Object>(HttpStatus.FORBIDDEN);
        ProjectReportRes res = new ProjectReportRes();
        if (closed) {
            res.count = projectRepository.CountClosedByProjectCount(projectId, day, priority);
            res.day = projectRepository.CountClosedDayByProjectCount(projectId, day, priority);
        } else {
            res.count = projectRepository.CountByProjectCount(projectId, day, priority);
            res.day = projectRepository.CountDayByProjectCount(projectId, day, priority);
        }

        return new ResponseEntity<Object>(res, HttpStatus.OK);
    }

    private ProjectDetailRes projectToProjectDetailRes(Project newProject) {
        int projectId = newProject.getId();
        User owner = userRepository.findOwnerByProjectId(projectId);
        projectDetailRes = new ProjectDetailRes();
        projectDetailRes.id = projectId;
        projectDetailRes.name = newProject.getName();
        projectDetailRes.description = newProject.getDescription();
        projectDetailRes.isPrivate = newProject.getIsPrivate();
        projectDetailRes.create_time = newProject.getCreateTime();
        projectDetailRes.lineId = newProject.getLineId();
        projectDetailRes.owner = owner.getUsername();
        projectDetailRes.ownerAvatarUrl = owner.getAvatarUrl();
        projectDetailRes.member_count = projectMemberRepository.countByProjectId(projectId);
        projectDetailRes.issue_count = issueRepository.countByProjectId(projectId);
        projectDetailRes.finish_issue_count = issueRepository.countFinishByProjectId(projectId);
        projectDetailRes.tag_count = issueTagRepository.countTagByProjectID(projectId);
        projectDetailRes.tags = issueTagRepository.fingTagByProjectID(projectId);
        projectDetailRes.identity = projectMember == null ? 99 : projectMember.getIdentity();
        return projectDetailRes;
    }

    private ProjectMemberRes UserProjectMemberToProjectMemberRes(User u, ProjectMember pm) {
        projectMemberRes = new ProjectMemberRes();
        projectMemberRes.username = u.getUsername();
        projectMemberRes.id = u.getId();
        projectMemberRes.avatarUrl = u.getAvatarUrl();
        projectMemberRes.identity = pm.getIdentity();
        projectMemberRes.join_time = pm.getJoinTime();
        return projectMemberRes;
    }

    private ProjectRes projectToProjectRes(Project project) {
        projectRes = new ProjectRes();
        projectRes.id = project.getId();
        projectRes.name = project.getName();
        projectRes.description = project.getDescription();
        projectRes.isPrivate = project.getIsPrivate();
        projectRes.create_time = project.getCreateTime();
        projectRes.owner = userRepository.findOwnerByProjectId(project.getId()).getUsername();
        return projectRes;
    }

}