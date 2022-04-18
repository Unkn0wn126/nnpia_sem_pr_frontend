import { Card, CardHeader, Avatar, CardContent, Typography, Link, CircularProgress, Divider, Grid, Stack, Tabs, Tab, Box, Pagination, Button } from "@mui/material"
import PropTypes from 'prop-types';
import { UserContext } from '../../providers/UserContext'
import { useEffect, useContext, useState } from "react";
import { Routes, Route, Link as RouterLink, useParams, Navigate } from "react-router-dom";
import CommentList from "../comments/CommentList";
import IssueService from '../../services/issue.service';
import IssueList from '../issues/IssueList';
import IssuePagination from "../issues/IssuePagination";
import ProfileDetail from "./ProfileDetail";
import CommentPagination from "../comments/CommentPagination";
import CommentService from "../../services/comment.service";
import UserService from "../../services/user.service";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const UserDetail = ({ displayedUser, viewingUser, isAdmin }) => {
    const [value, setValue] = useState(0);
    const {logout} = useContext(UserContext);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [issues, setIssues] = useState(undefined);
    const [isLoadingIssues, setisLoadingIssues] = useState(true);
    const [issuePage, setIssuePage] = useState(1);

    const [comments, setComments] = useState(undefined);
    const [isLoadingComments, setisLoadingComments] = useState(true);
    const [commentPage, setCommentPage] = useState(1);

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleIssuePageChange = (event, value) => {
        setIssuePage(value);
        fetchIssues(value - 1);
    }

    const handleCommentPageChange = (event, value) => {
        setCommentPage(value);
        fetchComments(value - 1);
    }


    const fetchIssues = (pageNumber) => {
        setisLoadingIssues(true);
        IssueService.getIssuesByAuthorName(displayedUser.username, pageNumber).then((data) => {
            setIssues(data.data);
            if(data.data.totalPages <= data.data.currentPage && data.data.currentPage > 0){
                setIssuePage((previous) => previous - 1);
                fetchIssues(data.data.currentPage - 1);
            }
        }).catch(err => {
        }).finally(() => {
            setisLoadingIssues(false);
        });
    }

    const fetchComments = (pageNumber) => {
        setisLoadingComments(true);
        CommentService.getCommentsByAuthorName(displayedUser.username, pageNumber).then((data) => {
            setComments(data.data);
            if(data.data.totalPages <= data.data.currentPage && data.data.currentPage > 0){
                setCommentPage((previous) => previous - 1);
                fetchComments(data.data.currentPage - 1);
            }
        }).catch(err => {
        }).finally(() => {
            setisLoadingComments(false);
        });
    }

    const handleUserEdit = () => {
        setIsEditing(true);
    }

    const handlePasswordEdit = () => {
        setIsEditingPassword(true);
    }

    const handleUserDelete = () => {
        UserService.deleteUser(displayedUser.id).then(() => {
            if(displayedUser.username === viewingUser.username){
                logout();
            }
            setIsDeleted(true);
        }).catch(err => {

        })
    }

    const handleCommentSubmit = () => {
        fetchComments(commentPage - 1);
    }

    const handleCommentDelete = () => {
        fetchComments(commentPage - 1);
    }

    const handleIssueDelete = () => {
        fetchIssues(issuePage - 1);
    }

    useEffect(() => {
        if (value === 1) {
            fetchIssues(issuePage - 1);
        } else if (value === 2) {
            fetchComments(commentPage - 1);
        }
    }, [value]);

    if(isEditing){
        return <Navigate replace to={`/users/edit/${displayedUser.username}`} />
    }else if(isDeleted){
        return <Navigate replace to={`/users/`}/>
    }else if(isEditingPassword){
        return <Navigate replace to={`/users/change-password/${displayedUser.username}`} />
    }

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
                            <Stack
                                spacing={{ xs: 1, sm: 2, md: 4 }}
                                direction={{xs: "column", sm:"row", md:"row"}}
                                alignItems="center"
                                justifyContent="flex-start"
                            >
                                {((viewingUser && displayedUser.username === viewingUser.username) || isAdmin) && (
                                    <>
                                        <Button onClick={handleUserEdit}  variant="contained">
                                            Edit
                                        </Button>
                                        <Button onClick={handlePasswordEdit}  variant="contained">
                                            Change password
                                        </Button>
                                        {((isAdmin && displayedUser.username !== viewingUser.username) || (!isAdmin && displayedUser.username === viewingUser.username)) && (
                                            <Button onClick={handleUserDelete} variant="contained" color="error">
                                                Delete
                                            </Button>
                                        )}
                                    </>
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Tabs value={value} onChange={handleChange} aria-label="profile tabs" variant="scrollable" scrollButtons="auto">
                        <Tab label="Profile info" />
                        <Tab label="User issues" />
                        <Tab label="User comments" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <ProfileDetail displayedUser={displayedUser} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <IssuePagination viewingUser={viewingUser} issues={issues} page={issuePage} handlePageChange={handleIssuePageChange} onDelete={handleIssueDelete} isLoadingIssues={isLoadingIssues} isAdmin={isAdmin} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CommentPagination
                            issue={null}
                            comments={comments}
                            viewingUser={viewingUser}
                            onCommentSubmit={handleCommentSubmit}
                            onCommentDelete={handleCommentDelete}
                            page={commentPage}
                            handlePageChange={handleCommentPageChange}
                            isLoadingComments={isLoadingComments}
                            isAdmin={isAdmin} />
                    </TabPanel>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default UserDetail;