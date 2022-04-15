import './App.css';
import React from "react";
import { BrowserRouter as Router, Link, Navigate, Routes, Route } from "react-router-dom";
import Button from '@mui/material/Button';
import { AppBar } from '@mui/material';
import IssueService from './services/issue.service';
import AuthService from './services/auth.service';
import Login from './components/authentication/Login';

function App() {
  //IssueService.getAllPublicIssues().then(data => console.log(data));
  // IssueService.getPublicIssuesByAuthorName("rando").then(data => console.log(data));
  // IssueService.getPublicIssueById(1).then(data => console.log(data));
    /*IssueService.getAllIssues()
    .then(data => console.log(data))
    .catch((error) => {
      console.log(error)
    });*/
    // AuthService.login({username: "admin", password: "P4ssw0rd$"});

    //IssueService.createIssue({content: "Some content", dueDate: null, header: "Posted from frontend!", severity: "LOW", visibility: "PUBLIC"});
    // IssueService.deleteIssue(2);
    //IssueService.updateIssue(1, {content: "Some content", dueDate: null, header: "Posted from frontend!", severity: "LOW", visibility: "INTERNAL", completionState: "IN_PROGRESS"});
    // IssueService.createIssue({content: "Some content", dueDate: null, header: "Posted from frontend!", severity: "LOW", visibility: "PUBLIC"});
    // AuthService.register({username: "newwuser", email: "neww@example.com", password: "P4ssw0rd$", profile: { nickname: "Neww user", profilePicturePath: null}});

  return (
    <div>
      <Login></Login>
    </div>
  )
}

export default App;
