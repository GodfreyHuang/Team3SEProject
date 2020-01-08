package com.its.itsapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import com.its.itsapi.model.Issue;
import com.its.itsapi.model.IssueMember;
import com.its.itsapi.model.IssueActivity;
import com.its.itsapi.model.IssueAssign;
import com.its.itsapi.model.Tag;
import com.its.itsapi.model.User;
import com.its.itsapi.model.Project;
import com.its.itsapi.model.ProjectMember;
import com.its.itsapi.model.IssueTag;

import com.its.itsapi.model.request.issue_req.NewIssueReq;
import com.its.itsapi.model.request.issue_req.GetProjectIssueReq;
import com.its.itsapi.model.request.issue_req.NewActivityReq;
import com.its.itsapi.model.request.issue_req.EditActivityReq;
import com.its.itsapi.model.request.issue_req.EditIssueReq;
import com.its.itsapi.model.request.project_req.GetProjectReq;

import com.its.itsapi.model.response.issue_res.IssueRes;
import com.its.itsapi.model.response.issue_res.IssueDetailRes;
import com.its.itsapi.model.response.issue_res.AssignRes;
import com.its.itsapi.model.response.issue_res.IssueActivityRes;

import com.its.itsapi.repository.IssueRepository;
import com.its.itsapi.repository.IssueMemberRepository;
import com.its.itsapi.repository.UserRepository;
import com.its.itsapi.repository.TagRepository;
import com.its.itsapi.repository.ProjectRepository;
import com.its.itsapi.repository.ProjectMemberRepository;
import com.its.itsapi.repository.IssueTagRepository;
import com.its.itsapi.repository.IssueActivityRepository;
import com.its.itsapi.repository.IssueAssignRepository;
import com.its.itsapi.service.LineService;

@Service
public class IssueService {
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private IssueMemberRepository issueMemberRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IssueTagRepository issueTagRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ProjectMemberRepository projectMemberRepository;
    @Autowired
    private IssueActivityRepository issueActivityRepository;
    @Autowired
    private IssueAssignRepository issueAssignRepository;
    @Autowired
    private LineService lineService;
    @Autowired
    private MailService mailService;
    @Value("${frontend}")
    private String frontend;

    private Issue issue;
    private IssueRes issueRes;
    private IssueMember issueMember;
    private Tag tag;
    private IssueTag issueTag;
    private Project project;

    public IssueRes addNewIssue(NewIssueReq query, int my_id) {
        issue = new Issue();
        issue.setName(query.name);
        issue.setDescription(query.description);
        issue.setProjectId(query.projectId);
        issue.setState(query.state);
        issue.setSeverity(query.severity);
        issue.setPriority(query.priority);
        issue.setReportUser(my_id);
        issue.setIsReproducible(query.isReproducible);
        issueRepository.save(issue);

        int issueId = issue.getId();

        String projectName = projectRepository.findById(query.projectId).getName();
        String projectLine = projectRepository.findById(query.projectId).getLineId();
        String message = "Project " + projectName + " get a new issue. <" + query.name + ">\n" + frontend + "#/i/"
                + issueId;
        List<User> sendLineUserList = userRepository.findLineUserByProjectId(query.projectId, my_id);
        for (User lineUser : sendLineUserList) {
            lineService.pushMessage(message, lineUser.getLineId());
        }
        if (projectLine != null) {
            lineService.pushMessage(message, projectLine);
        }

        addActivity(my_id, issueId, 1, -1, query.state, null);
        addActivity(my_id, issueId, 2, -1, query.severity, null);
        addActivity(my_id, issueId, 3, -1, query.priority, null);
        addActivity(my_id, issueId, 4, -1, query.isReproducible ? 0 : 1, null);
        Boolean reportedAdded = false;
        if (query.assignList.size() > 0) {
            int assignActivityId = addActivity(my_id, issueId, 5, -1, -1, null);
            for (String assignUser : query.assignList) {
                int userId = userRepository.findByUsername(assignUser).getId();
                assignIssue(userId, issueId, query.name, my_id, assignActivityId);
                if (userId == my_id) {
                    reportedAdded = true;
                }
            }
        }
        if (!reportedAdded) {
            addIssueMember(my_id, issueId, 1);
        }
        List<String> mentionList = query.mentionList;
        mentionList.removeAll(query.assignList);
        if (mentionList.size() > 0) {
            message = "You have been mentions in issue <" + query.name + ">.\n" + frontend + "#/i/" + issueId;
            for (String mentionUser : mentionList) {
                int mentionUserId = userRepository.findByUsername(mentionUser).getId();
                addIssueMember(mentionUserId, issueId, 1);
                if (my_id != mentionUserId) {
                    User sendLineUser = userRepository.findById(mentionUserId);
                    if (sendLineUser.getLineId() != null && sendLineUser.getisRevice()) {
                        lineService.pushMessage(message, sendLineUser.getLineId());
                    }
                }

            }
        }
        for (String tagName : query.tags) {
            tag = tagRepository.findByName(tagName);
            if (tag == null) {
                tag = new Tag();
                tag.setName(tagName);
                tagRepository.save(tag);
            }
            issueTag = new IssueTag();
            issueTag.setTag(tagName);
            issueTag.setIssueId(issueId);
            issueTagRepository.save(issueTag);
        }

        issueRes = issueToIssueRes(issue);
        return issueRes;
    }

    public List<IssueRes> getProjectIssue(GetProjectIssueReq query, int user_id) {
        ArrayList<IssueRes> res = new ArrayList<IssueRes>();
        List<Issue> issueList;
        if (query.tag != null) {
            issueList = issueRepository.findByProjectIdAndTag(query.projectId, query.tag);
        } else if (query.closed) {
            issueList = issueRepository.findClosedByProjectId(query.projectId, query.limit, query.timestamp);
        } else {
            issueList = issueRepository.findByProjectId(query.projectId, query.limit, query.timestamp);
        }
        for (Issue tempIssue : issueList) {
            res.add(issueToIssueRes(tempIssue));
        }
        return res;
    }

    public List<IssueRes> getIssueByUserId(GetProjectReq query, int my_id) {
        ArrayList<IssueRes> res = new ArrayList<IssueRes>();
        List<Issue> issueList;
        if (query.isOwner) {
            issueList = issueRepository.findByAssignUserId(query.user_id, my_id, query.limit, 0);
        } else {
            issueList = issueRepository.findByUserId(query.user_id, my_id, query.limit, query.timestamp);
        }
        for (Issue tempIssue : issueList) {
            res.add(issueToIssueRes(tempIssue));
        }
        return res;
    }

    public ResponseEntity<Object> getIssueById(int issueId, int my_id) {
        issue = issueRepository.findById(issueId);
        project = projectRepository.findById(issue.getProjectId());
        ProjectMember projectMember = projectMemberRepository.findByUserIdAndProjectId(my_id, project.getId());
        if (project.getIsPrivate() && projectMember == null) {
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
        }
        IssueDetailRes res = new IssueDetailRes();
        User reportUser = userRepository.findById(issue.getReportUser());
        res.id = issue.getId();
        res.name = issue.getName();
        res.description = issue.getDescription();
        res.projectId = issue.getProjectId();
        res.projectName = project.getName();
        res.projectOwner = userRepository.findOwnerByProjectId(project.getId()).getUsername();
        res.state = issue.getState();
        res.severity = issue.getSeverity();
        res.priority = issue.getPriority();
        res.isReproducible = issue.getIsReproducible();
        res.create_time = issue.getCreateTime();
        res.reportUser = reportUser.getUsername();
        res.reportUserAvatar = reportUser.getAvatarUrl();
        res.tags = issueTagRepository.findTagByIssueId(res.id);
        res.assignList = issueMemberRepository.findAssignByIssueId(issue.getId());
        res.mentionList = issueMemberRepository.findMentionByIssueId(issue.getId());
        if (projectMember == null)
            res.projectIdentity = 99;
        else
            res.projectIdentity = projectMember.getIdentity();
        List<IssueActivity> tempActivity = issueActivityRepository.findByIssueId(issueId);
        ArrayList<IssueActivityRes> tempActivityRes = new ArrayList<IssueActivityRes>();
        for (IssueActivity temp : tempActivity) {
            tempActivityRes.add(activityToActivityRes(temp));
        }
        res.activity = tempActivityRes;

        return new ResponseEntity<Object>(res, HttpStatus.OK);
    }

    public ResponseEntity<Object> editNewIssue(EditIssueReq query, int my_id) {

        issue = issueRepository.findById(query.issueId);
        issue.setName(query.name);
        issue.setDescription(query.description);
        issueRepository.save(issue);

        List<String> mentionList = query.mentionList;
        if (mentionList.size() > 0) {
            for (String mentionUser : mentionList) {
                int mentionUserId = userRepository.findByUsername(mentionUser).getId();
                addIssueMember(mentionUserId, query.issueId, 1);
                if (my_id != mentionUserId) {
                    User sendLineUser = userRepository.findById(mentionUserId);
                    if (sendLineUser.getLineId() != null && sendLineUser.getisRevice()) {
                        String message = "You have been mentions in issue <" + query.name + ">.\n" + frontend + "#/i/"
                                + query.issueId;
                        lineService.pushMessage(message, sendLineUser.getLineId());
                    }
                }
            }
        }

        List<String> oldTagList = issueTagRepository.findTagByIssueId(query.issueId);
        List<String> newTagList = new ArrayList<String>(query.tags);
        newTagList.removeAll(oldTagList);
        oldTagList.removeAll(query.tags);

        for (String oldTag : oldTagList) {
            issueTagRepository.deleteByTagAndIssueId(oldTag, query.issueId);
        }
        for (String newTag : newTagList) {
            tag = tagRepository.findByName(newTag);
            if (tag == null) {
                tag = new Tag();
                tag.setName(newTag);
                tagRepository.save(tag);
            }
            issueTag = new IssueTag();
            issueTag.setTag(newTag);
            issueTag.setIssueId(query.issueId);
            issueTagRepository.save(issueTag);
        }

        return getIssueById(query.issueId, my_id);
    }

    public ResponseEntity<Object> newIssueActivity(NewActivityReq query, int my_id) {
        issue = issueRepository.findById(query.issueId);
        project = projectRepository.findById(issue.getProjectId());
        ProjectMember projectMember = projectMemberRepository.findByUserIdAndProjectId(my_id, project.getId());

        List<String> oldAssignList = issueMemberRepository.findAssignByIssueId(query.issueId);
        List<String> newAssignList = new ArrayList<String>(query.assignList);
        newAssignList.removeAll(oldAssignList);
        oldAssignList.removeAll(query.assignList);
        int assignActivityId = 0;
        if (newAssignList.size() != 0 || oldAssignList.size() != 0) {
            assignActivityId = addActivity(my_id, query.issueId, 5, 0, 0, null);
            for (String oldAssignName : oldAssignList) {
                removeAssignByUsername(oldAssignName, query.issueId, assignActivityId);
            }
            for (String newAssignName : newAssignList) {
                assignIssue(userRepository.findByUsername(newAssignName).getId(), query.issueId, issue.getName(), my_id,
                        assignActivityId);
            }
        }

        List<String> mentionList = query.mentionList;
        String message = "You have been mentions in issue <" + issue.getName() + ">.\n" + frontend + "#/i/"
                + query.issueId;

        if (mentionList.size() > 0) {
            for (String mentionUserName : mentionList) {
                User mentionUser = userRepository.findByUsername(mentionUserName);
                addIssueMember(mentionUser.getId(), query.issueId, 1);
                if (my_id != mentionUser.getId()) {
                    if (mentionUser.getLineId() != null && mentionUser.getisRevice()) {
                        lineService.pushMessage(message, mentionUser.getLineId());
                    }
                }
            }
        }

        if (project.getIsPrivate() && projectMember == null) {
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
        }
        if (issue.getState() != query.state) {
            sendChangeStateMsg(issue.getState(), query.state, query.issueId, issue.getName(), my_id,
                    project.getLineId());
            addActivity(my_id, query.issueId, 1, issue.getState(), query.state, null);
            issue.setState(query.state);

        }
        if (issue.getSeverity() != query.severity) {
            addActivity(my_id, query.issueId, 2, issue.getSeverity(), query.severity, null);
            issue.setSeverity(query.severity);
        }
        if (issue.getPriority() != query.priority) {
            addActivity(my_id, query.issueId, 3, issue.getPriority(), query.priority, null);
            issue.setPriority(query.priority);
        }
        if (issue.getIsReproducible() != query.isReproducible) {
            addActivity(my_id, query.issueId, 4, issue.getIsReproducible() ? 0 : 1, query.isReproducible ? 0 : 1, null);
            issue.setIsReproducible(query.isReproducible);
        }

        issueRepository.save(issue);
        if (query.content.length() > 0) {
            addActivity(my_id, query.issueId, 0, -1, -1, query.content);
        }
        return getIssueById(query.issueId, my_id);
    }

    public ResponseEntity<Object> editIssueActivity(EditActivityReq query, int my_id) {
        IssueActivity editComment = issueActivityRepository.findById(query.activityId);

        List<String> mentionList = query.mentionList;
        if (mentionList.size() > 0) {
            for (String mentionUser : mentionList) {
                int mentionUserId = userRepository.findByUsername(mentionUser).getId();
                addIssueMember(mentionUserId, query.issueId, 1);
                if (my_id != mentionUserId) {
                    User sendLineUser = userRepository.findById(mentionUserId);
                    if (sendLineUser.getLineId() != null && sendLineUser.getisRevice()) {
                        String message = "You have been mentions in issue <" + query.name + ">.\n" + frontend + "#/i/"
                                + query.issueId;
                        lineService.pushMessage(message, sendLineUser.getLineId());
                    }
                }
            }
        }

        editComment.setContent(query.comment);
        issueActivityRepository.save(editComment);

        return getIssueById(query.issueId, my_id);
    }

    private void removeAssignByUsername(String username, int issueId, int assignActivityId) {
        User user = userRepository.findByUsername(username);
        issueMember = issueMemberRepository.findByUserIdAndIssueId(user.getId(), issueId);
        issueMember.setIdentity(1);
        issueMemberRepository.save(issueMember);

        IssueAssign removeAssign = new IssueAssign();
        removeAssign.setActivityId(assignActivityId);
        removeAssign.setUserId(user.getId());
        removeAssign.setIsAdd(false);
        issueAssignRepository.save(removeAssign);
    }

    private int addActivity(int userId, int issueId, int type, int prevState, int nextState, String content) {
        IssueActivity temp = new IssueActivity();
        temp.setUserId(userId);
        temp.setType(type);
        temp.setIssueId(issueId);
        temp.setPrevState(prevState);
        temp.setNextState(nextState);
        temp.setContent(content);
        issueActivityRepository.save(temp);
        return temp.getId();
    }

    private void assignIssue(int user_id, int issueId, String issueName, int my_id, int assignActivityId) {
        Boolean addedNewAssign = false;
        issueMember = issueMemberRepository.findByUserIdAndIssueId(user_id, issueId);
        if (issueMember == null) {
            addIssueMember(user_id, issueId, 0);
            addedNewAssign = true;
        } else if (issueMember.getIdentity() != 0) {
            issueMember.setIdentity(0);
            issueMemberRepository.save(issueMember);
            addedNewAssign = true;
        }
        if (addedNewAssign) {
            IssueAssign newAssign = new IssueAssign();
            newAssign.setActivityId(assignActivityId);
            newAssign.setUserId(user_id);
            newAssign.setIsAdd(true);
            issueAssignRepository.save(newAssign);
            String title = "A issue assigned to you";
            String message = "Issue <" + issueName + "> is assigned to you.\n" + frontend + "#/i/" + issueId;
            if (my_id != user_id) {
                User sendLineUser = userRepository.findById(user_id);
                mailService.sendMail(sendLineUser.getEmail(), title, message);
                if (sendLineUser.getLineId() != null && sendLineUser.getisRevice()) {
                    lineService.pushMessage(message, sendLineUser.getLineId());
                }
            }
        }
    }

    private void addIssueMember(int user_id, int issueId, int identity) {
        issueMember = issueMemberRepository.findByUserIdAndIssueId(user_id, issueId);
        if (issueMember == null) {
            issueMember = new IssueMember();
            issueMember.setUserId(user_id);
            issueMember.setIssueId(issueId);
            issueMember.setIdentity(identity);
            issueMemberRepository.save(issueMember);
        }
    }

    private IssueActivityRes activityToActivityRes(IssueActivity query) {
        User user = userRepository.findById(query.getUserId());

        IssueActivityRes tempActivityRes = new IssueActivityRes();
        tempActivityRes.id = query.getId();
        tempActivityRes.type = query.getType();
        tempActivityRes.issueId = query.getIssueId();
        tempActivityRes.create_time = query.getCreateTime();
        tempActivityRes.content = query.getContent();
        tempActivityRes.prevState = query.getPrevState();
        tempActivityRes.nextState = query.getNextState();
        tempActivityRes.username = user.getUsername();
        tempActivityRes.userId = user.getId();
        tempActivityRes.avatarUrl = user.getAvatarUrl();
        if (tempActivityRes.type == 5) {
            tempActivityRes.assignList = new ArrayList<AssignRes>();
            List<IssueAssign> getAssign = issueAssignRepository.findByActivityId(query.getId());
            for (IssueAssign loopAssign : getAssign) {
                AssignRes assignRes = new AssignRes();
                assignRes.username = userRepository.findById(loopAssign.getUserId()).getUsername();
                assignRes.isAdd = loopAssign.getIsAdd();
                tempActivityRes.assignList.add(assignRes);
            }
        }
        return tempActivityRes;
    }

    private IssueRes issueToIssueRes(Issue query) {
        IssueRes tempIssueRes = new IssueRes();
        User reportUser = userRepository.findById(query.getReportUser());
        tempIssueRes.id = query.getId();
        tempIssueRes.name = query.getName();
        tempIssueRes.description = query.getDescription();
        tempIssueRes.projectId = query.getProjectId();
        tempIssueRes.projectName = projectRepository.findById(query.getProjectId()).getName();
        tempIssueRes.projectOwner = userRepository.findOwnerByProjectId(query.getProjectId()).getUsername();
        tempIssueRes.state = query.getState();
        tempIssueRes.severity = query.getSeverity();
        tempIssueRes.priority = query.getPriority();
        tempIssueRes.isReproducible = query.getIsReproducible();
        tempIssueRes.create_time = query.getCreateTime();
        tempIssueRes.reportUser = reportUser.getUsername();
        tempIssueRes.reportUserAvatar = reportUser.getAvatarUrl();
        tempIssueRes.tags = issueTagRepository.findTagByIssueId(tempIssueRes.id);
        tempIssueRes.assignList = issueMemberRepository.findAssignByIssueId(tempIssueRes.id);
        return tempIssueRes;
    }

    private void sendChangeStateMsg(int prevState, int nextState, int issueId, String name, int my_id, String groupId) {
        String[] STATE_OPTION = { "Open", "In Progress", "Ready To Test", "Resolve", "Won't fix", "Abandoned" };
        List<User> userMamberList = userRepository.findIssueMemberByIssueId(issueId);
        String title = "Issue state change";
        String message = "Issue <" + issue.getName() + "> 's state changed from " + STATE_OPTION[prevState] + " to "
                + STATE_OPTION[nextState] + ".\n" + frontend + "#/i/" + issueId;
        if (groupId != null) {
            lineService.pushMessage(message, groupId);
        }
        for (User userMember : userMamberList) {
            if (my_id != userMember.getId()) {
                mailService.sendMail(userMember.getEmail(), title, message);
                if (userMember.getLineId() != null && userMember.getisRevice()) {
                    lineService.pushMessage(message, userMember.getLineId());
                }
            }
        }
    }
}