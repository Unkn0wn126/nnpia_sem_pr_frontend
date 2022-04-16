import { Card, CardHeader, Avatar, CardContent, Typography, Link, Divider } from "@mui/material"
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import CommentList from "../comments/CommentList";

const IssueItem = ({issue}) => {
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
                <Divider />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <Link component={RouterLink} to={`/issues/${issue.id}`} underline='none'>{issue.header}</Link>
                </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {issue.content}
                    </Typography>
                </CardContent>
        </Card>
    )
}

export default IssueItem;