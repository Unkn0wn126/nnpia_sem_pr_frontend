import { UserContext } from '../../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import UserService from '../../services/user.service';
import { Routes, Route, Link as RouterLink, useParams, Navigate } from "react-router-dom";
import { Box, CircularProgress, Container, Grid, Pagination, Stack } from '@mui/material';
import IssueList from '../../components/issues/IssueList';
import IssueDetail from '../../components/issues/IssueDetail';
import UserDetail from '../../components/profiles/UserDetail';
import ProfileEdit from '../../components/profiles/ProfileEdit';
import PasswordUpdate from '../../components/profiles/PasswordUpdate';

const PasswordEditPage = (props) => {
    const { isAdmin, user } = useContext(UserContext);
    let params = useParams();
    const [viewedUser, setViewedUser] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true);
    const [navigate, setNavigate] = useState(false);
    const fetchUserInfo = (username) => {
        setIsLoading(true);
        UserService.getUserByUsername(username).then((data) => {
            setViewedUser(data.data);
        }).catch(err => {

        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleUserSubmit = () => {
        setNavigate(true);
    }

    useEffect(() => {
        fetchUserInfo(params.username);
    }, [params])

    if(navigate){
        return <Navigate replace to={`/users/${user.username}`} />
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ paddingTop: "30px", paddingBottom: "20px" }}>
                {isLoading && (
                    <CircularProgress />
                )}
                {viewedUser && (
                    <PasswordUpdate editedUser={viewedUser} viewingUser={user} onUserSubmit={handleUserSubmit} isAdmin={isAdmin} />
                )
                }
            </Box>
        </Container>
    );
}

export default PasswordEditPage;