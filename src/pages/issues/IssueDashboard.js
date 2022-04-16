import { UserContext } from '../../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import IssueService from '../../services/issue.service';
import { Box, CircularProgress, Container, Grid, Pagination, Stack } from '@mui/material';
import IssueList from '../../components/issues/IssueList';

const IssueDashboard = (props) => {
    const {user} = useContext(UserContext);
    const [issues, setIssues] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
        fetchIssues(value - 1);
    }

    const fetchIssues = (pageNumber) => {
        setIsLoading(true);
        if(user){
            IssueService.getAllIssues(pageNumber).then((data) => {
                setIssues(data.data);
            }).catch(err => {

            }).finally(() => {
                setIsLoading(false);
            });
        }else{
            IssueService.getAllPublicIssues(pageNumber).then((data) => {
                setIssues(data.data);
            }).catch(err => {

            }).finally(() => {
                setIsLoading(false);
            });
        }
    }

    useEffect(() => {
        fetchIssues(page - 1);
    }, [])

    return (
        <Container maxWidth="md">
            <Box sx={{paddingTop:"30px", paddingBottom: "20px"}}>
                {isLoading && (
                    <CircularProgress />
                )}
                {issues && (
                    <Stack spacing={4} alignItems="stretch" justifyContent="space-evenly">
                        <IssueList issueList={issues.issues} />
                        <Box sx={{display: "flex", alignItems:"center", justifyContent:"center"}}>
                            <Pagination count={issues.totalPages} page={page} onChange={handlePageChange} color="primary"/>
                        </Box>
                    </Stack>
                )
                }
            </Box>
        </Container>
    );
}

export default IssueDashboard;