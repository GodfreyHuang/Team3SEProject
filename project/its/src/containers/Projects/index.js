import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import AddButton from '../../components/AddButton';
import PopUp from '../../components/PopUp';
import LoadingSpinner from '../../components/LoadingSpinner';
import ProjectForm from '../../components/ProjectForm';
import ProjectCard from '../../components/ProjectCard';
import { HIT_BOTTOM } from '../../utils/configConst';
import { NEW_PROJECT, TITLE } from './constants';
import * as actions from './actions';
import './style.scss';

import CardLayout from '../../components/CardLayout';
const Projects = () => {
    const dispatch = useDispatch();
    const {
        projectList,
        projectTimestamp,
        isFetchingProject,
        isProjectFetchBottom,

        isAddingProject,
        showNewProjectForm,
        newProjectErrorMsg
    } = useSelector(state => state.ProjectsReducer);

    useEffect(() => {
        if (projectTimestamp === null) actions.fetchProjects()(dispatch);
    }, []);

    const handleScroll = () => {
        if (
            window.innerHeight + Math.ceil(window.scrollY) >=
                document.body.offsetHeight &&
            !isFetchingProject &&
            !isProjectFetchBottom
        ) {
            actions.fetchProjects(projectTimestamp)(dispatch);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    const toggleNewProjectForm = () => {
        actions.toggleNewProjectForm()(dispatch);
    };

    const handleSubmit = query => {
        if (!isAddingProject) actions.addNewProject(query)(dispatch);
    };

    return (
        <>
            <div className="project_container w-full bg-gray-200">
                <CardLayout>
                    <div className="project_header w-full flex justify-between items-center">
                        <p className=" text-20 font-semibold">{TITLE}</p>
                        <AddButton
                            action={toggleNewProjectForm}
                            wording={NEW_PROJECT}
                        />
                    </div>

                    <div className="project_list w-full">
                        {projectList.map(e => {
                            return (
                                <ProjectCard
                                    key={`$projectCard${e.id}`}
                                    id={e.id}
                                    name={e.name}
                                    description={e.description}
                                    create_time={e.create_time}
                                    isPrivate={e.isPrivate}
                                    owner={e.owner}
                                />
                            );
                        })}
                        {isFetchingProject ? <LoadingSpinner /> : null}
                        {isProjectFetchBottom ? HIT_BOTTOM : null}
                    </div>
                </CardLayout>
            </div>

            {showNewProjectForm ? (
                <PopUp>
                    <ProjectForm
                        handleCancel={
                            isAddingProject ? null : toggleNewProjectForm
                        }
                        handleSubmit={handleSubmit}
                        errorMsg={newProjectErrorMsg}
                    />
                </PopUp>
            ) : null}
        </>
    );
};

export default Projects;
