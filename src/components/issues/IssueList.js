import { Stack, Divider  } from "@mui/material";
import IssueItem from "./IssueItem";

const IssueList = ({issueList}) => {
    return(
    <Stack
    spacing={{ xs: 1, sm: 2, md: 4 }}
    divider={<Divider orientation="horizontal" flexItem />}
    alignItems="stretch"
    justifyContent="space-evenly"
    >
        {issueList.map((issue) => (
            <IssueItem key={issue.id} issue={issue} />
        ))}
    </Stack>
    );
}

export default IssueList;