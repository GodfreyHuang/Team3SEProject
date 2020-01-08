import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddButton from '../../../components/AddButton';
import TextInput from '../../../components/TextInput';
import LoadingSpinner from '../../../components/LoadingSpinner';
import MemberCard from './MemberCard';

import { CONST } from '../constants';
import { HIT_BOTTOM, IDENTITY_OPTION } from '../../../utils/configConst';
import { toLocalTime } from '../../../utils/generalUtils';

import PROFILE_IMAGE from '../../../utils/image/user_icon.svg';
import * as actions from '../actions';

import './style.scss';

const MemberTab = ({}) => {
    const dispatch = useDispatch();
    const {
        projectDetail,
        projectMemberList,
        isFetchingProjectMember,
        isProjectMemberFetchBottom,
        projectMemberTimestamp,
        isAddingMember,
        addMemberErrMsg
    } = useSelector(state => state.ProjectDetailReducer);

    const [searchMember, setSerachMember] = useState('');
    const [identity, setIdentity] = useState(1);

    const handleFetchMember = () => {
        actions.fetchProjectMember(
            projectDetail.id,
            projectMemberTimestamp
        )(dispatch);
    };

    const handleScroll = () => {
        if (
            window.innerHeight + Math.ceil(window.scrollY) >=
                document.body.offsetHeight &&
            !isFetchingProjectMember &&
            !isProjectMemberFetchBottom
        ) {
            handleFetchMember();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    useEffect(() => {
        if (projectMemberTimestamp === null) {
            handleFetchMember();
        }
    }, []);

    const handleInput = e => {
        const { value, name } = e.target;
        if (name === CONST.searchMember) setSerachMember(value);
        if (name === CONST.identity) setIdentity(value);
    };

    const handleAddMember = () => {
        if (searchMember.length && !isAddingMember) {
            actions.addProjectMember(
                projectDetail.id,
                searchMember,
                identity,
                setSerachMember
            )(dispatch);
        }
    };

    return (
        <div className="MemberTab_container w-full">
            <div className="MemberTab_header flex justify-between mb-6">
                <div className="MemberTab_title text-20 font-semibold">
                    {CONST.memberTab_title}
                </div>
                {projectDetail.identity <= 1 ? (
                    <div className="MemberTab_add_container flex text-20 items-center ">
                        <div className="MemberTab_add_container_border flex justify-between ">
                            <TextInput
                                type="text"
                                name="searchMember"
                                onChange={handleInput}
                                value={searchMember}
                                placeholder={CONST.searchMember_placeholder}
                                alertMessage={addMemberErrMsg}
                            />
                            <select
                                className="memberTab_identity"
                                name={CONST.identity}
                                onChange={handleInput}
                                value={identity}
                            >
                                {IDENTITY_OPTION.map((optionPlaceHolder, i) => {
                                    if (i === 0) return null;
                                    return (
                                        <option
                                            value={i}
                                            key={`${CONST.identity}_${i}_${optionPlaceHolder}`}
                                        >
                                            {optionPlaceHolder}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <AddButton
                            action={handleAddMember}
                            wording={CONST.addMember}
                        />
                    </div>
                ) : null}
            </div>

            <div className="MemberTab_members_container flex">
                {projectMemberList.map(e => (
                    <MemberCard
                        key={`memberTab_member${e.id}`}
                        projectDetail={projectDetail}
                        memberDetail={e}
                    />
                ))}
                {isFetchingProjectMember ? <LoadingSpinner /> : null}
                {/*{isProjectMemberFetchBottom ? HIT_BOTTOM : null}*/}
            </div>
        </div>
    );
};

export default MemberTab;
