import axios from "axios";
import authHeader from "./auth-header";

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

const CommentService = {
    getAllComments,
    getCommentsByAuthorName,
    getCommentsByIssueId,
    getCommentById,
    createComment,
    deleteComment,
    updateComment
}

export default CommentService;