import React, { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import "../../styles/HeaderStyles.css";

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // handle menu click
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // menu drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color={"black"}
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, my: 2 }}
      >
        ROADSAFE
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink activeClassName="active" to={"/"}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/about"}>About</NavLink>
        </li>
        <li>
          <NavLink to={"/services"}>Menu</NavLink>
        </li>
        <li>
          <NavLink to={"/team"}>Menu</NavLink>
        </li>
        <li>
          <NavLink to={"/contact"}>Contact</NavLink>
        </li>
      </ul>
    </Box>
  );

  return <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "#FFA500" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              color={"white"}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontFamily: "Arial", fontSize: "24px" }}
            >
              ROADSAFE
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <ul className="navigation-menu">
                <li>
                  <NavLink 
                    activeClassName="active" 
                    to={"/"} 
                    style={{ color: "white", textDecoration: "none" }}
                    activeStyle={{ color: "black" }}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to={"/about"} 
                    style={{ color: "white", textDecoration: "none" }}
                    activeStyle={{ color: "black" }}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to={"/services"} 
                    style={{ color: "white", textDecoration: "none" }}
                    activeStyle={{ color: "black" }}
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to={"/team"} 
                    style={{ color: "white", textDecoration: "none" }}
                    activeStyle={{ color: "black" }}
                  >
                    Team
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to={"/contact"} 
                    style={{ color: "white", textDecoration: "none" }}
                    activeStyle={{ color: "black" }}
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>
}

// export default Header;
