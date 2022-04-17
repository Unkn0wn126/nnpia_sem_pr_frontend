import { UserContext } from '../../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import IssueService from '../../services/issue.service';
import { Box, CircularProgress, Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import { Routes, Route, Link as RouterLink, useParams, useLocation, useNavigate } from "react-router-dom";
import IssueList from '../../components/issues/IssueList';
import IssuePagination from '../../components/issues/IssuePagination';
import CommentService from '../../services/comment.service';
import CommentPagination from '../../components/comments/CommentPagination';

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const CommentDashboard = (props) => {
    const { user } = useContext(UserContext);
    const history = useNavigate();
    const query = useQuery();
    const [comments, setComments] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState((query.get("page") && query.get("page") >= 1) ? parseInt(query.get("page")) : 1);
    const handlePageChange = (event, value) => {
        setPage(value);
        history(`/comments?page=${value}`);
        fetchIssues(value - 1);
    }

    const fetchIssues = (pageNumber) => {
        setIsLoading(true);
        CommentService.getAllComments(pageNumber).then((data) => {
            setComments(data.data);
        }).catch(err => {

        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleIssueDelete = () => {
        fetchIssues(page - 1);
    }

    const handleCommentSubmit = () => {
        fetchIssues(page - 1);
    }

    useEffect(() => {
        fetchIssues(page - 1);
    }, [])

    return (
        <Container maxWidth="md">
            <Box sx={{ paddingTop: "30px", paddingBottom: "20px" }}>
                <CommentPagination issue={null} comments={comments} viewingUser={user} page={page} handlePageChange={handlePageChange} onCommentDelete={handleIssueDelete} onCommentSubmit={handleCommentSubmit} isLoadingIssues={isLoading} />
            </Box>
        </Container>
    );
}

export default CommentDashboard;