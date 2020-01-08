import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import * as actions from './actions';

import LoadingSpinner from '../../components/LoadingSpinner';
import IssueCard from '../../components/IssueCard';

import { HIT_BOTTOM } from '../../utils/configConst';
import { TITLE } from './constants';
import './style.scss';
import CardLayout from '../../components/CardLayout';

const Issue = () => {
    const {
        issueList,
        isFetchingIssue,
        isIssueFetchBottom,
        issueTimestamp
    } = useSelector(state => state.IssueReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!issueTimestamp) actions.fetchIssue(null)(dispatch);
    }, []);

    const handleScroll = () => {
        if (
            window.innerHeight + Math.ceil(window.scrollY) >=
                document.body.offsetHeight &&
            !isFetchingIssue &&
            !isIssueFetchBottom
        ) {
            actions.fetchIssue(issueTimestamp)(dispatch);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
    return (
        <>
            <div className="issue_container w-full bg-gray-200">
                <CardLayout>
                    <div className="issue_header w-full flex justify-between items-center">
                        <p className=" text-20 font-semibold">{TITLE}</p>
                    </div>
                    <div className="issue_list w-full">
                        {issueList.map((e, i) => {
                            return (
                                <div key={`issueList${i}${e.id}`}>
                                    <IssueCard key={`pit${e.id}`} issue={e} />
                                </div>
                            );
                        })}
                        {isFetchingIssue ? <LoadingSpinner /> : null}
                    </div>{' '}
                </CardLayout>
            </div>
        </>
    );
};

export default Issue;
