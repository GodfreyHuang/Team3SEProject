import React from "react";

import { HashRouter as Router, Route } from "react-router-dom";
import LoginFrom from "./components/AuthFrom/LoginForm";
import RegisterFrom from "./components/AuthFrom/RegisterFrom";
import Dashboard from "./components/Dashboard";
import ProjectDetail from "./containers/ProjectDetail";
import IssueDetail from "./components/IssueDetail";
import Setting from "./components/Setting";
import Projects from "./containers/Projects";
import Issue from "./containers/Issue";
import Auth from "./containers/Auth";
import Layout from "./components/Layout";
import { version } from "../package.json";

import * as PATH from "./utils/pathConst";

import "./App.css";
function App() {
  console.log("version " + version);
  console.log(process.env);
  return (
    <div className="App">
      <Router basename="/">
        <Layout>
          <Route path={PATH.LOGIN} component={LoginFrom} />
          <Route path={PATH.REGISTER} component={RegisterFrom} />
          <Route path={PATH.AUTH} component={Auth} />
          <Route path={PATH.DASHBOARD} component={Dashboard} />
          <Route path={PATH.PROJECT} component={Projects} />
          <Route path={PATH.ISSUE} component={Issue} />
          <Route path={PATH.SETTING} component={Setting} />
          <Route path={PATH.PROJECT_DETIAL} component={ProjectDetail} />
          <Route path={PATH.ISSUE_DETIAL} component={IssueDetail} />
          <Route path="/" exact component={LoginFrom} />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
