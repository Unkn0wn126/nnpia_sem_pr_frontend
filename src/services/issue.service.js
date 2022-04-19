import axios from "axios";
import authHeader from "./auth-header";

const getAllIssues = (pageNumber, pageSize, sortDirection, sortBy) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/?pageNumber=${pageNumber}&pageSize=${pageSize}&direction=${sortDirection}&orderBy=${sortBy}`, {headers: authHeader()})
}

const getIssuesByAuthorName = (authorName, pageNumber, pageSize, sortDirection, sortBy) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/issues/user/${authorName}?pageNumber=${pageNumber}&pageSize=${pageSize}&direction=${sortDirection}&orderBy=${sortBy}`, {headers: authHeader()})
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

const IssueService = {
    getAllIssues,
    getIssuesByAuthorName,
    getIssueById,
    createIssue,
    deleteIssue,
    updateIssue
}

export default IssueService;