import { Stack } from "@mui/material";
import CommentItem from "./CommentItem";

const CommentList = ({commentList}) => {
    return(
    <Stack spacing={2}>
        {commentList.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
        ))}
    </Stack>
    );
}

export default CommentList;