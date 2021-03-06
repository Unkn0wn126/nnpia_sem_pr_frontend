import React, { useState, useRef, useContext } from "react";
import { Card, CardHeader, Avatar, CardContent, Typography, Link, Divider, FormGroup, LinearProgress, TextareaAutosize, Button, Alert, Stack, MenuItem } from "@mui/material"
import { Routes, Route, Link as RouterLink, Navigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from 'formik-mui';
import CommentService from "../../services/comment.service";
import * as Yup from "yup";
import UserService from "../../services/user.service";
import UploadComponent from '../helpers/UploadComponent';
import { UserContext } from '../../providers/UserContext'

const ProfileEdit = ({ viewingUser, editedUser, onUserSubmit, isAdmin }) => {
    const [message, setMessage] = useState("");

    const validationSchema = Yup.object({
        email: Yup.string().email().required('Email is required'),
        nickname: Yup.string().required('Nickname is required'),
        userState: Yup.string().matches(/^[.]*(ACTIVE|INACTIVE|BANNED)/, 'Can only be ACTIVE, INACTIVE or BANNED'),
        profilePicture: Yup.mixed().nullable()
    });
    if (!editedUser) {
        return <Navigate replace to={`/not-found`} />
    }
    return (
        <Card>
            <CardContent>
                <Typography variant="h4" textAlign="center">
                    Edit user: {editedUser.username}
                </Typography>
                <Formik
                    initialValues={{
                        email: editedUser.email,
                        nickname: editedUser.profile.nickname,
                        userState: editedUser.state,
                        profilePicture: editedUser.profile.profilePicture
                    }}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                    onSubmit={(data, { setSubmitting }) => {
                        setMessage("");
                        UserService.updateUser(editedUser.id, {
                            email: data.email,
                            state: data.userState,
                            profile: {
                                id: editedUser.profile.id,
                                nickname: data.nickname,
                                profilePicture: data.profilePicture
                            }
                        }).then(
                            () => {
                                setSubmitting(false);
                                onUserSubmit();
                                data.email = "";
                                data.nickname = "";
                                data.state = "";
                                data.profilePicture = null;
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
                            <Field
                                component={UploadComponent}
                                name="profilePicture"
                                label="Profile picture"
                            >
                            </Field>
                            <FormGroup className="form-group-spaced">
                                <Field
                                    component={TextField}
                                    name="email"
                                    type="text"
                                    label="E-mail"
                                    style={{ maxWidth: "100%", minWidth: "100%", maxHeight: "150px", minHeight: "150px" }}
                                />
                            </FormGroup>
                            <FormGroup className="form-group-spaced">
                                <Field
                                    component={TextField}
                                    name="nickname"
                                    type="text"
                                    label="Nickname"
                                    style={{ maxWidth: "100%", minWidth: "100%", maxHeight: "150px", minHeight: "150px" }}
                                />
                            </FormGroup>
                            {(isAdmin && viewingUser.username !== editedUser.username) && (
                                <FormGroup className="form-group-spaced">
                                    <Field
                                        component={Select}
                                        id="state"
                                        name="userState"
                                        labelId="state-simple"
                                        label="User state"
                                    >
                                        <MenuItem value={'ACTIVE'}>ACTIVE</MenuItem>
                                        <MenuItem value={'INACTIVE'}>INACTIVE</MenuItem>
                                        <MenuItem value={'BANNED'}>BANNED</MenuItem>
                                    </Field>
                                </FormGroup>
                            )}

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

export default ProfileEdit;