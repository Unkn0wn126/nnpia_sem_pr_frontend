import React, { useState, useRef } from "react";
import { Card, CardHeader, Avatar, CardContent, Typography, Link, Divider, FormGroup, LinearProgress, TextareaAutosize, Button, Alert } from "@mui/material"
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { TextField } from 'formik-mui';
import CommentService from "../../services/comment.service";
import * as Yup from "yup";

const CommentCreate = ({ issue, onCommentSubmit, comment }) => {
    const [message, setMessage] = useState("");

    const validationSchema = Yup.object({
        content: Yup.string().required("Content is required")
    });
    return (
        <Card>
            <CardContent>
                <Formik
                    initialValues={{
                        content: comment ? comment.content : ""
                    }}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                    onSubmit={(data, { setSubmitting }) => {
                        setMessage("");
                        if(comment){
                            console.log(data);
                            CommentService.updateComment(comment.id, data).then(
                            () => {
                                setSubmitting(false);
                                onCommentSubmit();
                                data.content = '';
                            },
                            (error) => {
                                const resMessage =
                                    (error.response &&
                                        error.response.data &&
                                        error.response.data.message) ||
                                    error.message ||
                                    error.toString();
                                setMessage(resMessage);
                                setSubmitting(false);
                            }
                        )
                        }else{
                            CommentService.createComment(issue.id, data).then(
                            () => {
                                setSubmitting(false);
                                onCommentSubmit();
                                data.content = '';
                            },
                            (error) => {
                                const resMessage =
                                    (error.response &&
                                        error.response.data &&
                                        error.response.data.message) ||
                                    error.message ||
                                    error.toString();
                                setMessage(resMessage);
                                setSubmitting(false);
                            }
                        )
                        }

                    }}>
                    {({ submitForm, isSubmitting }) => (
                        <Form>
                            <FormGroup className="form-group-spaced">
                                <Field
                                    component="textarea"
                                    name="content"
                                    type="text"
                                    label="Content"
                                    style={{ maxWidth: "100%", minWidth: "100%", maxHeight: "150px", minHeight: "150px"}}
                                    className="textarea-text"
                                />
                            </FormGroup>
                            {isSubmitting && <LinearProgress className="form-group-spaced" />}
                            <FormGroup className="form-group-spaced">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Send
                                </Button>
                                <input type="submit" hidden />
                            </FormGroup>
                            {message && (
                                <FormGroup className="form-group-spaced">
                                    <Alert severity="error">{message}</Alert>
                                </FormGroup>
                            )}
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    )
}

export default CommentCreate;