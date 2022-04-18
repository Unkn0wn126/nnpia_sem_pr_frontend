import axios from "axios";
import jwt_decode from "jwt-decode";
import UserService from "./user.service";

const register = (userRegisterDto) => {
    return axios
    .post(`${process.env.REACT_APP_BASE_URI}/api/v1/register`, userRegisterDto);
}

const login = (loginRequest) => {
    return axios
    .post(`${process.env.REACT_APP_BASE_URI}/api/v1/login`, loginRequest)
    .then((response) => {
        if(response.data.jwttoken && response.data.refreshToken){
            localStorage.setItem("user", JSON.stringify( response.data.userGetDto ));
            localStorage.setItem("jwttoken", JSON.stringify(response.data.jwttoken));
            localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
        }
    })
}

const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("refreshToken");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const updateUserDetails = () => {
    UserService.getUserByUsername(getCurrentUser().username).then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
    }).catch(err => {

    });
}

const isAdmin = () => {
    const user = getCurrentUser();
    return user && user.roles.filter(role => role.type === 'ROLE_ADMIN').length > 0;
}

const getJwtToken = () => {
    return JSON.parse(localStorage.getItem("jwttoken"));
}

const getRefreshToken = () => {
    return JSON.parse(localStorage.getItem("refreshToken"));
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    updateUserDetails,
    isAdmin,
    getJwtToken,
    getRefreshToken
}

export default AuthService;