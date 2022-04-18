import { UserContext } from '../../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import IssueService from '../../services/issue.service';
import { Box, CircularProgress, Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import { Routes, Route, Link as RouterLink, useParams, useLocation, useNavigate } from "react-router-dom";
import IssueList from '../../components/issues/IssueList';
import IssuePagination from '../../components/issues/IssuePagination';
import UserService from '../../services/user.service';
import ProfilePagination from '../../components/profiles/ProfilePagination';

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ProfileDashboard = (props) => {
    const { isAdmin, user } = useContext(UserContext);
    const history = useNavigate();
    const query = useQuery();
    const [users, setUsers] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState((query.get("page") && query.get("page") >= 1) ? parseInt(query.get("page")) : 1);
    const handlePageChange = (event, value) => {
        setPage(value);
        history(`/users?page=${value}`);
        fetchUsers(value - 1);
    }

    const fetchUsers = (pageNumber) => {
        setIsLoading(true);
        UserService.getAllUsers(pageNumber).then((data) => {
            setUsers(data.data);
        }).catch(err => {

        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleIssueDelete = () => {
        fetchUsers(page - 1);
    }

    useEffect(() => {
        fetchUsers(page - 1);
    }, [])

    return (
        <Container maxWidth="md">
            <Box sx={{ paddingTop: "30px", paddingBottom: "20px" }}>
                <ProfilePagination users={users} viewingUser={user} page={page} handlePageChange={handlePageChange} onDelete={handleIssueDelete} isLoadingUsers={isLoading} isAdmin={isAdmin} />
            </Box>
        </Container>
    );
}

export default ProfileDashboard;