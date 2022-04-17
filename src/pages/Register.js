import Container from '@mui/material/Container';
import RegisterForm  from '../components/authentication/RegisterForm'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../providers/UserContext'
import { useContext } from 'react';

const Login = (props) => {
    const {user} = useContext(UserContext)
    if (user){
        return <Navigate replace to="/profile" />
    }
    return (        
    <Container maxWidth="sm" sx={{ paddingTop: "30px", paddingBottom: "20px" }}>
        <RegisterForm />
    </Container>);
}

export default Login;