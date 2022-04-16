import { Card, CardHeader, Avatar, CardContent, Typography, Link, CircularProgress, Divider } from "@mui/material"
import { UserContext } from '../../providers/UserContext'
import { useEffect, useContext, useState } from "react";
import { Routes, Route, Link as RouterLink, useParams } from "react-router-dom";
import CommentList from "../comments/CommentList";
import IssueService from '../../services/issue.service';
import CommentCreate from "../comments/CommentCreate";
import CommentService from "../../services/comment.service";
import CommentPagination from "../comments/CommentPagination";

const IssueDetail = ({ issue, viewingUser }) => {
    const [comments, setComments] = useState(undefined);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const handlePageChange = (event, value) => {
        setPage(value);
        fetchComments(value - 1);
    }
    const fetchComments = (page) => {
        setIsLoading(true);
        CommentService.getCommentsByIssueId(issue.id, page)
            .then((data) => {
                setComments(data.data);
                if(data.data.totalPages <= data.data.currentPage && data.data.currentPage > 0){
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

    const handleCommentSubmit = () => {
        fetchComments(page - 1);
    }

    const handleCommentDelete = () => {
        fetchComments(page - 1);
    }
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="author" alt={issue.author.username} src="/static/images/avatar/2.jpg">

                    </Avatar>
                }
                title={<Link component={RouterLink} to={`/users/${issue.author.username}`} underline='none'>{issue.author.profile.nickname}</Link>}
                subheader={issue.published}
            />
            <Divider />
            <CardContent>
                <Typography variant="h5" color="text.secondary">
                    {issue.header}
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    {issue.content}
                </Typography>
                <Divider />
                {viewingUser && (
                    <>
                    <Typography variant="h6" color="text.secondary">
                        Create comment
                    </Typography>
                    <CommentCreate issue={issue} onCommentSubmit={handleCommentSubmit} />
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
                    issue={issue} 
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