import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import AuthService from "../../services/auth.service";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import { Alert, Avatar, Button, FormGroup, FormHelperText, TextField } from "@mui/material";
import { useFormik, Formik } from "formik";
import * as Yup from 'yup';

const Login = () => {
    const validationSchema = Yup.object().shape({
        username: Yup.string()
        .required("Username is required")
        .min(5, "Username must be at least 5 characters")
        .max(20, "Username must not exceed 20 characters"),
        password: Yup.string().required("Password is required")
    });
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (data) => {
            setMessage("");
            setLoading(true);
            AuthService.login(data).then(
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
                setLoading(false);
                setMessage(resMessage);
            }
            );
        }
    })
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

      return (
          <Container maxWidth="sm">
              <Card variant="outlined">
                  <CardContent>
                    <Avatar src="logo.svg" sx={{ width: 56, height: 56}}/>
                    <Form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField label="Username" name="username" value={formik.values.username} onChange={formik.handleChange} variant="outlined" error={formik.errors.username ? true : false}/>
                            {formik.errors.username ? <FormHelperText error="true">Username required</FormHelperText> : null}
                        </FormGroup>
                        <FormGroup>
                            <TextField label="Password" type="password" name="password" value={formik.values.password} onChange={formik.handleChange} variant="outlined"  error={formik.errors.password ? true : false}/>
                            {formik.errors.password ? <FormHelperText error="true">Password required</FormHelperText> : null}
                        </FormGroup>
                        <FormGroup>
                        <Button disabled={loading} variant="contained" type="submit">
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </Button>
                        </FormGroup>
                        {message && (
                            <FormGroup>
                                <Alert severity="error">{message}</Alert>
                            </FormGroup>
                        )}
                    </Form>
                  </CardContent>
              </Card>
          </Container>
      );
}

export default Login;