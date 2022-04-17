import React, { useState, useRef } from "react";
import { Card, CardHeader, Avatar, CardContent, Typography, Link, Divider, FormGroup, LinearProgress, TextareaAutosize, Button, Alert, FormControl, MenuItem, InputLabel, TextField as MUITextField, Stack } from "@mui/material"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import { TextField, Select } from 'formik-mui';
import CommentService from "../../services/comment.service";
import * as Yup from "yup";
import IssueService from "../../services/issue.service";
import DatePickerEditor from "../helpers/DatePickerEditor";

const IssueCreate = ({ issue, onIssueSubmit }) => {
    const [message, setMessage] = useState("");

    const validationSchema = Yup.object({
        content: Yup.string().required("Content is required"),
        header: Yup.string().required("Header is required"),
        severity: Yup.string().required("Severity is required").matches(/^[.]*(LOW|MEDIUM|HIGH)/, 'Can only be LOW, MEDIUM or HIGH'),
        visibility: Yup.string().required("Visibility is required").matches(/^[.]*(PUBLIC|INTERNAL|PRIVATE)/, 'Can only be PUBLIC, INTERNAL or PRIVATE'),
        showCompletionState: Yup.boolean(),
        completionState: Yup.string().when("showCompletionState", {
            is: true,
            then: Yup.string().required("Completion state is required").matches(/^[.]*(TODO|IN_PROGRESS|DONE)/, 'Can only be TODO, IN_PROGRESS or DONE')
        }),
        dueDate: Yup.date().nullable()
    });

    console.log(issue && issue.completionState);

    return (
        <Card>
            <CardHeader title={`${issue ? "Update" : "Create new"} issue`} />
            <CardContent>
                <Formik
                    initialValues={{
                        header: issue ? issue.header : '',
                        content: issue ? issue.content : '',
                        severity: issue ? issue.severity : 'LOW',
                        visibility: issue ? issue.visibility : 'PUBLIC',
                        dueDate: issue ? issue.dueDate : null,
                        completionState: issue ? issue.completionState : 'TODO',
                        showCompletionState: issue !== undefined && issue != null
                    }}
                    validationSchema={validationSchema}
                    validateOnChange={true}
                    validateOnBlur={true}
                    onSubmit={(data, { setSubmitting }) => {
                        setMessage("");
                        if (issue) {
                            IssueService.updateIssue(issue.id, data).then(
                                () => {
                                    setSubmitting(false);
                                    data.header = '';
                                    data.content = '';
                                    data.severity = 'LOW';
                                    data.visibility = 'PUBLIC';
                                    data.dueDate = null;
                                    data.completionState = 'TODO';
                                    data.showCompletionState = false;
                                    onIssueSubmit();
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
                        } else {
                            IssueService.createIssue(data).then(
                                () => {
                                    setSubmitting(false);
                                    data.header = '';
                                    data.content = '';
                                    data.severity = 'LOW';
                                    data.visibility = 'PUBLIC';
                                    data.dueDate = null;
                                    data.completionState = 'TODO';
                                    data.showCompletionState = false;
                                    onIssueSubmit();
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
                                    component={TextField}
                                    name="header"
                                    type="text"
                                    label="Header"
                                />
                            </FormGroup>
                            <FormGroup className="form-group-spaced">
                                <Typography variant="body1">
                                    Content
                                </Typography>
                                <Field
                                    component="textarea"
                                    name="content"
                                    type="text"
                                    label="Content"
                                    style={{ maxWidth: "100%", minWidth: "100%", maxHeight: "150px", minHeight: "150px" }}
                                    className="textarea-text"
                                />
                            </FormGroup>
                            <FormGroup className="form-group-spaced">
                                <Field
                                    component={Select}
                                    formHelperText={{ children: 'How severe is the issue?' }}
                                    id="severity"
                                    name="severity"
                                    labelId="severity-simple"
                                    label="Severity"
                                >
                                    <MenuItem value={'LOW'}>LOW</MenuItem>
                                    <MenuItem value={'MEDIUM'}>MEDIUM</MenuItem>
                                    <MenuItem value={'HIGH'}>HIGH</MenuItem>
                                </Field>
                            </FormGroup>
                            <FormGroup className="form-group-spaced">
                                <Field
                                    component={Select}
                                    formHelperText={{ children: 'How visible do you want the issue to be?' }}
                                    id="visibility"
                                    name="visibility"
                                    labelId="visibility-simple"
                                    label="Visibility"
                                >
                                    <MenuItem value={'PUBLIC'}>PUBLIC</MenuItem>
                                    <MenuItem value={'INTERNAL'}>INTERNAL</MenuItem>
                                    <MenuItem value={'PRIVATE'}>PRIVATE</MenuItem>
                                </Field>
                            </FormGroup>
                            <FormGroup className="form-group-spaced">
                                <Field
                                    component={DatePickerEditor}
                                    formHelperText={{ children: 'How visible do you want the issue to be?' }}
                                    name="dueDate"
                                    label="Due date"
                                >
                                </Field>
                            </FormGroup>
                            {issue && (
                                <FormGroup className="form-group-spaced">
                                    <Field
                                        component={Select}
                                        formHelperText={{ children: 'How visible do you want the issue to be?' }}
                                        id="completion-state"
                                        name="completionState"
                                        labelId="completion-state-simple"
                                        label="Completion state"
                                    >
                                        <MenuItem value={'TODO'}>TODO</MenuItem>
                                        <MenuItem value={'IN_PROGRESS'}>IN_PROGRESS</MenuItem>
                                        <MenuItem value={'DONE'}>DONE</MenuItem>
                                    </Field>
                                </FormGroup>
                            )}
                            {isSubmitting && <LinearProgress className="form-group-spaced" />}
                            <FormGroup className="form-group-spaced">
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    spacing={4}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        onClick={submitForm}
                                    >
                                        Send
                                    </Button>
                                    {issue && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubmitting}
                                            onClick={onIssueSubmit}
                                        >
                                            Cancel
                                        </Button>
                                    )}
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
        </Card>
    )
}

export default IssueCreate;