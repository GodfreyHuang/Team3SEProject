drop database if exists itsdb;
CREATE DATABASE itsdb;
use itsdb;
CREATE USER if not exists 'itsAdmin'@'localhost' IDENTIFIED BY 'itsAdmin';
GRANT ALL ON itsdb.* TO 'itsAdmin'@'localhost';

/*use heroku_ff3cf74fd781b0c;*/

CREATE TABLE User(
id int not null AUTO_INCREMENT, 
username varchar(255) not null,
email varchar(255) not null, 
password varchar(255) not null,
avatar_Url varchar(512),
line_Id varchar(512),
is_revice boolean,
auth_key varchar(255),
primary key(id),
unique(email),
unique(username)
);

CREATE TABLE User_Session(
user_Id int not null,
session_Id varchar(255),
active_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON update CURRENT_TIMESTAMP,
primary key(user_Id,session_Id),
foreign key(user_Id) references User(id)
);

CREATE TABLE PROJECT(
id int not null AUTO_INCREMENT,
name varchar(255) not null,
description varchar(10240),
is_private boolean not null,
create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
line_Id varchar(255),
primary key(id)
);

CREATE TABLE PROJECT_MEMBER(
user_Id int not null,
project_Id int not null,
identity int not null,
join_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
primary key(user_Id,project_Id),
foreign key(user_Id) references User(id),
foreign key(project_Id) references PROJECT(id)
);

CREATE TABLE ISSUE(
id int not null AUTO_INCREMENT,
name varchar(255) not null,
description varchar(10240),
report_user int not null,
project_Id int not null,
state int not null,
severity int not null,
priority int not null,
is_Reproducible boolean not null,
create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
primary key(id),
foreign key(report_user) references User(id),
foreign key(project_Id) references Project(id)
);

CREATE TABLE ISSUE_MEMBER(
user_Id int not null,
issue_Id int not null,
identity int not null,
join_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
primary key(user_Id,issue_Id),
foreign key(user_Id) references User(id),
foreign key(issue_Id) references ISSUE(id)
);

CREATE TABLE ISSUE_ACTIVITY(
	id int not null AUTO_INCREMENT,
    activity_type int not null, /*0 comment , 1 state, 2 severity, 3 priority, 4 Reproducible, 5 assign*/
    issue_Id int not null,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content varchar(10240),
    prev_State int,
    next_State int,
    user_id int not null,
	primary key(id),
    foreign key(issue_Id) references ISSUE(id),
    foreign key(user_Id) references User(id)
);

CREATE TABLE TAG(
	name varchar(20) not null,
    primary key(name)
);

CREATE TABLE ISSUE_TAG(
	tag varchar(20)not null,
    issue_id int not null,
	primary key(tag,issue_id),
	foreign key(tag) references TAG(name),
	foreign key(issue_id) references ISSUE(id)
);

CREATE TABLE ISSUE_ASSIGN(
	user_Id int not null,
    activity_Id int not null,
    is_add boolean not null,
    primary key(user_id,activity_Id),
    foreign key(user_id) references User(id),
    foreign key(activity_Id) references ISSUE_ACTIVITY(id)
);

/*user*/
insert into user (username,email,password) values('test','test@mail.com','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b');
insert into user (username,email,password) values('test1','test1@mail.com','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b');
insert into user (username,email,password) values('test2','test2@mail.com','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b');
insert into user (username,email,password) values('test3','test3@mail.com','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b');
insert into user (username,email,password) values('test4','test4@mail.com','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b');
insert into user (username,email,password) values('test5','test5@mail.com','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b');
insert into user (username,email,password) values('test6','test6@mail.com','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b');
insert into user (username,email,password) values('test7','test7@mail.com','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b');

/*tag*/
insert into TAG values ('problem');
insert into TAG values ('error');
insert into TAG values ('bug');
insert into TAG values ('suggest');
insert into TAG values ('question');
insert into TAG values ('enhancement');
insert into TAG values ('features');

/*project #1*/
insert into PROJECT (name,description,is_private,create_time) values('animated-mesh-lines','Tutorial and demos for Codrops about how play with the THREE.MeshLine library',False,'2019-12-01 00:00:01');
insert into PROJECT_MEMBER (user_Id,project_Id,identity,join_time) values('1','1','0','2019-12-01 00:00:02');
insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) values('fragment rendering errors for PrefabBufferGeometry + PhongAnimationMateria','I am not able to get PrefabBufferGeometry instances with PhongAnimationMaterial to render correctly when they\'re overlapping on the screen. It seems like the fragment shader isn\'t able to correctly depth sort. I\'m updating transformed in the vertex shader to position the object but the fragment shader isn\'t picking up on it. Is there a way to correct this, or should I just stick to ToonAnimationMaterial like in the examples?','1','1','1','2','3',True,'2019-12-01 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','1','2019-12-01 00:00:02','-1','1','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('2','1','2019-12-01 00:00:02','-1','2','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('3','1','2019-12-01 00:00:02','-1','3','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('4','1','2019-12-01 00:00:02','-1',true,'1');
insert into ISSUE_TAG values ('problem','1');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) values('Memory leak of demo5 - boreal sky','Opening this demo，and I found that my PC\'s memory went full very quickly.So，what\'s happening? I use windows 10 and chrome or IE.','1','1','2','3','4',True,'2019-12-01 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','2','2019-12-01 00:00:02','-1','2','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('2','2','2019-12-01 00:00:02','-1','3','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('3','2','2019-12-01 00:00:02','-1','4','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('4','2','2019-12-01 00:00:02','-1',true,'1');
insert into ISSUE_TAG values ('question','2');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) values('Conditionally showing Embedded Scene resets scroll position.','I\'m having this issue where the page\'s scroll position is reset to zero when I need to conditionally add an embedded scene to my page. I threw together a pared down example based on the ngokevin/aframe-react-boilerplate to help me debug. (scroll down, click toggle, scroll position is reset )
Has anyone else run into this before?
Will follow up with what I find.','1','1','1','4','1',True,'2019-12-01 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','3','2019-12-01 00:00:02','-1','1','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('2','3','2019-12-01 00:00:02','-1','4','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('3','3','2019-12-01 00:00:02','-1','1','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('4','3','2019-12-01 00:00:02','-1',true,'1');
insert into ISSUE_TAG values ('question','3');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) values('Accessibility: image background and alt description ','When reading the Markdown file with an application with dark background, or when using dark background in Github (with browser modules etc.), somes images are not legible.','1','1','1','4','0',True,'2019-12-01 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','4','2019-12-01 00:00:02','-1','1','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('2','4','2019-12-01 00:00:02','-1','4','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('3','4','2019-12-01 00:00:02','-1','0','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('4','4','2019-12-01 00:00:02','-1',true,'1');
insert into ISSUE_TAG values ('suggest','4');

/*project #2*/
insert into PROJECT (name,description,is_private,create_time) 
values('aframe-react','Build virtual reality experiences with A-Frame and React.',False,'2019-12-01 00:00:01');
insert into PROJECT_MEMBER (user_Id,project_Id,identity,join_time) values('1','2','0','2019-12-01 00:00:02');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Support server-side universal/isomorphic','Currently tied to AFRAME.components. Can\'t include A-Frame because of window.aframevr/aframe#203','1','2','1','1','2',True,'2019-12-01 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','5','2019-12-01 00:00:02','-1','1','1');
insert into ISSUE_TAG values ('enhancement','5');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can three.bas be used to achieve gltf model animation?','In my project, I want to achieve a scene in which many vehicles are driving. Now I hava a glb car model , Can three.bas be used to achieve this scene ?','1','2','3','4','1',True,'2019-12-01 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','6','2019-12-03 00:00:02','-1','3','1');
insert into ISSUE_TAG values ('question','6');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 109','Can you support the latest version?Version 109','1','2','1','0','0',True,'2019-12-01 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','7','2019-12-04 00:00:02','-1','3','1');
insert into ISSUE_TAG values ('enhancement','7');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','3','0','2',True,'2019-12-03 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','8','2019-12-04 00:00:02','1','3','1');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','2','0','2',True,'2019-12-04 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','9','2019-12-04 00:00:02','1','3','1');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','3','0','3',True,'2019-12-05 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','10','2019-12-04 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','3','0','3',True,'2019-12-05 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','11','2019-12-05 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','1','0','3',True,'2019-12-05 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','12','2019-12-06 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 122','Can you support the latest version?Version 109','1','2','4','1','2',True,'2019-12-07 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','13','2019-12-07 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','1','0','1',True,'2019-12-08 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','14','2019-12-06 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 122','Can you support the latest version?Version 109','1','2','1','0','1',True,'2019-12-08 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','15','2019-12-08 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','2','1','3',True,'2019-12-09 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','16','2019-12-0900:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 122','Can you support the latest version?Version 109','1','2','2','3','3',True,'2019-12-010 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','17','2019-12-10 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','2','0','2',True,'2019-12-11 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','18','2019-12-11 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 122','Can you support the latest version?Version 109','1','2','3','3','3',True,'2019-12-12 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','19','2019-12-12 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','0','1','0',True,'2019-12-13 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','20','2019-12-15 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 122','Can you support the latest version?Version 109','1','2','1','3','3',True,'2019-12-16 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','21','2019-12-18 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','2','1','0',True,'2019-12-17 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','22','2019-12-18 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 122','Can you support the latest version?Version 109','1','2','3','2','3',True,'2019-12-18 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','23','2019-12-20 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','4','1','1',True,'2019-12-18 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','24','2019-12-18 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 122','Can you support the latest version?Version 109','1','2','0','1','2',True,'2019-12-18 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','25','2019-12-18 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','1','2','3',True,'2019-12-19 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','26','2019-12-19 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 122','Can you support the latest version?Version 109','1','2','2','3','4',True,'2019-12-19 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','27','2019-12-19 00:00:02','1','3','1');


insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','3','1','1',True,'2019-12-20 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','28','2019-12-20 00:00:02','1','3','1');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','3','1','1',True,'2019-12-21 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','29','2019-12-23 00:00:02','1','3','1');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','3','1','1',True,'2019-12-21 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','30','2019-12-23 00:00:02','1','3','1');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','3','1','1',True,'2019-12-23 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','31','2019-12-23 00:00:02','1','3','1');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) 
values('Can you support the latest version?Version 1','Can you support the latest version?Version 109','1','2','3','1','1',True,'2019-12-23 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','32','2019-12-23 00:00:02','1','3','1');

/*project #3
insert into PROJECT (name,description,is_private,create_time) values('threex.geometricglow','a three.js extension to make any object glow at geometric level',True,'2019-12-01 00:00:01');
insert into PROJECT_MEMBER (user_Id,project_Id,identity,join_time) values('1','3','0','2019-12-01 00:00:02');
insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) values('BufferGeomerty','If support bufferGeomerty will be better','1','3','0','2','0',True,'2019-12-01 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','29','2019-12-01 00:00:02','-1','0','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('2','29','2019-12-01 00:00:02','-1','2','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('3','29','2019-12-01 00:00:02','-1','0','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('4','29','2019-12-01 00:00:02','-1',true,'1');
insert into ISSUE_TAG values ('suggest','29');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) values('setDynamic() has been deprecated (warning)','Hello,
The following warnings are displayed when run on Chrome:

three.module.js:33602 THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead.
setDynamic @ three.module.js:33602
three.module.js:33623 THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute().','1','3','1','0','1',True,'2019-12-01 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','30','2019-12-01 00:00:02','-1','1','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('2','30','2019-12-01 00:00:02','-1','0','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('3','30','2019-12-01 00:00:02','-1','1','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('4','30','2019-12-01 00:00:02','-1',true,'1');
insert into ISSUE_TAG values ('error','30');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) values('React Three Fiber','Your project is interesting, but it would be great to see a particle system utility built FOR react-three-fiber, instead of on top of it. I was wondering if you had any plans for something like that.','1','3','2','2','1',True,'2019-12-01 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','31','2019-12-01 00:00:02','-1','2','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('2','31','2019-12-01 00:00:02','-1','2','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('3','31','2019-12-01 00:00:02','-1','1','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('4','31','2019-12-01 00:00:02','-1',true,'1');
insert into ISSUE_TAG values ('features','31');*/

/*project #4
insert into PROJECT (name,description,is_private,create_time) values('particles.js','A lightweight, dependency-free and responsive javascript plugin for particle backgrounds.',True,'2019-12-01 00:00:01');
insert into PROJECT_MEMBER (user_Id,project_Id,identity,join_time) values('1','4','0','2019-12-01 00:00:02');
insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) values('reset ','it will be reset when form inputed , used antd form','1','4','0','2','4',True,'2019-12-01 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','32','2019-12-01 00:00:02','-1','0','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('2','32','2019-12-01 00:00:02','-1','2','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('3','32','2019-12-01 00:00:02','-1','4','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('4','32','2019-12-01 00:00:02','-1',true,'1');
insert into ISSUE_TAG values ('suggest','32');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) values('Add option for particle bounce.','Right now particles are just deleted when they hit an edge of the canvas and this just doesnt look nice in all situations. There should be an option to allow for bouncing when hitting canvas bounds.','1','4','2','0','3',True,'2019-12-01 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','33','2019-12-01 00:00:02','-1','2','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('2','33','2019-12-01 00:00:02','-1','0','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('3','33','2019-12-01 00:00:02','-1','3','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('4','33','2019-12-01 00:00:02','-1',true,'1');
insert into ISSUE_TAG values ('question','33');

insert into ISSUE (name,description,report_user,project_Id,state,severity,priority,is_Reproducible,create_time) values('Cannot read property of null when color is short notation ','it will be reset when form inputed , used antd form','1','4','2','2','0',True,'2019-12-01 00:01:02');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('1','34','2019-12-01 00:00:02','-1','2','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('2','34','2019-12-01 00:00:02','-1','2','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('3','34','2019-12-01 00:00:02','-1','0','1');
insert into ISSUE_ACTIVITY (activity_type,issue_Id,create_time,prev_State,next_State,user_id) values('4','34','2019-12-01 00:00:02','-1',true,'1');
insert into ISSUE_TAG values ('problem','34');*/