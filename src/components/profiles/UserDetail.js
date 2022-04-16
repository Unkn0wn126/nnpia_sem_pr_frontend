import { Card, CardHeader, Avatar, CardContent, Typography, Link, CircularProgress, Divider, Grid, Stack, Tabs, Tab, Box, Pagination } from "@mui/material"
import PropTypes from 'prop-types';
import { UserContext } from '../../providers/UserContext'
import { useEffect, useContext, useState } from "react";
import { Routes, Route, Link as RouterLink, useParams } from "react-router-dom";
import CommentList from "../comments/CommentList";
import IssueService from '../../services/issue.service';
import IssueList from '../issues/IssueList';
import IssuePagination from "../issues/IssuePagination";
import ProfileDetail from "./ProfileDetail";

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

const UserDetail = ({ displayedUser }) => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [issues, setIssues] = useState(undefined);
    const [isLoadingIssues, setisLoadingIssues] = useState(true);
    const [isLoadingComments, setisLoadingComments] = useState(true);
    const [issuePage, setIssuePage] = useState(1);

    const handleIssuePageChange = (event, value) => {
        setIssuePage(value);
        fetchIssues(value - 1);
    }


    const fetchIssues = (pageNumber) => {
        setisLoadingIssues(true);
        IssueService.getIssuesByAuthorName(displayedUser.username, pageNumber).then((data) => {
            setIssues(data.data);
        }).catch(err => {
        }).finally(() => {
            setisLoadingIssues(false);
        });
    }
    useEffect(() => {
        if (value === 1) {
            fetchIssues(issuePage - 1);
        }
    }, [value]);

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
                    <Tabs value={value} onChange={handleChange} aria-label="profile tabs" variant="scrollable" scrollButtons="auto">
                        <Tab label="Profile info" />
                        <Tab label="User issues" />
                        <Tab label="User comments" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <ProfileDetail displayedUser={displayedUser} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <IssuePagination issues={issues} page={issuePage} handlePageChange={handleIssuePageChange} isLoadingIssues={isLoadingIssues} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>

                    </TabPanel>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default UserDetail;