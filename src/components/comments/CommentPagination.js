import { UserContext } from '../../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import IssueService from '../../services/issue.service';
import { Box, CircularProgress, Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import CommentList from './CommentList';

const CommentPagination = ({ issue, comments, viewingUser, onCommentSubmit, onCommentDelete, page, handlePageChange, isLoadingComments, isAdmin }) => {
    return (
        <>
            {isLoadingComments && (
                <CircularProgress />
            )}
            {(comments && comments.comments.length > 0) && (
                <Stack spacing={4} alignItems="stretch" justifyContent="flex-end">
                    <CommentList issue={issue} commentList={comments.comments} viewingUser={viewingUser} onCommentSubmit={onCommentSubmit} onCommentDelete={onCommentDelete} isAdmin={isAdmin} />
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Pagination count={comments.totalPages} page={page} onChange={handlePageChange} color="primary" />
                    </Box>
                </Stack>
            )
            }
            {(comments && comments.comments.length === 0) && (
                <Stack spacing={4} alignItems="stretch" justifyContent="flex-end">
                    <Typography variant="h6">
                        No comments found
                    </Typography>
                </Stack>
            )}
        </>
    )
}

export default CommentPagination;