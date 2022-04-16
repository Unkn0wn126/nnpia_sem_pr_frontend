import { UserContext } from '../providers/UserContext'
import React, { createContext, useContext, useEffect, useState } from "react";
import { Routes, Route, Link as RouterLink, useParams, Navigate } from "react-router-dom";
import { Box, Card, CardContent, CircularProgress, Container, Grid, Pagination, Stack, Typography } from '@mui/material';

const HomePage = (props) => {
    const { user } = useContext(UserContext);

    if (user) {
        return <Navigate replace to={`/users/${user.username}`} />
    }

    return (
        <Container maxWidth="xl">
            <Box sx={{ paddingTop: "30px", paddingBottom: "20px" }} alignItems="center">
                <Card>
                    <CardContent>
                        <Typography variant='h1' component="h1">
                            Unknown's Issue tracker
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
}

export default HomePage;