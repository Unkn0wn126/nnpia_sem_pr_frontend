import { Card, CardHeader, Avatar, CardContent, Typography, Link, CircularProgress, Divider, Button, Stack } from "@mui/material"
import { UserContext } from '../../providers/UserContext'
import { useEffect, useContext, useState } from "react";
import { Routes, Route, Link as RouterLink, useParams, Navigate } from "react-router-dom";
import CommentList from "../comments/CommentList";
import IssueService from '../../services/issue.service';
import CommentCreate from "../comments/CommentCreate";
import CommentService from "../../services/comment.service";
import CommentPagination from "../comments/CommentPagination";
import IssueCreate from "./IssueCreate";

const IssueDetail = ({ issue, viewingUser }) => {
    const [viewedIssue, setViewedIssue] = useState({ ...issue });
    const [isEditing, setIsEditing] = useState(false);
    const [comments, setComments] = useState(undefined);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [goToDashboard, setGoToDashboard] = useState(false);

    const handleEdit = () => {
        setIsEditing((prev) => !prev);
    }

    const handleDelete = () => {
        IssueService.deleteIssue(issue.id).then(() => {
            setGoToDashboard(true);
        }).catch(err => {

        })
    }

    const handlePageChange = (event, value) => {
        setPage(value);
        fetchComments(value - 1);
    }
    const fetchComments = (page) => {
        setIsLoading(true);
        CommentService.getCommentsByIssueId(issue.id, page)
            .then((data) => {
                setComments(data.data);
                if (data.data.totalPages <= data.data.currentPage && data.data.currentPage > 0) {
                    setPage((previous) => previous - 1);
                    fetchComments(page - 1);
                }
            })
            .catch((err) => {

            })
            .finally(() => {
                setIsLoading(false);
            })
    }
    useEffect(() => {
        fetchComments(page - 1);
    }, []);

    const handleIssueSubmit = () => {
        setIsEditing(false);
        IssueService.getIssueById(viewedIssue.id).then((data) => {
            setViewedIssue(data.data);
        }).catch(err => {

        })
    }

    const handleCommentSubmit = () => {
        fetchComments(page - 1);
    }

    const handleCommentDelete = () => {
        fetchComments(page - 1);
    }

    if (goToDashboard) {
        return <Navigate replace to={`/issues`} />
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="author" alt={viewedIssue.author.username} src="/static/images/avatar/2.jpg">

                    </Avatar>
                }
                title={<Link component={RouterLink} to={`/users/${viewedIssue.author.username}`} underline='none'>{issue.author.profile.nickname}</Link>}
                subheader={viewedIssue.published}
            />
            <Divider />
            <CardContent>

                {(viewingUser && viewedIssue.author.username === viewingUser.username) && (
                    <Stack
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        direction="row"
                        alignItems="stretch"
                        justifyContent="flex-start"
                    >
                        <Button onClick={handleEdit}>
                            Edit
                        </Button>
                        <Button onClick={handleDelete}>
                            Delete
                        </Button>
                    </Stack>
                )}
                {!isEditing && (
                    <Stack
                        divider={<Divider orientation="horizontal" flexItem />}
                        alignItems="stretch"
                        justifyContent="space-evenly"
                    >
                        <Typography variant="h5" color="text.secondary">
                            {viewedIssue.header}
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            {viewedIssue.content}
                        </Typography>
                    </Stack>
                )}
                {isEditing && (
                    <IssueCreate issue={viewedIssue} onIssueSubmit={handleIssueSubmit} />
                )}

                <Divider />
                {viewingUser && (
                    <>
                        <Typography variant="h6" color="text.secondary">
                            Create comment
                        </Typography>
                        <CommentCreate issue={viewedIssue} onCommentSubmit={handleCommentSubmit} />
                    </>
                )}
                <Divider />
                <Typography variant="h6" color="text.secondary">
                    Comments
                </Typography>
                {isLoading && (
                    <CircularProgress />
                )}
                {comments && (
                    <CommentPagination
                        issue={viewedIssue}
                        comments={comments}
                        viewingUser={viewingUser}
                        onCommentSubmit={handleCommentSubmit}
                        onCommentDelete={handleCommentDelete}
                        page={page}
                        handlePageChange={handlePageChange}
                        isLoadingComments={isLoading} />
                )}
            </CardContent>
        </Card>
    )
}

export default IssueDetail;