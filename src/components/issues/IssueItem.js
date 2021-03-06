import { Card, CardHeader, Avatar, CardContent, Typography, Link, Divider, Stack, Button, Chip } from "@mui/material"
import { useEffect, useContext, useState } from "react";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import CommentList from "../comments/CommentList";
import IssueService from '../../services/issue.service';
import IssueCreate from "./IssueCreate";

const completionStateColors = {
    "TODO": "info",
    "IN_PROGRESS": "warning",
    "DONE": "success"
}

const severityColors = {
    "LOW": "success",
    "MEDIUM": "warning",
    "HIGH": "error"
}

const visibilityColors = {
    "PUBLIC": "success",
    "INTERNAL": "primary",
    "PRIVATE": "secondary"
}

const IssueItem = ({ issue, viewingUser, onDelete, isAdmin }) => {
    const [viewedIssue, setViewedIssue] = useState({ ...issue });
    const [isEditing, setIsEditing] = useState(false);
    const [completionStateColor, setCompletionStateColor] = useState(completionStateColors[viewedIssue.completionState]);
    const [severityColor, setSeverityColor] = useState(severityColors[viewedIssue.severity]);
    const [visibilityColor, setVisibilityColor] = useState(visibilityColors[viewedIssue.visibility]);

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
            setCompletionStateColor(completionStateColors[data.data.completionState]);
            setSeverityColor(severityColors[data.data.severity]);
            setVisibilityColor(visibilityColors[data.data.visibility]);
        }).catch(err => {

        })
    }
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="author" alt={viewedIssue.author.username} src={viewedIssue.author.profile.profilePicture} />
                }
                title={<Link component={RouterLink} to={`/users/${viewedIssue.author.username}`} underline='none'>{viewedIssue.author.profile.nickname}</Link>}
                subheader={viewedIssue.published === viewedIssue.lastEdited ? `${viewedIssue.published}` : `${viewedIssue.published} (last edit: ${viewedIssue.lastEdited})`}
            />
            <Divider />
            <CardContent>
                {!isEditing && (
                    <>
                        <Stack
                            alignItems="stretch"
                            justifyContent="space-evenly"
                            spacing={2}
                        >
                            <Typography gutterBottom variant="h5" component="div">
                                <Link component={RouterLink} to={`/issues/${viewedIssue.id}`} underline='none'>{viewedIssue.header}</Link>
                            </Typography>
                            <Stack
                                spacing={{ xs: 1, sm: 2, md: 4 }}
                                direction={{xs: "column", sm:"row", md:"row"}}
                                alignItems={{xs: "stretch", md: "center"}}
                                justifyContent="flex-start"
                            >
                                <Chip label={viewedIssue.visibility} color={visibilityColor} />
                                <Chip label={viewedIssue.severity} color={severityColor} />
                                <Chip label={viewedIssue.completionState} color={completionStateColor} />
                                {viewedIssue.dueDate && (<Typography variant="body1" >Due date {viewedIssue.dueDate}</Typography>)}
                                {(isAdmin || (viewingUser && viewedIssue.author.username === viewingUser.username)) && (
                                    <>
                                        <Button onClick={handleEdit} variant="contained">
                                            Edit
                                        </Button>
                                        <Button onClick={handleDelete} variant="contained" color="error">
                                            Delete
                                        </Button>
                                    </>
                                )}
                            </Stack>
                            <Divider orientation="horizontal" flexItem />
                            <Typography variant="body1" color="text.secondary">
                                {viewedIssue.content}
                            </Typography>
                        </Stack>
                    </>
                )}
                {isEditing && (
                    <IssueCreate issue={viewedIssue} onIssueSubmit={handleIssueSubmit} />
                )}

            </CardContent>
        </Card>
    )
}

export default IssueItem;