import { UserContext } from '../../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import IssueService from '../../services/issue.service';
import { Routes, Route, Link as RouterLink, useParams } from "react-router-dom";
import { Box, CircularProgress, Container, Grid, Pagination, Stack } from '@mui/material';
import IssueList from '../../components/issues/IssueList';
import IssueDetail from '../../components/issues/IssueDetail';
import IssueCreate from '../../components/issues/IssueCreate';

const IssueCreatePage = (props) => {
    const {user} = useContext(UserContext);
    let params = useParams();
    const [issue, setIssue] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true);
    const fetchIssue = (issueId) => {
        setIsLoading(true);
        if(user){
            IssueService.getIssueById(issueId).then((data) => {
                setIssue(data.data);
            }).catch(err => {

            }).finally(() => {
                setIsLoading(false);
            });
        }else{
            IssueService.getPublicIssueById(issueId).then((data) => {
                setIssue(data.data);
            }).catch(err => {

            }).finally(() => {
                setIsLoading(false);
            });
        }
    }

    useEffect(() => {
        fetchIssue(params.issueId);
    }, [])

    return (
        <Container maxWidth="md">
            <Box sx={{paddingTop:"30px", paddingBottom: "20px"}}>
                    <IssueCreate />
            </Box>
        </Container>
    );
}

export default IssueCreatePage;