import { UserContext } from '../../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import IssueService from '../../services/issue.service';
import { Box, CircularProgress, Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import IssueList from './IssueList';

const IssuePagination = ({ issues, page, viewingUser, handlePageChange, isLoadingIssues, onDelete }) => {
    return (
        <>
            {isLoadingIssues && (
                <CircularProgress />
            )}
            {(issues && issues.issues.length > 0) && (
                <Stack spacing={4} alignItems="stretch" justifyContent="flex-end">
                    <IssueList issueList={issues.issues} viewingUser={viewingUser} onDelete={onDelete} />
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Pagination count={issues.totalPages} page={page} onChange={handlePageChange} color="primary" />
                    </Box>
                </Stack>
            )
            }
            {(issues && issues.issues.length === 0) && (
                <Stack spacing={4} alignItems="stretch" justifyContent="flex-end">
                    <Typography variant="h4">
                        No issues found
                    </Typography>
                </Stack>
            )}
        </>
    )
}

export default IssuePagination;