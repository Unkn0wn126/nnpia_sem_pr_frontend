
const IssueList = ({data}) => {
    return (
    <div style={{"margin": "0 auto", "width": "80%"}}>
        {data.map(item => (
            <div key={`item-${item.id}`}>
                <div style={{"background": "#cfcfcf"}}>
                <span>Author: {item.author.profile.nickname}</span>
                <span> Pub.: {item.published}</span>
                <span> Last edit: {item.lastEdited}</span>
                <span> Severity: {item.severity}</span>
                <span> Visibility: {item.visibility}</span>
                <span> CompletionState: {item.completionState}</span>
                <span> Due date: {item.dueDate}</span>
                </div>
                <div style={{"background": "#ebebeb"}}>{item.header}</div>
                <div style={{"background": "#f7f7f7"}}>{item.content}</div>
                <div style={{"background": "#f7f7f7"}}>Comments:</div>
                <div>{item.comments.map(comment => (
                    <div style={{"margin": "auto auto auto 5%", "maxWidth": "100%"}}>
                        <div style={{"background": "#cedbb6"}}>
                            <span>Author: {comment.author.profile.nickname}</span>
                            <span> Pub.: {comment.published}</span>
                            <span> Last edit: {comment.lastEdited}</span>
                        </div>
                        <div style={{"background": "#e5f2cb"}}>{comment.content}</div>
                    </div>
                ))}</div>
            </div>
            ))}
    </div>
    );
}

export default IssueList;