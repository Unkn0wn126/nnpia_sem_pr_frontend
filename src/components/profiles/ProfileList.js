import { Stack, Divider  } from "@mui/material";
import ProfileItem from "./ProfileItem";

const ProfileList = ({profileList, viewingUser, onDelete, isAdmin}) => {
    return(
    <Stack
    spacing={{ xs: 1, sm: 2, md: 4 }}
    divider={<Divider orientation="horizontal" flexItem />}
    alignItems="stretch"
    justifyContent="space-evenly"
    >
        {profileList.map((user) => (
            <ProfileItem key={user.id} viewingUser={viewingUser} user={user} onDelete={onDelete} isAdmin={isAdmin} />
        ))}
    </Stack>
    );
}

export default ProfileList;