import { Card, CardHeader, Avatar, CardContent, Typography, Link, Divider, Stack, Button } from "@mui/material"
import { useEffect, useContext, useState } from "react";
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import UserService from "../../services/user.service";
import ProfileEdit from "./ProfileEdit";

const ProfileItem = ({ user, viewingUser, onDelete }) => {
    const [viewedUser, setViewedUser] = useState({ ...user });
    const [isEditing, setIsEditing] = useState(false);


    const handleEdit = () => {
        setIsEditing((prev) => !prev);
    }

    const handleDelete = () => {
        UserService.deleteUser(user.id).then(() => {
            onDelete();
        }).catch(err => {

        })
    }

    const handleIssueSubmit = () => {
        setIsEditing(false);
        UserService.getUserById(viewedUser.id).then((data) => {
            setViewedUser(data.data);
        }).catch(err => {

        })
    }
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="author" alt={user.username} src="/static/images/avatar/2.jpg">

                    </Avatar>
                }
                title={<Link component={RouterLink} to={`/users/${user.username}`} underline='none'>{user.profile.nickname}</Link>}
            />
            <Divider />
            <CardContent>
                {(viewingUser && viewedUser.username === viewingUser.username) && (
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
                        <Typography variant="body1" color="text.secondary">
                        </Typography>
                    </Stack>
                )}
                {isEditing && (
                    <ProfileEdit issue={viewedUser} onIssueSubmit={handleIssueSubmit} />
                )}

            </CardContent>
        </Card>
    )
}

export default ProfileItem;