import React, { useState, useRef, useContext } from "react";
import { Card, CardHeader, Avatar, CardContent, Typography, Link, Divider, FormGroup, LinearProgress, TextareaAutosize, Button, Alert, Stack, Select, MenuItem } from "@mui/material"
import { Routes, Route, Link as RouterLink, Navigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { TextField } from 'formik-mui';
import CommentService from "../../services/comment.service";
import * as Yup from "yup";
import UserService from "../../services/user.service";
import UploadComponent from '../helpers/UploadComponent';
import { UserContext } from '../../providers/UserContext'

const PasswordUpdate = ({ viewingUser, editedUser, onUserSubmit, isAdmin }) => {
    const [message, setMessage] = useState("");

    const validationSchema = Yup.object({
        oldPassword: Yup.string().when("showOldPassword", {
            is: true,
            then: Yup.string().required('Password is required').min(8, 'Your password is too short').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase and lowercase letter, number and special character')
        }),
        newPassword: Yup.string().required('Password is required').min(8, 'Your password is too short').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase and lowercase letter, number and special character')
    });
    if (!editedUser) {
        return <Navigate replace to={`/not-found`} />
    }
    return (
        <Card>
            <CardContent>
                <Typography variant="h4" textAlign="center">
                    Edit password of user: {editedUser.username}
                </Typography>
                <Formik
                    initialValues={{
                        oldPassword: "",
                        newPassword: "",
                        showOldPassword: (!isAdmin || viewingUser.username === editedUser.username)
                    }}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                    onSubmit={(data, { setSubmitting }) => {
                        setMessage("");
                        console.log(data);
                        UserService.updateUserPassword(editedUser.id, data).then(
                            () => {
                                setSubmitting(false);
                                onUserSubmit();
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

                    }}>
                    {({ submitForm, isSubmitting }) => (
                        <Form>
                            {(!isAdmin || viewingUser.username === editedUser.username) && (
                                <FormGroup className="form-group-spaced">
                                    <Field
                                        component={TextField}
                                        name="oldPassword"
                                        type="password"
                                        label="Old password"
                                    />
                                </FormGroup>
                            )}

                            <FormGroup className="form-group-spaced">
                                <Field
                                    component={TextField}
                                    name="newPassword"
                                    type="password"
                                    label="New password"
                                />
                            </FormGroup>

                            {isSubmitting && <LinearProgress className="form-group-spaced" />}
                            <FormGroup className="form-group-spaced">
                                <Stack
                                    direction={{ xs: "column", sm: "row", md: "row" }}
                                    alignItems={{ xs: "stretch", md: "center" }}
                                    justifyContent="flex-end"
                                    spacing={{ xs: 1, sm: 2, md: 4 }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        Send
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={onUserSubmit}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>

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
        </Card >
    )
}

export default PasswordUpdate;