import { UserContext } from '../../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import IssueService from '../../services/issue.service';
import { Box, CircularProgress, Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import { Routes, Route, Link as RouterLink, useParams, useLocation, useNavigate } from "react-router-dom";
import IssueList from '../../components/issues/IssueList';
import IssuePagination from '../../components/issues/IssuePagination';

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

const IssueDashboard = (props) => {
    const {user} = useContext(UserContext);
    const history = useNavigate();
    const query = useQuery();
    const [issues, setIssues] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState((query.get("page") && query.get("page") >= 1)? parseInt(query.get("page")) : 1);
    const handlePageChange = (event, value) => {
        setPage(value);
        history(`/issues?page=${value}`);
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
                <IssuePagination issues={issues} page={page} handlePageChange={handlePageChange} isLoadingIssues={isLoading} />
            </Box>
        </Container>
    );
}

export default IssueDashboard;