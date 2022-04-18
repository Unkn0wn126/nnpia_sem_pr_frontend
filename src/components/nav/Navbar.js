import { AppBar, Box, Container, IconButton, Toolbar, Typography, Menu, MenuItem, Button, Tooltip, Avatar, Link, Divider } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { Routes, Route, Link as RouterLink } from "react-router-dom";


const Navbar = ({ currentUser, pages, settings }) => {
    const [viewingUser, setViewingUser] = useState(currentUser);
    
    useEffect(() => {
        setViewingUser(currentUser);
    }, [currentUser])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    return (
        <AppBar position="fixed" sx={{ height: "70px" }} component="nav">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        Issue tracker
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}
                        >
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search..."
                                    inputProps={{ 'aria-label': 'search' }}
                                />

                            </Search>
                            {pages.map((page) => (
                                <Link key={page.text} component={RouterLink} to={page.link} textAlign="center" underline="none">
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        {page.text}
                                    </MenuItem>
                                </Link>
                            ))}
                            {!viewingUser && (
                                <div>
                                    <Link component={RouterLink} to={"/login"} textAlign="center" underline="none">
                                        <MenuItem
                                            onClick={handleCloseNavMenu}
                                        >
                                            Login
                                        </MenuItem>
                                    </Link>
                                    <Link component={RouterLink} to={"/register"} textAlign="center" underline="none">
                                        <MenuItem
                                            onClick={handleCloseNavMenu}
                                        >
                                            Register
                                        </MenuItem>
                                    </Link>
                                </div>
                            )}

                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        Issue tracker
                    </Typography>
                    <Toolbar sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
                        {pages.map((page) => (
                            <Link
                                component={RouterLink}
                                key={page.text}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: '#ffffff', display: 'block' }}
                                variant="button"
                                underline='none'
                                to={page.link}
                            >
                                {page.text}
                            </Link>
                        ))}
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search ..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                    {viewingUser && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={viewingUser.username} src={viewingUser.profile.profilePicture} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <Link key={setting.text} component={RouterLink} to={setting.link} textAlign="center" underline="none" onClick={setting.onClick}>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            {setting.text}
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                        </Box>
                    )}
                    {!viewingUser && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Toolbar sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
                                <Link component={RouterLink} to={"/login"}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#ffffff', display: 'block', borderRadius: "7px", outline: "2px solid", padding: "7px" }}
                                    variant="button"
                                    underline='none'
                                >
                                    LOGIN
                                </Link>
                                <Link component={RouterLink} to={"/register"}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: '#ffffff', display: 'block' }}
                                    variant="button"
                                    underline='none'
                                >
                                    REGISTER
                                </Link>
                            </Toolbar>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;