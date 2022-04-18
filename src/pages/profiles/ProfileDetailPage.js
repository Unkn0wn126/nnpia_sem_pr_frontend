import { UserContext } from '../../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import UserService from '../../services/user.service';
import { Routes, Route, Link as RouterLink, useParams, Navigate } from "react-router-dom";
import { Box, CircularProgress, Container, Grid, Pagination, Stack } from '@mui/material';
import IssueList from '../../components/issues/IssueList';
import IssueDetail from '../../components/issues/IssueDetail';
import UserDetail from '../../components/profiles/UserDetail';

const ProfileDetailPage = (props) => {
    const { isAdmin, user } = useContext(UserContext);
    let params = useParams();
    const [viewedUser, setViewedUser] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const fetchIssue = (username) => {
        setIsLoading(true);
        UserService.getUserByUsername(username).then((data) => {
            setViewedUser(data.data);
        }).catch(err => {
            setRedirect(true);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchIssue(params.username);
    }, [params])

    if(redirect){
        return <Navigate replace to="/notfound"/>
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ paddingTop: "30px", paddingBottom: "20px" }}>
                {isLoading && (
                    <CircularProgress />
                )}
                {viewedUser && (
                    <UserDetail displayedUser={viewedUser} viewingUser={user} isAdmin={isAdmin} />
                )
                }
            </Box>
        </Container>
    );
}

export default ProfileDetailPage;