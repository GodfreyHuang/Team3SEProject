import React from 'react';

import { Link } from 'react-router-dom';
import PRIVATE_ICON from '../../utils/image/locked_project.svg';
import PUBLIC_ICON from '../../utils/image/project.svg';

import { PROJECT_DETIAL_LINK } from '../../utils/pathConst';
import { toLocalTime } from '../../utils/generalUtils';
import { CONST } from './constant';
import './style.scss';

const ProjectCard = ({
    id,
    name,
    description,
    create_time,
    isPrivate,
    owner
}) => {
    return (
        <Link to={PROJECT_DETIAL_LINK(owner, name)}>
            <div className="projectCard w-full">
                <div className="projectCard_title flex justify-between">
                    <div className="font-semibold text-20 flex justify-start items-center">
                        <img
                            className="projectCard_icon"
                            src={isPrivate ? PRIVATE_ICON : PUBLIC_ICON}
                        />
                        {`${CONST.title}${name}`}
                    </div>

                    <div className=" text-16 flex justify-end text-gray-800">
                        {`${toLocalTime(create_time)}`}
                    </div>
                </div>
                <div className="text-20 flex justify-between">
                    <div className=" text-16 flex justify-start">
                        {`${CONST.createdBy}${owner}`}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
