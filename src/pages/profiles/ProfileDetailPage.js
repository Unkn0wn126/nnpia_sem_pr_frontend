import { UserContext } from '../../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import UserService from '../../services/user.service';
import { Routes, Route, Link as RouterLink, useParams, Navigate } from "react-router-dom";
import { Box, CircularProgress, Container, Grid, Pagination, Stack } from '@mui/material';
import IssueList from '../../components/issues/IssueList';
import IssueDetail from '../../components/issues/IssueDetail';
import ProfileDetail from '../../components/profiles/ProfileDetail';

const ProfileDetailPage = (props) => {
    const {user} = useContext(UserContext);
    let params = useParams();
    const [viewedUser, setViewedUser] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true);
    const fetchIssue = (username) => {
        setIsLoading(true);
        if(user){
            UserService.getUserByUsername(username).then((data) => {
                setViewedUser(data.data);
            }).catch(err => {

            }).finally(() => {
                setIsLoading(false);
            });
        }
    }

    useEffect(() => {
        if(user){
            fetchIssue(params.username);
        }
    }, [])

    if(!user){
        return <Navigate replace to="/login" />
    }

    return (
        <Container maxWidth="md">
            <Box sx={{paddingTop:"30px", paddingBottom: "20px"}}>
                {isLoading && (
                    <CircularProgress />
                )}
                {viewedUser && (
                    <ProfileDetail displayedUser={viewedUser} />
                )
                }
            </Box>
        </Container>
    );
}

export default ProfileDetailPage;