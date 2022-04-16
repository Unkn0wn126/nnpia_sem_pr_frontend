import { Card, CardHeader, Avatar, CardContent, Typography, Link, CircularProgress, Divider } from "@mui/material"
import { UserContext } from '../../providers/UserContext'
import { useEffect, useContext, useState } from "react";
import { Routes, Route, Link as RouterLink, useParams } from "react-router-dom";
import CommentList from "../comments/CommentList";
import IssueService from '../../services/issue.service';

const IssueDetail = ({issue}) => {

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="author" alt={issue.author.username}  src="/static/images/avatar/2.jpg">

                    </Avatar>
                }
                    title={<Link component={RouterLink} to={`/users/${issue.author.username}`} underline='none'>{issue.author.profile.nickname}</Link>}
                    subheader={issue.published}
                />
                <Divider/>
                <CardContent>
                <Typography variant="h5" color="text.secondary">
                        {issue.header}
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary">
                        {issue.content}
                    </Typography>
                    <Divider/>
                    <Typography variant="h6" color="text.secondary">
                        Comments
                    </Typography>
                    <Divider/>
                    <CommentList commentList={issue.comments} />
                </CardContent>
        </Card>
    )
}

export default IssueDetail;