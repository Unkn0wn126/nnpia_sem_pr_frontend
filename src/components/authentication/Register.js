import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../../services/auth.service";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { Alert, Avatar, Button, FormGroup, LinearProgress } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from 'formik-mui';

const Register = () => {
    let navigate = useNavigate();
    const [message, setMessage] = useState("");

    return (
        <Container maxWidth="sm">
            <Card variant="outlined">
                <CardContent>
                    <Avatar className="content-center form-group-spaced" src="logo.svg" sx={{ width: 100, height: 100 }} />
                    <Formik
                        initialValues={{
                            username: "",
                            password: "",
                            passwordCheck: "",
                            email: "",
                            nickname: "",
                            profilePicturePath: ""
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.username) {
                                errors.username = 'Username is required'
                            }
                            if (!values.password) {
                                errors.password = 'Password is required'
                            }
                            if (!values.passwordCheck) {
                                errors.passwordCheck = 'Password check is required'
                            }
                            if (values.password !== values.passwordCheck) {
                                errors.passwordCheck = 'Passwords don\'t match'
                                errors.password = 'Passwords don\'t match'
                            }
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            if(!values.nickname){
                                errors.nickname = 'Nickname is required'
                            }

                            return errors;
                        }}
                        validateOnChange={true}
                        validateOnBlur={true}
                        onSubmit={(data, { setSubmitting }) => {
                            setMessage("");
                            AuthService.register({email:data.email, password:data.password, profile:{nickname: data.nickname, profilePicturePath: data.profilePicturePath}, username: data.username}).then(
                                () => {
                                    navigate("/profile");
                                    window.location.reload();
                                },
                                (error) => {
                                    const resMessage =
                                        (error.response &&
                                            error.response.data &&
                                            error.response.data.message) ||
                                        error.message ||
                                        error.toString();
                                    setMessage(resMessage);
                                }
                            );
                            setSubmitting(false);
                        }}>
                        {({ submitForm, isSubmitting }) => (
                            <Form>
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
                                        label="Password again"
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
                                <FormGroup className="form-group-spaced">
                                    <Field
                                        component={TextField}
                                        name="profilePicturePath"
                                        type="text"
                                        label="Profile picture path"
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
        </Container>
    );
}

export default Register;