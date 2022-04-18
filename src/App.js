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
import CommentDashboard from './pages/comments/CommentDashboard';
import IssueDetailPage from './pages/issues/IssueDetailPage';
import ProfileDetailPage from './pages/profiles/ProfileDetailPage'
import HomePage from './pages/HomePage';
import IssueCreatePage from './pages/issues/IssueCreatePage';
import { CommentsDisabled } from '@mui/icons-material';
import ProfileDashboard from './pages/profiles/ProfileDashboard';
import NotFoundPage from './pages/NotFoundPage';
import ProfileEditPage from './pages/profiles/ProfileEditPage';
import PasswordEditPage from './pages/profiles/PasswordEditPage';

function App() {
  const { isAdmin, user, logout } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user])

  const pages = [
    { text: 'Home', link: '/home' },
    { text: 'Issues', link: '/issues' },
    {text: 'Comments', link: '/comments'},
    {text: 'Users', link: '/users'}
  ];

  const settings = [
    { text: 'Profile', link: `/users/${user && user.username}`, onClick: null },
    { text: 'Edit profile', link: `/users/edit/${user && user.username}`, onClick: null },
    { text: 'Change password', link: `/users/change-password/${user && user.username}`, onClick: null },
    { text: 'Logout', link: '/logout', onClick: logout }
  ];



  if(user){
    pages.push({ text: 'Create issue', link: '/issues/create' });
  }

  return (
    <div>
      <Navbar currentUser={currentUser} pages={pages} settings={settings} />
      <div className='container'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/users/edit/:username" element={<ProfileEditPage />} />
          <Route path="/users/change-password/:username" element={<PasswordEditPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<ProfileDashboard />} />
          <Route path="/users/:username" element={<ProfileDetailPage />} />
          <Route path="/comments" element={<CommentDashboard />} />
          <Route path="/issues" element={<IssueDashboard />} />
          <Route path="/issues/create" element={<IssueCreatePage />} />
          <Route path="/issues/:issueId" element={<IssueDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
