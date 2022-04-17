import { Card, CardHeader, Avatar, CardContent, Typography, Link, Divider, Stack, Button } from "@mui/material"
import { useEffect, useContext, useState } from "react";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import CommentList from "../comments/CommentList";
import IssueService from '../../services/issue.service';
import IssueCreate from "./IssueCreate";

const IssueItem = ({ issue, viewingUser, onDelete }) => {
    const [viewedIssue, setViewedIssue] = useState({ ...issue });
    const [isEditing, setIsEditing] = useState(false);


    const handleEdit = () => {
        setIsEditing((prev) => !prev);
    }

    const handleDelete = () => {
        IssueService.deleteIssue(issue.id).then(() => {
            onDelete();
        }).catch(err => {

        })
    }

    const handleIssueSubmit = () => {
        setIsEditing(false);
        IssueService.getIssueById(viewedIssue.id).then((data) => {
            setViewedIssue(data.data);
        }).catch(err => {

        })
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
                        <Typography gutterBottom variant="h5" component="div">
                            <Link component={RouterLink} to={`/issues/${issue.id}`} underline='none'>{issue.header}</Link>
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {issue.content}
                        </Typography>
                    </Stack>
                )}
                {isEditing && (
                    <IssueCreate issue={viewedIssue} onIssueSubmit={handleIssueSubmit} />
                )}

            </CardContent>
        </Card>
    )
}

export default IssueItem;