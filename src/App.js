import './App.css';
import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Navigate, Routes, Route } from "react-router-dom";
import Button from '@mui/material/Button';
import { AppBar } from '@mui/material';
import IssueService from './services/issue.service';
import AuthService from './services/auth.service';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/nav/Navbar';
import { UserContext } from './providers/UserContext'
import IssueDashboard from './pages/issues/IssueDashboard';
import IssueDetailPage from './pages/issues/IssueDetailPage';
import ProfileDetailPage from './pages/profiles/ProfileDetailPage'

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
  const { user, logout } = useContext(UserContext);

  const publicPages = [
    { text: 'Home', link: '/home' },
    { text: 'Issues', link: '/issues' }
  ];


  const authenticatedPages = [
    { text: 'Home', link: '/home' },
    { text: 'Issues', link: '/issues' },
    { text: 'Create issue', link: '/issues/create' },
  ];

  const settings = [
    { text: 'Profile', link: `/users/${user && user.sub}`, onClick: null },
    { text: 'Account', link: '/account', onClick: null },
    { text: 'Dashboard', link: '/dashboard', onClick: null },
    { text: 'Logout', link: '/logout', onClick: logout }
  ];

  return (
    <div>
      <Navbar currentUser={user} pages={user? authenticatedPages : publicPages} settings={settings} />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Register />} />
          <Route path="/users/:username" element={<ProfileDetailPage />} />
          <Route path="/issues" element={<IssueDashboard />} />
          <Route path="/issues/create" element={<IssueDashboard />} />
          <Route path="/issues/:issueId" element={<IssueDetailPage />} />
          <Route path="/admin/issues" element={<Register />} />
          <Route path="/admin/issues/create" element={<Register />} />
          <Route path="/admin/issues/:issueId" element={<IssueDetailPage />} />
          <Route path="/admin/users" element={<Register />} />
          <Route path="/admin/users/:username" element={<ProfileDetailPage />} />
          <Route path="/admin/comments" element={<Register />} />
          <Route path="/admin/comments/:commentId" element={<Register />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
