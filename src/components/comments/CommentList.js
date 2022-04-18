import { Stack } from "@mui/material";
import CommentItem from "./CommentItem";

const CommentList = ({issue, commentList, viewingUser, onCommentSubmit, onCommentDelete, isAdmin }) => {
    return(
    <Stack spacing={2}>
        {commentList.map((comment) => (
            <CommentItem key={comment.id} issue={issue} comment={comment} viewingUser={viewingUser} onCommentSubmit={onCommentSubmit} onDelete={onCommentDelete} isAdmin={isAdmin} />
        ))}
    </Stack>
    );
}

export default CommentList;