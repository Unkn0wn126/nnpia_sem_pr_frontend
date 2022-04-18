import { UserContext } from '../../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import ProfileList from './ProfileList';

const ProfilePagination = ({ users, page, viewingUser, handlePageChange, isLoadingUsers, onDelete, isAdmin }) => {
    return (
        <>
            {isLoadingUsers && (
                <CircularProgress />
            )}
            {(users && users.users.length > 0) && (
                <Stack spacing={4} alignItems="stretch" justifyContent="flex-end">
                    <ProfileList profileList={users.users} viewingUser={viewingUser} onDelete={onDelete} isAdmin={isAdmin} />
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Pagination count={users.totalPages} page={page} onChange={handlePageChange} color="primary" />
                    </Box>
                </Stack>
            )
            }
            {(users && users.users.length === 0) && (
                <Stack spacing={4} alignItems="stretch" justifyContent="flex-end">
                    <Typography variant="h4">
                        No users found
                    </Typography>
                </Stack>
            )}
        </>
    )
}

export default ProfilePagination;