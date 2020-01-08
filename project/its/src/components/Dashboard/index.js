import React, { useState, useEffect } from "react";

import CardLayout from "../CardLayout";
import LoadingSpinner from "../LoadingSpinner";
import IssueCard from "../IssueCard";

import IssueApi from "../../utils/api/apifetcher/issue";
import "./style.scss";

const Dashboard = () => {
  const [issueList, setIssueList] = useState(null);

  useEffect(() => {
    const query = {
      timestamp: null,
      user_id: localStorage.getItem("profileId"),
      limit: 999,
      isOwner: true
    };
    IssueApi.getIssueByUserId(query).then(
      res => {
        const { data } = res;
        setIssueList(data);
      },
      rej => {
        setIssueList([]);
      }
    );
  }, []);

  return (
    <div className="dashboard w-full bg-gray-200 flex">
      <div className="w-full md:w-1/2 lg:w-2/3">
        <CardLayout>
          <div className="dashboard_title text-20 font-semibold flex">
            Welcome to ITS
          </div>
          <div className="hl"></div>
          <div className="dashboard_content text-18 flex">
            An issue tracking system (also ITS, trouble ticket system, support
            ticket, request management or incident ticket system) is a computer
            software package that manages and maintains lists of issues. Issue
            tracking systems are generally used in collaborative
            settings—especially in large or distributed collaborations—but can
            also be employed by individuals as part of a time management or
            personal productivity regime. These systems often encompass resource
            allocation, time accounting, priority management, and oversight
            workflow in addition to implementing a centralized issue registry.
          </div>
        </CardLayout>
        <CardLayout>
          <div>Issue assiged to you:</div>
          {issueList === null ? (
            <LoadingSpinner />
          ) : (
            issueList.map((e, i) => {
              return (
                <div key={`dashboard_issueList${i}${e.id}`}>
                  <IssueCard key={`pit${e.id}`} issue={e} />
                </div>
              );
            })
          )}
        </CardLayout>
      </div>
    </div>
  );
};

export default Dashboard;
