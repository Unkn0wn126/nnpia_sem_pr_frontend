import { Card, CardHeader, Avatar, CardContent, Typography, Link, Divider } from "@mui/material"
import { Routes, Route, Link as RouterLink } from "react-router-dom";

const CommentItem = ({comment}) => {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="author" alt={comment.author.username}  src="/static/images/avatar/2.jpg">

                    </Avatar>
                }
                    title={<Link component={RouterLink} to={`/users/${comment.author.username}`} underline='none'>{comment.author.profile.nickname}</Link>}
                    subheader={comment.created === comment.lastEdited ? comment.created : `${comment.created} (last edit: ${comment.lastEdited})`}
                />
                <Divider />
                <CardContent>
                    <Typography variant="body" color="text.secondary">
                        {comment.content}
                    </Typography>
                </CardContent>
        </Card>
    )
}

export default CommentItem;