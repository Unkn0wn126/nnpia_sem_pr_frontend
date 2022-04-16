import { Card, CardHeader, Avatar, CardContent, Typography, Link, CircularProgress, Divider } from "@mui/material"
import { UserContext } from '../../providers/UserContext'
import { useEffect, useContext, useState } from "react";
import { Routes, Route, Link as RouterLink, useParams } from "react-router-dom";
import CommentList from "../comments/CommentList";
import IssueService from '../../services/issue.service';
import CommentCreate from "../comments/CommentCreate";
import CommentService from "../../services/comment.service";

const IssueDetail = ({ issue }) => {
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const fetchComments = (page) => {
        setIsLoading(true);
        CommentService.getCommentsByIssueId(issue.id, page)
            .then((data) => {
                setComments(data.data.comments);
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
                <Typography variant="h6" color="text.secondary">
                    Create comment
                </Typography>
                <CommentCreate issue={issue} onCommentSubmit={handleCommentSubmit} />
                <Divider />
                <Typography variant="h6" color="text.secondary">
                    Comments
                </Typography>
                {isLoading && (
                    <CircularProgress />
                )}
                {comments && (
                    <CommentList commentList={comments} />
                )}
            </CardContent>
        </Card>
    )
}

export default IssueDetail;