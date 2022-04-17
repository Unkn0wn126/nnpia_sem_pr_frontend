import { Card, CardHeader, Avatar, CardContent, Typography, Link, Divider, Stack, Button } from "@mui/material"
import { useState } from "react";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import CommentService from "../../services/comment.service";
import CommentCreate from "./CommentCreate";

const CommentItem = ({ issue, comment, viewingUser, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [viewedComment, setViewedComment] = useState({...comment});

    const handleEdit = () => {
        setIsEditing((prev) => !prev);
    }

    const handleDelete = () => {
        CommentService.deleteComment(viewedComment.id).then(() => {
            onDelete();
        })
    }

    const handleCommentSubmit = () => {
        setIsEditing(false);
        CommentService.getCommentById(viewedComment.id).then((data) => {
            setViewedComment(data.data);
        })
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="author" alt={viewedComment.author.username} src="/static/images/avatar/2.jpg">

                    </Avatar>
                }
                title={<Link component={RouterLink} to={`/users/${viewedComment.author.username}`} underline='none'>{viewedComment.author.profile.nickname}</Link>}
                subheader={viewedComment.created === viewedComment.lastEdited ? `${viewedComment.created}` : `${viewedComment.created} (last edit: ${viewedComment.lastEdited})`}
            />
            <CardContent>
                <Stack
                    divider={<Divider orientation="horizontal" flexItem />}
                    alignItems="stretch"
                    justifyContent="space-evenly"
                    spacing={2}
                >
                    {(viewingUser && viewedComment.author.username === viewingUser.username) && (<Stack
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        direction="row"
                        alignItems="stretch"
                        justifyContent="flex-start"
                    >
                        <Button onClick={handleEdit} variant="contained">
                            Edit
                        </Button>
                        <Button onClick={handleDelete} variant="contained" color="error">
                            Delete
                        </Button>
                    </Stack>
                    )}
                    {!isEditing && (
                        <Typography variant="body" color="text.secondary">
                            {viewedComment.content}
                        </Typography>
                    )}
                    {isEditing && (
                        <CommentCreate issue={issue} onCommentSubmit={handleCommentSubmit} comment={viewedComment} />
                    )}
                </Stack>
            </CardContent>
        </Card>
    )
}

export default CommentItem;