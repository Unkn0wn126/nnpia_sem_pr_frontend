import { Card, CardHeader, Avatar, CardContent, Typography, Link, CircularProgress, Divider, Grid, Stack } from "@mui/material"
import { UserContext } from '../../providers/UserContext'
import { useEffect, useContext, useState } from "react";
import { Routes, Route, Link as RouterLink, useParams } from "react-router-dom";
import CommentList from "../comments/CommentList";
import IssueService from '../../services/issue.service';

const ProfileDetail = ({ displayedUser }) => {
    return (
        <Card>
            <CardContent>
                <Stack direction="column" alignItems="stretch" justifyContent="flex-start" spacing={5} sx={{ marginBottom: "10px" }}>
                    <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={5} sx={{ marginBottom: "10px" }}>
                        <Avatar alt={displayedUser.username} src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100 }} />
                        <Stack direction="column" alignItems="stretch" justifyContent="flex-start" spacing={1} sx={{ marginBottom: "10px" }}>
                            <Typography variant="h5">
                                {displayedUser.profile.nickname}
                            </Typography>
                            <Typography>
                                Account created: {displayedUser.created}
                            </Typography>
                            <Typography>
                                State: {displayedUser.state}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={5} sx={{ marginBottom: "10px" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={4} md={3}>
                                <Typography variant="body1">
                                    Username
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                {displayedUser.username}
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <Typography variant="body1">
                                    E-mail
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                {displayedUser.email}
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <Typography variant="body1">
                                    Roles
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                {displayedUser.roles}
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <Typography variant="body1">
                                    Profile created
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                {displayedUser.profile.created}
                            </Grid>
                            <Grid item xs={4} md={3}>
                                <Typography variant="body1">
                                    Profile last edited
                                </Typography>
                            </Grid>
                            <Grid item xs={8} md={9}>
                                {displayedUser.profile.lastEdited}
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default ProfileDetail;