import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../../services/auth.service";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { Alert, Avatar, Button, FormGroup, LinearProgress, CardHeader, Tooltip, Typography, IconButton, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik, Form, Field } from "formik";
import { TextField } from 'formik-mui';
import * as Yup from "yup";
import { useDropzone } from 'react-dropzone';
import UploadComponent from '../helpers/UploadComponent';


const RegisterForm = (props) => {
    let navigate = useNavigate();
    const [message, setMessage] = useState("");

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required').min(8, 'Your password is too short').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase and lowercase letter, number and special character'),
        passwordCheck: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password')], 'Passwords must match'),
        email: Yup.string().email().required('Email is required'),
        nickname: Yup.string().required('Nickname is required'),
        profilePicture: Yup.mixed().nullable()
    })

    return (

        <Card variant="outlined">
            <CardContent>
                <CardHeader className="content-center text-center" component="h3" title="Register" />
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                        passwordCheck: "",
                        email: "",
                        nickname: "",
                        profilePicture: null
                    }}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                    onSubmit={(data, { setSubmitting }) => {
                        setMessage("");
                        console.log(data);
                        AuthService.register({ email: data.email, password: data.password, profile: { nickname: data.nickname, profilePicturePath: data.profilePicture }, username: data.username }).then(
                            () => {
                                navigate("/home");
                                window.location.reload();
                                setSubmitting(false);
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
                            <FormGroup className="form-group-spaced">

                                <Field
                                    component={UploadComponent}
                                    formHelperText={{ children: 'How visible do you want the issue to be?' }}
                                    name="profilePicture"
                                    label="Profile picture"
                                >
                                </Field>
                            </FormGroup>
                            <FormGroup className="form-group-spaced">
                                <Field
                                    component={TextField}
                                    name="username"
                                    type="text"
                                    label="Username"
                                />
                            </FormGroup>
                            <FormGroup className="form-group-spaced">
                                <Field
                                    component={TextField}
                                    name="password"
                                    type="password"
                                    label="Password"
                                />
                            </FormGroup>
                            <FormGroup className="form-group-spaced">
                                <Field
                                    component={TextField}
                                    name="passwordCheck"
                                    type="password"
                                    label="Confirm password"
                                />
                            </FormGroup>
                            <FormGroup className="form-group-spaced">
                                <Field
                                    component={TextField}
                                    name="email"
                                    type="email"
                                    label="Email"
                                />
                            </FormGroup>
                            <FormGroup className="form-group-spaced">
                                <Field
                                    component={TextField}
                                    name="nickname"
                                    type="text"
                                    label="Nickname"
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
                                    Register
                                </Button>
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
    );
}

export default RegisterForm;