import { Card, CardHeader, Avatar, CardContent, Typography, Link, CircularProgress, Divider, Grid, Stack, Tabs, Tab, Box, Pagination, Chip } from "@mui/material"
import PropTypes from 'prop-types';
import { UserContext } from '../../providers/UserContext'
import { useEffect, useContext, useState } from "react";
import { Routes, Route, Link as RouterLink, useParams } from "react-router-dom";
import CommentList from "../comments/CommentList";
import IssueService from '../../services/issue.service';
import IssueList from '../issues/IssueList';
import IssuePagination from "../issues/IssuePagination";
import UsersColors from "./users.colors"

const ProfileDetail = ({ displayedUser }) => {
    return (
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
                    <Stack
                        direction={{ xs: "column", sm: "row", md: "row" }}
                        alignItems="stretch"
                        justifyContent="flex-start"
                        flexWrap="wrap"
                        spacing={{ xs: 1, sm: 2, md: 2 }}
                    >
                        {displayedUser.roles.map((role) => (<Chip key={role.type} label={role.type.replace("ROLE_", "")} variant="outlined" color={UsersColors.roleColors[role.type]} />))}
                    </Stack>
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
    )
}

export default ProfileDetail;