import axios from "axios";
import authHeader from "./auth-header";

const getAllIssues = () => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/`, {headers: authHeader()})
}

const getIssuesByAuthorName = (authorName) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/user/${authorName}`)
}

const getIssueById = (id) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/${id}`)
}

const createIssue = (issueCreateDto) => {
    return axios.post(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/create`, issueCreateDto)
}

const deleteIssue = (id) => {
    return axios.delete(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/${id}`)
}

const updateIssue = (id) => {
    return axios.put(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/${id}`)
}

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
    getAllPublicIssues,
    getPublicIssuesByAuthorName,
    getPublicIssueById
}

export default IssueService;