import { UserContext } from '../../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import IssueService from '../../services/issue.service';
import { Box, CircularProgress, Container, FormControl, Grid, InputLabel, Pagination, Select, Stack, Typography, MenuItem, Autocomplete, TextField } from '@mui/material';
import IssueList from './IssueList';

const issueProperties = [
    {name: "id"},
    {name: "header"},
    {name: "content"},
    {name: "published"},
    {name: "lastEdited"},
    {name: "severity"},
    {name: "visibility"},
    {name: "dueDate"},
    {name: "completionState"},
]

const IssuePagination = ({ issues, page, viewingUser, handlePageChange, isLoadingIssues, onDelete, isAdmin, sortDirection, onSortDirectionChange, sortBy, onSortByChange, pageSize, onPageSizeChange }) => {
    return (
        <>
            {isLoadingIssues && (
                <CircularProgress />
            )}
            {(issues && issues.issues.length > 0) && (
                <Stack spacing={4} alignItems="stretch" justifyContent="flex-end">
                    <Stack spacing={4} direction={{ xs: "column", md: "row" }} alignItems="stretch" justifyContent="flex-end">
                        <FormControl fullWidth>
                            <InputLabel id='sort-direction-label'>Sort direction</InputLabel>
                            <Select
                                labelId="sort-direction-label"
                                id="sort-direction-select"
                                value={sortDirection}
                                label="Sort direction"
                                onChange={onSortDirectionChange}
                            >
                                <MenuItem value={"ASC"}>Ascending</MenuItem>
                                <MenuItem value={"DESC"}>Descending</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={issueProperties}
                                getOptionLabel={(option) => option.name}
                                value={sortBy}
                                onChange={(e, obj) => onSortByChange(obj)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Sort by"
                                        placeholder="Sort by these properties"
                                    />
                                )}
                            />
                        </FormControl>
                    </Stack>
                    <IssueList issueList={issues.issues} viewingUser={viewingUser} onDelete={onDelete} isAdmin={isAdmin} />
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Pagination count={issues.totalPages} page={page} onChange={handlePageChange} color="primary" />
                        <FormControl sx={{minWidth: "80px"}}>
                            <InputLabel id='page-size-label'>Size</InputLabel>
                            <Select
                                labelId="page-size-label"
                                id="page-size-select"
                                value={pageSize}
                                label="Size"
                                onChange={onPageSizeChange}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Stack>
            )
            }
            {(issues && issues.issues.length === 0) && (
                <Stack spacing={4} alignItems="stretch" justifyContent="flex-end">
                    <Typography variant="h6">
                        No issues found
                    </Typography>
                </Stack>
            )}
        </>
    )
}

export default IssuePagination;