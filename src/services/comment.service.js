import axios from "axios";
import authHeader from "./auth-header";

// Authorized

const getAllComments = (pageNumber) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/comments/?pageNumber=${pageNumber}`, {headers: authHeader()})
}

const getCommentsByAuthorName = (authorName, pageNumber) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/comments/user/${authorName}?pageNumber=${pageNumber}`, {headers: authHeader()})
}

const getCommentsByIssueId = (issueId, pageNumber) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/comments/issue/${issueId}?pageNumber=${pageNumber}`, {headers: authHeader()})
}

const getCommentById = (id) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/comments/${id}`, {headers: authHeader()})
}

const createComment = (issueId, commentCreateDto) => {
    return axios.post(`${process.env.REACT_APP_BASE_URI}/api/v1/comments/create/${issueId}`, commentCreateDto, {headers: authHeader()})
}

const deleteComment = (id) => {
    return axios.delete(`${process.env.REACT_APP_BASE_URI}/api/v1/comments/delete/${id}`, {headers: authHeader()})
}

const updateComment = (id, commentUpdateDto) => {
    return axios.put(`${process.env.REACT_APP_BASE_URI}/api/v1/comments/update/${id}`, commentUpdateDto, {headers: authHeader()})
}


// Admin

const getAllCommentsAdmin = (pageNumber) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/admin/comments/?pageNumber=${pageNumber}`, {headers: authHeader()})
}

const getCommentsByAuthorNameAdmin = (authorName, pageNumber) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/admin/comments/user/${authorName}?pageNumber=${pageNumber}`, {headers: authHeader()})
}

const getCommentsByIssueIdAdmin = (issueId, pageNumber) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/admin/comments/issue/${issueId}?pageNumber=${pageNumber}`, {headers: authHeader()})
}

const getCommentByIdAdmin = (id) => {
    return axios.get(`${process.env.REACT_APP_BASE_URI}/api/v1/admin/comments/${id}`, {headers: authHeader()})
}

const createCommentAdmin = (issueId, commentCreateDto) => {
    return axios.post(`${process.env.REACT_APP_BASE_URI}/api/v1/admin/comments/create/${issueId}`, commentCreateDto, {headers: authHeader()})
}

const deleteCommentAdmin = (id) => {
    return axios.delete(`${process.env.REACT_APP_BASE_URI}/api/v1/admin/comments/delete/${id}`, {headers: authHeader()})
}

const updateCommentAdmin = (id, commentUpdateDto) => {
    return axios.put(`${process.env.REACT_APP_BASE_URI}/api/v1/admin/comments/update/${id}`, commentUpdateDto, {headers: authHeader()})
}

const CommentService = {
    getAllComments,
    getCommentsByAuthorName,
    getCommentsByIssueId,
    getCommentById,
    createComment,
    deleteComment,
    updateComment,
    getAllCommentsAdmin,
    getCommentsByAuthorNameAdmin,
    getCommentsByIssueIdAdmin,
    getCommentByIdAdmin,
    createCommentAdmin,
    deleteCommentAdmin,
    updateCommentAdmin
}

export default CommentService;