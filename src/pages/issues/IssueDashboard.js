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
    const { isAdmin, user } = useContext(UserContext);
    const history = useNavigate();
    const query = useQuery();
    const [issues, setIssues] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState((query.get("page") && query.get("page") >= 1) ? parseInt(query.get("page")) : 1);
    const [pageSize, setPageSize] = useState((query.get("pageSize") && query.get("pageSize") >= 1) ? parseInt(query.get("pageSize")) : 5);
    const [sortBy, setSortBy] = useState(query.get("orderBy") ? query.get("orderBy").split(',').map(item => {return {name: item}}) : [{name: "published"}]);
    const [sortDirection, setSortDirection] = useState((query.get("direction") ? query.get("direction") : "DESC"));
    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const fetchIssues = () => {
        setIsLoading(true);
        IssueService.getAllIssues(page - 1, pageSize, sortDirection, sortBy.map((item) => item.name)).then((data) => {
            setIssues(data.data);
            history(`/issues?page=${page}&pageSize=${pageSize}&direction=${sortDirection}&orderBy=${sortBy.map((item) => item.name)}`);
        }).catch(err => {

        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleIssueDelete = () => {
        fetchIssues();
    }

    const handleSortDirectionChange = (event) => {
        setSortDirection(event.target.value);
    }

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
    }

    const handleSortByChange = (newValue) => {
        setSortBy(newValue);
    }

    useEffect(() => {
        fetchIssues();
    }, [page, pageSize, sortBy, sortDirection])

    return (
        <Container maxWidth="md">
            <Box sx={{ paddingTop: "30px", paddingBottom: "20px" }}>
                <IssuePagination issues={issues} viewingUser={user} page={page} handlePageChange={handlePageChange} onDelete={handleIssueDelete} isLoadingIssues={isLoading} isAdmin={isAdmin} sortDirection={sortDirection} onSortDirectionChange={handleSortDirectionChange} sortBy={sortBy} onSortByChange={handleSortByChange} pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
            </Box>
        </Container>
    );
}

export default IssueDashboard;