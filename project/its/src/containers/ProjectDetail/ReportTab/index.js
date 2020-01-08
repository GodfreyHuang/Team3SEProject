import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CONST } from "../constants";
import { toLocalTime } from "../../../utils/generalUtils";

import LineChart from "../../../components/LineChart";
import FormInput from "../../../components/FormInput";

import {
  red_alert,
  inputType,
  PRIORITY_OPTION
} from "../../../utils/configConst";
import ProjectApi from "../../../utils/api/apifetcher/project";

import * as actions from "../actions";

const ReportTab = ({ projectDetail }) => {
  const [day, setDay] = useState(0);
  const [priority, setPriority] = useState(0);
  const [lables, setLables] = useState([]);
  const [dataset, setDataset] = useState([]);
  const dayList = [7, 10, 31];
  const priorityList = [-1, 0, 1, 2, 3, 4, 5];
  const LastDays = daysCount => {
    var result = [];
    for (var i = 0; i < daysCount; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push(d.getDate());
    }

    return result;
  };

  const getReport = closed => {
    const days = LastDays(dayList[day]).reverse();
    return ProjectApi.getProjectReport({
      projectId: projectDetail.id,
      day: dayList[day],
      priority: priorityList[priority],
      closed
    }).then(res => {
      const tempDataSet = [];
      days.forEach(e => {
        const index = res.data.day.indexOf(e);
        if (index != -1) {
          tempDataSet.push(res.data.count[index]);
        } else {
          tempDataSet.push(0);
        }
      });
      return tempDataSet;
    });
  };

  useEffect(() => {
    const days = LastDays(dayList[day]).reverse();
    const getData = async () => {
      const newDataSet = [];
      newDataSet.push({
        name: "New Issue",
        data: await getReport(false),
        color: "rgba(75, 192, 192, 1)"
      });
      newDataSet.push({
        name: "Closed Issue",
        data: await getReport(true),
        color: "rgba(192, 192, 192, 1)"
      });
      setDataset(newDataSet);
    };
    setLables(days);
    getData();
  }, [day, priority]);
  const handleInput = e => {
    const { name } = e.target;
    const { value } = e.target;
    switch (name) {
      case "day":
        setDay(value);
        break;
      case "priority":
        setPriority(value);
        break;
      default:
        break;
    }
  };
  const inputList = [
    {
      name: "day",
      title: "Days",
      value: day,
      option: dayList,
      inputType: inputType.radio
    },
    {
      name: "priority",
      title: "Priority",
      value: priority,
      option: ["All", ...PRIORITY_OPTION],
      inputType: inputType.radio
    }
  ];

  return (
    <div className="w-full">
      <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
        <FormInput inputList={inputList} handleInput={handleInput} />
        <LineChart labels={lables} dataset={dataset} />
      </div>
    </div>
  );
};

export default ReportTab;
