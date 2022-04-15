import './App.css';
import React from "react";
import { BrowserRouter as Router, Link, Navigate, Routes, Route } from "react-router-dom";
import Button from '@mui/material/Button';
import { AppBar } from '@mui/material';
import IssueService from './services/issue.service';

function App() {
  //IssueService.getAllPublicIssues().then(data => console.log(data));
  // IssueService.getPublicIssuesByAuthorName("rando").then(data => console.log(data));
  // IssueService.getPublicIssueById(1).then(data => console.log(data));
    IssueService.getAllIssues()
    .then(data => console.log(data))
    .catch((error) => {
      console.log(error)
    });

  return (
    <div>
    </div>
  )
}

export default App;
