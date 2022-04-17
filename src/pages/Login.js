import Container from '@mui/material/Container';
import { useContext } from 'react';
import LoginForm from '../components/authentication/LoginForm'
import { UserContext } from '../providers/UserContext'
import { Navigate } from 'react-router-dom';

const Login = (props) => {
    const {user} = useContext(UserContext)
    if (user){
        return <Navigate replace to={`/users/${user.sub}`} />
    }
    return (        
    <Container maxWidth="sm" sx={{ paddingTop: "30px", paddingBottom: "20px" }}>
        <LoginForm />
    </Container>);
}

export default Login;