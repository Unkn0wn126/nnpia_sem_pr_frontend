import './App.css';
import React from "react";
import { BrowserRouter as Router, Link, Navigate, Routes, Route } from "react-router-dom";
import Button from '@mui/material/Button';
import { AppBar } from '@mui/material';
import IssueService from './services/issue.service';
import AuthService from './services/auth.service';

function App() {
  //IssueService.getAllPublicIssues().then(data => console.log(data));
  // IssueService.getPublicIssuesByAuthorName("rando").then(data => console.log(data));
  // IssueService.getPublicIssueById(1).then(data => console.log(data));
    /*IssueService.getAllIssues()
    .then(data => console.log(data))
    .catch((error) => {
      console.log(error)
    });*/
    //AuthService.login({username: "rando", password: "P4ssw0rd$"});
    IssueService.getAllIssues()
    .then(data => console.log(data))
    .catch((error) => {
      console.log(error)
    });
    // AuthService.register({username: "newwuser", email: "neww@example.com", password: "P4ssw0rd$", profile: { nickname: "Neww user", profilePicturePath: null}});

  return (
    <div>
    </div>
  )
}

export default App;
