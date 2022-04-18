import { Card, CardHeader, Avatar, CardContent, Typography, Link, Divider, Stack, Button, Chip } from "@mui/material"
import { UserContext } from '../../providers/UserContext'
import { useEffect, useContext, useState } from "react";
import { Routes, Route, Link as RouterLink, Navigate } from "react-router-dom";
import UserService from "../../services/user.service";
import ProfileEdit from "./ProfileEdit";
import UsersColors from "./users.colors"


const ProfileItem = ({ user, viewingUser, onDelete, isAdmin }) => {
    const [viewedUser, setViewedUser] = useState({ ...user });
    const [isEditing, setIsEditing] = useState(false);
    const { logout } = useContext(UserContext);


    const handleEdit = () => {
        setIsEditing((prev) => !prev);
    }

    const handleDelete = () => {
        UserService.deleteUser(user.id).then(() => {
            if (user.username === viewingUser.username) {
                logout();
            }
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
    if (isEditing) {
        return <Navigate replace to={`/users/edit/${user.username}`} />
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
                <Stack direction="column" alignItems="stretch" justifyContent="flex-start" spacing={1} sx={{ marginBottom: "10px" }}>
                    {!isEditing && (
                        <Stack
                            direction={{ xs: "column", sm: "row", md: "row" }}
                            alignItems="stretch"
                            justifyContent="flex-start"
                            flexWrap="wrap"
                            spacing={{ xs: 1, sm: 2, md: 2 }}
                        >
                            {viewedUser.roles.map(role => (
                                <Chip key={role.type} label={role.type.replace("ROLE_", "")} variant="outlined" color={UsersColors.roleColors[role.type]} />
                            ))}
                        </Stack>
                    )}
                    {((viewingUser && viewedUser.username === viewingUser.username) || isAdmin) && (
                        <Stack
                            spacing={{ xs: 1, sm: 2, md: 4 }}
                            direction={{ xs: "column", sm: "row", md: "row" }}
                            alignItems={{ xs: "stretch", md: "center" }}
                            justifyContent="flex-start"
                        >
                            <Button onClick={handleEdit} variant="contained">
                                Edit
                            </Button>
                            {((isAdmin && user.username !== viewingUser.username) || (!isAdmin && user.username === viewingUser.username)) && (
                                <Button onClick={handleDelete} variant="contained" color="error">
                                    Delete
                                </Button>
                            )}
                        </Stack>
                    )}
                </Stack>
            </CardContent>
        </Card>
    )
}

export default ProfileItem;