
const UserDetail = ({data}) => {
    return (
    <div style={{"margin": "0 auto", "width": "80%"}}>
        <div>
            <div>Username: {data.username}</div>
            <div>E-mail: {data.email}</div>
            <div>Nickname: {data.profile.nickname}</div>
            <div>State: {data.state}</div>
            <div>Account created: {data.created}</div>
            <div>Account last edited: {data.lastEdited}</div>
        </div>
    </div>
    );
}

export default UserDetail;