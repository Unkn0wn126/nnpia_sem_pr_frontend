import { UserContext } from '../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import { Routes, Route, Link as RouterLink, useParams, Navigate } from "react-router-dom";
import { Box, Card, CardContent, CircularProgress, Container, Grid, Pagination, Stack, Typography } from '@mui/material';

const NotFoundPage = (props) => {
    return (
        <Container maxWidth="xl">
            <Box sx={{ paddingTop: "30px", paddingBottom: "20px" }} alignItems="center">
                <Card>
                    <CardContent>
                        <Typography variant='h1' component="h1">
                            404 Not found
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default NotFoundPage;