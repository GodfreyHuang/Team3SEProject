import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector, useStore } from 'react-redux';

import IssueCard from '../../../components/IssueCard';
import LoadingSpinner from '../../../components/LoadingSpinner';

import { CONST } from '../constants';
import { HIT_BOTTOM } from '../../../utils/configConst';
import * as actions from '../actions';
import './style.scss';
const IssueTab = ({}) => {
    const dispatch = useDispatch();
    const [showClosed, setShowClosed] = useState(false);
    const {
        projectDetail,
        projectIssueList,
        isFetchingProjectIssue,
        isProjectIssueFetchBottom,
        projectIssueTimestamp,
        projectClosedIssueList,
        isFetchingProjectClosedIssue,
        isProjectClosedIssueFetchBottom,
        projectClosedIssueTimestamp
    } = useSelector(state => state.ProjectDetailReducer);

    const handleFetchIssue = () => {
        actions.fetchProjectIssue(
            projectDetail.id,
            showClosed ? projectClosedIssueTimestamp : projectIssueTimestamp,
            showClosed
        )(dispatch);
    };

    const handleScroll = () => {
        if (
            window.innerHeight + Math.ceil(window.scrollY) >=
                document.body.offsetHeight &&
            ((showClosed &&
                !isFetchingProjectClosedIssue &&
                !isProjectClosedIssueFetchBottom) ||
                (!showClosed &&
                    !isFetchingProjectIssue &&
                    !isProjectIssueFetchBottom))
        ) {
            handleFetchIssue();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    useEffect(() => {
        if (!showClosed) {
            if (projectIssueTimestamp === null) {
                handleFetchIssue();
            }
        } else {
            if (projectClosedIssueTimestamp === null) {
                handleFetchIssue();
            }
        }
    }, [showClosed]);
    const displayList = showClosed ? projectClosedIssueList : projectIssueList;
    const displayBottom = showClosed
        ? isProjectClosedIssueFetchBottom
        : isProjectIssueFetchBottom;
    const displayFetching = showClosed
        ? isFetchingProjectClosedIssue
        : isFetchingProjectIssue;
    return (
        <>
            <div className="IssueTab_header flex justify-between">
                <div className="IssueTab_title text-20 font-semibold">
                    {CONST.issueTab_title}
                </div>
                <div
                    className={`cursor-pointer IssueTab_title_border bg-${
                        showClosed
                            ? 'white text-red-600'
                            : 'cancel-active border_closed text-white '
                    }`}
                    onClick={() => {
                        setShowClosed(!showClosed);
                    }}
                >
                    {showClosed ? 'Active' : 'Closed'}
                </div>
            </div>

            <div className="IssueTab_Issues_container">
                {displayList.map(e => (
                    <IssueCard key={`pit${e.id}`} issue={e} />
                ))}
                {displayFetching ? <LoadingSpinner /> : null}
                {displayBottom ? HIT_BOTTOM : null}
            </div>
        </>
    );
};

export default IssueTab;
