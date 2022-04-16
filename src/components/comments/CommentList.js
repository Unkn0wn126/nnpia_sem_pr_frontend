import { Stack } from "@mui/material";
import CommentItem from "./CommentItem";

const CommentList = ({issue, commentList, viewingUser, onCommentSubmit, onCommentDelete}) => {
    return(
    <Stack spacing={2}>
        {commentList.map((comment) => (
            <CommentItem key={comment.id} issue={issue} comment={comment} viewingUser={viewingUser} onCommentSubmit={onCommentSubmit} onDelete={onCommentDelete} />
        ))}
    </Stack>
    );
}

export default CommentList;