import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import logoImage from '../../assets/img/Header_UM_Logo.png';
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Logo = styled("img")({
  height: 40,
  objectFit: "contain"
});

const Header = ({parentCallback, toggleCollapse}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleProfileMenuOpen = (event) => { setAnchorEl(event.currentTarget); };

    const handleMenuClose = () => { setAnchorEl(null); };

    const handleEditProfile = () => {
        console.log("Edit Profile clicked");
        handleMenuClose();
    };

    const handleLogout = () => {
        handleMenuClose();
        parentCallback(false);
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    const isMenuOpen = Boolean(anchorEl);

    return (
        <AppBar position="static" sx={{ backgroundColor: "rgb(238, 229, 229)", height: 82 }}>
            <Toolbar sx={{ paddingTop: 1, display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon sx={{color: "rgb(80, 80, 190)"}} onClick={toggleCollapse}  />
                    </IconButton>
                    <Logo
                        src={logoImage}
                        alt="Header Logo"
                    />
                </Box>
                <Box>
                    <IconButton onClick={handleProfileMenuOpen}>
                        <Avatar
                            alt="Profile"
                            src="https://via.placeholder.com/150" // Replace with actual profile image URL
                        />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;