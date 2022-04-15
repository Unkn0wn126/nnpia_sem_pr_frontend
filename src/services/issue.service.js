import axios from "axios";
import authHeader from "./auth-header";

// Authorized

const getAllIssues = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/`, {headers: authHeader()})
}

const getIssuesByAuthorName = (authorName) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/user/${authorName}`, {headers: authHeader()})
}

const getIssueById = (id) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/${id}`, {headers: authHeader()})
}

const createIssue = (issueCreateDto) => {
    return axios.post(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/create`, issueCreateDto, {headers: authHeader()})
}

const deleteIssue = (id) => {
    return axios.delete(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/delete/${id}`, {headers: authHeader()})
}

const updateIssue = (id, issueUpdateDto) => {
    return axios.put(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/update/${id}`, issueUpdateDto, {headers: authHeader()})
}


// Admin

const getAllIssuesAdmin = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/admin/issues/`, {headers: authHeader()})
}

const getIssuesByAuthorNameAdmin = (authorName) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/admin/issues/user/${authorName}`, {headers: authHeader()})
}

const getIssueByIdAdmin = (id) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/admin/issues/${id}`, {headers: authHeader()})
}

const createIssueAdmin = (issueCreateDto) => {
    return axios.post(`${process.env.REACT_APP_BASE_URI}/api/v1/admin/issues/create`, issueCreateDto, {headers: authHeader()})
}

const deleteIssueAdmin = (id) => {
    return axios.delete(`${process.env.REACT_APP_BASE_URI}/api/v1/admin/issues/delete/${id}`, {headers: authHeader()})
}

const updateIssueAdmin = (id, issueUpdateDto) => {
    return axios.put(`${process.env.REACT_APP_BASE_URI}/api/v1/admin/issues/update/${id}`, issueUpdateDto, {headers: authHeader()})
}

// Public

const getAllPublicIssues = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/public/issues/`)
}

const getPublicIssuesByAuthorName = (authorName) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/public/issues/user/${authorName}`)
}

const getPublicIssueById = (id) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/public/issues/${id}`)
}

const IssueService = {
    getAllIssues,
    getIssuesByAuthorName,
    getIssueById,
    createIssue,
    deleteIssue,
    updateIssue,
    getAllIssuesAdmin,
    getIssuesByAuthorNameAdmin,
    getIssueByIdAdmin,
    createIssueAdmin,
    deleteIssueAdmin,
    updateIssueAdmin,
    getAllPublicIssues,
    getPublicIssuesByAuthorName,
    getPublicIssueById
}

export default IssueService;