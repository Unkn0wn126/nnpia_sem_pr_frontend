import axios from "axios";
import authHeader from "./auth-header";

const getAllUsers = (pageNumber) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/users/?pageNumber=${pageNumber}`, {headers: authHeader()})
}

const getUserById = (id) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/users/id/${id}`, {headers: authHeader()})
}

const getUserByUsername = (username) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/users/${username}`, {headers: authHeader()})
}

const deleteUser = (id) => {
    return axios.delete(`${process.env.REACT_APP_BASE_URI}/api/v1/users/delete/${id}`, {headers: authHeader()})
}

const updateUser = (id, userUpdateDto) => {
    return axios.put(`${process.env.REACT_APP_BASE_URI}/api/v1/users/update/${id}`, userUpdateDto, {headers: authHeader()})
}

const updateUserPassword = (id, userPasswordUpdateDto) => {
    return axios.put(`${process.env.REACT_APP_BASE_URI}/api/v1/users/update/password/${id}`, userPasswordUpdateDto, {headers: authHeader()})
}
const UserService = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    deleteUser,
    updateUser,
    updateUserPassword
}

export default UserService;