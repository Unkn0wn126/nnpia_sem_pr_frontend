import React, { useState, useRef, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import AuthService from "../../services/auth.service";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { Alert, Avatar, Button, FormGroup, LinearProgress, CardHeader } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { TextField } from 'formik-mui';
import * as Yup from "yup";
import UserContext from "../../providers/UserContext";

const LoginForm = (props) => {
    let navigate = useNavigate();
    const [message, setMessage] = useState("");

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required")
    });

    const {login} = useContext(UserContext);

    return (
            <Card variant="outlined">
                <CardContent>
                    <CardHeader className="content-center text-center" component="h3" title="Login"/>
                    <Avatar className="content-center form-group-spaced" src="logo.svg" sx={{ width: 100, height: 100 }} />
                    <Formik
                        initialValues={{
                            username: "",
                            password: ""
                        }}
                        validationSchema={validationSchema}
                        validateOnChange={true}
                        validateOnBlur={true}
                        onSubmit={(data, { setSubmitting }) => {
                            setMessage("");
                            login(data).then(
                                () => {
                                    navigate("/profile");
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

                                {isSubmitting && <LinearProgress className="form-group-spaced" />}
                                <FormGroup className="form-group-spaced">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        Login
                                    </Button>
                                    <input type="submit" hidden/>
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

export default LoginForm;